import '../styles/note-item.css';

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["note-id", "note-title", "note-body", "note-date"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("note-id");
    const title = this.getAttribute("note-title");
    const body = this.getAttribute("note-body");
    const date = new Date(this.getAttribute("note-date")).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    this.innerHTML = `
      <div class="note-card">
        <div class="note-title">${title}</div>
        <div class="note-date">${date}</div>
        <div class="note-body">${body}</div>
        <button class="delete-btn" data-id="${id}">Hapus</button>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", async () => {
      // Konfirmasi sebelum menghapus
      const confirmed = confirm(`Yakin ingin menghapus catatan "${title}"?`);
      if (!confirmed) return;

      const deleteBtn = this.querySelector(".delete-btn");
      
      // Disable button dan ubah text
      deleteBtn.disabled = true;
      deleteBtn.textContent = "Menghapus...";

      // Tampilkan loading indicator
      const loader = document.getElementById('mainLoader');
      if (loader) {
        loader.show('Menghapus catatan...');
      }

      // Simulasi delay untuk memberikan feedback visual
      // (Hapus ini jika Anda menggunakan API real)
      await new Promise(resolve => setTimeout(resolve, 800));

      this.dispatchEvent(new CustomEvent("note-deleted", {
        detail: { id },
        bubbles: true,
        composed: true,
      }));

      // Sembunyikan loading
      if (loader) {
        loader.hide();
      }
    });
  }
}

if (!customElements.get("note-item")) {
  customElements.define("note-item", NoteItem);
}