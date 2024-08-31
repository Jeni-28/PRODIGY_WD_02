let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTimer, 1);
        running = true;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-time';
        lapTime.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(lapTime);
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
