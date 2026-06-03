// Database Area Lokal
let dataArea = [
    { id: 1, nama: "Lantai 1", sub: ["Ruang Meeting", "Ruang Lobby"] },
    { id: 2, nama: "Lantai 2", sub: ["Ruang Server"] }
];

// Database Log Riwayat
let dataLogRiwayat = [
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-001", waktu: "11:24:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_01.jpg" },
    { id: "LOG-002", waktu: "10:15:00", tanggal: "03 Juni 2026", namaKamera: "Kamera Gerbang Depan", lokasi: "Ruang Lobby", status: "Tidak Memakai Rompi", fotoBukti: "img/bukti_pelanggaran_02.png" },
    { id: "LOG-003", waktu: "14:20:00", tanggal: "02 Juni 2026", namaKamera: "Kamera Server Dalam", lokasi: "Ruang Server", status: "Tidak Memakai Helm", fotoBukti: "img/bukti_pelanggaran_03.jpg" },
    { id: "LOG-004", waktu: "09:02:00", tanggal: "01 Juni 2026", namaKamera: "Kamera Gerbang Depan", lokasi: "Ruang Lobby", status: "Tidak Memakai Rompi & Helm", fotoBukti: "img/bukti_pelanggaran_04.png" }
];

document.addEventListener("DOMContentLoaded", function() {
    renderLokasiFilterOptions();
    renderTanggalFilterOptions();
    renderLogTable();

    const filterNama = document.getElementById('col_filter_nama');
    const filterLokasi = document.getElementById('col_filter_lokasi');
    const filterStatus = document.getElementById('col_filter_status');

    if (filterNama) filterNama.addEventListener('input', onFilterChange);
    if (filterLokasi) filterLokasi.addEventListener('change', onFilterChange);
    if (filterStatus) filterStatus.addEventListener('change', onFilterChange);

    function onFilterChange() {
        renderLogTable();
        updateFilterIconVisualState();
    }

    const exportPDF = document.getElementById('exportPDF');
    const exportExcel = document.getElementById('exportExcel');
    if (exportPDF) exportPDF.addEventListener('click', e => { e.preventDefault(); alert("Mengekspor data ke PDF..."); });
    if (exportExcel) exportExcel.addEventListener('click', e => { e.preventDefault(); alert("Mengekspor data ke Excel..."); });
});

// Helper: Konversi Tanggal "03 Juni 2026" ke format input "2026-06-03"
function convertDateToFormat(dateString) {
    const months = { "Januari": "01", "Februari": "02", "Maret": "03", "April": "04", "Mei": "05", "Juni": "06", "Juli": "07", "Agustus": "08", "September": "09", "Oktober": "10", "November": "11", "Desember": "12" };
    const parts = dateString.split(' ');
    if (parts.length < 3) return "";
    return `${parts[2]}-${months[parts[1]] || "01"}-${parts[0].padStart(2, '0')}`;
}

// Fungsi tombol terapkan filter tanggal
window.applyFilterTanggal = function() {
    renderLogTable();
    updateFilterIconVisualState();
    const dropdownInstance = bootstrap.Dropdown.getInstance(document.getElementById('trigger_tanggal'));
    if (dropdownInstance) dropdownInstance.hide();
}

function updateFilterIconVisualState() {
    const checkAndHighlight = (inputId, iconId) => {
        const el = document.getElementById(inputId);
        const icon = document.getElementById(iconId);
        if (el && icon) {
            icon.classList.toggle('active', el.value !== "");
        }
    };
    checkAndHighlight('col_filter_tanggal', 'trigger_tanggal');
    checkAndHighlight('col_filter_nama', 'trigger_nama');
    checkAndHighlight('col_filter_lokasi', 'trigger_lokasi');
    checkAndHighlight('col_filter_status', 'trigger_status');
}

function renderTanggalFilterOptions() {
    const filterTanggal = document.getElementById('col_filter_tanggal');
    if (!filterTanggal) return;
    // Karena kita menggunakan input type="date", kita tidak perlu mengisi <option> secara manual
    // Input date sudah memiliki antarmuka kalender bawaan browser
}

function renderLokasiFilterOptions() {
    const filterLokasi = document.getElementById('col_filter_lokasi');
    if (!filterLokasi) return;
    filterLokasi.innerHTML = '<option value="">Semua</option>';
    dataArea.forEach(area => {
        const optUtama = document.createElement('option');
        optUtama.value = area.nama;
        optUtama.innerHTML = area.nama;
        optUtama.style.fontWeight = "bold";
        filterLokasi.appendChild(optUtama);
        area.sub.forEach(sub => {
            const optSub = document.createElement('option');
            optSub.value = sub;
            optSub.innerHTML = `&nbsp;&nbsp;${sub}`;
            filterLokasi.appendChild(optSub);
        });
    });
}

function renderLogTable() {
    const tableBody = document.getElementById('log-table-body');
    if (!tableBody) return;

    const valTanggal = document.getElementById('col_filter_tanggal') ? document.getElementById('col_filter_tanggal').value : "";
    const valNama = document.getElementById('col_filter_nama') ? document.getElementById('col_filter_nama').value.toLowerCase().trim() : "";
    const valLokasi = document.getElementById('col_filter_lokasi') ? document.getElementById('col_filter_lokasi').value : "";
    const valStatus = document.getElementById('col_filter_status') ? document.getElementById('col_filter_status').value : "";

    tableBody.innerHTML = '';

    let filteredLogs = dataLogRiwayat.filter(log => {
        const matchesTanggal = (valTanggal === "" || convertDateToFormat(log.tanggal) === valTanggal);
        const matchesNama = valNama === "" || log.namaKamera.toLowerCase().includes(valNama);

        let matchesLokasi = true;
        if (valLokasi) {
            const parentArea = dataArea.find(a => a.nama === valLokasi);
            matchesLokasi = (log.lokasi === valLokasi || (parentArea && parentArea.sub.includes(log.lokasi)));
        }

        const matchesStatus = valStatus === "" || log.status === valStatus;

        return matchesTanggal && matchesNama && matchesLokasi && matchesStatus;
    });

    if (filteredLogs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-muted py-4 fs-7" style="background-color: var(--bg-card-nav); text-align: center !important;">Tidak ada log riwayat pelanggaran K3 yang cocok dengan filter</td></tr>`;
        return;
    }

    filteredLogs.forEach(log => {
        const itemRow = document.createElement('tr');
        itemRow.style.backgroundColor = "var(--bg-card-nav)";
        itemRow.style.borderBottom = "1px solid var(--border-color)";
        
        itemRow.innerHTML = `
            <td style="padding: 12px 8px; color: var(--text-dark); text-align: center;">${log.tanggal}</td>
            <td style="padding: 12px 8px; color: var(--text-dark); text-align: center;">${log.waktu}</td>
            <td style="padding: 12px 8px; color: var(--text-dark); text-align: center;" class="text-truncate">${log.namaKamera}</td>
            <td style="padding: 12px 8px; color: var(--text-dark); text-align: center;" class="text-truncate">${log.lokasi}</td>
            <td style="padding: 12px 8px; text-align: center;">
                <span style="color: #dc3545; font-weight: 400;">${log.status}</span>
            </td>
            <td style="padding: 6px 8px; text-align: center;">
                <img src="${log.fotoBukti}" alt="Bukti K3" class="rounded" 
                     style="width: 70px; height: 40px; object-fit: cover; cursor: pointer; border: 1px solid var(--border-color);" 
                     onclick="previewFotoBukti('${log.fotoBukti}')"
                     onerror="this.onerror=null; this.src='img/no-image.png';">
            </td>
        `;
        tableBody.appendChild(itemRow);
    });
}

function previewFotoBukti(imgSrc) {
    const modalImg = document.getElementById('imgFullPreview');
    if (modalImg) {
        modalImg.src = imgSrc;
        const modalInstance = new bootstrap.Modal(document.getElementById('modalPreviewFoto'));
        modalInstance.show();
    }
}