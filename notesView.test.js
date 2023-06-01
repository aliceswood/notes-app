/**
 * @jest-environment jsdom
 */

const fs = require("fs");
let NotesView = require("./notesView");
let NotesModel = require("./notesModel");
let NotesClient = require("./notesClient");

require("jest-fetch-mock").enableMocks();

describe("NotesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    model = new NotesModel();
    client = new NotesClient();
    view = new NotesView(model, client)
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

  it("#display notes from API and populates the model with the returned data", (done) => {
    const mockData = ['this is a note', 'this is another note']
    const mockClient = {loadNotes: jest.fn()}
    let view = new NotesView(model, mockClient)

    mockClient.loadNotes.mockImplementationOnce((callback) => {
      return Promise.resolve(callback(mockData));
    })

    view.displayNotesFromApi(() => {
        expect(document.querySelectorAll('div.note').length).toBe(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toBe("this is a note");
        expect(document.querySelectorAll('div.note')[1].textContent).toBe("this is another note");
      });    
      done();
  });
})