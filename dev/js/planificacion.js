/*################################CALENDARIO####################################*/

/*CALENDARIO*/
/*Variables para imprimir el nombre de los meses*/
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/*Contenedor donde escribir los nombres de los meses*/
const monthElement = document.getElementById('months');

/*Contenedor donde escribir los días*/
const daysElement = document.getElementById('days');

/*Contenedor donde escribir las celdas que forman el gráfico*/
const cellsElement = document.getElementById('cells');

/*Fecha de referencia para escribir el calendario*/
const currentDate = new Date();

/*Día actual*/
const currentDay = currentDate.getDate();

/*Mes actual*/
let currentMonth = currentDate.getMonth();

/*Año actual*/
const currentYear = currentDate.getFullYear();

/*Saber total de días de cada mes*/
const getTotalDays = (month) => {

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;

    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;

    } else {

        return isLeap() ? 29 : 28;
    }
};

/*Bisiesto true/false*/
const isLeap = () => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
};

const writeMonth = (month, padding) => {
    monthElement.innerHTML += `
        <div class="month" id="${month}">${month}</div>
    `;
    getWidthElement(month, padding);
}

/*Escribir los días. Pasamos un array con los días del mes*/
const writeDays = (days, month) => {
    let today = new Date();

    for (let day of days) {
        if (day === today.getDate() && month === today.getMonth()) {
            daysElement.innerHTML += `
                <span class="day today">${day}</span>
            `;
        } else {
            daysElement.innerHTML += `
                <span class="day">${day}</span>
            `;
        }
    }
};

/*Escribo las celdas para dibujar el gráfico*/
const writeCells = (id, duration) => {

    for (let i = 0; i < duration; i++) {
        cellsElement.innerHTML += `
            <span class="cell"></span>
        `;
    }
};

/*Saber en qué día comienza el gráfico*/
const startDay = () => {
    let init = currentDay - 17;
    let start = 0;
    if (init <= 0) {
        start = (getTotalDays(currentMonth) - Math.abs(init));
        currentMonth -= 1;
    } else {
        start = init;
    }

    return start;
};

/*Obtener los días que tiene que imprimir*/
const getDaysToPrint = () => {

    /*Día en el que comienza el gráfico*/
    let dayToPrint = startDay();
    /*Array para guardar los días*/
    let daysArray = [];

    /*Bucle que da tantas vueltas como máxima duración haya*/
    for (let i = 0; i < 300; i++) {
        /*Fin del mes*/
        let endMonth = getTotalDays(currentMonth);

        /*Si el día a imprimir aún no es el final añado el día al array*/
        if (dayToPrint <= endMonth) {
            daysArray.push(dayToPrint);
            dayToPrint++;

            /*Si es el último día del mes envío el array a imprimir, vacío el array, sumo un mes para imprimir el siguiente y reinicio el día a imprimir a 1*/
        } else {
            writeDays(daysArray, currentMonth);
            /*Escribo el nombre del mes en la cabecera del gráfico*/
            writeMonth(monthNames[currentMonth], daysArray.length);
            daysArray = [];
            currentMonth++;
            dayToPrint = 1;
        }
    }
};

const getWidthElement = (element, padding) => {

    let monthBox = document.getElementById(`${element}`);

    monthBox.style.paddingRight = (padding * 30) - monthBox.offsetWidth + 'px';
};

getDaysToPrint();

/*######################JSON###########################################*/

// objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

let maxDuration;

let months = document.getElementById('months');

const assignMaxDuration = (duration) => {
    maxDuration = duration;
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

    console.log(json);

    let projectElement = document.getElementById('projects');

    for (let data of json.data) {

        projectElement.innerHTML += `

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
}

    items = [...document.querySelectorAll('.data__info')];
    icons = [...document.querySelectorAll('.data__icon')];

    /*Si es desktop*/

    /*Array de duraciones para calcular las más larga*/
    let allDurations = [];

    /*Copio en el array los id y duraciones de cada objeto*/
    for (let i = 0; i < json.data.length; i++) {

        /*Añado duraciones al array*/
        allDurations.push(json.data[i].duracion);
    }

    /*Calculo la máxima duración*/
    assignMaxDuration(Math.max(...allDurations));

    /*Función para calcular el ancho del gráfico*/
    const graphicWidth = (id, duration) => {

        let graphic = document.getElementById(id);

        /*Calculo de la anchura*/
        let width = (duration * 100) / maxDuration;

        graphic.style.width = `${width}%`;

        /*Porcentaje en el gráfico si tiene 00 no salen*/
        graphic.textContent = `${(width.toFixed(2).endsWith('00')) ? width.toFixed(0) : width.toFixed(2)}%`;
    };

    console.log(maxDuration);

};

const consultaMenu = (id) => {
    if (id = 1) {
        let sql = proyectoSQL;
    }
};

dataGet("proyecto");

