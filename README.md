# Individual animation content
# Personal animation interaction method:
Animation of clouds and reflections of buildings in the water: part of the animation will start automatically when the page is loaded.
Clicking on the sky: clicking on the sky triggers a sunset interaction, where the sun moves along a trajectory arc.
I chooice Time-Based:Employ timers and events for animation.
# Methods and details of personal animation realization:
Building reflection animation: add a slight swaying animation to the building reflection to imitate the reflection in the water moving with the wind.
Clouds in the sky: the clouds are animated to float horizontally to simulate the movement of clouds in the natural sky.
The sun: clicking on the sky triggers a sunset, and the sun moves in an arc to increase the interactivity and interest of the animation.

Animation is characterized by the fact that they work together to form a whole picture effect, as a set of coherent environmental effects presented in the picture, simulating the dynamic sense of wind and water in nature.

# Animation Inspiration: 
![Sky Inspiration](readmeImages/Sky_image.jpeg)  
The animation is inspired by landscape photographic images that show the dynamic feel of the water and the shapes of the clouds that I have added to my own work.

# Technical Notes:
Building reflection animation: A drawReflection() function is created and called in the drawBuilding() function, then setInterval() is used to periodically update the x position of the reflection element, and the function is used to generate a rocking effect for the building's reflection.
Sunset animation: use setInterval() to make the sun move along the arc calculated by Math.sin() and Math.PI, and gradually adjust the transparency to realize the fade out.
Cloud animation: setInterval() is also used to update the transform property of each cloud to control the horizontal movement of the clouds and reset their position when they go out of screen space so that they loop around the screen.
# For changes in the group code：
I personalized it by keeping the group code structure, adding setInterval() logic to implement periodic animation, making the page more interactive by adding addEventListener(), and triggering createSunsetAnimation() when the user taps on the screen to start the sun's moving and fading disappearance animation. In realizing the overall moving effect of the clouds, I used SVG's <g> (group) element so that multiple elements within the group can be moved at the same time, and through these elements I realized the innovation of individual animations and improved the interactivity and dynamism of the group code.


