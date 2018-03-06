'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

    var dataElement = document.getElementById('data');

    /*Funcion en viewport.js para saber si es movil/tablet o desktop*/
    var breakPoint = matchMedia('(min-width: 768px)');

    /*Si es movil...*/
    if (!changeSize(breakPoint)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

            for (var _iterator = json.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var data = _step.value;


                dataElement.innerHTML += '\n\n            <div class="data__item">\n              <div class="data__header">\n              <h2 class="data__title">' + data.CodigoProyecto + ' ' + data.Proyecto + '</h2><i class="data__icon"></i>\n              </div>\n              <div class="data__info">\n              \n            <!--Datos proyecto-->\n            \n              <div class="data__text">Fecha Aprobaci\xF3n ' + data.inicio + '</div>\n              <div class="data__text">Fecha Prevista Fin ' + data.fin + '</div>\n              <div class="data__text">Duraci\xF3n ' + data.duracion + ' d\xEDas</div>\n            </div>\n            ';
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

        items = [].concat(_toConsumableArray(document.querySelectorAll('.data__info')));
        icons = [].concat(_toConsumableArray(document.querySelectorAll('.data__icon')));

        /*Si es desktop*/
    } else {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {

            for (var _iterator2 = json.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _data = _step2.value;


                dataElement.innerHTML += '\n            \n            <div class="dataTable__data">\n            <div class="dataTable__text">' + _data.CodigoProyecto + '</div>\n            <div class="dataTable__text">' + _data.Proyecto + '</div>\n            <div class="dataTable__text">' + _data.inicio + '</div>\n            <div class="dataTable__text">' + _data.fin + '</div>\n            <div class="dataTable__graphic">\n                <div class="graphic" id="' + _data.CodigoProyecto + '"></div>\n            </div>\n          </div>\n            ';
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

        dataElement.innerHTML += '</div>';
    }

    var consultaMenu = function consultaMenu(id) {
        if (id = 1) {
            var sql = proyectoSQL;
        }
    };

    /*Array para objetos con los id y las duraciones*/
    var durationsObj = [];

    /*Array de duraciones para calcular las más larga*/
    var allDurations = [];

    /*Copio en el array los id y duraciones de cada objeto*/
    for (var i = 0; i < json.data.length; i++) {

        durationsObj[i] = {
            id: json.data[i].CodigoProyecto,
            duration: json.data[i].duracion
        };

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

    /*Por cada objeto calculo el ancho para dibujarlo*/
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = durationsObj[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _data2 = _step3.value;

            graphicWidth(_data2.id, _data2.duration);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
};

dataGet("proyecto");

/*################################CALENDARIO####################################*/
/*CALENDARIO*/

/*Elementos HTML*/

/*Obtener fechas*/
var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var currentDate = new Date();
var currentDay = currentDate.getDate();
var monthNumber = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

/*duración prueba*/
var duration = 299;

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

console.log(months);

var writeMonth = function writeMonth(name, days) {
    months.innerHTML += '\n            <div class="month">\n                <div class="month__name">' + name + '</div>\n                <div class="month__days">' + days.join(' ') + '</div>\n            </div>';
};

var startDay = function startDay() {
    var init = currentDay - 17;
    var start = 0;
    if (init <= 0) {
        start = getTotalDays(monthNumber) - Math.abs(init);
        monthNumber -= 1;
    } else {
        start = init;
    }

    return start;
};

var getDaysToPrint = function getDaysToPrint() {
    var dayToPrint = startDay();
    var daysArray = [];

    for (var i = 0; i < 300; i++) {

        var endMonth = getTotalDays(monthNumber);

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
};

getDaysToPrint();