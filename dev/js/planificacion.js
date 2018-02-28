// objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

// Obtenemos datos
const dataGet = (get) => {

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            respuesta(xhr);
        }
    }
    xhr.open('GET', 'php/planificacion.php?tsql=' + get, true);
    xhr.send();
}

// Se imprimen los datos
const respuesta = (xhr) => {

    let json = JSON.parse(xhr.responseText);

    let dataElement = document.getElementById('data');

    let breakPoint = matchMedia('(min-width: 768px)');

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

    } else {

        dataElement.innerHTML += `
            <div class="dataTable">
                <div class="dataTable__header">
                    <div class="dataTable__text">ID proyecto</div>
                    <div class="dataTable__text">Proyecto</div>
                    <div class="dataTable__text">Fecha Aprobación</div>
                    <div class="dataTable__text">Fecha Fin</div>
                    <div class="dataTable__graphic">Dias del mes</div>
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
    }

    /*Calculo del proyecto más largo*/

    /*Array para objetos con los id y las duraciones*/
    let durations = [];

    let maxDuration=0;

    /*Copio en durations todas las duraciones*/
    for(let i=0;i<json.data.length;i++){

        durations[i] = {
            id: json.data[i].CodigoProyecto,
            duration: json.data[i].duracion
        }

        console.log(json.data[i]);

        if(json.data[i].duracion > maxDuration){
            maxDuration = json.data[i].duracion;
        }
    }

    /*Duración más larga*/



    let graphics = [...document.querySelectorAll('.graphic')];


    const graphicWidth = (id, duration) =>{
        let graphic = document.getElementById(id);

        /*Calculo de la anchura*/

        let width = (duration * 100) / maxDuration;

        graphic.style.width = `${width}%`;
        graphic.textContent = `${(width.toFixed(2).endsWith('00')) ? width.toFixed(0):width.toFixed(2)}%`;
    }

    for (let data of durations){
        graphicWidth(data.id, data.duration);
    }



}


dataGet("proyecto");
