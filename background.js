const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 100;
const maxSpeed = 1.5;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: `rgba(255, 255, 255, ${Math.random()})`,
            dx: (Math.random() - 0.5) * maxSpeed,
            dy: (Math.random() - 0.5) * maxSpeed,
        });
    }
}
createParticles();

function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
}

function updateParticles() {
    for (let particle of particles) {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
        drawParticle(particle);
    }

    updateParticles();
    requestAnimationFrame(render);
}
render();
