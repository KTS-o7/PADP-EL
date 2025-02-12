// Get DOM elements
const arrayContainer = document.getElementById('array-container');
const arrayBorder = document.getElementById('array-border');
const pageContainer = document.getElementById('page-container');
const page = document.getElementById('page');

// Configuration
const numThreads = 4;
const numElements = 16;
const elementSize = 50;
const elementMargin = 5;
const processorSize = 80;
const animationDuration = 1000;

// Initialize array elements
function createArrayElements() {
    const elements = [];
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = i;
        arrayBorder.appendChild(element);
        elements.push(element);
    }
    return elements;
}

// Initialize processors
function createProcessors() {
    const processors = [];
    for (let i = 0; i < numThreads; i++) {
        const processor = document.createElement('div');
        processor.className = `processor processor-body thread-${i}`;
        processor.style.width = `${processorSize}px`;
        processor.style.height = `${processorSize}px`;
        processor.textContent = i;
        pageContainer.appendChild(processor);
        processors.push(processor);
    }
    return processors;
}

// Position elements in grid layout
function positionElements(elements) {
    const totalWidth = numElements * (elementSize + elementMargin * 2);
    arrayBorder.style.width = `${totalWidth}px`;
    elements.forEach((element, index) => {
        element.style.display = 'inline-block';
    });
}

// Initialize visualization
function initVisualization() {
    const elements = createArrayElements();
    const processors = createProcessors();
    positionElements(elements);
    
    // Position processors vertically
    processors.forEach((processor, index) => {
        processor.style.top = `${index * (processorSize + 20)}px`;
    });
}

// Start visualization when page loads
window.addEventListener('load', initVisualization);
