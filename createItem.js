document.getElementById('itemForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const item = {
    productName: document.getElementById('productName').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    quantity: parseInt(document.getElementById('quantity').value),
    sellerName: document.getElementById('sellerName').value.trim(),
    sellerPhone: document.getElementById('sellerPhone').value.trim(),
    sellerEmail: document.getElementById('sellerEmail').value.trim()
  };

  const allFilled = Object.values(item).every(val => val !== "" && val !== null);
  if (!allFilled) {
    document.getElementById('message').innerText = "Please fill all fields.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });

    const result = await res.json();
    document.getElementById('message').innerText = result.message;
    document.getElementById('itemForm').reset();
  } catch (err) {
    document.getElementById('message').innerText = "Error saving item.";
    console.error(err);
  }
});
