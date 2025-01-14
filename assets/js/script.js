// Add "loaded" class to the element with the "Hi" class
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".Hi").classList.add("loaded");
});

// Display text one word at a time in paragraphs within #content
document.addEventListener("DOMContentLoaded", function () {
  const paragraphs = document.querySelectorAll("#content p");
  let currentParagraph = 0;
  let currentWord = 0;
  let words;

  const intervalId = setInterval(() => {
    if (currentParagraph >= paragraphs.length) {
      clearInterval(intervalId);
      return;
    }

    if (!words) {
      words = paragraphs[currentParagraph].textContent.split(" ");
      paragraphs[currentParagraph].textContent = "";
    }

    if (currentWord < words.length) {
      paragraphs[currentParagraph].textContent += words[currentWord] + " ";
      currentWord++;
    } else {
      currentWord = 0;
      currentParagraph++;
      words = null;
    }
  }, 100);
});

// Theme toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.querySelector(".theme-toggle");
  const icon = themeToggle.querySelector("span");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      icon.textContent = "dark_mode";
      setTheme("theme-dark");
    } else {
      icon.textContent = "light_mode";
      setTheme("theme-light");
    }
  });

  // Function to set the theme
  function setTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem("theme", themeName);
  }

  // Immediately invoked function to apply the saved theme on page load
  (function () {
    const savedTheme = localStorage.getItem("theme") || "theme-light";
    setTheme(savedTheme);

    // Set the checkbox state if it exists
    const themeToggleCheckbox = document.querySelector(".theme-switch__checkbox");
    if (themeToggleCheckbox) {
      themeToggleCheckbox.checked = savedTheme === "theme-dark";
    }
  })();
});

// Scroll to top button functionality
document.addEventListener("DOMContentLoaded", function () {
  const mybutton = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  };

  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  });
});
