// Get references to the size, add-ons, and quantity elements
const sizeInputs = document.querySelectorAll('input[name="size"]');
const addOnsCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const flavorInputs = document.querySelectorAll('input[name="radioGroup"]');
const quantityInput = document.getElementById('quantity');
const milkTeaImage = document.querySelector('.milktea-image img');
const milkTeaName = document.querySelector('.milktea-name h3');

// Function to calculate total price and update milk tea image and name
function calculateTotalPrice() {
    let totalPrice = 0;
    let selectedFlavor = '';

    // Calculate size price
    sizeInputs.forEach(input => {
        if (input.checked) {
            if (input.id === "small") totalPrice += 30;
            if (input.id === "medium") totalPrice += 50;
            if (input.id === "large") totalPrice += 70;
        }
    });

    // Calculate add-ons price
    addOnsCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            if (checkbox.id === "crystalJelly") totalPrice += 10;
            if (checkbox.id === "cream") totalPrice += 15;
            if (checkbox.id === "pearl") totalPrice += 20;
        }
    });

    // Determine selected flavor
    flavorInputs.forEach(input => {
        if (input.checked) {
            selectedFlavor = input.id;
            // Update milktea name based on selected flavor
            milkTeaName.textContent = selectedFlavor.replace(/([A-Z])/g, ' $1').toUpperCase();
        }
    });

    // Change milk tea image based on selected flavor
    if (selectedFlavor) {
        milkTeaImage.src = `img/${selectedFlavor}-image.png`; // Assuming image filenames follow a specific pattern
    }

    // Calculate total price based on quantity
    totalPrice *= parseInt(quantityInput.value) || 1;

    // Display the total price in the cart box
    const totalPriceElement = document.getElementById('total_price');
    if (totalPriceElement) {
        totalPriceElement.textContent = '₱' + totalPrice;
    }
}

// Event listeners for size, add-ons, flavor, and quantity inputs
sizeInputs.forEach(input => {
    input.addEventListener('change', calculateTotalPrice);
});

addOnsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculateTotalPrice);
});

flavorInputs.forEach(input => {
    input.addEventListener('change', calculateTotalPrice);
});

quantityInput.addEventListener('input', calculateTotalPrice);

// Initial calculation when the page loads
calculateTotalPrice();
