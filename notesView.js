const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

class NotesView {
  constructor(model, client) {
      this.model = model;
      this.client = client;
  
      this.mainContainerEl = document.querySelector('#main-container');
      this.buttonEl = document.querySelector('#input-button');
      this.inputEl = document.querySelector('#input-message');
  
      // adds the event listener to the button to watch for a click
      this.buttonEl.addEventListener('click', () => {
        // when the button is clicked, the message is added as a new note

        // this needs to be corrected to call addNoteToApi
        this.addNewNote(this.inputEl.value);

        
        // once the note is added, the input field is cleared 
        document.querySelector('#input-message').value = null
        });
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

  async addNoteToApi() {
    const noteToAdd = document.querySelector('#input-message').value;
    await this.client.createNote(noteToAdd)
      .then(() => {
      this.displayNotesFromApi();
    })
  }

  // rewritten without depending on a callback, using .then instead
  displayNotesFromApi() {
    return this.client.loadNotes()
      .then((notesData) => {
        this.model.setNotes(notesData);
        this.displayNotes();
      });
  }
}

module.exports = NotesView;