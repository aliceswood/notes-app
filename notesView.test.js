/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NotesView = require('./notesView');
const NotesModel = require('./notesModel')


describe("NotesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it('displays the page with no notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    view.displayNotes();
    expect(document.querySelectorAll('div.notes').length).toBe(0)
  });

  it('displays the page with 2 notes', () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("you're doing great!")
    model.addNote("another positive note!")
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2)
  });

  it('clicks the button and displays the inputted message', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const buttonEl = document.querySelector('#input-button');
    const inputEl = document.querySelector('#input-message');

    inputEl.value = 'This is cool!'
    buttonEl.click();

    expect(document.querySelector('.note')).not.toBeNull();
    expect(document.querySelector('.note').innerText).toEqual('This is cool!');
  });

  it('clears the list of previous notes when a new one is added', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const buttonEl = document.querySelector('#input-button');
    const inputEl = document.querySelector('#input-message');

    inputEl.value = 'This is cool!'
    buttonEl.click();

    inputEl.value = 'This is fun!'
    buttonEl.click();

    expect(document.querySelectorAll('div.note').length).toBe(2);
  });

  xit('empties the input message field once the button is clicked', () => {
    const model = new NotesModel();
    const view = new NotesView(model);

    const buttonEl = document.querySelector('#input-button');
    const inputEl = document.querySelector('#input-message');

    inputEl.value = 'This is cool!'
    buttonEl.click();

    expect(inputEl.value).toBe('')
  });
})