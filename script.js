const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".nav-item");
let currentSection = 0;
let isZooming = false;
let zoomTimeout;
let isScrolling = false;

function scrollToSection(index) {
    if (isScrolling) return;
    isScrolling = true;
    sections[index].scrollIntoView({
        behavior: "smooth"
    });
    setTimeout(() => {
        isScrolling = false;
    }, 250);
    updateActiveNav(index);
}

function updateActiveNav(index) {
    navItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
}

function handleScroll(e) {
    if (e.ctrlKey || isZooming) {
        clearTimeout(zoomTimeout);
        isZooming = true;
        zoomTimeout = setTimeout(() => {
            isZooming = false;
        }, 200);
        return;
    }
    e.preventDefault();
    if (isScrolling) return;
    const threshold = 40;
    if (e.deltaY > threshold) {
        if (currentSection < sections.length - 1) {
            currentSection++;
            scrollToSection(currentSection);
        }
    } else if (e.deltaY < -threshold) {
        if (currentSection > 0) {
            currentSection--;
            scrollToSection(currentSection);
        }
    }
}

function handleTouchSwipe() {
    let startY;
    window.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
    });
    window.addEventListener("touchend", (e) => {
        if (isZooming || isScrolling) return;
        const endY = e.changedTouches[0].clientY;
        if (startY > endY + 50) {
            if (currentSection < sections.length - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
        } else if (startY < endY - 50) {
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
        }
    });
}

function handleKeyNavigation(e) {
    if (isScrolling || isZooming) return;
    switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
            break;
        case "ArrowDown":
        case "ArrowRight":
            if (currentSection < sections.length - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
            break;
        default:
            break;
    }
}

window.addEventListener("resize", () => {
    clearTimeout(zoomTimeout);
    isZooming = true;
    zoomTimeout = setTimeout(() => {
        isZooming = false;
        scrollToSection(currentSection);
    }, 200);
});

window.addEventListener("wheel", handleScroll, { passive: false });
window.addEventListener("keydown", handleKeyNavigation);

handleTouchSwipe();

navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentSection = index;
        scrollToSection(currentSection);
    });
});

updateActiveNav(currentSection);