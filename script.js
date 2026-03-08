// 1. Inisialisasi Animasi AOS
AOS.init({
    duration: 1200,
    once: true
});

const music = document.getElementById('weddingMusic');
const musicControl = document.getElementById('music-control');
let isAutoScrolling = false;

// 2. Fungsi Utama Buka Undangan (Satu fungsi untuk semua aksi)
function startInvitation() {
    const cover = document.getElementById('cover');
    
    // Efek Membuka Tirai ke Atas
    cover.style.transform = 'translateY(-100%)';
    cover.style.transition = '2s cubic-bezier(0.7, 0, 0.3, 1)';
    
    // Izinkan halaman di-scroll (Penting untuk browser HP)
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    // Putar Musik
    if (music) {
        music.play().catch(e => console.log("Musik butuh interaksi user"));
    }

    // Trigger Scroll Otomatis setelah animasi cover hampir selesai
    setTimeout(() => {
        autoScrollLogic();
    }, 1800); 
}

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicControl.innerText = "🎵";
    } else {
        music.pause();
        musicControl.innerText = "🔇";
    }
}

// 3. Logika Auto Scroll (Optimasi Performa Mobile)
function autoScrollLogic() {
    if (isAutoScrolling) return;
    isAutoScrolling = true;

    const scrollSpeed = 0.8; // Kecepatan pelan agar tetap mewah
    
    function step() {
        if (!isAutoScrolling) return;

        window.scrollBy(0, scrollSpeed);

        // Berhenti jika sudah sampai di bagian bawah (Footer)
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 5) {
            isAutoScrolling = false;
            return;
        }
        
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    // Berhenti jika user menyentuh layar (User Experience)
    // Diberi jeda agar tidak langsung mati saat klik tombol buka
    setTimeout(() => {
        const stopScroll = () => {
            isAutoScrolling = false;
            window.removeEventListener('touchstart', stopScroll);
            window.removeEventListener('wheel', stopScroll);
        };
        window.addEventListener('touchstart', stopScroll);
        window.addEventListener('wheel', stopScroll);
    }, 600);
}

// 4. Menangani Nama Tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    document.getElementById('guest-name').innerText = guestName;
}

// 5. Kunci Scroll saat awal load (Agar user tidak scroll sebelum dibuka)
window.onload = function() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
};
