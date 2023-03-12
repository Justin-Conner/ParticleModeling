
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const numBirds = 2000;
const birds = [];

// Create initial birds
for (let i = 0; i < numBirds; i++) {
  const bird = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1000 - 500, // Add a third dimension to each bird's movement
    angle: Math.random() * Math.PI * 2,
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
        const dz = otherBird.z - bird.z; // Add the third dimension to the distance calculation
        const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2); // Add the third dimension to the distance calculation
        if (distance < 2) {
          avgAngle += otherBird.angle;
          numNeighbors++;
        }
      }
    }
    avgAngle /= numNeighbors;

    // Update the bird's angle based on the average direction
    bird.angle = avgAngle;

    // Move the bird in the new direction
    bird.x += Math.cos(bird.angle);
    bird.y += Math.sin(bird.angle);
    bird.z += Math.sin(bird.angle); // Add the third dimension to the bird's movement

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

    // Draw the bird on the canvas
    drawBird(bird);
  }
}
let count = 1;
let increment = true;

setInterval(() => {
 /* console.log(count);*/

  if (count === 360) {
    increment = false;
  } else if (count === 1) {
    increment = true;
  }

  if (increment) {
    count++;
  } else {
    count--;
  }
}, 100);

function drawBird(bird) {
  const size = 2; // size of the bird in pixels
  const zScale = 0.1; // Scale factor for the third dimension of movement
  const color = `hsl(${bird.angle * count / Math.PI}, 100%, 50%)`; // color of the bird based on its angle
  const z = (bird.z * zScale) + (canvas.height / 2); // Scale the third dimension of movement and center it on the canvas
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, size - (z * 0.002), 0, Math.PI * 2); // Adjust the size of the bird based on its depth
  ctx.fillStyle = color;
  ctx.fill();
}
function countIterations() {
  let count = 0;
  for (let i = 0; i < 1000000; i++) {
    count++;
  }
  console.log("Number of iterations: " + update);
}
