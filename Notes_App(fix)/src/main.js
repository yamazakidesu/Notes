// === Import component ===
import './components/app-bar';
import './components/note-form';
import './components/note-item';
import './components/notes-list';
import './components/loading';

// === Import API dan script utama ===
import './data/api.js';

// === Import style ===
import './styles/style.css';

// === Inisialisasi ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('Notes App initializing...');
  
  // Tunggu sebentar agar custom element terdaftar
  setTimeout(() => {
    const loader = document.getElementById('mainLoader');
    
    if (loader) {
      // Tampilkan loading awal dengan style initial (background putih)
      loader.show('Memuat Notes App...', true);
      
      // Sembunyikan loading setelah delay
      setTimeout(() => {
        loader.hide();
        console.log('Notes App initialized');
      }, 1000); // 1 detik
    } else {
      console.warn('Loader not found!');
      console.log('Notes App initialized (no loader)');
    }
  }, 100); // Delay 100ms untuk memastikan custom element siap
});