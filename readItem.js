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

    data.forEach(item => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${item.productName}</td>
        <td>€${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.sellerName}</td>
        <td>${item.sellerPhone}</td>
        <td>${item.sellerEmail}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (err) {
    message.textContent = "Error loading items.";
  }
});
