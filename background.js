const INTERVAL = 1000;
let count = 0;
setInterval(() => {
    chrome.tabs.query({ highlighted: true }, tabs => {
        const hosts = tabs.map(tab => {
            const location = getLocation(tab.url);
            return location ? location.host : '';
        });
        const data = JSON.parse(localStorage.getItem('hosts')) || {};
        distinct(hosts).forEach(host => {
            if (!(host in data)) {
                data[host] = 0;
            }
            data[host]++;
        });
        localStorage.setItem('hosts', JSON.stringify(data));
    });
}, INTERVAL);

function getLocation(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

function distinct(arr) {
    return arr.reduce((acc, a) => {
        if (acc.includes(a)) return acc;
        if (a === '') return acc;
        return [...acc, a];
    }, []);
}
