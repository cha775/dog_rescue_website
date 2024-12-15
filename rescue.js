document.getElementById('rescueForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Fetch form values
    const dogName = document.getElementById('dogName').value.trim();
    const breed = document.getElementById('breed').value.trim();
    const age = document.getElementById('age').value.trim();
    const rescuerName = document.getElementById('rescuerName').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const additionalInfo = document.getElementById('additionalInfo').value.trim();
  
    // Basic validation
    if (!dogName || !breed || !age || !rescuerName || !contact) {
      alert("Please fill in all the required fields!");
      return;
    }
  
    // Confirm submission
    alert(`Thank you, ${rescuerName}! Your rescue details for ${dogName} have been submitted.`);
    
    // Optionally clear the form
    this.reset();
  });
  const rescueForm = document.getElementById("rescueForm");

rescueForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  const age = document.getElementById("age").value;
  const description = document.getElementById("description").value;

  const response = await fetch("http://localhost:5000/api/dogs/rescue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, breed, age, description }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Dog details submitted for approval!");
    rescueForm.reset();
  } else {
    alert(result.error);
  }
});
// Function to handle the form submission
document.getElementById('rescue-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Create a FormData object to handle form data including file
    const formData = new FormData();
    formData.append('name', document.getElementById('dog-name').value);
    formData.append('breed', document.getElementById('dog-breed').value);
    formData.append('description', document.getElementById('dog-description').value);
    formData.append('image', document.getElementById('dog-image').files[0]);

    // Send a POST request to the backend API
    fetch('http://localhost:5000/rescue', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Dog rescued successfully!') {
        // If the dog is rescued successfully, show the thank you message
        document.getElementById('thank-you-message').style.display = 'block';
      } else {
        // If there is an error, show an alert
        alert('Error rescuing the dog: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error rescuing the dog.');
    });
  });
