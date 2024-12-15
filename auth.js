const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Login successful!");
    localStorage.setItem("token", result.token);
    window.location.href = "adopt.html";
  } else {
    alert(result.message);
  }
});

registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("emailRegister").value;
  const password = document.getElementById("passwordRegister").value;

  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Registration successful! Please login.");
    window.location.href = "signin.html";
  } else {
    alert(result.error);
  }
});
