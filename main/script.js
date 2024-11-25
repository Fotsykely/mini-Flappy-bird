const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');




let bird = { x: 50, y: 150, radius: 15, gravity: 0, lift: -30, velocity: 0 };
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function addPipe() {
    const gap = 320;
    const height =120; 
    pipes.push({
        x: canvas.width,
        y: height,
        width: 50,
        gap
    });
}

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF0';
    ctx.fill();
    ctx.stroke();
}


function drawPipes() {
    pipes.forEach(pipe => {
        // Haut
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        // Bas
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - pipe.y - pipe.gap);
    });
}


function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
        gameOver = true;
    }
}


function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 3;

    
        if (
            bird.x + bird.radius > pipe.x &&
            bird.x - bird.radius < pipe.x + pipe.width &&
            (bird.y - bird.radius < pipe.y || bird.y + bird.radius > pipe.y + pipe.gap)
        ) {
            gameOver = true;
        }


        if (pipe.x + pipe.width === bird.x) {
            score++;
        }
    });

    pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFF';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 100, 300);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBird();
    drawPipes();
    drawScore();

    updateBird();
    updatePipes();


    if (frame % 100 === 0) {
        addPipe();
    }

    frame++;
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
});


addPipe();
gameLoop();
