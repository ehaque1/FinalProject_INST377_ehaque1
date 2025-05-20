
document.getElementById('addCoffeeForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const errorElement = document.getElementById('errorMessage');
  errorElement.classList.add('hidden');
  
  try {
    const coffeeData = {
      name: document.getElementById('name').value,
      origin: document.getElementById('origin').value,
      brewing_method: document.getElementById('brewing_method').value,
      strength: parseInt(document.getElementById('strength').value),
      description: document.getElementById('description').value,
      image_url: document.getElementById('image_url').value || null
    };

    // Validation
    if (!coffeeData.name || !coffeeData.origin || !coffeeData.brewing_method || 
        !coffeeData.strength || !coffeeData.description) {
      throw new Error('All fields except image URL are required');
    }

    const response = await fetch('/add-coffee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coffeeData)
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Server error');
    }

    // Success
    alert('Coffee added successfully!');
    e.target.reset(); // Clear form
    loadCoffeeData(); // Refresh your coffee list
    
  } catch (error) {
    console.error('Add Coffee Error:', error);
    errorElement.textContent = error.message;
    errorElement.classList.remove('hidden');
  }
});