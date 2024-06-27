let circularProgress = document.querySelector(".circular-progress");
const animateToggle = document.getElementById('animate-toggle');
const hideToggle = document.getElementById('hide-toggle');


let progressStartValue = 0;
let progressEndValue = 0;
let speed = 10;


const valueInput = document.getElementById('value-input');


// updateProgress redrawing progress bar
function updateProgress() {
    let inputValue = parseInt(valueInput.value);
    if (isNaN(inputValue) || inputValue < 0) {
        inputValue = 0;
    } else if (inputValue > 100) {
        inputValue = 100;
    }
    progressEndValue = inputValue;

    clearInterval(window.progressInterval); // Clear any existing interval
    progressStartValue = 0; // Reset the progress start value

    window.progressInterval = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;
            circularProgress.style.background = `conic-gradient(#1a5dff ${progressStartValue * 3.6}deg, #EEF3F6 0deg)`;
        } else if (progressEndValue === 0 || progressEndValue === '') {
            circularProgress.style.background = `conic-gradient(#1a5dff ${progressStartValue * 3.6}deg, #EEF3F6 0deg)`;
        } else {
            clearInterval(window.progressInterval);
        }
    }, speed);
}

valueInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        updateProgress();
    }
});

// для считывания value без нажатия на Enter
valueInput.addEventListener('blur', () => {
    if (valueInput.value === '') {
        valueInput.value = 0;
        updateProgress();
    }
    updateProgress();
});

function animation() {
    if (animateToggle.checked) {
        circularProgress.classList.add('rotate');
    } else {
        circularProgress.classList.remove('rotate');
    }
}


function hide() {
    if (hideToggle.checked) {
        circularProgress.style.opacity = '0%';
    } else {
        circularProgress.style.opacity = '100%';
    }
}

animateToggle.addEventListener('change', animation);
hideToggle.addEventListener('change', hide);
