/* =========================================================================
    1. [JAVASCRIPT DOM] LOGIKA NAVIGASI & MENU MOBILE UTK TOMBOL HAMBURGER
   ========================================================================= */

/* 
  - document.addEventListener('DOMContentLoaded', ...): 
    Fungsi wajib yang menyuruh browser untuk "Tunggu dulu sampai semua kerangka HTML selesai dimuat total",
    baru setelah itu baris kode logika JavaScript di dalam fungsi ini boleh mulai dijalankan.
*/
document.addEventListener('DOMContentLoaded', function () {
        
        /* 
          - let navLinks: Membuat variabel penampung untuk menyimpan daftar menu navigasi.
          - document.querySelectorAll('.navbar-nav .nav-link'): 
            Perintah untuk mencari dan mengambil "semua" elemen teks link menu navigasi yang ada di dalam class '.navbar-nav'.
        */
        let navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        /* 
          - let navbarCollapse: Membuat variabel penampung khusus untuk kotak wadah menu mobile.
          - document.getElementById('navbarNav'): 
            Perintah untuk melirik dan mengambil elemen kontainer menu pembungkus yang memiliki ID "navbarNav".
        */
        let navbarCollapse = document.getElementById('navbarNav');

        /* 
          - navLinks.forEach(function (link) { ... }): 
            Karena menu link navigasinya ada banyak (Beranda, Tentang, Destinasi, Transportasi), 
            perintah 'forEach' ini bekerja melakukan perulangan otomatis untuk memasangkan fungsi logika ke "setiap" menu satu per satu.
        */
        navLinks.forEach(function (link) {
            
            /* 
              - link.addEventListener('click', ...): 
                Memasang fungsi "pendengar" otomatis pada setiap link menu. 
                Artinya, sistem akan terus standby menunggu dan mendeteksi kapan pun pengguna melakukan aksi 'klik' pada menu tersebut.
            */
            link.addEventListener('click', function () {
                
                /* 
                  - LOGIKA EVENT HANDLING (Kondisi IF):
                    Sistem mengecek dua kondisi sekaligus: 
                    Apakah variabel navbarCollapse itu ada nyata (`navbarCollapse`), DAN 
                    Apakah kotak menu tersebut saat ini sedang dalam posisi terbuka lebar di layar HP (`classList.contains('show')`).
                */
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    
                    /* 
                      - new bootstrap.Collapse(navbarCollapse).hide(): 
                        Jika kondisi di atas terpenuhi (menu sedang melorot terbuka di HP), 
                        maka perintah JavaScript resmi dari framework Bootstrap ini akan langsung dipicu untuk memaksa 
                        kotak menu tersebut melorot naik dan "menutup secara otomatis" (`hide`) setelah link-nya diklik.
                    */
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });
        });
    /* =========================================================================
   2. LOGIKA ANIMASI SLIDER DESTINASI & INDIKATOR DOTS
   ========================================================================= */

/* 
  - const relSlider: Membuat variabel permanen untuk melirik "rel panjang" tempat kartu berjejer.
  - document.getElementById('relSlider'): Mengambil elemen HTML yang punya ID "relSlider".
*/
const relSlider = document.getElementById('relSlider');

/* 
  - const semuaDots: Membuat variabel untuk menampung seluruh titik bulat indikator di bawah slider.
  - document.querySelectorAll('.dot-item-kustom'): Mengambil "semua" elemen bulat yang memakai class '.dot-item-kustom'.
*/
const semuaDots = document.querySelectorAll('.dot-item-kustom');

/* 
  - let indeksAktif = 0: Membuat variabel angka penanda halaman slider. 
    Dimulai dari angka 0, yang artinya default awal adalah kartu atau dots pertama.
*/
let indeksAktif = 0;

/* 
  - function geserKanan(): Fungsi logika untuk menggeser susunan kartu ke arah kanan (maju).
*/
function geserKanan() {
    /* Pengaman script: Jika elemen relSlider ternyata tidak ditemukan di HTML, batalkan fungsi biar tidak error */
    if (!relSlider) return;
    
    /* relSlider.querySelector('.kartu-vertikal'): Melirik dan mengambil gerbong kartu yang posisinya paling depan (pertama) */
    const kartuPertama = relSlider.querySelector('.kartu-vertikal');
    
    /* relSlider.style.transition: Mengaktifkan efek gerakan bergeser secara halus selama 0.5 detik */
    relSlider.style.transition = "transform 0.5s ease-in-out";
    
    /* 
      - relSlider.appendChild(kartuPertama): Trik sakti pemutar slider! 
        Fungsi 'appendChild' akan mencopot 'kartuPertama' yang ada di depan, lalu memindahkannya 
        ke antrean paling belakang. Hal ini membuat kartu berputar terus-menerus tanpa habis.
    */
    relSlider.appendChild(kartuPertama);

    /* LOGIKA MENGGESER TITIK BULAT INDIKATOR (DOTS) KE KANAN */
    if (semuaDots.length > 0) {
        /* Mencopot class 'aktif' (warna hijau) dari titik bulat yang lama */
        semuaDots[indeksAktif].classList.remove('aktif');
        
        /* 
          - Rumus Sisa Bagi (%): Menghitung indeks dots aktif berikutnya. 
            Ditambah 1 artinya maju ke kanan, dan di-persen (%) dengan total jumlah dots 
            biar kalau angkanya sudah mentok di dots terakhir, otomatis berputar balik ke angka 0.
        */
        indeksAktif = (indeksAktif + 1) % semuaDots.length;
        
        /* Memasang class 'aktif' (warna hijau neon) ke titik bulat baru yang sedang dilihat pengguna */
        semuaDots[indeksAktif].classList.add('aktif');
    }
}

/* 
  - function geserKiri(): Fungsi logika untuk menggeser susunan kartu ke arah kiri (mundur).
*/
function geserKiri() {
    if (!relSlider) return;
    
    /* querySelectorAll('.kartu-vertikal'): Mengambil seluruh daftar kartu destinasi yang ada di dalam rel */
    const semuaKartu = relSlider.querySelectorAll('.kartu-vertikal');
    
    /* semuaKartu[semuaKartu.length - 1]: Melirik dan mengambil gerbong kartu yang posisinya berada di paling ujung belakang */
    const kartuTerakhir = semuaKartu[semuaKartu.length - 1];
    
    relSlider.style.transition = "transform 0.5s ease-in-out";
    
    /* 
      - relSlider.insertBefore(kartuTerakhir, semuaKartu[0]): Kebalikan dari fungsi kanan!
        Fungsi ini mencopot 'kartuTerakhir' yang ada di paling belakang, lalu menyisipkannya paksa 
        ke posisi paling depan sebelum 'semuaKartu[0]' (kartu pertama). Makanya kartu bergeser mundur.
    */
    relSlider.insertBefore(kartuTerakhir, semuaKartu[0]);

    /* LOGIKA MENGGESER TITIK BULAT INDIKATOR (DOTS) KE KIRI */
    if (semuaDots.length > 0) {
        /* Mencopot warna hijau aktif dari dots lama */
        semuaDots[indeksAktif].classList.remove('aktif');
        
        /* 
          - Rumus Mundur Dots: Dikurangi 1 artinya mundur ke kiri. 
            Ditambah 'semuaDots.length' lalu di-persen (%) biar kalau posisinya sudah di dots paling pertama (angka 0) 
            lalu diklik mundur, angkanya tidak minus melainkan otomatis lompat ke titik paling akhir.
        */
        indeksAktif = (indeksAktif - 1 + semuaDots.length) % semuaDots.length;
        
        /* Memasang warna hijau aktif ke dots baru */
        semuaDots[indeksAktif].classList.add('aktif');
    }
}

/* 
  - window.geserKanan = geserKanan / window.geserKiri = geserKiri: 
    Mendaftarkan fungsi buatan kita ini ke dalam jendela global (window) browser. 
    Tujuannya agar atribut 'onclick="geserKanan()"' yang Anda pasang di tombol panah HTML bisa mendeteksi dan menjalankan kode ini.
*/
window.geserKanan = geserKanan;
window.geserKiri = geserKiri;

/* 
  - setInterval(geserKanan, 3500): 
    Fungsi otomatis bawaan JavaScript untuk menyuruh browser menjalankan fungsi 'geserKanan' 
    secara otomatis setiap 3500 milidetik (alias 3,5 detik) tanpa perlu diklik oleh pengguna.
*/
setInterval(geserKanan, 3500);

/* =========================================================================
   PENUTUP UTAMA: Pasangan penutup dari baris nomor 1 DOMContentLoaded di paling atas file
   ========================================================================= */
});

/* =========================================================================
   3. LOGIKA FUNGSI POPUP INTERAKTIF (BERDIRI SENDIRI DI LUAR DOM)
   ========================================================================= */

/* 
  - function bukaPopup(idPopup): Fungsi kustom untuk memunculkan jendela melayang informasi detail tempat wisata.
  - idPopup: Variabel penampung kunci ID yang dibawa dari tombol kartu HTML (misalnya 'popup-nipah').
*/
function bukaPopup(idPopup) {
    /* document.getElementById(idPopup): Mencari kotak modal popup di HTML yang memiliki ID sesuai kunci yang dibawa */
    const popup = document.getElementById(idPopup);
    
    /* Kondisi IF: Jika kotak modalnya ada nyata di HTML, jalankan perintah di bawah */
    if (popup) {
        /* 
          - popup.style.display = 'flex': Mengubah CSS dari yang tadinya tersembunyi (display: none) 
            menjadi menyala melayang di atas layar menggunakan sistem 'flex' biar posisinya otomatis terkunci pas di tengah screen.
        */
        popup.style.display = 'flex';
    }
}

/* 
  - function tutupPopup(idPopup): Fungsi kustom untuk menyembunyikan kembali jendela melayang informasi tempat wisata.
*/
function tutupPopup(idPopup) {
    /* document.getElementById(idPopup): Mencari kotak modal popup aktif yang sedang terbuka di layar */
    const popup = document.getElementById(idPopup);
    
    if (popup) {
        /* 
          - popup.style.display = 'none': Mengubah kembali setelan CSS menjadi 'none' alias gaib/hilang total 
            dari layar browser setelah pengguna mengklik tombol silang (X).
        */
        popup.style.display = 'none';
    }
}

/* 
  - Mendaftarkan fungsi buka-tutup popup ini ke jendela global (window) browser 
    biar bisa dipanggil dengan sukses oleh atribut 'onclick' pada kartu dan tombol silang (X) di HTML.
*/
window.bukaPopup = bukaPopup;
window.tutupPopup = tutupPopup;