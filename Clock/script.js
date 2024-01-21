const deg = 6;

function updateClock(clockElement,time_offset_h,time_offset_m) {
    const hr = clockElement.querySelector(".hr");
    const mn = clockElement.querySelector(".mn");
    const sc = clockElement.querySelector(".sc");

    setInterval(() => {
        let day = new Date();
        let hh = (day.getHours()+time_offset_h) * 30;
        let mm = (day.getMinutes()+time_offset_m) * deg;
        let ss = day.getSeconds() * deg;
        hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        mn.style.transform = `rotateZ(${mm}deg)`;
        sc.style.transform = `rotateZ(${ss}deg)`;
    });
}

function createClock(parentElement,country,time_offset_h,time_offset_m) {
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
        let t="MORNING"
        let day = new Date();
        let hh = (day.getHours()+time_offset_h);
        if(hh>19){
            t="NIGHT";  
        }else if (hh<19 && hh>16) {
            t="EVENING"; 
        } else if(hh<16 && hh>12){
            t="AFTERNOON";
        }else if (hh<12 &&hh>0) {
            t="MORNING";
        }
        clock.innerHTML +=`<div class="country"><p>`+t+`</p>Country : `+country+` </div>`;
    parentElement.appendChild(clock);
    

    // Create numbers for the clock
    const numbersContainer = clock.querySelector(".numbers");
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30;
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * 40 + 50; 
        const y = Math.sin(radians) * 40 + 50; 

        const number = document.createElement("div");
        number.className = "number";
        number.style.left = `${x}%`;
        number.style.top = `${y}%`;
        number.textContent = i;
        numbersContainer.appendChild(number);
    }

    updateClock(clock,time_offset_h,time_offset_m);
}
function createClocks() {
    const container = document.querySelector(".container");
    createClock(container,"India",-2,-+30);

}

window.onload = function () {
    createClocks();
};
