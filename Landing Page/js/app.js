// Define Global Variables
const sections = document.querySelectorAll("section");
const sectionsArray = Array.from(sections);
const navbar = document.getElementById("navbar__list");
const button = document.getElementById("go__back");

// Build the nav
for (let i = 0; i < sections.length; i++) {

    const li = document.createElement("li");

    li.innerHTML = `<a href="#${sections[i].id}"> ${sections[i].id}</a>`;
    navbar.appendChild(li);
};

let prevScrollPos = window.pageYOffset;

// Scroll back to top
function goBack() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const navigationItems = document.querySelectorAll("#navbar__list");
    for (let navItem of navigationItems) {
        navItem.classList.remove("active");
    }
};

// Check if section is in viewport
function isActive(section) {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Adjust the threshold value as needed to determine when a section is considered active
    const threshold = 0.5; // Adjust this value to customize the visibility threshold

    // Calculate the top and bottom thresholds for section visibility
    const topThreshold = windowHeight * threshold;
    const bottomThreshold = windowHeight * (1 - threshold);

    // Check if the section is at least partially visible within the viewport
    return (
        (rect.top >= 0 && rect.top <= bottomThreshold) ||
        (rect.bottom >= topThreshold && rect.bottom <= windowHeight)
    );
};
window.onscroll = function () {
    // Hide button
    // reference: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    };

    // Activate section and corresponding navigation item
    let activeSection = null;
    for (let section of sections) {
        if (isActive(section)) {
            section.classList.add("active-class");
            activeSection = section;
        } else {
            section.classList.remove("active-class");
        }
    }

    // Activate corresponding navigation item and remove class from non-active items
    const navigationItems = document.querySelectorAll("#navbar__list");
    for (let navItem of navigationItems) {
        if (navItem.dataset.section === activeSection?.id) {
            navItem.classList.add("active");
        } else {
            navItem.classList.remove("active");
        }
    }
};




// Activate nav items while scrolling using Intersection Observer API

const target = document.querySelectorAll('nav li');

// Add and remove active class from list items
function addActiveClass(index) {
    if (sections[index].classList.contains('active'))
        return;

    const navActive = document.querySelectorAll('nav .active');
    for (let i = navActive.length - 1; i >= 0; i--) {
        navActive[i].classList.remove('active');
    }
    target[index].classList.add('active');
};

// The degree of intersection between the sections and root is the intersection ratio.
let callback = (entries) => {
    if (entries[0].intersectionRatio <= 0) {
        return;
    }
    if (entries[0].intersectionRatio > 0.75) {
        addActiveClass(sectionsArray.indexOf(entries[0].target))
    }
};

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};

//Create new observer and invoke callback
let observer = new IntersectionObserver(callback, options);

// Build the array of threshold ratios
for (let i = 0; i < sections.length; i++) {
    observer.observe(sections[i]);
};
