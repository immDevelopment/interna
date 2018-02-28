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
            <div class="dataTable__text">720170136</div>
            <div class="dataTable__text">VINILOS ESCAPARATE NB21</div>
            <div class="dataTable__text">10/10/1000</div>
            <div class="dataTable__text">10/10/1008</div>
            <div class="dataTable__graphic graphic" id="graphic"></div>
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
}


dataGet("proyecto");
