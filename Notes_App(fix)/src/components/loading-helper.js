// Helper untuk mengelola loading indicator
class LoadingManager {
  constructor() {
    this.loader = null;
    this.init();
  }

  init() {
    // Buat loading indicator jika belum ada
    if (!this.loader) {
      this.loader = document.createElement('loading-indicator');
      this.loader.id = 'globalLoader';
      document.body.appendChild(this.loader);
    }
  }

  show(message = 'Memuat...', isInitial = false) {
    this.init();
    this.loader.show(message, isInitial);
  }

  hide() {
    if (this.loader) {
      this.loader.hide();
    }
  }

  destroy() {
    if (this.loader) {
      this.loader.remove();
      this.loader = null;
    }
  }
}

// Export singleton instance
export const loadingManager = new LoadingManager();