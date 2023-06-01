
class NotesModel {
  constructor(){
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  reset() {
    this.notes = [];
  }

  setNotes(newNotes) {
    this.notes = newNotes;
  }
}

module.exports = NotesModel;