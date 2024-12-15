// Extract query parameters
const urlParams = new URLSearchParams(window.location.search);
const dogName = urlParams.get('dog');

// Populate the "Dog Name" field in the form
if (dogName) {
  document.getElementById('dogName').value = decodeURIComponent(dogName);
}

// Handle form submission
const adoptionForm = document.getElementById('adoptionForm');
adoptionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(adoptionForm);
  const data = Object.fromEntries(formData.entries());

  console.log(data); // Replace this with API call to save data to the backend
  
  alert('Adoption request submitted successfully!');
  adoptionForm.reset();
});
