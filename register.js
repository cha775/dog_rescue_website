// Register User
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = e.target.querySelector('input[name="name"]').value;
    const email = e.target.querySelector('input[name="email"]').value;
    const password = e.target.querySelector('input[name="password"]').value;

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.status === 201) {
        window.location.href = 'signin.html'; // Redirect on successful registration
      }
    } catch (error) {
      alert('Error: Could not register. Please try again later.');
      console.error('Registration error:', error);
    }
  });
}
