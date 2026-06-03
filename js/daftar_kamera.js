// Database Area Lokal
let dataArea = [
    { id: 1, nama: "Lantai 1", sub: ["Ruang Meeting", "Ruang Lobby"] },
    { id: 2, nama: "Lantai 2", sub: ["Ruang Server"] }
];

// Database Perangkat Kamera CCTV
let dataKamera = [
    { id: "CAM-01", nama: "Kamera Proyek Utama", lokasi: "Ruang Meeting", status: "Online", tipe: "Kamera Indoor", idKamera: "12345ABC" },
    { id: "CAM-02", nama: "Kamera Gerbang Depan", lokasi: "Ruang Lobby", status: "Offline", tipe: "Kamera Outdoor", idKamera: "67890DEF" }
];

document.addEventListener("DOMContentLoaded", function() {
    const modalTambahKamera = document.getElementById('modalTambahKamera');
    const formTambahKamera = document.getElementById('formTambahKamera');
    const btnTambahkan = document.getElementById('btnTambahkan');
    const selectAreaKamera = document.getElementById('selectAreaKamera');
    const filterArea = document.getElementById('filter_area');
    const selectTipeArea = document.getElementById('selectTipeArea');
    const containerInduk = document.getElementById('containerInduk');
    const selectIndukArea = document.getElementById('selectIndukArea');
    const btnSimpanEdit = document.getElementById('btnSimpanEdit');
    const btnKonfirmasiHapus = document.getElementById('btnKonfirmasiHapus');

    renderFilterAreaDropdown();
    renderKameraList();

    function renderFilterAreaDropdown() {
        if (!filterArea) return;
        const currentValue = filterArea.value;

        filterArea.innerHTML = '<option value="" disabled selected hidden>Area</option>';
        
        dataArea.forEach(area => {
            const optUtama = document.createElement('option');
            optUtama.value = area.nama;
            optUtama.style.backgroundColor = "var(--bg-card-nav)";
            optUtama.style.color = "var(--text-dark)";
            optUtama.style.fontWeight = "bold";
            optUtama.innerHTML = area.nama;
            filterArea.appendChild(optUtama);

            area.sub.forEach(sub => {
                const optSub = document.createElement('option');
                optSub.value = sub;
                optSub.style.backgroundColor = "var(--bg-card-nav)";
                optSub.style.color = "var(--text-dark)";
                optSub.innerHTML = `&nbsp;&nbsp;&nbsp;${sub}`; 
                filterArea.appendChild(optSub);
            });
        });

        if (currentValue) filterArea.value = currentValue;
    }

    function renderAreaDropdownTarget(selectTarget) {
        if (!selectTarget) return;
        
        selectTarget.innerHTML = '<option value="" disabled selected hidden>Pilih Lokasi Area...</option>';
        
        dataArea.forEach(area => {
            const optUtama = document.createElement('option');
            optUtama.value = area.nama;
            optUtama.style.backgroundColor = "var(--bg-card-nav)";
            optUtama.style.color = "var(--text-dark)";
            optUtama.style.fontWeight = "bold";
            optUtama.innerHTML = area.nama;
            selectTarget.appendChild(optUtama);

            area.sub.forEach(sub => {
                const optSub = document.createElement('option');
                optSub.value = sub;
                optSub.style.backgroundColor = "var(--bg-card-nav)";
                optSub.style.color = "var(--text-dark)";
                optSub.innerHTML = `&nbsp;&nbsp;&nbsp;${sub}`; 
                selectTarget.appendChild(optSub);
            });
        });

        if (selectTarget.id === 'selectAreaKamera') {
            const divider = document.createElement('option');
            divider.disabled = true;
            divider.innerHTML = "────────────────────";
            selectTarget.appendChild(divider);

            const optTambahBaru = document.createElement('option');
            optTambahBaru.value = "__TAMBAH_LOKASI__";
            optTambahBaru.style.color = "#00a0e9";
            optTambahBaru.style.fontWeight = "600";
            optTambahBaru.innerHTML = "+ Tambah Lokasi Penempatan Baru";
            selectTarget.appendChild(optTambahBaru);
        }
    }

    if (modalTambahKamera) {
        modalTambahKamera.addEventListener('show.bs.modal', function () {
            renderAreaDropdownTarget(selectAreaKamera);
        });
    }

    if (selectAreaKamera) {
        selectAreaKamera.addEventListener('change', function() {
            if (this.value === "__TAMBAH_LOKASI__") {
                const modalKameraInstance = bootstrap.Modal.getInstance(modalTambahKamera);
                if (modalKameraInstance) modalKameraInstance.hide();

                document.getElementById('formTambahArea').reset();
                containerInduk.classList.add('d-none');

                const modalArea = new bootstrap.Modal(document.getElementById('modalTambahArea'));
                modalArea.show();
            }
        });
    }

    if (selectTipeArea) {
        selectTipeArea.addEventListener('change', function() {
            if (this.value === 'sub') {
                containerInduk.classList.remove('d-none');
                selectIndukArea.required = true;
                
                selectIndukArea.innerHTML = '<option value="" disabled selected hidden>Pilih Area Induk...</option>';
                dataArea.forEach(area => {
                    const opt = document.createElement('option');
                    opt.value = area.nama;
                    opt.innerHTML = area.nama;
                    selectIndukArea.appendChild(opt);
                });
            } else {
                containerInduk.classList.add('d-none');
                selectIndukArea.required = false;
            }
        });
    }

    document.getElementById('btnSimpanArea').addEventListener('click', function() {
        const tipeArea = selectTipeArea.value;
        const namaAreaBaru = document.getElementById('inputNamaArea').value.trim();
        const indukArea = selectIndukArea.value;

        if (!namaAreaBaru) {
            document.getElementById('inputNamaArea').reportValidity();
            return;
        }

        if (tipeArea === 'sub' && !indukArea) {
            selectIndukArea.reportValidity();
            return;
        }

        if (tipeArea === 'utama') {
            dataArea.push({ id: dataArea.length + 1, nama: namaAreaBaru, sub: [] });
        } else {
            const areaIndukObj = dataArea.find(a => a.nama === indukArea);
            if (areaIndukObj) areaIndukObj.sub.push(namaAreaBaru);
        }

        renderFilterAreaDropdown();

        bootstrap.Modal.getInstance(document.getElementById('modalTambahArea')).hide();
        const modalKameraInstance = new bootstrap.Modal(modalTambahKamera);
        modalKameraInstance.show();

        setTimeout(() => {
            renderAreaDropdownTarget(selectAreaKamera);
            selectAreaKamera.value = namaAreaBaru;
        }, 400);
    });

    document.getElementById('btnBatalArea').addEventListener('click', function() {
        bootstrap.Modal.getInstance(document.getElementById('modalTambahArea')).hide();
        new bootstrap.Modal(modalTambahKamera).show();
        setTimeout(() => { selectAreaKamera.value = ""; }, 400);
    });

    if (btnTambahkan && formTambahKamera) {
        btnTambahkan.addEventListener('click', function() {
            const namaCam = document.getElementById('inputNamaKamera').value;
            const tipeCam = document.getElementById('selectTipeKamera').value;
            const lokasiCam = selectAreaKamera.value;
            const idCamCCTV = document.getElementById('inputIDKamera').value;

            if (namaCam && tipeCam && lokasiCam && idCamCCTV && lokasiCam !== "__TAMBAH_LOKASI__") {
                const newCamera = {
                    id: "CAM-" + Date.now(), 
                    nama: namaCam,
                    lokasi: lokasiCam,
                    tipe: tipeCam,
                    status: "Online",
                    idKamera: idCamCCTV
                };
                    
                dataKamera.push(newCamera);
                renderKameraList();

                bootstrap.Modal.getInstance(modalTambahKamera).hide();
                formTambahKamera.reset();
            } else {
                formTambahKamera.reportValidity();
            }
        });
    }

    if (btnSimpanEdit) {
        btnSimpanEdit.addEventListener('click', function() {
            const uid = document.getElementById('editUidKamera').value;
            const nama = document.getElementById('editNamaKamera').value;
            const tipe = document.getElementById('editTipeKamera').value;
            const idKamera = document.getElementById('editIDKamera').value;
            const lokasi = document.getElementById('editAreaKamera').value;

            if (nama && tipe && idKamera && lokasi) {
                const camera = dataKamera.find(d => d.id === uid);
                if (camera) {
                    camera.nama = nama;
                    camera.tipe = tipe;
                    camera.idKamera = idKamera;
                    camera.lokasi = lokasi;
                    
                    renderKameraList();
                    bootstrap.Modal.getInstance(document.getElementById('modalEditKamera')).hide();
                }
            } else {
                document.getElementById('formEditKamera').reportValidity();
            }
        });
    }

    if (btnKonfirmasiHapus) {
        btnKonfirmasiHapus.addEventListener('click', function() {
            const uid = document.getElementById('deleteUidKamera').value;
            dataKamera = dataKamera.filter(d => d.id !== uid);
            renderKameraList();
            bootstrap.Modal.getInstance(document.getElementById('modalHapusKamera')).hide();
        });
    }

    if (filterArea) {
        filterArea.addEventListener('change', function() {
            toggleFilter(this, 'icon_area', 'cont_area');
            renderKameraList(); 
        });
    }

    const btnBatal = document.getElementById('btnBatal');
    if (btnBatal) {
        btnBatal.addEventListener('click', () => {
            bootstrap.Modal.getInstance(modalTambahKamera).hide();
            formTambahKamera.reset();
        });
    }

    window.renderAreaDropdownTarget = renderAreaDropdownTarget;
});

function renderGlobalControl() {
    const wrapper = document.getElementById('global-control-wrapper');
    if (!wrapper) return;

    const selectedArea = document.getElementById('filter_area') ? document.getElementById('filter_area').value : "";
    const filteredDevices = selectedArea ? dataKamera.filter(d => d.lokasi === selectedArea || getParentAreaName(d.lokasi) === selectedArea) : dataKamera;

    const total = filteredDevices.length;
    const isAllOn = total > 0 && filteredDevices.every(d => d.status === 'Online');
    const isAllOff = total > 0 && filteredDevices.every(d => d.status === 'Offline');

    wrapper.innerHTML = `
        <span class="text-secondary fw-bold" style="font-size: 11px;">SEMUA KAMERA (${total}):</span>
        <div class="btn-group btn-group-toggle" role="group">
            <button class="btn btn-toggle ${isAllOn ? 'active-on' : 'inactive'}" onclick="changeStatusGlobal('Online')">On</button>
            <button class="btn btn-toggle ${isAllOff ? 'active-off' : 'inactive'}" onclick="changeStatusGlobal('Offline')">Off</button>
        </div>
    `;
}

function getParentAreaName(subAreaName) {
    const area = dataArea.find(a => a.sub.includes(subAreaName));
    return area ? area.nama : null;
}

// PERBAIKAN: Mengganti warna inline statis dengan variabel CSS dinamis
function renderKameraList() {
    const container = document.getElementById('device-container');
    if (!container) return;

    const selectedArea = document.getElementById('filter_area') ? document.getElementById('filter_area').value : "";

    renderGlobalControl();
    container.innerHTML = '';
    
    const kategoriKamera = ["Kamera Indoor", "Kamera Outdoor"];

    kategoriKamera.forEach(kat => {
        let kameraDiKategori = dataKamera.filter(d => d.tipe === kat);
        
        if (selectedArea) {
            kameraDiKategori = kameraDiKategori.filter(d => d.lokasi === selectedArea || getParentAreaName(d.lokasi) === selectedArea);
        }

        const totalPerKat = kameraDiKategori.length;
        const isAllOn = totalPerKat > 0 && kameraDiKategori.every(d => d.status === 'Online');
        const isAllOff = totalPerKat > 0 && kameraDiKategori.every(d => d.status === 'Offline');

        if (selectedArea && totalPerKat === 0) return;

        const headerRow = document.createElement('div');
        // Kunci Perbaikan: Mengganti bg-light dengan border-bottom saja agar menyatu dengan background tema dinamis
        headerRow.className = "d-flex align-items-center p-3 border-bottom";
        headerRow.style.height = "42px";
        headerRow.style.backgroundColor = "var(--bg-light)"; 
        headerRow.innerHTML = `
            <div class="d-flex align-items-center" style="flex: 0 0 70%;">
                <span class="fw-bold" style="font-size: 12px; color: var(--text-dark);">${kat} (${totalPerKat})</span>
            </div>
            <div class="d-flex align-items-center justify-content-end" style="flex: 0 0 30%;">
                <div class="btn-group btn-group-toggle" role="group" style="margin-right: 30px;"> 
                    <button class="btn btn-toggle ${isAllOn ? 'active-on' : 'inactive'}" onclick="changeStatusAll('${kat}', 'Online')">On</button>
                    <button class="btn btn-toggle ${isAllOff ? 'active-off' : 'inactive'}" onclick="changeStatusAll('${kat}', 'Offline')">Off</button>
                </div>
            </div>
        `;
        container.appendChild(headerRow);

        kameraDiKategori.forEach(camera => {
            const isOn = camera.status === 'Online';
            const itemRow = document.createElement('div');
            // Kunci Perbaikan: Menghapus bg-white, menggantinya dengan warna background komponen dinamis
            itemRow.className = "d-flex align-items-center p-3 ps-5 border-bottom";
            itemRow.style.backgroundColor = "var(--bg-card-nav)";
            itemRow.style.height = "42px";
            itemRow.innerHTML = `
                <div class="d-flex align-items-center gap-3" style="flex: 0 0 40%;">
                    <i class="bi bi-camera-video-fill" style="font-size: 13px; color: var(--text-dark);"></i>
                    <span class="text-truncate" style="font-size: 12px; color: var(--text-dark);">${camera.nama} <small class="text-muted">(${camera.idKamera})</small></span>
                </div>
                <div class="text-secondary text-truncate" style="font-size: 12px; flex: 0 0 30%;">
                    <i class="bi bi-geo-alt-fill me-1"></i>${camera.lokasi}
                </div>
                <div class="d-flex align-items-center gap-2 justify-content-end" style="flex: 1;">
                    <div class="btn-group btn-group-toggle" role="group">
                        <button class="btn btn-toggle ${isOn ? 'active-on' : 'inactive'}" onclick="changeStatus('${camera.id}', 'Online')">On</button>
                        <button class="btn btn-toggle ${!isOn ? 'active-off' : 'inactive'}" onclick="changeStatus('${camera.id}', 'Offline')">Off</button>
                    </div>
                    
                    <div class="dropdown">
                        <i class="bi bi-three-dots-vertical text-secondary ms-0" style="cursor: pointer;" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm" style="font-size: 12px;">
                            <li><a class="dropdown-item" href="#" onclick="triggerEditKamera('${camera.id}')"><i class="bi bi-pencil-square me-2"></i> Edit Kamera</a></li>
                            <li><a class="dropdown-item text-danger" href="#" onclick="triggerDeleteKamera('${camera.id}')"><i class="bi bi-trash3 me-2"></i> Hapus Kamera</a></li>
                        </ul>
                    </div>
                </div>
            `;
            container.appendChild(itemRow);
        });
    });
}

// Fungsi pembantu pemicu aksi (triggerEditKamera, triggerDeleteKamera, changeStatus, dsb) tetap utuh
function triggerEditKamera(id) {
    const camera = dataKamera.find(d => d.id === id);
    if (!camera) return;

    document.getElementById('editUidKamera').value = camera.id;
    document.getElementById('editNamaKamera').value = camera.nama;
    document.getElementById('editTipeKamera').value = camera.tipe;
    document.getElementById('editIDKamera').value = camera.idKamera;

    const selectEditArea = document.getElementById('editAreaKamera');
    renderAreaDropdownTarget(selectEditArea);
    selectEditArea.value = camera.lokasi;

    const modal = new bootstrap.Modal(document.getElementById('modalEditKamera'));
    modal.show();
}

function triggerDeleteKamera(id) {
    const camera = dataKamera.find(d => d.id === id);
    if (!camera) return;

    document.getElementById('deleteUidKamera').value = camera.id;
    document.getElementById('textKonfirmasiHapus').innerHTML = `Data kamera <strong>"${camera.nama}"</strong> dengan ID <strong>${camera.idKamera}</strong> akan dihapus permanen.`;

    const modal = new bootstrap.Modal(document.getElementById('modalHapusKamera'));
    modal.show();
}

function changeStatus(id, newStatus) {
    const cam = dataKamera.find(d => d.id === id);
    if (cam && cam.status !== newStatus) {
        if (confirm(`Apakah Anda yakin ingin mengubah status operasional ${cam.nama}?`)) {
            cam.status = newStatus;
            renderKameraList();
        }
    }
}

function changeStatusAll(kategori, newStatus) {
    const selectedArea = document.getElementById('filter_area') ? document.getElementById('filter_area').value : "";
    if (confirm(`Ubah semua status stream kamera pada kategori ${kategori}?`)) {
        dataKamera.forEach(cam => {
            if (cam.tipe === kategori) {
                if (!selectedArea || cam.lokasi === selectedArea || getParentAreaName(cam.lokasi) === selectedArea) {
                    cam.status = newStatus;
                }
            }
        });
        renderKameraList();
    }
}

function changeStatusGlobal(newStatus) {
    if (dataKamera.length === 0) return;
    const selectedArea = document.getElementById('filter_area') ? document.getElementById('filter_area').value : "";
    if (confirm(`Ubah status operasional untuk seluruh kamera terhubung?`)) {
        dataKamera.forEach(cam => {
            if (!selectedArea || cam.lokasi === selectedArea || getParentAreaName(cam.lokasi) === selectedArea) {
                cam.status = newStatus;
            }
        });
        renderKameraList();
    }
}

function toggleFilter(selectElement, iconId, containerId) {
    const icon = document.getElementById(iconId);
    const container = document.getElementById(containerId);
    if (!icon || !container) return;
    
    if (selectElement.value !== "") {
        icon.className = "bi bi-x-lg small text-danger";
        
        container.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            selectElement.value = "";
            toggleFilter(selectElement, iconId, containerId);
            renderKameraList();
        };
    } else {
        icon.className = "bi bi-chevron-down small text-secondary";
        container.onclick = null;
    }
}