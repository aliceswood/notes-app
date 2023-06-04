const Client = require("./notesClient");
require("jest-fetch-mock").enableMocks();

describe("Client class", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("calls fetch and loads data", () => {
    // Instantiate the class
    const client = new Client();
    // Mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetchMock.mockResponseOnce(JSON.stringify(["this is a note"]));

    // Call the method, and implement .then which will wait for the promise outcome
    // When the HTTP response is received, the .then will be executed.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes().then((returnedNotesFromApi) => {
      expect(returnedNotesFromApi).toEqual(["this is a note"]);
      expect(returnedNotesFromApi.length).toBe(1);
    });
  });

  it("creates a note and adds it to the server", () => {
    // Instantiate the class
    const client = new Client();
    // making a note to be passed into createNotes call
    const newNote = "a test note to be added";
    // Mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetchMock.mockResponseOnce(
      JSON.stringify(["a test note", "a test note to be added"])
    );

    // adding the url and options that are to be expected
    const expectedUrl = "http://localhost:3000/notes";
    const expectedOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: "a test note to be added" }),
    };
    // Call the method, and implement .then which will wait for the promise outcome
    // When the HTTP response is received, the .then will be executed.
    // We then use `expect` to assert the data from the server contain
    // what it should.

    client.createNote(newNote).then((returnedNotesFromApi) => {
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
      expect(returnedNotesFromApi).toEqual([
        "a test note",
        "a test note to be added",
      ]);
      expect(returnedNotesFromApi.length).toBe(2);
    });
  });
});
