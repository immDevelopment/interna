// objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

/*Contenedor de los acordeones*/
let dataAccordion = document.getElementById('data-accordion');

let items = [];

// Obtenemos datos
const getData = (get) => {

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

    for (let data of json.data) {

        dataAccordion.innerHTML += `
                <div class="dataAccordion__item">
                    <div class="dataAccordion__title"> 
                        <h2 class="dataAccordion__h2">${data.CodigoProyecto} - ${data.Proyecto}</h2>
                    </div>
                    <div class="dataAccordion__info">
                      <div class="dataAccordion__data">Fecha de inicio: ${data.inicio}</div>
                      <div class="dataAccordion__data">Fecha de fin: ${data.fin}</div>
                      <div class="dataAccordion__data">Duración: ${data.duracion} días</div>
                  </div>
                </div>
                `;
    }


    items = [...document.querySelectorAll('.dataAccordion__info')];

};

const openAccordion = item => {

    let info = item.offsetParent.childNodes[3];

    if (item.classList.contains('dataAccordion__h2')) {

        items.map(item => item.style.display = 'none');

        info.style.display = 'block';

    }
};


dataAccordion.addEventListener('click', (e) => {

    openAccordion(e.target)
});

const consultaMenu = (id) => {
    if (id === 1) {
        let sql = proyectoSQL;
    }
};

getData("proyecto");

