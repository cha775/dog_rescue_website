document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('/api/dogs');
      if (!response.ok) {
        throw new Error('Failed to fetch dogs');
      }
      const dogs = await response.json();
      const dogList = document.getElementById('dog-list');
  
      dogs.forEach(dog => {
        const dogCard = document.createElement('div');
        dogCard.classList.add('dog-card'); // Add a class for styling
        dogCard.innerHTML = `
          <img src="${dog.image}" alt="${dog.name}" style="width:200px;">
          <h3>${dog.name}</h3>
          <p>Breed: ${dog.breed}</p>
          <p>Age: ${dog.age}</p>
          <button onclick="adopt('${dog.id}')">Adopt Me</button>
        `;
        dogList.appendChild(dogCard);
      });
    } catch (error) {
      console.error(error);
      const dogList = document.getElementById('dog-list');
      dogList.innerHTML = `<p>Sorry, we couldn't load the dog list. Please try again later.</p>`;
    }
  });
  
  function adopt(id) {
    alert(`Adoption request sent for Dog ID: ${id}`);
    // Here, you can send the adoption request to your server if necessary
  }
  
  const hamburger = document.querySelector('.hamburger');
  const navLink = document.querySelector('.nav__link');
  
  hamburger.addEventListener('click', () => {
    navLink.classList.toggle('hide');
  });
  let slideIndex = 0;

  function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 } 
    slides[slideIndex - 1].style.display = "block"; 
    setTimeout(showSlides, 5000); // Change image every 2 seconds
  }
  
  showSlides(); // Initialize slideshow

  function searchFunction() {
    // Get the search query from the input field
    let query = document.getElementById("searchInput").value.toLowerCase();
    // Get all the paragraphs in the page (or any other tags you want to search)
    let content = document.querySelectorAll("p, h2, .info-box");  // Or use other tags like div, span, etc.
    let results = [];

    // Loop through the content and check if the query is in the text
    content.forEach(function(item) {
        if (item.innerText.toLowerCase().includes(query)) {
            // If the search query is found, push the item to results
            results.push(item);
            item.style.backgroundColor = "yellow";  // Highlight found text (can style it further)
        } else {
            item.style.backgroundColor = "";  // Reset the highlight if no match
        }
    });

    // If no results are found, alert the user
    if (results.length === 0) {
        alert("No results found!");
    }
}
// Get modal elements
const modal = document.getElementById('adoptModal');
const closeBtn = document.querySelector('.close');
const adoptBtns = document.querySelectorAll('.adopt-btn');
const dogNameInput = document.getElementById('dogName');

// Open modal and set the dog's name
adoptBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.dog-card');
    const dogName = card.querySelector('h3').textContent;
    dogNameInput.value = dogName;
    modal.style.display = 'block';
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal if user clicks outside the content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Handle form submission
const adoptionForm = document.getElementById('adoptionForm');
adoptionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(adoptionForm);
  const data = Object.fromEntries(formData.entries());

  console.log(data); // Replace with your API call to save data to the backend
  
  alert('Adoption request submitted successfully!');
  modal.style.display = 'none';
  adoptionForm.reset();
});
function redirectToForm(dogName) {
  // Redirect to the adoption form page with the dog's name as a query parameter
  window.location.href = `adoption-form.html?dog=${encodeURIComponent(dogName)}`;
}

    