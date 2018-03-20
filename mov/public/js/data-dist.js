'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

/*Contenedor de los acordeones*/
var dataAccordion = document.getElementById('data-accordion');

var items = [];

// Obtenemos datos
var getData = function getData(get) {

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

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = json.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var data = _step.value;


            dataAccordion.innerHTML += '\n                <div class="dataAccordion__item">\n                    <div class="dataAccordion__title"> \n                        <h2 class="dataAccordion__h2">' + data.CodigoProyecto + ' - ' + data.Proyecto + '</h2>\n                    </div>\n                    <div class="dataAccordion__info">\n                      <div class="dataAccordion__data">Fecha de inicio: ' + data.inicio + '</div>\n                      <div class="dataAccordion__data">Fecha de fin: ' + data.fin + '</div>\n                      <div class="dataAccordion__data">Duraci\xF3n: ' + data.duracion + ' d\xEDas</div>\n                  </div>\n                </div>\n                ';
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

    items = [].concat(_toConsumableArray(document.querySelectorAll('.dataAccordion__info')));
};

var openAccordion = function openAccordion(item) {

    var info = item.offsetParent.childNodes[3];

    if (item.classList.contains('dataAccordion__h2')) {

        items.map(function (item) {
            return item.style.display = 'none';
        });

        info.style.display = 'block';
    }
};

dataAccordion.addEventListener('click', function (e) {

    openAccordion(e.target);
});

var consultaMenu = function consultaMenu(id) {
    if (id === 1) {
        var sql = proyectoSQL;
    }
};

getData("proyecto");