const checkboxMenu = document.getElementById('checkbox-menu');

checkboxMenu.addEventListener('change', () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.toggle('active');
});