class NotesClient {
  // removed the use of a callback function and will use .then
  loadNotes() {
    return fetch("http://localhost:3000/notes")
      .then((response) => response.json());
  }


  // removed the use of a callback function and will use .then
  createNote(newNote) {
    return fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "content": newNote })
    })
      .then((response) => response.json());
  }
}

// const client = new NotesClient;
// const note = "test note!";

// client.createNote(note, (data) => {
//   console.log(data)
// });
module.exports = NotesClient;
