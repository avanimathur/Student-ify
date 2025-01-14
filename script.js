document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector(".Hi").classList.add("loaded");
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navList = document.querySelector('.navbar-list');
  
  hamburger.addEventListener('click', function() {
      // Toggle active class on hamburger for animation
      this.classList.toggle('active');
      
      // Toggle active class on nav list for display
      navList.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
      const isClickInside = hamburger.contains(event.target) || navList.contains(event.target);
      
      if (!isClickInside && navList.classList.contains('active')) {
          hamburger.classList.remove('active');
          navList.classList.remove('active');
      }
  });

  // Close menu when window is resized above mobile breakpoint
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navList.classList.contains('active')) {
          hamburger.classList.remove('active');
          navList.classList.remove('active');
      }
  });
});

document.addEventListener("DOMContentLoaded", function() {
    var paragraphs = document.querySelectorAll('#content p');
    var currentParagraph = 0;
    var currentWord = 0;
    var words;
    var intervalId = setInterval(function() {
      if (currentParagraph >= paragraphs.length) {
        clearInterval(intervalId);
        return;
      }
      if (!words) {
        words = paragraphs[currentParagraph].textContent.split(' ');
        paragraphs[currentParagraph].textContent = '';
      }
      if (currentWord < words.length) {
        paragraphs[currentParagraph].textContent += words[currentWord] + ' ';
        currentWord++;
      } else {
        currentWord = 0;
        currentParagraph++;
        words = null;
      }
    }, 100);
  });
  