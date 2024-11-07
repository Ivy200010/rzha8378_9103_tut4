// A function to create an RGB color string from 3 inputs (RGB format)
function makeSimpleRGB(inputRed, inputGreen, inputBlue) {
    return `rgb(${inputRed}, ${inputGreen}, ${inputBlue})`;
}

// A function to create an RGBA color string from 4 inputs (RGBA format)
function makeRGBA(inputRed, inputGreen, inputBlue, inputAlpha) {
    return `rgba(${inputRed}, ${inputGreen}, ${inputBlue}, ${inputAlpha})`;
}

// A function to create a random rounded value
function randomRoundedValue(maxValue) {
    return Math.round(Math.random() * maxValue);
}

// A function to create a rectangle with default values and specific color
function createRect(inputXPos, inputYPos, inputWidth, inputHeight, inputR, inputG, inputB, inputAlpha = 1) {
    let outputColour = makeRGBA(inputR, inputG, inputB, inputAlpha);

    let newRectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    newRectangle.setAttribute("x", inputXPos);
    newRectangle.setAttribute("y", inputYPos);
    newRectangle.setAttribute("width", inputWidth);
    newRectangle.setAttribute("height", inputHeight);
    newRectangle.setAttribute("fill", outputColour);

    return newRectangle;
}

// A function to add a texture effect to a given rectangle
function addTexture(baseRect, inputR, inputG, inputB, rectWidth, rectHeight, inputAlpha) {
    let svg = document.getElementById("svg");

    for (let i = 0; i < 5; i++) {
        const offsetX = Math.random() * 10 - 5;
        const offsetY = Math.random() * 10 - 5;
        const colorVariation = (Math.random() - 0.5) * 20;
        const textureColor = makeRGBA(
            Math.min(255, Math.max(0, inputR + colorVariation)),
            Math.min(255, Math.max(0, inputG + colorVariation)),
            Math.min(255, Math.max(0, inputB + colorVariation)),
            inputAlpha
        );

        let textureRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        textureRect.setAttribute("x", parseFloat(baseRect.getAttribute("x")) + offsetX);
        textureRect.setAttribute("y", parseFloat(baseRect.getAttribute("y")) + offsetY);
        textureRect.setAttribute("width", rectWidth * 0.9);
        textureRect.setAttribute("height", rectHeight * 0.9);
        textureRect.setAttribute("fill", textureColor);

        svg.appendChild(textureRect);
    }
}
