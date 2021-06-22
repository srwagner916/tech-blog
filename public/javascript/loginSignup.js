
async function loginHandler(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-pw').value.trim();
    
    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
}

async function signupHandler(event) {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-pw').value.trim();
    
    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert(response.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', loginHandler);
document.getElementById('signup-form').addEventListener('submit', signupHandler);
