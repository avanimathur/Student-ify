const form = document.getElementById("contactForm");
const popup = document.getElementById("popupMessage");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    popup.classList.remove("hidden"); // Show the popup
});

function closePopup() {
    popup.classList.add("hidden"); // Hide the popup
    form.reset(); // Optional: Clear the form fields
}