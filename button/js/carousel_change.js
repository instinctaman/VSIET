const posts = [
  {
    // title: "Campus Sustainability Initiatives",
    // excerpt:
    //   "How our campus is working towards a greener future with innovative sustainability programs",
    imageSrc: "slider/web_slide01.jpg",
    // author: "Environmental Committee",
    // date: "June 12, 2023",
    // readTime: "5 min",
    url: "#"
  },
  {
    // title: "The Impact of VR on Learning",
    // excerpt:
    //   "New study reveals significant improvements in student engagement with VR technology",
    imageSrc: "slider/web_slide02.jpg",
    // author: "Tech Research Team",
    // date: "June 10, 2023",
    // readTime: "7 min",
    url: "#"
  },
  {
    // title: "Alumni Spotlight: AI in Healthcare",
    // excerpt:
    //   "Meet the graduate who's revolutionizing patient care with AI-powered diagnostics",
    imageSrc: "slider/web_slide03.jpg",
    // author: "Alumni Association",
    // date: "June 08, 2023",
    // readTime: "9 min",
    url: "#"
  },
  {
    // title: "Student Mental Health Resources",
    // excerpt:
    //   "Comprehensive guide to mental health services available to all students",
    imageSrc: "slider/web_slide04.jpg",
    // author: "Wellness Center",
    // date: "July 12, 2023",
    // readTime: "5 min",
    url: "#"
  }
];

let currentIndex = 0;
let direction = 1;
const carousel3 = document.getElementById("carousel3");

function createSlide(post, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (index === currentIndex) slide.classList.add("active");
  slide.style.backgroundImage = `url(${post.imageSrc})`;

  slide.innerHTML = `
      <div class="slide-content">
      </div>
    `;

  return slide;
}

function renderSlides() {
  carousel3.innerHTML = "";
  posts.forEach((post, i) => {
    const slide = createSlide(post, i);
    carousel3.appendChild(slide);
  });

  const controls = document.createElement("div");
  controls.className = "controls";

  const dots = document.createElement("div");
  dots.className = "dots";
  posts.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      direction = i > currentIndex ? 1 : -1;
      currentIndex = i;
      updateSlides();
    });
    dots.appendChild(dot);
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow-btn";
  prevBtn.textContent = "<";
  prevBtn.onclick = () => {
    direction = -1;
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateSlides();
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow-btn";
  nextBtn.textContent = ">";
  nextBtn.onclick = () => {
    direction = 1;
    currentIndex = (currentIndex + 1) % posts.length;
    updateSlides();
  };

  arrows.appendChild(prevBtn);
  arrows.appendChild(nextBtn);
  controls.appendChild(dots);
  controls.appendChild(arrows);
  carousel3.appendChild(controls);
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "exit-left", "exit-right");
    if (i === currentIndex) {
      slide.classList.add("active");
    } else if (direction === 1) {
      slide.classList.add("exit-left");
    } else {
      slide.classList.add("exit-right");
    }
  });

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

setInterval(() => {
  direction = 1;
  currentIndex = (currentIndex + 1) % posts.length;
  updateSlides();
}, 6000);

renderSlides();