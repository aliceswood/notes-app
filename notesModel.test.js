const NotesModel = require('./notesModel.js')

describe("NotesModel", () => {
  it("returns the empty notes list", () => {
    model = new NotesModel();
    expect(model.getNotes()).toEqual([])
  });

  it("adds a note to the notes list", () => {
    model = new NotesModel();
    model.addNote('Buy milk');
    expect(model.getNotes()).toEqual(['Buy milk'])
  });

  it("adds 2 notes to the notes list", () => {
    model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym'])
  });

  it("resets the list to empty when reset is called", () => {
    model = new NotesModel();
    model.addNote('Buy milk');
    model.addNote('Go to the gym');
    model.reset()
    expect(model.getNotes()).toEqual([])
  });
})