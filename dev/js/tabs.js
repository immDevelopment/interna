let projectSelect = document.getElementById('project-select');
let data = document.getElementById('data');
let dataFilter = document.getElementById('dataFilter');

projectSelect.addEventListener('click', (e)=>{

    if(e.target.tagName === 'H1') {

        if (e.target.id === 'projects') {
            data.style.display = 'block';
            dataFilter.style.display = 'none';
        } else if(e.target.id === 'projects-filter') {
            data.style.display = 'none';
            dataFilter.style.display = 'block';
        }
    }

});

