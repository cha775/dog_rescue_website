document.getElementById('volunteerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    availability: document.getElementById('availability').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('http://localhost:5000/submit_form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Thank you for volunteering! Your information has been saved.');
      document.getElementById('volunteerForm').reset();
    } else {
      alert('Failed to submit the form. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('An error occurred. Please try again.');
  }
});
