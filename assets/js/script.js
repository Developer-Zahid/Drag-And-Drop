let containers = document.querySelector(".page-wrapper");
let draggables = document.querySelectorAll(".draggable");

draggables.forEach(draggables => {
    draggables.addEventListener("dragstart", ()=> {
        draggables.classList.add("dragging");
    })
    draggables.addEventListener("dragend", ()=> {
        draggables.classList.remove("dragging");
    })
});

containers.addEventListener("dragover", (e)=> {
    e.preventDefault();
    const afterElement = getDragAfterElement(containers, e.clientY);
    const dragging = document.querySelector(".dragging");
    if( afterElement == null ){
        containers.appendChild(dragging)
    }else{
        containers.insertBefore(dragging, afterElement)
    }
})

// containers.forEach(containers => {
// });

function getDragAfterElement(containers, yPosition) {
    const draggableElements = [...containers.querySelectorAll(".draggable:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yPosition - box.top - box.height / 2;
        if( offset < 0 && offset > closest.offset ){
            return {offset: offset, element: child}
        } else{
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}