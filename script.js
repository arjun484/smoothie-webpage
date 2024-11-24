// Smoothie class
class Smoothie {
    constructor(name, base, ingredients, size) {
        this.name = name;
        this.base = base;
        this.ingredients = ingredients;
        this.size = size;
    }

    // Method to calculate price
    calculatePrice() {
        const basePrices = {
            milk: 2.0,
            "almond-milk": 2.5,
            yogurt: 3.0,
            water: 1.0,
        };

        const ingredientPrice = 0.5; // Price per ingredient
        const sizeMultiplier = {
            Small: 1,
            Medium: 1.5,
            Large: 2,
        };

        const basePrice = basePrices[this.base];
        const ingredientsCost = this.ingredients.length * ingredientPrice;
        const sizeCost = sizeMultiplier[this.size];

        return (basePrice + ingredientsCost) * sizeCost;
    }

    // Method to get smoothie description
    getDescription() {
        const price = this.calculatePrice().toFixed(2);
        return `
            <p>Thank you, ${this.name}!</p>
            <p>Your ${this.size} smoothie with ${this.base} and the following ingredients:</p>
            <ul>${this.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>
            <p>Total Price: $${price}</p>
        `;
    }
}

// Get form elements
const form = document.getElementById('smoothie-form');
const orderButton = document.getElementById('order-button');
const output = document.getElementById('output');

// Smoothie images mapping
const smoothieImages = {
    milk: "images/milk.jpeg",
    "almond-milk": "images/almond-milk.jpeg",
    yogurt: "images/yogurt.jpeg",
    water: "images/water.jpeg",
};

// Function to add animation to the output
function addAnimation() {
    output.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    output.style.transform = "scale(1.1)";
    output.style.opacity = "0.9";

    setTimeout(() => {
        output.style.transform = "scale(1)";
        output.style.opacity = "1";
    }, 500);
}

// Event listener for the order button
orderButton.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const base = document.getElementById("base").value;
    const ingredients = Array.from(
        document.querySelectorAll('input[name="ingredients"]:checked')
    ).map((ingredient) => ingredient.value);
    const size = document.querySelector('input[name="size"]:checked').value;

    if (!name || !base || ingredients.length === 0 || !size) {
        output.innerHTML = "<p>Please complete all fields in the form!</p>";
        return;
    }

    // Create a smoothie object
    const smoothie = new Smoothie(name, base, ingredients, size);

    // Display the smoothie description
    output.innerHTML = smoothie.getDescription();

    // Add image dynamically
    const image = document.createElement("img");
    image.src = smoothieImages[base];
    image.alt = `${base} Smoothie`;
    image.style.width = "200px";
    image.style.borderRadius = "10px";
    output.appendChild(image);

    // Add animation
    addAnimation();
});
