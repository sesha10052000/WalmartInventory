let items = [];

async function fetchItems() {
  const res = await fetch("http://localhost:3000/items");
  items = await res.json();
  displayItems(items);
  updateReport(items);
}

function displayItems(data) {
  const tbody = document.getElementById('updateBody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.productName}</td>
      <td><input type="number" value="${item.price}" min="1" id="price-${item._id}"></td>
      <td><input type="number" value="${item.quantity}" min="0" id="qty-${item._id}"></td>
      <td><input type="text" value="${item.sellerPhone}" id="phone-${item._id}"></td>
      <td><button onclick="updateItem('${item._id}')">Update</button></td>
    `;

    tbody.appendChild(row);
  });
}

async function updateItem(id) {
  const price = parseFloat(document.getElementById(`price-${id}`).value);
  const quantity = parseInt(document.getElementById(`qty-${id}`).value);
  const sellerPhone = document.getElementById(`phone-${id}`).value.trim();

  if (price <= 0 || quantity < 0 || !/^[0-9]{10}$/.test(sellerPhone)) {
    alert("Invalid input. Price must be > 0. Phone must be 10 digits.");
    return;
  }

  const res = await fetch(`http://localhost:3000/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price, quantity, sellerPhone })
  });

  const data = await res.json();
  alert(data.message);
  fetchItems(); // reload
}

function updateReport(data) {
  document.getElementById('totalCount').textContent = data.length;
  const avg = data.reduce((acc, item) => acc + item.price, 0) / data.length;
  document.getElementById('avgPrice').textContent = avg.toFixed(2);
}

// Sorting
document.getElementById('sortSelect').addEventListener('change', e => {
  const key = e.target.value;
  if (key) {
    const sorted = [...items].sort((a, b) => a[key] - b[key]);
    displayItems(sorted);
  }
});

// Search
document.getElementById('searchBox').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = items.filter(i => i.productName.toLowerCase().includes(query));
  displayItems(filtered);
  updateReport(filtered);
});

fetchItems();
