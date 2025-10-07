import "../styles/notes-list.css";
import { getNotes, addNote, deleteNote } from "../data/api";

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.notes = [];
  }

  connectedCallback() {
    this.renderLoading();
    this.fetchNotes();

    document.addEventListener("note-added", async (e) => {
      await this.addNoteToAPI(e.detail);
      await this.fetchNotes();
    });

    this.addEventListener("note-deleted", async (e) => {
      await this.deleteNoteFromAPI(e.detail.id);
      await this.fetchNotes();
    });
  }

  async fetchNotes() {
    try {
      const data = await getNotes();
      this.notes = data;
      this.render();
    } catch {
      this.renderError("Gagal memuat catatan");
    }
  }

  async addNoteToAPI(note) {
    try {
      await addNote(note.title, note.body);
    } catch {
      alert("Gagal menambahkan catatan!");
    }
  }

  async deleteNoteFromAPI(id) {
    try {
      await deleteNote(id);
    } catch {
      alert("Gagal menghapus catatan!");
    }
  }

  render() {
    this.innerHTML = this.notes.length
      ? `<div class="notes-grid">
          ${this.notes
            .map(
              (note) => `
                <note-item
                  note-id="${note.id}"
                  note-title="${note.title}"
                  note-body="${note.body}"
                  note-date="${note.createdAt}">
                </note-item>
              `
            )
            .join("")}
        </div>`
      : `<div class="empty">Belum ada catatan.</div>`;
  }

  renderLoading() {
    this.innerHTML = `<loading-spinner text="Memuat catatan..."></loading-spinner>`;
  }

  renderError(message) {
    this.innerHTML = `<div class="error">${message}</div>`;
  }
}

if (!customElements.get("notes-list")) {
  customElements.define("notes-list", NotesList);
}
