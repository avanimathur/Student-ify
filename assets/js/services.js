document.addEventListener("DOMContentLoaded", function() {
    // Get all the cards
    const cards = document.querySelectorAll(".card");

    // Add click event listener to each card
    cards.forEach(function(card, index) {
        card.addEventListener("click", function() {
            // Open the respective HTML file based on the card index
            window.location.href = `/courses/Name${index + 1}.html`;
        });
    });
});
