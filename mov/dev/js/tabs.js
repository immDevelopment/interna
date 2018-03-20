let projectSelect = document.getElementById('project-select');
let dataAccordion = document.getElementById('data-accordion');
let dataFilter = document.getElementById('data-filter');

projectSelect.addEventListener('click', (e)=>{

    if(e.target.tagName === 'H1') {

        if (e.target.id === 'projects') {
           dataAccordion.style.display = 'block';
           dataFilter.style.display = 'none';
        } else if(e.target.id === 'projects-filter') {
            dataAccordion.style.display = 'none';
            dataFilter.style.display = 'block';
        }
    }

});

