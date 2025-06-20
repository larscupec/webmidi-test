export class NoteHistory {
  #playedNotes = [];
  #deletedNotes = [];

  add(note) {
    this.#playedNotes.push(note);
  }

  undo() {
    if (this.#playedNotes.length === 0) {
      return null;
    }

    let lastPlayedNote = this.#playedNotes[this.#playedNotes.length - 1];
    this.#playedNotes.splice(-1);
    this.#deletedNotes.push(lastPlayedNote);

    return lastPlayedNote;
  }

  redo() {
    if (this.#deletedNotes.length === 0) {
      return null;
    }

    let lastDeletedNote = this.#deletedNotes[this.#deletedNotes.length - 1];
    this.#deletedNotes.splice(-1);
    this.#playedNotes.push(lastDeletedNote);

    return lastDeletedNote;
  }
}