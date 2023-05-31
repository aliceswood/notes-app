class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.buttonEl = document.querySelector('#input-button');
    this.inputEl = document.querySelector('#input-message')

    this.buttonEl.addEventListener('click', () => {
      this.addNewNote(this.inputEl.value);
    });
  }

  displayNotes() {
    const allNotes = document.querySelectorAll(".note");
    allNotes.forEach((note) => {
      note.remove();
      document.querySelector('#input-message').value = ""
    });

    this.model.notes.forEach(note => {
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
}

module.exports = NotesView;