async function logout() {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    window.location.replace('/');
  }
  else {
    alert(response.statusText);
  }
}

document.getElementById('logout-btn').addEventListener('click', logout);