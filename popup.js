const resetButton = document.querySelector('.reset');

resetButton.addEventListener('click', () => {
    for (let key in localStorage) {
        localStorage.removeItem(key);
    }
});

function renderTime() {
    const timeDiv = document.querySelector('.time');

    let times = [];
    for (let key in localStorage) {
        const seconds = localStorage.getItem(key);
        const date = new Date(null);
        date.setSeconds(seconds);
        times = [...times, {
            key,
            time: date.toISOString().substr(11, 8),
            seconds: parseInt(seconds)
        }];
    }
    times.sort((t1, t2) => t1.seconds < t2.seconds ? 1 : -1);
    const tableHTML = times.map(time => `<tr><td class="key">${time.key}</td><td class="time">${time.time}<td></tr>`).join('');
    timeDiv.innerHTML = `<table>${tableHTML}</table>`;
}

renderTime();
setInterval(renderTime, 1000);
