const mediumBp = matchMedia(('min-width:360px'));

const  changeSize = mql =>{
    console.log(mql.matches);
}

mediumBp.addListener(changeSize);
changeSize(mediumBp);


