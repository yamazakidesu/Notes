class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
        }

        .loading-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .loading-overlay.initial {
          background: rgba(255, 255, 255, 0.95);
        }

        .loading-content {
          background: white;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
          min-width: 200px;
        }

        .loading-overlay.initial .loading-content {
          background: transparent;
          box-shadow: none;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        .loading-text {
          margin-top: 15px;
          font-size: 16px;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 500;
        }

        .loading-overlay.initial .loading-text {
          font-size: 18px;
        }

        .loading-icon {
          font-size: 48px;
          margin-bottom: 10px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      </style>

      <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-content">
          <div class="loading-icon">📝</div>
          <div class="spinner"></div>
          <div class="loading-text">Memuat...</div>
        </div>
      </div>
    `;
  }

  show(message = 'Memuat...', isInitial = false) {
    const overlay = this.shadowRoot.getElementById('loadingOverlay');
    const textElement = this.shadowRoot.querySelector('.loading-text');
    
    textElement.textContent = message;
    
    if (isInitial) {
      overlay.classList.add('initial');
    } else {
      overlay.classList.remove('initial');
    }
    
    // Trigger reflow untuk animasi
    overlay.offsetHeight;
    overlay.classList.add('show');
  }

  hide() {
    const overlay = this.shadowRoot.getElementById('loadingOverlay');
    overlay.classList.remove('show');
  }

  remove() {
    super.remove();
  }
}

customElements.define('loading-indicator', LoadingIndicator);