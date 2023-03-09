const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const numBirds = 800;
const birds = [];

// Create initial birds
for (let i = 0; i < numBirds; i++) {
  const bird = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    angle: Math.random() * Math.PI * 2.5,
    speed: 1,
  };
  birds.push(bird);
}

// Update the canvas every interval
setInterval(update, 30);

function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update each bird's position and angle
  for (let i = 0; i < numBirds; i++) {
    const bird = birds[i];

    // Calculate the average direction of nearby birds
    let avgAngle = bird.angle;
    let numNeighbors = 1;
    for (let j = 0; j < numBirds; j++) {
      if (i !== j) {
        const otherBird = birds[j];
        const dx = otherBird.x - bird.x;
        const dy = otherBird.y - bird.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance < 2) {
          avgAngle += otherBird.angle;
          numNeighbors++;
        }
      }
    }
    avgAngle /= numNeighbors;

    // Calculate the new velocity vector
    const velocity = {
      x: Math.cos(avgAngle) * bird.speed,
      y: Math.sin(avgAngle) * bird.speed,
    };

    // Update the bird's position based on the velocity vector
    bird.x += velocity.x;
    bird.y += velocity.y;

    // Wrap the bird around the screen if it goes off-screen
    if (bird.x < 0) {
      bird.x += canvas.width;
    } else if (bird.x > canvas.width) {
      bird.x -= canvas.width;
    }
    if (bird.y < 0) {
      bird.y += canvas.height;
    } else if (bird.y > canvas.height) {
      bird.y -= canvas.height;
    }

    // Update the bird's angle based on the velocity vector
    bird.angle = Math.atan2(velocity.y, velocity.x);

    // Draw the bird on the canvas
    drawBird(bird);
  }
}

function drawBird(bird) {
  const size = 2; // size of the bird in pixels
  const color = `hsl(${bird.angle * 180 / Math.PI}, 100%, 50%)`; // color of the bird based on its angle
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}
