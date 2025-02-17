const boxes = document.querySelectorAll(".box");

let turn = "cross";

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if(!box.querySelector("img")){
            if(turn === "cross"){
                const image = document.createElement("img")
                image.setAttribute("src", "icons/cross.svg")
                box.appendChild(image)
                turn = "circle";
            }
            else{
                const image = document.createElement("img")
                image.setAttribute("src", "icons/circle.svg")
                box.appendChild(image)
                turn = "cross"
            }

        }
    })
})

// Add line to show winner,
//  make rest of the input's opacity .5;

// decide winner by checking winning sets