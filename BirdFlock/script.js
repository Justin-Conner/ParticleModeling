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
        const distance = Math.sqrt(dx ** 2.25 + dy ** 2.25);
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
/*
function drawBird(bird) {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}*/
/*alternate bird sizing  */ 
/*function drawBird(bird) {
  const size = 2; // size of the bird in pixels
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, 2, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}*/
/*This function calculates the color of the bird based on its angle using the HSL color model.

HSL stands for Hue, Saturation, and Lightness. Hue is a value between 0 and 360, which represents the color on the color wheel. Saturation is a value between 0% and 100%, which represents the intensity of the color. Lightness is a value between 0% and 100%, which represents how bright or dark the color is.

In this code, the hue is determined by the bird's angle, which is multiplied by 180 and divided by PI to convert it from radians to degrees. The saturation and lightness are set to 50%, which means that the color will be a medium intensity and brightness. The resulting HSL color value is then used to fill the bird's shape on the canvas.

So, as the bird changes its angle, the color of the bird will change as well, creating a subtle color shift effect.*/
let count = 1;
let increment = true;

setInterval(() => {
  console.log(count);

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
  /* continuous iteration 1-360 to change hsl balance using "count" variable*/

  const size = 2; // size of the bird in pixels
  const color = `hsl(${bird.angle * count / Math.PI}, 100%, 50%)`; // color of the bird based on its angle
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}


