const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#input-button');
    this.inputEl = document.querySelector('#input-message')

    this.buttonEl.addEventListener('click', () => {
      this.addNewNote(this.inputEl.value);
      document.querySelector('#input-message').value = null

    });
    // will refactor this later
  }

  displayNotes() {
    document.querySelectorAll(".note").forEach((note) => {
      note.remove();
    });

    let notes = this.model.getNotes();

    notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
  }

  addNewNote(newNote) {
    this.model.addNote(newNote);
    this.displayNotes();
  }

  displayNotesFromApi() {
    this.client.loadNotes(
      (data) => {
      this.model.setNotes(data);
      this.displayNotes();
    });
  }
}

module.exports = NotesView;