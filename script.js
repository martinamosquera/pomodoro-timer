let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let timerId = null;
let isRunning = false;
let currentMode = 'work';

const display = document.getElementById('timer-display');
const startBtn = document.getElementById('btn-start');
const workBtn = document.getElementById('btn-work');
const breakBtn = document.getElementById('btn-break');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'Iniciar';
        isRunning = false;
    } else {
        startBtn.textContent = 'Pausar';
        isRunning = true;
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                alert(currentMode === 'work' ? '¡Hora de descansar!' : '¡A volver al trabajo!');
                switchMode(currentMode === 'work' ? 'break' : 'work');
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Iniciar';
    timeLeft = currentMode === 'work' ? workTime : breakTime;
    updateDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Iniciar';

    if (mode === 'work') {
        timeLeft = workTime;
        workBtn.classList.add('active');
        breakBtn.classList.remove('active');
    } else {
        timeLeft = breakTime;
        breakBtn.classList.add('active');
        workBtn.classList.remove('active');
    }
    updateDisplay();
}

function saveSettings() {
    const customWork = document.getElementById('input-work').value;
    const customBreak = document.getElementById('input-break').value;

    if (customWork > 0 && customBreak > 0) {
        workTime = customWork * 60;
        breakTime = customBreak * 60;
        resetTimer();
        alert('¡Tiempos guardados con éxito!');
    } else {
        alert('Por favor introduce números válidos mayores a 0.');
    }
}


updateDisplay();