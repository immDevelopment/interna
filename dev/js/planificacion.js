// objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

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

        dataElement.innerHTML += `
            <div class="dataTable">
                <div class="dataTable__header">
                    <div class="dataTable__text">ID proyecto</div>
                    <div class="dataTable__text">Proyecto</div>
                    <div class="dataTable__text">Fecha Aprobación</div>
                    <div class="dataTable__text">Fecha Fin</div>
                    <div class="dataTable__graphic">Poner Dias</div>
                </div>
        `;

        for (let data of json.data) {
            dataElement.innerHTML += `
            
            <div class="dataTable__data">
            <div class="dataTable__text">${data.CodigoProyecto}</div>
            <div class="dataTable__text">${data.Proyecto}</div>
            <div class="dataTable__text">${data.inicio}</div>
            <div class="dataTable__text">${data.fin}</div>
            <div class="dataTable__graphic"">
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
    let maxDuration = Math.max(...allDurations);

    console.log(maxDuration);

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
