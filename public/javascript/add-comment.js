async function commentHandler(event) {
  event.preventDefault();

  const text = document.querySelector('textarea[name="text"]').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (text) {
      console.log(post_id)
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.add-comment').addEventListener('submit', commentHandler);