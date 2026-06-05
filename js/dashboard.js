// Menambahkan properti lokasi ke dalam objek daftarKamera
const daftarKamera = [
    { id: "CH-01", nama: "Gerbang Utama", lokasi: "Pintu Masuk Utama", status: "Aman", type: "success", time: "11:48" },
    { id: "CH-02", nama: "Area Parkir", lokasi: "Sisi Barat Parkiran", status: "Aman", type: "success", time: "11:48" },
    { id: "CH-03", nama: "Area Fabrikasi", lokasi: "Bengkel Produksi 1", status: "Tanpa Rompi", type: "danger", time: "11:48" },
    { id: "CH-04", nama: "Gudang Utama", lokasi: "Zona Logistik B", status: "Aman", type: "success", time: "11:48" },
    { id: "CH-05", nama: "Loading Dock", lokasi: "Area Bongkar Muat", status: "Tanpa Helm", type: "danger", time: "11:48" },
    { id: "CH-06", nama: "Kantor Area", lokasi: "Gedung Administrasi", status: "Aman", type: "success", time: "11:48" }
];

let currentPage = 0;
const itemsPerPage = 2;

// Fungsi untuk membuka modal
function openCameraModal(cameraId) {
    const kamera = daftarKamera.find(k => k.id === cameraId);
    if (!kamera) return;

    document.getElementById('modalTitle').innerText = kamera.nama + ' (' + kamera.id + ')';
    document.getElementById('modalLocation').innerText = 'Lokasi: ' + kamera.lokasi;

    const modal = new bootstrap.Modal(document.getElementById('cameraModal'));
    modal.show();
}

function renderKamera() {
    const grid = document.getElementById('cctv-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const start = currentPage * itemsPerPage;
    const paginatedItems = daftarKamera.slice(start, start + itemsPerPage);

    paginatedItems.forEach(k => {
        const col = document.createElement('div');
        col.className = 'col-md-6';
        
        col.innerHTML = `
            <div class="card shadow-sm border-0 h-100 cursor-pointer overflow-hidden" onclick="openCameraModal('${k.id}')">
                <div class="bg-black text-white ratio ratio-16x9 d-flex align-items-center justify-content-center position-relative" 
                    style="border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem;">
                    
                    <div class="position-absolute top-0 start-0 m-2">
                        <span class="text-white fw-bold" style="font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">${k.id}</span>
                    </div>
                    
                    </div>
                
                <div class="card-body p-2">
                    <h6 class="mb-1 fw-bold" style="font-size: 12px;">${k.nama}</h6>
                    <p class="text-muted mb-2" style="font-size: 12px;">Lokasi: ${k.lokasi}</p>
                    <div class="status-box-${k.id}">
                        <div class="alert alert-${k.type} p-1 mb-0 d-flex justify-content-between align-items-center" style="font-size: 12px;">
                            <span>${k.status === 'Aman' ? 'Area Aman - Tidak Ada Pelanggaran' : k.status}</span>
                            <span class="fw-medium">${k.time}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function changePage(dir) {
    const maxPage = Math.ceil(daftarKamera.length / itemsPerPage) - 1;
    currentPage = Math.max(0, Math.min(maxPage, currentPage + dir));
    renderKamera();
}

function updateLiveDetection() {
    daftarKamera.forEach((kamera) => {
        const isViolation = Math.random() > 0.85;
        const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
        kamera.status = isViolation ? "Pelanggaran APD" : "Aman";
        kamera.type = isViolation ? "danger" : "success";
        kamera.time = now;

        const statusElement = document.querySelector(`.status-box-${kamera.id}`);
        if (statusElement) {
            statusElement.innerHTML = `
                <div class="alert alert-${kamera.type} p-1 mb-0 d-flex justify-content-between align-items-center" style="font-size: 12px;">
                    <span>${kamera.status === 'Aman' ? 'Area Aman - Tidak Ada Pelanggaran' : kamera.status}</span>
                    <span class="fw-medium">${kamera.time}</span>
                </div>`;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderKamera();
    setInterval(updateLiveDetection, 5000);
});