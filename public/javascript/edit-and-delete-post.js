const id = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1
];
async function editHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value.trim();
  const text = document.querySelector('textarea[name="text"]').value.trim();
  const url = document.querySelector('input[name="url"]').value.trim();

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      text,
      url
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  }
  else {
    alert(response.statusText);
  }
}

async function deleteHandler(event) {
  event.preventDefault;
  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard/');
  }
  else {
    alert(response.statusText);
  }
}

document.getElementById('edit-form').addEventListener('submit', editHandler);
document.getElementById('delete-btn').addEventListener('click', deleteHandler);