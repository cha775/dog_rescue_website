// Login User
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[name="email"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.status === 200) {
        window.location.href = 'index.html'; // Redirect on successful login
      }
    } catch (error) {
      alert('Error: Could not log in. Please try again later.');
      console.error('Login error:', error);
    }
  });
}
