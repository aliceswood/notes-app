const Client = require("./notesClient");
require("jest-fetch-mock").enableMocks();

describe("Client class", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetch and loads data", (done) => {
    // 1. Instantiate the class
    const client = new Client();
    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(
      JSON.stringify(["this is a note"])
    );
    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi).toEqual(["this is a note"]);
      expect(returnedDataFromApi.length).toBe(1);

      // 4. Tell Jest our test can now end.
      done();
    });
  });

  it('creates a note and adds it to the server', (done) => {
    // Instantiate the class
    const client = new Client();
    // making a note to be passed into createNotes call
    const newNote = "a test note to be added";

    fetchMock.mockResponseOnce(
      JSON.stringify(
        ["a test note", "a test note to be added"],
      )
    );
    
    // adding the url and options that are to be expected
    const expectedUrl = "http://localhost:3000/notes"
    const expectedOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "content": "a test note to be added" }),
    };
    // Call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    
    client.createNote(newNote, (returnedDataFromApi) => {
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
      expect(returnedDataFromApi).toEqual(["a test note", "a test note to be added"]);
      expect(returnedDataFromApi.length).toBe(2);
    // 4. Tell Jest our test can now end.
    done();
    });
  });
})
