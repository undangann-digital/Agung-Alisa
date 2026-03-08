function bukaUndangan() {
  document.getElementById("cover").style.display = "none";
  document.getElementById("acara").classList.remove("hidden");
}

// 1. Inisialisasi Animasi AOS
AOS.init({
    duration: 1200,
    once: true
});

// 2. Kontrol Musik dan Cover
const music = document.getElementById('weddingMusic');
const musicControl = document.getElementById('music-control');

function startInvitation() {
    // Hilangkan cover ke atas
    document.getElementById('cover').classList.add('open');
    
    // Izinkan halaman di-scroll
    document.body.style.overflow = 'auto';
    
    // Putar musik
    music.play().catch(error => {
        console.log("Autoplay dicegah oleh browser, musik akan menyala saat interaksi berikutnya.");
    });
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

// 3. Menangani Nama Tamu dari URL
// Contoh penggunaan: index.html?to=Budi+Santoso
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    document.getElementById('guest-name').innerText = guestName;
}

// 4. Kunci Scroll saat halaman pertama kali dimuat
window.onload = function() {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
};

let isAutoScrolling = false;

function startInvitation() {
    const cover = document.getElementById('cover');
    const music = document.getElementById('weddingMusic');

    // 1. Efek Membuka Tirai (Sesuai Referensi Video)
    cover.style.transform = 'translateY(-100%)';
    cover.style.transition = '2s cubic-bezier(0.7, 0, 0.3, 1)';

    // 2. Putar Musik Ardhito
    if (music) {
        music.play().catch(e => console.log("Musik butuh interaksi user"));
    }

    // 3. Trigger Scroll Otomatis setelah animasi cover hampir selesai
    setTimeout(() => {
        autoScrollLogic();
    }, 1500); 
}

function autoScrollLogic() {
    if (isAutoScrolling) return;
    isAutoScrolling = true;

    const scrollSpeed = 0.8; // Ubah angka ini (0.5 - 2) untuk mengatur kecepatan
    
    function step() {
        if (!isAutoScrolling) return;

        window.scrollBy(0, scrollSpeed);

        // Berhenti jika sudah sampai di bagian Terimakasih/Footer
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            isAutoScrolling = false;
            return;
        }
        
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);

    // Berhenti otomatis jika tamu menyentuh layar (User Experience tetap terjaga)
    const stopScroll = () => {
        isAutoScrolling = false;
        window.removeEventListener('touchstart', stopScroll);
        window.removeEventListener('wheel', stopScroll);
    };

    window.addEventListener('touchstart', stopScroll);
    window.addEventListener('wheel', stopScroll);
}