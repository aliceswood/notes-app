/**
 * @jest-environment jsdom
 */

const fs = require("fs");
let NotesView = require("./notesView");
let NotesModel = require("./notesModel");
let NotesClient = require("./notesClient");

require("jest-fetch-mock").enableMocks();
// add a mock client?

describe("NotesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    model = new NotesModel();
    client = new NotesClient();
    view = new NotesView(model, client);
    // reset mock client?
  });

  it("displays the page with no notes", () => {
    view.displayNotes();
    expect(document.querySelectorAll("div.notes").length).toBe(0);
  });

  it("displays the page with 2 notes", () => {
    model.addNote("you're doing great!");
    model.addNote("another positive note!");
    view.displayNotes();
    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("clicks the button and displays the inputted message", () => {
    const buttonEl = document.querySelector("#input-button");
    const inputEl = document.querySelector("#input-message");

    inputEl.value = "This is cool!";
    buttonEl.click();

    expect(document.querySelector(".note")).not.toBeNull();
    expect(document.querySelector(".note").innerText).toEqual("This is cool!");
  });

  it("clears the list of previous notes when a new one is added", () => {
    const buttonEl = document.querySelector("#input-button");
    const inputEl = document.querySelector("#input-message");

    inputEl.value = "This is cool!";
    buttonEl.click();

    inputEl.value = "This is fun!";
    buttonEl.click();

    expect(document.querySelectorAll("div.note").length).toBe(2);
  });

  it("empties the input message field once the button is clicked", () => {
    const buttonEl = document.querySelector("#input-button");
    const inputEl = document.querySelector("#input-message");

    inputEl.value = "This is cool!";
    buttonEl.click();
    view.displayNotes();
    expect(inputEl.value).toBe("");
  });

  it("displays notes from API and populates the model with the returned data", () => {
    const mockClient = { loadNotes: jest.fn() };
    let view = new NotesView(model, mockClient);

    mockClient.loadNotes.mockResolvedValue([
      "this is a note",
      "this is another note",
    ]);

    view.displayNotesFromApi().then(() => {
      expect(mockClient.loadNotes).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll("div.note").length).toBe(2);
      expect(document.querySelectorAll("div.note")[0].innerText).toBe(
        "this is a note"
      );
    });
  });

  it("adds a note to the server on click", async () => {
    // defining the mock data - the notes array + a new note added
    const mockData = ["this is a note", "this is another note", "this is cool"];
    //define a mock client and test functions
    const mockClient = {
      createNote: jest.fn(),
      loadNotes: jest.fn(),
    };
    // mocking the outcome of create a note to equal mock data
    mockClient.createNote.mockResolvedValue([
      "this is a note",
      "this is another note",
      "this is cool",
    ]);
    //  mocking the outcome of load notes to equal mock data
    mockClient.loadNotes.mockResolvedValue([
      "this is a note",
      "this is another note",
      "this is cool",
    ]);

    let view = new NotesView(model, mockClient);

    //define the input message
    const inputEl = document.querySelector("#input-message");
    inputEl.value = "this is cool";
    //define the button and the input field
    const buttonEl = document.querySelector("#input-button");
    buttonEl.click();

    await view.displayNotesFromApi();

    // test that the add note to API function is calling createNote
    expect(mockClient.loadNotes).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll(".note").length).toBe(3);
  });
});
