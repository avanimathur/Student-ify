document.addEventListener("DOMContentLoaded", function() {
    // Get all the cards
    const cards = document.querySelectorAll(".card");

    // Add click event listener to each card
    cards.forEach(function(card, index) {
        card.addEventListener("click", function() {
            // Open the respective HTML file based on the card index
            window.location.href = `../courses/Name${index + 1}.html`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {

  


const courses = [
    { 
      title: "Computer Science", 
      description: "Explore the foundations of computer science.", 
      img: "./img/bg1.jpg", 
      link: "#" 
    },
    { 
      title: "Principles of Economics", 
      description: "Understand key economic concepts and principles.", 
      img: "./img/bg2.jpg", 
      link: "../Principle of Economics/principleofeconomics.html" 
    },
    { 
      title: "Creative Writing", 
      description: "Enhance your creative writing skills.", 
      img: "./img/bg3.jpg", 
      link: "#" 
    },
    { 
      title: "Introduction to Psychology", 
      description: "Dive into the study of human behavior and mind.", 
      img: "./img/bg4.jpg", 
      link: "../Introduction to psycology/introductionTopsycology.html" 
    },
    { 
      title: "Algebra and Calculus", 
      description: "Master algebra and calculus concepts.", 
      img: "./img/bg5.jpg", 
      link: "../Algebra and calculus/AlgebraandCalculus.html" 
    },
    { 
      title: "World History: From Ancient Civilizations to the Modern Era", 
      description: "Learn about the history of human civilizations.", 
      img: "./img/bg6.JPG", 
      link: "#" 
    },
    { 
      title: "Environmental Science and Sustainability", 
      description: "Study the science of environmental systems.", 
      img: "./img/bg7.jpg", 
      link: "../Environment Science and Sustainability/EnvironmentScience.html" 
    },
    { 
      title: "Introduction to Business Management", 
      description: "Discover the fundamentals of business management.", 
      img: "./img/bg8.jpg", 
      link: "#" 
    },
    { 
      title: "Digital Marketing Fundamentals", 
      description: "Learn the basics of digital marketing.", 
      img: "./img/bg9.jpg", 
      link: "#" 
    },
    { 
      title: "Human Anatomy and Physiology", 
      description: "Understand the structure and function of the human body.", 
      img: "./img/bg10.JPG", 
      link: "#" 
    },
    { 
      title: "Introduction to Data Science", 
      description: "Explore data science tools and techniques.", 
      img: "./img/bg11.png", 
      link: "#" 
    },
    { 
      title: "Public Speaking and Communication Skills", 
      description: "Develop effective speaking and communication skills.", 
      img: "./img/bg12.JPG", 
      link: "#" 
    }
  ];
  
  const cardContainer = document.querySelector('.card-container'); // Get the existing card-container

  
  courses.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
  
    const img = document.createElement('img');
    img.className = 'course-card-img-top';
    img.src = course.img;
    img.alt = `Image for ${course.title}`;
  
    const cardBody = document.createElement('div');
    cardBody.className = 'course-card-body';
  
    const title = document.createElement('h5');
    title.className = 'course-card-title';
    title.textContent = course.title;
  
    const description = document.createElement('p');
    description.className = 'course-card-text';
    description.textContent = course.description;
  
    const button = document.createElement('a');
    button.href = course.link;
    button.className = 'course-btn';
    button.textContent = 'Go to Course';
  
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(button);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
  });
  
  document.body.appendChild(container);
});
