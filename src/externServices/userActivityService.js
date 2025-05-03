const http = require('http');

function saveUserActivity(activityData) {
    const data = JSON.stringify(activityData);

    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/save-activity',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options);
    req.write(data);
    req.end();
}

module.exports = { saveUserActivity };