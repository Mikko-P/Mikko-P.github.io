const containers = document.querySelectorAll('.container');
const toolsPanel = document.getElementById("tools");
const screenCenterX = window.innerWidth / 2;
const screenCenterY = window.innerHeight / 2;
let isTouchscreen = false;

window.addEventListener("touchstart", (e) => {
    isTouchscreen = true;
});

window.addEventListener("wheel", (e) => {
    isTouchscreen = false;
});

toolsPanel.addEventListener('mousemove', (e) => {
    if (isTouchscreen)
        return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;

        const distanceX = mouseX - containerCenterX;
        const distanceY = mouseY - containerCenterY;
        const rotateX = (distanceY / screenCenterY) * 10;
        const rotateY = -(distanceX / screenCenterX) * 10;

        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

window.addEventListener('mouseleave', () => {
    containers.forEach(container => {
        container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});
