let items = [];

async function fetchItems() {
  const res = await fetch("http://localhost:3000/items");
  items = await res.json();
  displayItems(items);
  document.getElementById('totalCount').textContent = items.length;
}

function displayItems(data) {
  const tbody = document.getElementById('deleteBody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.productName}</td>
      <td>€${item.price}</td>
      <td>${item.quantity}</td>
      <td>${item.sellerName}</td>
      <td><button onclick="deleteItem('${item._id}')">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
}

async function deleteItem(id) {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Delete failed:", data);
      return alert(data.message || "Error deleting item");
    }

    alert(data.message);
    fetchItems();
  } catch (err) {
    console.error("Error deleting:", err);
    alert("Error deleting item");
  }
}

// Search functionality
document.getElementById('searchBox').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = items.filter(i => i.productName.toLowerCase().includes(query));
  displayItems(filtered);
  document.getElementById('totalCount').textContent = filtered.length;
});

fetchItems();
