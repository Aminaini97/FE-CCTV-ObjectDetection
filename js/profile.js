document.addEventListener("DOMContentLoaded", function() {
    
    // Set notifikasi awal saat halaman pertama kali dimuat (0 = tersembunyi)
    updateNotificationCount(0);

    // Simulasi mendapatkan data notifikasi baru dari server setelah 3 detik
    setTimeout(() => {
        updateNotificationCount(29);
    }, 3000);

    // --- LOGIKA FORM HANDLER UNTUK UBAH DATA PROFIL ---
    const btnBatal = document.getElementById('btnBatal');
    const profileForm = document.getElementById('profileForm');
    const btnPilihFoto = document.getElementById('btnPilihFoto');
    const inputFoto = document.getElementById('data_foto_pelaku');

    // Jika tombol Batal diklik
    if (btnBatal) {
        btnBatal.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }

    // Penanganan submit form menggunakan event listener form langsung untuk validasi HTML5
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah form melakukan refresh halaman bawaan HTML
            
            // Tempatkan logika penyimpanan AJAX/Fetch data profil kamu di sini
            console.log("Menyimpan perubahan profil pengguna ke database...");
            
            // Setelah berhasil, arahkan kembali ke halaman dashboard
            window.location.href = 'dashboard.html';
        });
    }

    // Trigger klik input file ketika kotak wadah foto profil diklik
    if (btnPilihFoto && inputFoto) {
        btnPilihFoto.addEventListener('click', function() {
            inputFoto.click();
        });
    }

    // Handle preview foto profil secara real-time saat berkas diunggah
    if (inputFoto) {
        inputFoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Validasi ukuran berkas maksimal 1MB
                if (file.size > 1024 * 1024) {
                    alert("Ukuran file terlalu besar! Maksimal batas ukuran file adalah 1MB.");
                    this.value = ""; // Reset value input file
                    return;
                }

                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewBox = document.getElementById('preview_pelaku');
                    if (previewBox) {
                        // Ganti ikon arang default dengan tag gambar berkas baru
                        previewBox.innerHTML = `<img src="${e.target.result}" alt="Preview Foto" class="rounded-3" style="width: 100%; height: 100%; max-height: 280px; object-fit: cover;">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});