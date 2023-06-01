const Client = require('./notesClient');
require('jest-fetch-mock').enableMocks()

describe('Client class', () => {
  it('calls fetch and loads data', (done) => {
    const client = new Client();

    fetch.mockResponseOnce(JSON.stringify({
      notes: ['this is a note']
    }));
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes[0]).toBe('this is a note');
      expect(returnedDataFromApi.notes.length).toBe(1);

      done();
    });
  });
});