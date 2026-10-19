document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('admin-password-input');
    const saveButton = document.getElementById('save-password-btn');
    const statusText = document.getElementById('password-status');
    const testAuthBtn = document.getElementById('test-auth-btn');
    const responseDisplay = document.getElementById('api-response');

    const STORAGE_KEY = 'admin_password';
    // Use an environment variable or default to localhost for development
    // In production, this would be the Render.com URL
    const BACKEND_URL = 'https://delivery-ksth.onrender.com';

    // Initialize UI from localStorage
    const savedPassword = localStorage.getItem(STORAGE_KEY);
    if (savedPassword) {
        passwordInput.value = savedPassword;
        statusText.textContent = 'Password is saved in local storage.';
        statusText.classList.remove('text-gray-500');
        statusText.classList.add('text-green-600');
    }

    // Save Password
    saveButton.addEventListener('click', () => {
        const password = passwordInput.value.trim();
        if (password) {
            localStorage.setItem(STORAGE_KEY, password);
            statusText.textContent = 'Password saved successfully!';
            statusText.classList.remove('text-gray-500', 'text-red-600');
            statusText.classList.add('text-green-600');
        } else {
            localStorage.removeItem(STORAGE_KEY);
            statusText.textContent = 'Password cleared.';
            statusText.classList.remove('text-green-600');
            statusText.classList.add('text-gray-500');
        }
    });

    // Test Authentication
    testAuthBtn.addEventListener('click', async () => {
        const password = localStorage.getItem(STORAGE_KEY);

        responseDisplay.textContent = 'Testing...';
        responseDisplay.classList.remove('text-red-600', 'text-green-600');

        if (!password) {
            responseDisplay.textContent = 'Error: No password saved. Please save a password first.';
            responseDisplay.classList.add('text-red-600');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/cj/test-auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${password}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                responseDisplay.textContent = JSON.stringify(data, null, 2);
                responseDisplay.classList.add('text-green-600');
            } else {
                responseDisplay.textContent = `Error ${response.status}:\n${JSON.stringify(data, null, 2)}`;
                responseDisplay.classList.add('text-red-600');
            }
        } catch (error) {
            responseDisplay.textContent = `Network Error: ${error.message}\nMake sure the backend server is running on ${BACKEND_URL}`;
            responseDisplay.classList.add('text-red-600');
        }
    });
});
