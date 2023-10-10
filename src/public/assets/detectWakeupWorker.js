const CHECK_INTERVAL = 2000;

const detectWakeup = () => {
    let lastTime = Date.now();

    setInterval(() => {
        const currentTime = Date.now();

        if (currentTime > lastTime + CHECK_INTERVAL * 2) {
            postMessage('WAKEUP');
        }

        lastTime = currentTime;
    }, CHECK_INTERVAL);
};

detectWakeup();
