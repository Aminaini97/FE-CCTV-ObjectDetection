document.addEventListener("DOMContentLoaded", function() {
    
    // Core Selector untuk Manajemen Pengaturan
    const switchTema = document.getElementById('switchTema');
    const themeStatusText = document.getElementById('theme-status-text');
    const btnSimpanSandi = document.getElementById('btnSimpanSandi');
    const btnKeluarSistem = document.getElementById('btnKeluarSistem');

    /* ==========================================================================
       FITUR 1: LOGIKA SWITCH UBAH MODE TAMPILAN (LIGHT / DARK MODE)
       ========================================================================== */
    // Sinkronisasi status awal tombol switch berdasarkan preferensi tersimpan di browser
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        if (switchTema) switchTema.checked = true;
        if (themeStatusText) themeStatusText.innerText = "Mode Gelap Aktif";
    } else {
        if (switchTema) switchTema.checked = false;
        if (themeStatusText) themeStatusText.innerText = "Mode Terang Aktif";
    }

    if (switchTema) {
        switchTema.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                if (themeStatusText) themeStatusText.innerText = "Mode Gelap Aktif";
                localStorage.setItem('theme', 'dark'); // Set global state ke browser memori
            } else {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                if (themeStatusText) themeStatusText.innerText = "Mode Terang Aktif";
                localStorage.setItem('theme', 'light'); // Set global state ke browser memori
            }
        });
    }

    /* ==========================================================================
       FITUR 2: LOGIKA UBAH KATA SANDI (FORM VERIFIKASI MODAL)
       ========================================================================== */
    if (btnSimpanSandi) {
        btnSimpanSandi.addEventListener('click', function() {
            const form = document.getElementById('formUbahSandi');
            const sandiLama = document.getElementById('sandiLama').value;
            const sandiBaru = document.getElementById('sandiBaru').value;
            const konfirmasi = document.getElementById('konfirmasiSandiBaru').value;

            if (!sandiLama || !sandiBaru || !konfirmasi) {
                form.reportValidity();
                return;
            }

            if (sandiBaru !== konfirmasi) {
                alert("Konfirmasi kata sandi baru tidak cocok. Silakan ulangi.");
                return;
            }

            alert("Kata sandi berhasil diperbarui!");
            bootstrap.Modal.getInstance(document.getElementById('modalUbahSandi')).hide();
            form.reset();
        });
    }

    /* ==========================================================================
       FITUR 3: KELUAR SISTEM (LOGOUT SESSION)
       ========================================================================== */
    if (btnKeluarSistem) {
        btnKeluarSistem.addEventListener('click', function() {
            if (confirm("Apakah Anda yakin ingin keluar dari sistem K3 Monitoring Dashboard?")) {
                console.log("Menghancurkan token sesi pengguna...");
                window.location.href = "masuk.html"; // Arahkan ke gerbang masuk sistem utama
            }
        });
    }
});