document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (email && password) {
        alert(`Welcome back to Apex! Redirecting to League Hub...`);
        window.location.href = "leagueHub.html";
    } else {
        alert('Please enter both email and password.');
    }
});

function showSignupForm() {
    alert('Signup form is under construction!');
}
