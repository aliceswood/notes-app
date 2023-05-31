class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#input-button');
    this.buttonEl.addEventListener('click', () => {
      this.displayNotes();
    });
  }

  displayNotes() {
    const message = document.querySelector('#input-message').value;
    const printedNotes = document.querySelectorAll('div.note')
      printedNotes.forEach(note => note.remove());
    
    if (message != "") {
    this.model.addNote(message)
    }

    this.model.notes.forEach(note => {
      const newNote = document.createElement('div');
      newNote.innerText = note;
      newNote.className = 'note';
      this.mainContainerEl.append(newNote);
    });
  }
}

module.exports = NotesView;