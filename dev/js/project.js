/*Contenedor del acordeon*/
let data = document.getElementById('data');

/*Variable que va a almacenar todos los acordeones. Se carga desde AJAX*/
let items;

/*Variable que va a almacenar todos los iconos. Se carga desde AJAX*/
let icons;

data.addEventListener('click', (e) => {


    if (e.target.classList.contains('data__title') || e.target.classList.contains('data__icon')) {

        /*Si el elemento es el texto o el icono localizo al padre*/

        let item = e.target.parentNode.nextElementSibling;

        let icon = item.parentNode.firstElementChild.childNodes[2];


        /*Si el elemento ya está abierto lo cierro*/
        if (item.classList.contains('data__info--show')) {
            item.classList.remove('data__info--show');
            icon.classList.remove('data__icon--rotate');


            /*Si no, cierro todos y abro sobre el que se ha hecho click*/
        } else {

            items.map(item => item.classList.remove('data__info--show'));

            icons.map(icon => icon.classList.remove('data__icon--rotate'));

            item.classList.add('data__info--show');

            icon.classList.add('data__icon--rotate');
        }

    }
});