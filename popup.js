function renderTime() {
    const timeDiv = document.querySelector('.time');
    const hosts = JSON.parse(localStorage.getItem('hosts'));
    let times = [];
    for (let key in hosts) {
        console.log(hosts[key]);
        const seconds = hosts[key];
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
