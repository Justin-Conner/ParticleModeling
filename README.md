# ParticleModeling
based on the Vicsek Model I have created a visual depiction of particle behavior in browser.

The phenomenon when starlings (a type of bird) flock in large numbers is called a murmuration. It is a beautiful and mesmerizing sight where thousands of starlings fly in coordinated patterns, creating fluid, undulating shapes in the sky.

The reason behind this behavior is not fully understood, but it is believed to be a defense mechanism against predators, as well as a way for the birds to communicate with each other and find food. When a predator approaches, the starlings fly in unison, creating a confusing and intimidating pattern that makes it difficult for the predator to single out an individual bird.

The flocking behavior of starlings is also thought to be influenced by individual bird interactions, with each bird following a set of simple rules to maintain the cohesion of the group. This results in the mesmerizing patterns that we see during a murmuration.  In this example I am using The Vicsek Model.
The Vicsek model is another popular model of flocking that was developed by Tamás Vicsek and colleagues in 1995. It is similar to the Boids model, but involves a simpler set of rules. In this model, each bird tries to align its velocity with the average velocity of its neighbors within a fixed radius. The mathematical expression for this rule is:
v_i(t+1) = |v| * exp(iΘ)

where |v| is the magnitude of the average velocity of the neighboring birds, and Θ is the angle between bird i's current velocity and the average velocity of its neighbors.

Feel free to edit some of the function values to see a change in the particle behavior.  Altering the "distance" value in the "// Calculate the average direction of nearby birds" function is one example of a beavior change in the particles.  At the present value it allows change in vector to be more visible by difference in color for each particle vector. 
