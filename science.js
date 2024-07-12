document.addEventListener('DOMContentLoaded', function() {
    const formStarBtn = document.getElementById('form-star-btn');
    const resultDiv = document.getElementById('result');
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    let animationInterval;
    const particles = [];
    const BLACK_HOLE_MAX_RADIUS = 40;
    const EVENT_HORIZON_EXTRA_RADIUS = 10;

    function randomOutcome() {
        return Math.random() > 0.5;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawStar(radius) {
        clearCanvas();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    function drawBlackHole(radius, eventHorizonRadius) {
        clearCanvas();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        // Event horizon
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, eventHorizonRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }

    function animateStarToBlackHole() {
        clearInterval(animationInterval);
        let radius = 10;
        let eventHorizonRadius = radius + EVENT_HORIZON_EXTRA_RADIUS;

        function draw() {
            if (radius <= BLACK_HOLE_MAX_RADIUS) {
                radius += 2;
                drawStar(radius);
            } else {
                clearInterval(animationInterval);
                radius = BLACK_HOLE_MAX_RADIUS;
                eventHorizonRadius = radius + EVENT_HORIZON_EXTRA_RADIUS;
                resultDiv.innerHTML = '<p>A black hole was formed!</p><button id="collapse-btn">Collapse</button>';
                drawBlackHole(radius, eventHorizonRadius);
                document.getElementById('collapse-btn').addEventListener('click', () => animateBlackHoleCollapse(radius, eventHorizonRadius));
                return;
            }
        }

        animationInterval = setInterval(draw, 50);
    }

    function animateBlackHoleCollapse(startRadius, startEventHorizonRadius) {
        clearInterval(animationInterval);
        let radius = startRadius;
        let eventHorizonRadius = startEventHorizonRadius;

        function draw() {
            if (radius > 0) {
                radius -= 1;
                eventHorizonRadius -= 1;
                drawBlackHole(radius, eventHorizonRadius);
            } else {
                clearInterval(animationInterval);
                clearCanvas();
                resultDiv.innerHTML = '<p>The black hole has collapsed!</p>';
                createParticles();
                updateParticles();
                return;
            }
        }

        animationInterval = setInterval(draw, 50);
    }

    function animateStar() {
        clearInterval(animationInterval);
        let radius = 10;
        let expand = true;

        function draw() {
            if (expand) {
                radius += 2;
                if (radius > 60) expand = false;
            } else {
                radius -= 2;
                if (radius <= 10) {
                    clearInterval(animationInterval);
                    resultDiv.innerHTML = '<p>No black hole was formed. Try again.</p>';
                    return;
                }
            }
            drawStar(radius);
        }

        animationInterval = setInterval(draw, 50);
    }

    function createParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                radius: Math.random() * 3 + 1,
                color: 'white',
                speed: Math.random() * 2 + 1,
                direction: Math.random() * 2 * Math.PI
            });
        }
    }

    function updateParticles() {
        clearCanvas();
        particles.forEach((particle, index) => {
            particle.x += particle.speed * Math.cos(particle.direction);
            particle.y += particle.speed * Math.sin(particle.direction);
            particle.radius *= 0.97;

            if (particle.radius < 0.5) {
                particles.splice(index, 1);
            } else {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(updateParticles);
        }
    }

    function formStar() {
        clearCanvas();
        resultDiv.innerHTML = '';
        particles.length = 0;
        if (randomOutcome()) {
            animateStarToBlackHole();
        } else {
            animateStar();
        }
    }

    formStarBtn.addEventListener('click', formStar);
});
