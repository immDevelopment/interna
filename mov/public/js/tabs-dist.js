"use strict";var projectSelect=document.getElementById("project-select"),dataAccordion=document.getElementById("data-accordion"),dataFilter=document.getElementById("data-filter");projectSelect.addEventListener("click",function(t){"H1"===t.target.tagName&&("projects"===t.target.id?(dataAccordion.style.display="block",dataFilter.style.display="none"):"projects-filter"===t.target.id&&(dataAccordion.style.display="none",dataFilter.style.display="block"))});