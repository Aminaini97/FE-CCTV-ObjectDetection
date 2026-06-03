document.addEventListener("DOMContentLoaded", function() {
    console.log("Dashboard Monitoring K3 Siap.");
    
    // Fungsi untuk memperbarui status deteksi secara berkala
    function updateDetectionStatus() {
        const statusList = document.getElementById('statusList');
        const timeElement = document.getElementById('lastDetectionTime');
        
        // Simulasi perubahan status deteksi
        const rompiStatus = Math.random() > 0.1; // 90% chance terdeteksi
        const helmStatus = Math.random() > 0.5;  // 50% chance terdeteksi
        
        const now = new Date().toLocaleTimeString('id-ID');
        timeElement.innerText = `Update: ${now} WIB`;

        // Update tampilan UI
        statusList.innerHTML = `
            <div class="p-3 rounded border d-flex justify-content-between align-items-center">
                <span><i class="bi bi-shield-${rompiStatus ? 'check' : 'x'} text-${rompiStatus ? 'success' : 'danger'} me-2"></i> Rompi</span>
                <span class="badge bg-${rompiStatus ? 'success' : 'danger'}">${rompiStatus ? 'TERDETEKSI' : 'TIDAK TERDETEKSI'}</span>
            </div>
            <div class="p-3 rounded border d-flex justify-content-between align-items-center">
                <span><i class="bi bi-shield-${helmStatus ? 'check' : 'x'} text-${helmStatus ? 'success' : 'danger'} me-2"></i> Helm</span>
                <span class="badge bg-${helmStatus ? 'success' : 'danger'}">${helmStatus ? 'TERDETEKSI' : 'TIDAK TERDETEKSI'}</span>
            </div>
        `;
    }

    // Interval pembaruan setiap 3 detik
    setInterval(updateDetectionStatus, 3000);
});