// Replace with your Google Client ID
const clientId = 'YOUR_CLIENT_ID';

// Initialize Google Sign-In API
function initGoogleSignIn() {
  gapi.client.init({
    clientId: clientId,
    scope: 'profile email'
  });
}

// Render sign-in button
function renderSignInButton() {
  const signInButton = document.getElementById('signInButton');
  signInButton.addEventListener('click', () => {
    gapi.auth2.signin2.render(signInButton, {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });
  });
}

// Initialize and render sign-in button
initGoogleSignIn();
renderSignInButton();