document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const messageBox = document.getElementById('message');

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const iconElement = this.querySelector('i');
            iconElement.classList.toggle('fa-eye');
            iconElement.classList.toggle('fa-eye-slash');
        });
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showMessage("Kata sandi tidak cocok!", "text-danger");
            return;
        }

        const btnSubmit = document.getElementById('btnSubmit');
        const originalText = btnSubmit.innerText;
        btnSubmit.disabled = true;
        btnSubmit.innerText = "Memproses...";

        setTimeout(() => {
            console.log("Data Berhasil Terkirim");
            showMessage("Pendaftaran berhasil! Mengalihkan...", "text-success");

        }, 1500);
    });

    function showMessage(text, colorClass) {
        messageBox.innerText = text;
        messageBox.className = `col-12 text-center mt-3 small ${colorClass}`;
    }
});