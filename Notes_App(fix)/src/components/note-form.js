import "../styles/note-form.css";

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form class="note-form" id="noteForm">
        <div class="form-group">
          <label for="noteTitle">Judul Catatan</label>
          <input type="text" id="noteTitle" placeholder="Masukkan judul catatan..." required maxlength="50">
          <div class="char-count" id="titleCount">0/50 karakter</div>
        </div>
        <div class="form-group">
          <label for="noteBody">Isi Catatan</label>
          <textarea id="noteBody" placeholder="Tuliskan isi catatan Anda..." required></textarea>
          <div class="char-count" id="bodyCount">0 karakter</div>
        </div>
        <button type="submit" id="submitBtn" disabled>Tambah Catatan</button>
      </form>
    `;
    this.setupValidation();
  }

  setupValidation() {
    const form = this.querySelector("#noteForm");
    const titleInput = this.querySelector("#noteTitle");
    const bodyInput = this.querySelector("#noteBody");
    const titleCount = this.querySelector("#titleCount");
    const bodyCount = this.querySelector("#bodyCount");
    const submitBtn = this.querySelector("#submitBtn");

    titleInput.addEventListener("input", () => {
      titleCount.textContent = `${titleInput.value.length}/50 karakter`;
      this.validateForm();
    });

    bodyInput.addEventListener("input", () => {
      bodyCount.textContent = `${bodyInput.value.length} karakter`;
      this.validateForm();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Disable button dan ubah text
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Menambahkan...";

      // Tampilkan loading indicator
      const loader = document.getElementById('mainLoader');
      if (loader) {
        loader.show('Menambahkan catatan...');
      }

      // Simulasi delay untuk memberikan feedback visual
      // (Hapus ini jika Anda menggunakan API real)
      await new Promise(resolve => setTimeout(resolve, 800));

      const newNote = {
        id: `notes-${Date.now()}`,
        title: titleInput.value,
        body: bodyInput.value,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(
        new CustomEvent("note-added", {
          detail: newNote,
          bubbles: true,
          composed: true,
        })
      );

      // Sembunyikan loading
      if (loader) {
        loader.hide();
      }

      // Reset form
      form.reset();
      titleCount.textContent = "0/50 karakter";
      bodyCount.textContent = "0 karakter";
      submitBtn.textContent = originalText;
      submitBtn.disabled = true;
    });
  }

  validateForm() {
    const title = this.querySelector("#noteTitle").value.trim();
    const body = this.querySelector("#noteBody").value.trim();
    const submitBtn = this.querySelector("#submitBtn");
    submitBtn.disabled = !(title.length > 0 && body.length > 0);
  }
}

if (!customElements.get("note-form")) {
  customElements.define("note-form", NoteForm);
}