// Main draw function to create sky background with gradient effect and texture
function drawSkyBackground() {
    let svg = document.getElementById("svg");

    // Clear previous content
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    // Define parameters for the sky gradient
    const rectHeight = 20;
    const rectWidth = 850;
    const numberOfRectangles = Math.ceil(600 / rectHeight);

    // Define softened color stops for a harmonious gradient, including blue-green colors in the lower part
    const colors = [
        { r: 160, g: 200, b: 220 },  // Light sky blue at the top
        { r: 180, g: 220, b: 170 },  // Light greenish color
        { r: 245, g: 225, b: 150 },  // Warm yellow
        { r: 250, g: 180, b: 120 },  // Soft orange
        { r: 240, g: 140, b: 130 },  // Soft red-pink
        { r: 100, g: 170, b: 180 },  // New blue-green color
        { r: 50, g: 120, b: 140 }    // Deep blue-green near the bottom
    ];

    // Calculate the number of rectangles per color section
    const sectionRectCount = Math.ceil(numberOfRectangles / colors.length);

    // Create rectangles with gradient effect
    for (let i = 0; i < numberOfRectangles; i++) {
        const sectionIndex = Math.floor(i / sectionRectCount);
        const nextSectionIndex = Math.min(sectionIndex + 1, colors.length - 1);
        const sectionRatio = (i % sectionRectCount) / sectionRectCount;

        const r = Math.round(colors[sectionIndex].r * (1 - sectionRatio) + colors[nextSectionIndex].r * sectionRatio);
        const g = Math.round(colors[sectionIndex].g * (1 - sectionRatio) + colors[nextSectionIndex].g * sectionRatio);
        const b = Math.round(colors[sectionIndex].b * (1 - sectionRatio) + colors[nextSectionIndex].b * sectionRatio);

        let rect = createRect(0, i * rectHeight, rectWidth, rectHeight, r, g, b);
        svg.appendChild(rect);

        addTexture(rect, r, g, b, rectWidth, rectHeight, 0.1);
    }
}

// Function to create a rectangle
function createRect(x, y, width, height, r, g, b) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("fill", `rgba(${r}, ${g}, ${b}, 1)`);
    return rect;
}

// Function to add a texture effect
function addTexture(baseRect, r, g, b, rectWidth, rectHeight, opacity) {
    let svg = document.getElementById("svg");

    for (let j = 0; j < 5; j++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        const colorVariation = (Math.random() - 0.5) * 20;
        const textureColor = `rgba(${Math.min(255, Math.max(0, r + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, g + colorVariation))}, 
                                    ${Math.min(255, Math.max(0, b + colorVariation))}, ${opacity})`;

        let textureRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        textureRect.setAttribute("x", parseFloat(baseRect.getAttribute("x")) + offsetX);
        textureRect.setAttribute("y", parseFloat(baseRect.getAttribute("y")) + offsetY);
        textureRect.setAttribute("width", rectWidth * 0.9);
        textureRect.setAttribute("height", rectHeight * 0.9);
        textureRect.setAttribute("fill", textureColor);

        svg.appendChild(textureRect);
    }
}

// Execute the main draw functions on page load
window.onload = function() {
    drawSkyBackground();
    drawBuilding();
    drawBuilding1(); // Ensure the second building set is drawn

    // Draw multiple waves
    const wavePositions = [200, 300, 400, 530, 510, 470, 350, 360, 750, 770, 600];
    const waveYPositions = [470, 488, 470, 470, 520, 550, 520, 550, 510, 550, 530];

    for (let i = 0; i < wavePositions.length; i++) {
        drawWaves(wavePositions[i], waveYPositions[i]);
    }
};


// Function to draw the building structure
function drawBuilding() {
    const svg = document.getElementById("svg");

    // Building outline
    const building = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building.setAttribute("points", "0,300 50,240 100,240 100,150 110,150 120,40 130,150 140,150 140,200 170,200 200,200 260,210 300,220 330,250 330,270 450,270 480,300");
    building.setAttribute("fill", "rgba(44, 27, 50, 0.8)");
    svg.appendChild(building);

    // Draw reflection for building
    drawReflection();

    function drawReflection() {
        const initialY = 300;
        const segmentHeight = 20;
        const reflectionSegments = 14;
        const reflectionRects = [];
    
        // Create the reflection element and store a reference to it
        for (let i = 0; i < reflectionSegments; i++) {
            const segment = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            const initialX = 100 + Math.sin(i * 1) * 5; // Initial x position
            segment.setAttribute("x", initialX);
            segment.setAttribute("y", initialY + i * segmentHeight);
            segment.setAttribute("width", "45");
            segment.setAttribute("height", segmentHeight);
            segment.setAttribute("fill", "rgba(44, 27, 50, 0.6)");
    
            svg.appendChild(segment);
            reflectionRects.push({ segment, initialX });
        }
    
        // Define the left and right sway animation parameters
        let waveOffset = 0;
    
        // Use setInterval to update the position of the reflection.
        setInterval(() => {
            waveOffset += 0.09; // Control the speed of shaking
            reflectionRects.forEach((rectObj, index) => {
                // Adjust the x position according to the fluctuation offset to create a left-right wiggle effect.
                const newX = rectObj.initialX + Math.sin(waveOffset + index * 0.8) * 3; 
                rectObj.segment.setAttribute("x", newX);
            });
        }, 100); // Updated every 100 milliseconds
    }
    
    
}

// Function to draw additional buildings
function drawBuilding1() {
    const svg = document.getElementById("svg");

    // building1
    const building1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building1.setAttribute("points", "650,300 720,160 750,300");
    building1.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building1);

    // building2
    const building2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building2.setAttribute("points", "720,300 790,110 830,300");
    building2.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building2);

    // building3
    const building3 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    building3.setAttribute("points", "480,300 630,270 750,300");
    building3.setAttribute("fill", "rgba(30, 30, 30, 0.15)");
    svg.appendChild(building3);
}

// Function to draw waves
function drawWaves(startX, waveY) {
    const svg = document.getElementById("svg");

    // Draw a wave
    const wave = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const cx = startX; // Set the horizontal center for a single wave
    const cy = waveY; // Set the vertical center for a single wave
    const rx = 40;
    const ry = 10;
    wave.setAttribute("d", `M${cx - rx},${cy} A${rx},${ry} 0 1,0 ${cx + rx},${cy}`);
    wave.setAttribute("fill", "rgba(0, 105, 197, 0.3)");
    svg.appendChild(wave);
}

// Execute the main draw functions on page load
window.onload = function() {
    drawSkyBackground();
    drawBuilding();
    drawBuilding1(); // Ensure the second building set is drawn

    // Draw multiple waves
    const wavePositions = [200, 300, 400, 530, 510, 470, 350, 360, 750, 770, 600];
    const waveYPositions = [470, 488, 470, 470, 520, 550, 520, 550, 510, 550, 530];

    for (let i = 0; i < wavePositions.length; i++) {
        drawWaves(wavePositions[i], waveYPositions[i]);
    }
};
// Add Eventlistener: animation starts when sky area is clicked.
document.getElementById("svg").addEventListener("click", createSunsetAnimation);

// Create a sun animation effect.
function createSunsetAnimation() {
    const svg = document.getElementById("svg");

    // Check if there is already a sun element to avoid duplicate animations.
    if (document.getElementById("sun")) return;

    // Create the Sun element (circle)
    const sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    sun.setAttribute("id", "sun");
    sun.setAttribute("cx", "0");
    sun.setAttribute("cy", "200");  
    sun.setAttribute("r", "40");
    sun.setAttribute("fill", `rgba(255, 140, 0, 1.0)`); 
    svg.appendChild(sun);

    // Initialize animation parameters
    let startX = 0; // Starting x position
    let startY = 300; // Starting y position in the upper part
    let endX = 800; // End x position
    let arcHeight = -200; // Control the arc height, not exceeding the top edge
    let opacity = 1.0; // Initial opacity
    let totalSteps = 300; // Number of steps for the animation
    let currentStep = 0;


   // Define the animation update function
function updateSunPosition() {
    // Calculate current progress (between 0 and 1)
    let progress = currentStep / totalSteps;

    // Calculate new position to create an arc trajectory, staying in the upper part
    let currentX = startX + progress * (endX - startX);
    let currentY = startY + Math.sin(progress * Math.PI) * arcHeight; // Form an arc from left to right

    // Update opacity to make the sun gradually disappear
    opacity = 1 - progress;

    // Set the sun's new position and opacity
    sun.setAttribute("cx", currentX);
    sun.setAttribute("cy", currentY);
    sun.setAttribute("fill", `rgba(255, 140, 0, ${opacity})`);

    currentStep++; // Increment step

    // Check if the animation is complete
    if (currentStep > totalSteps) {
        clearInterval(animationInterval); // Clear the timer
        svg.removeChild(sun); // Remove the sun from the SVG
    }
}


    // Start the animation with setInterval
    let animationInterval = setInterval(updateSunPosition, 20);
}