const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");


function swapActive(){
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener("click", function(){
            let activebtn = document.getElementsByClassName("active-btn");
            activebtn[0].className = activebtn[0].className.replace("active-btn", "");
            this.className += " active-btn";
        })
    }
    allSections.addEventListener("click", (e)=>{
        const id = e.target.dataset.id;
        if (id){

            sections.forEach((section)=>{
                section.classList.remove("active");
            })

            const element = document.getElementById(id);
            element.classList.add("active");
        }
        
    })
    

}//this function will swap the non-active class with the selected class

swapActive();