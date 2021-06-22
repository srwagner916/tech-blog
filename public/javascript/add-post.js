async function addPostHandler() {
  const title = document.querySelector('input[name="title"]').value.trim();
  const text = document.querySelector('textarea[name="text"]').value.trim();
  let url = document.querySelector('input[name="url"]').value.trim();

  if (url === '') {
    url = null;
  }

  const response = await fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify({
      title,
      text,
      url,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok) {
    document.location.reload();
  }
  else {
    alert(response.statusText);
  }
};

document.getElementById('add-post').addEventListener('submit', addPostHandler);