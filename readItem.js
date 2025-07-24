window.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.getElementById('tableBody');
  const message = document.getElementById('message');

  try {
    const response = await fetch("http://localhost:3000/items");
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      message.textContent = "No items found.";
      return;
    }
