document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.home__subtitle');
    if (element) {
        typeEffect(element, ["Cyber Security Enthusiast"], 100, 1000);
    }
});

function typeEffect(element, words, speed = 100, delay = 1000) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Theme toggle
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Obtain the current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.querySelector('i').classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// Validate if the user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.querySelector('i').classList[selectedTheme === 'dark' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    const icon = themeButton.querySelector('i')
    icon.classList.add('rotate')
    
    // Switch between moon and sun icons
    setTimeout(() => {
        icon.classList.toggle(iconTheme)
        icon.classList.remove('rotate')
    }, 150)
    
    // Save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// Mobile Menu
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const menuOverlay = document.querySelector('.menu-overlay');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
}

// Hide menu
const hideMenu = () => {
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = ''; // Restore scrolling
};

if (navClose) {
    navClose.addEventListener('click', hideMenu);
}

// Hide menu when clicking overlay
menuOverlay?.addEventListener('click', hideMenu);

// Hide menu on link click
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu);
});

// Hide menu on resize if screen becomes larger than mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hideMenu();
    }
});

// Active link highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]')
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight
            const sectionTop = section.offsetTop - 50
            const sectionId = section.getAttribute('id')
            const navLink = document.querySelector(`.nav__link[href*=${sectionId}]`)

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active-link')
            } else {
                navLink?.classList.remove('active-link')
            }
        })
    })
}

highlightActiveSection()

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.background__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.background__tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab__content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
});

// projects filtering
document.querySelectorAll('.projects__filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.projects__filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        // Filter projects
        document.querySelectorAll('.projects__card').forEach(card => {
            if (filter === 'all' || card.dataset.category.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // Show scroll button earlier on mobile
    const scrollTrigger = window.innerWidth <= 768 ? 350 : 560;
    
    // Add debouncing for better performance
    const now = Date.now();
    if (now - lastScrollCheck < 100) return; // Check every 100ms
    lastScrollCheck = now;

    if (window.scrollY >= scrollTrigger) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

let lastScrollCheck = 0;
window.addEventListener('scroll', scrollUp);

