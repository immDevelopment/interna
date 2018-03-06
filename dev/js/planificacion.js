// objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

let maxDuration;

let months = document.getElementById('months');

const assignMaxDuration = (duration) =>{
    maxDuration=duration;
};

// Obtenemos datos
const dataGet = (get) => {

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            respuesta(xhr);
        }
    };

    xhr.open('GET', 'php/planificacion.php?tsql=' + get, true);
    xhr.send();
};

// Se imprimen los datos
const respuesta = (xhr) => {

    let json = JSON.parse(xhr.responseText);

    let dataElement = document.getElementById('data');

    /*Funcion en viewport.js para saber si es movil/tablet o desktop*/
    let breakPoint = matchMedia('(min-width: 768px)');

    /*Si es movil...*/
    if (!changeSize(breakPoint)) {

        for (let data of json.data) {

            dataElement.innerHTML += `

            <div class="data__item">
              <div class="data__header">
              <h2 class="data__title">${data.CodigoProyecto} ${data.Proyecto}</h2><i class="data__icon"></i>
              </div>
              <div class="data__info">
              
            <!--Datos proyecto-->
            
              <div class="data__text">Fecha Aprobación ${data.inicio}</div>
              <div class="data__text">Fecha Prevista Fin ${data.fin}</div>
              <div class="data__text">Duración ${data.duracion} días</div>
            </div>
            `;
        }

        items = [...document.querySelectorAll('.data__info')];
        icons = [...document.querySelectorAll('.data__icon')];

    /*Si es desktop*/
    } else {

        for (let data of json.data) {

            dataElement.innerHTML += `
            
            <div class="dataTable__data">
            <div class="dataTable__text">${data.CodigoProyecto}</div>
            <div class="dataTable__text">${data.Proyecto}</div>
            <div class="dataTable__text">${data.inicio}</div>
            <div class="dataTable__text">${data.fin}</div>
            <div class="dataTable__graphic">
                <div class="graphic" id="${data.CodigoProyecto}"></div>
            </div>
          </div>
            `
        }
        dataElement.innerHTML += '</div>';


    }

    const consultaMenu = (id) => {
        if (id = 1) {
            let sql = proyectoSQL;
        }
    };

    /*Array para objetos con los id y las duraciones*/
    let durationsObj = [];

    /*Array de duraciones para calcular las más larga*/
    let allDurations=[];

    /*Copio en el array los id y duraciones de cada objeto*/
    for(let i=0;i<json.data.length;i++){

        durationsObj[i] = {
            id: json.data[i].CodigoProyecto,
            duration: json.data[i].duracion
        };

        /*Añado duraciones al array*/
        allDurations.push(json.data[i].duracion);
    }

    /*Calculo la máxima duración*/
    assignMaxDuration(Math.max(...allDurations));

    /*Función para calcular el ancho del gráfico*/
    const graphicWidth = (id, duration) =>{

        let graphic = document.getElementById(id);

        /*Calculo de la anchura*/
        let width = (duration * 100) / maxDuration;

        graphic.style.width = `${width}%`;

        /*Porcentaje en el gráfico si tiene 00 no salen*/
        graphic.textContent = `${(width.toFixed(2).endsWith('00')) ? width.toFixed(0):width.toFixed(2)}%`;
    };

    /*Por cada objeto calculo el ancho para dibujarlo*/
    for (let data of durationsObj){
        graphicWidth(data.id, data.duration);
    }
};

dataGet("proyecto");

/*################################CALENDARIO####################################*/
/*CALENDARIO*/


/*Elementos HTML*/


/*Obtener fechas*/
const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
const currentDate = new Date();
const currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

/*duración prueba*/
let duration = 299;

/*Saber total de días de cada mes*/
const getTotalDays = (month) => {

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return  31;

    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
};

/*Bisiesto true/false*/
const isLeap = () =>{
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
};

console.log(months);

const writeMonth = (name, days) =>{
       months.innerHTML+=`
            <div class="month">
                <div class="month__name">${name}</div>
                <div class="month__days">${days.join(' ')}</div>
            </div>`;

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

