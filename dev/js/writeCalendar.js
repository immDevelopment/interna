/*
/!*CALENDARIO*!/


/!*Elementos HTML*!/
const months = document.getElementById('months');

/!*Obtener fechas*!/
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
const currentDate = new Date();
const currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

/!*duración prueba*!/
let duration = 299;

/!*Saber total de días de cada mes*!/
const getTotalDays = (month) => {

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return  31;

    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
};

/!*Bisiesto true/false*!/
const isLeap = () =>{
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
};


const writeMonth = (name, days) =>{
    months.innerHTML += `
        <div class="month">
            <div class="month__name">${name}</div>
            <div class="month__days">${days.join(' ')}</div>
        </div>
    `;
};

const startDay=()=>{
    let init = currentDay - 17;
    let start = 0;
    if(init <= 0){
        start = (getTotalDays(monthNumber) - Math.abs(init));
        monthNumber -= 1;
    }else {
        start = init;
    }

    return start;
};

const getDaysToPrint = ()=> {
    let dayToPrint = startDay();
    let daysArray = [];

    for (let i = 0; i < 300; i++) {

        let endMonth = getTotalDays(monthNumber);

        if (dayToPrint <= endMonth) {
            daysArray.push(dayToPrint);
            dayToPrint++;

        } else {
            writeMonth(monthNames[monthNumber], daysArray);
            daysArray = [];
            monthNumber++;
            dayToPrint = 1;
        }
    }
}

getDaysToPrint();
*/
