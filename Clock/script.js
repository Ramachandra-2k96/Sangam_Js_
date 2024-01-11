const deg = 6;

function updateClock(clockElement, timeZoneOffset) {
    const hr = clockElement.querySelector(".hr");
    const mn = clockElement.querySelector(".mn");
    const sc = clockElement.querySelector(".sc");

    setInterval(() => {
        let day = new Date();
        let hh = (day.getUTCHours() + timeZoneOffset) * 30;
        let mm = day.getUTCMinutes() * deg;
        let ss = day.getUTCSeconds() * deg;

        hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`;
    });
}

function createClock(timeZoneOffset, parentElement) {
    const clock = document.createElement("div");
    clock.className = "box";
    clock.innerHTML = `
        <div class="clock">
            <div class="hour">
                <div class="hr"></div>
            </div>
            <div class="min">
                <div class="mn"></div>
            </div>
            <div class="sec">
                <div class="sc"></div>
            </div>
        </div>
        <div class="numbers"></div>`;

    parentElement.appendChild(clock);

    // Create numbers for the clock
    const numbersContainer = clock.querySelector(".numbers");
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30;
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * 40 + 50; // Adjust the position of numbers
        const y = Math.sin(radians) * 40 + 50; // Adjust the position of numbers

        const number = document.createElement("div");
        number.className = "number";
        number.style.left = `${x}%`;
        number.style.top = `${y}%`;
        number.textContent = i;

        numbersContainer.appendChild(number);
    }

    updateClock(clock, timeZoneOffset);
}

function createClocks() {
    const container = document.querySelector(".container");
    createClock(5.5, container); // India (UTC+5:30)
    createClock(-5, container); 
    createClock(2, container); 
    createClock(2.5, container); 
}

window.onload = function () {
    createClocks();
};
