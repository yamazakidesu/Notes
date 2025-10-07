import "../styles/app-bar.css";

class AppBar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Notes App";
    const subtitle =
      this.getAttribute("subtitle") || "Simple & Clean Note Workspace";

    this.innerHTML = `
      <div class="app-bar">
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    `;
  }
}

if (!customElements.get("app-bar")) {
  customElements.define("app-bar", AppBar);
}
