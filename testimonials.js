async function fetchTestimonials() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('You must log in to view testimonials');
        window.location.href = 'signin.html';
        return;
    }

    const response = await fetch('http://localhost:5000/testimonials', {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
        const testimonials = await response.json();
        displayTestimonials(testimonials);
    } else {
        alert('Failed to fetch testimonials');
    }
}

function displayTestimonials(testimonials) {
    const testimonialsContainer = document.getElementById('testimonials-container');
    testimonials.forEach(({ name, message, date }) => {
        const card = document.createElement('div');
        card.innerHTML = `
            <h4>${name}</h4>
            <p>${message}</p>
            <small>${new Date(date).toLocaleDateString()}</small>
        `;
        testimonialsContainer.appendChild(card);
    });
}
