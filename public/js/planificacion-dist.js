'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*################################CALENDARIO####################################*/

/*CALENDARIO*/
/*Variables para imprimir el nombre de los meses*/
var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/*Contenedor donde escribir los nombres de los meses*/
var monthElement = document.getElementById('months');

/*Contenedor donde escribir los días*/
var daysElement = document.getElementById('days');

/*Contenedor donde escribir las celdas que forman el gráfico*/
var cellsElement = document.getElementById('cells');

/*Fecha de referencia para escribir el calendario*/
var currentDate = new Date();

/*Día actual*/
var currentDay = currentDate.getDate();

/*Mes actual*/
var currentMonth = currentDate.getMonth();

/*Año actual*/
var currentYear = currentDate.getFullYear();

/*Saber total de días de cada mes*/
var getTotalDays = function getTotalDays(month) {

    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    } else {

        return isLeap() ? 29 : 28;
    }
};

/*Bisiesto true/false*/
var isLeap = function isLeap() {
    return currentYear % 100 !== 0 && currentYear % 4 === 0 || currentYear % 400 === 0;
};

var writeMonth = function writeMonth(month, padding) {
    monthElement.innerHTML += '\n        <div class="month" id="' + month + '">' + month + '</div>\n    ';
    getWidthElement(month, padding);
};

/*Escribir los días. Pasamos un array con los días del mes*/
var writeDays = function writeDays(days, month) {
    var today = new Date();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = days[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var day = _step.value;

            if (day === today.getDate() && month === today.getMonth()) {
                daysElement.innerHTML += '\n                <span class="day today">' + day + '</span>\n            ';
            } else {
                daysElement.innerHTML += '\n                <span class="day">' + day + '</span>\n            ';
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

/*Escribo las celdas para dibujar el gráfico*/
var writeCells = function writeCells(id, duration) {

    for (var i = 0; i < duration; i++) {
        cellsElement.innerHTML += '\n            <span class="cell"></span>\n        ';
    }
};

/*Saber en qué día comienza el gráfico*/
var startDay = function startDay() {
    var init = currentDay - 17;
    var start = 0;
    if (init <= 0) {
        start = getTotalDays(currentMonth) - Math.abs(init);
        currentMonth -= 1;
    } else {
        start = init;
    }

    return start;
};

/*Obtener los días que tiene que imprimir*/
var getDaysToPrint = function getDaysToPrint() {

    /*Día en el que comienza el gráfico*/
    var dayToPrint = startDay();
    /*Array para guardar los días*/
    var daysArray = [];

    /*Bucle que da tantas vueltas como máxima duración haya*/
    for (var i = 0; i < 300; i++) {
        /*Fin del mes*/
        var endMonth = getTotalDays(currentMonth);

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

var getWidthElement = function getWidthElement(element, padding) {

    var monthBox = document.getElementById('' + element);

    monthBox.style.paddingRight = padding * 30 - monthBox.offsetWidth + 'px';
};

getDaysToPrint();

/*######################JSON###########################################*/

// objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

var maxDuration = void 0;

var months = document.getElementById('months');

var assignMaxDuration = function assignMaxDuration(duration) {
    maxDuration = duration;
};

// Obtenemos datos
var dataGet = function dataGet(get) {

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            respuesta(xhr);
        }
    };

    xhr.open('GET', 'php/planificacion.php?tsql=' + get, true);
    xhr.send();
};

// Se imprimen los datos
var respuesta = function respuesta(xhr) {

    var json = JSON.parse(xhr.responseText);

    console.log(json);

    var projectElement = document.getElementById('projects');

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = json.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var data = _step2.value;


            projectElement.innerHTML += '\n\n            <div class="data__item">\n              <div class="data__header">\n              <h2 class="data__title">' + data.CodigoProyecto + ' ' + data.Proyecto + '</h2><i class="data__icon"></i>\n              </div>\n              <div class="data__info">\n              \n            <!--Datos proyecto-->\n            \n              <div class="data__text">Fecha Aprobaci\xF3n ' + data.inicio + '</div>\n              <div class="data__text">Fecha Prevista Fin ' + data.fin + '</div>\n              <div class="data__text">Duraci\xF3n ' + data.duracion + ' d\xEDas</div>\n            </div>\n            ';
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    items = [].concat(_toConsumableArray(document.querySelectorAll('.data__info')));
    icons = [].concat(_toConsumableArray(document.querySelectorAll('.data__icon')));

    /*Si es desktop*/

    /*Array de duraciones para calcular las más larga*/
    var allDurations = [];

    /*Copio en el array los id y duraciones de cada objeto*/
    for (var i = 0; i < json.data.length; i++) {

        /*Añado duraciones al array*/
        allDurations.push(json.data[i].duracion);
    }

    /*Calculo la máxima duración*/
    assignMaxDuration(Math.max.apply(Math, allDurations));

    /*Función para calcular el ancho del gráfico*/
    var graphicWidth = function graphicWidth(id, duration) {

        var graphic = document.getElementById(id);

        /*Calculo de la anchura*/
        var width = duration * 100 / maxDuration;

        graphic.style.width = width + '%';

        /*Porcentaje en el gráfico si tiene 00 no salen*/
        graphic.textContent = (width.toFixed(2).endsWith('00') ? width.toFixed(0) : width.toFixed(2)) + '%';
    };

    console.log(maxDuration);
};

var consultaMenu = function consultaMenu(id) {
    if (id = 1) {
        var sql = proyectoSQL;
    }
};

dataGet("proyecto");