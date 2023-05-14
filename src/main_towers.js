
import { myCronometro } from "./main_cronometro.js";

const towers = {
    init() {

        let selectedDisc = null;

        function allowDrop(event) {
            event.preventDefault();
        }

        function drag(event) {
            let disc = event.target;
            let tower = disc.parentNode;
            let topDisc = tower.firstChild;

            if (disc === topDisc) {
                selectedDisc = disc;
            } else {
                selectedDisc = null;
            }
        }

        async function drop(event) {
            event.preventDefault();
            let tower = event.target;
            let towerId = tower.id;

            if (towerId.startsWith("tower") && selectedDisc) {
                if (isValidMove(towerId)) {
                    tower.insertBefore(selectedDisc, tower.firstChild);
                    selectedDisc = null;

                    if (checkWin()) {
                        let nick = prompt("¡Has ganado!, por favor escribe tu nombre");
                        myCronometro(nick)
                    }
                } else {
                    alert("Movimiento no válido");
                }
            }
        }
        function isValidMove(towerId) {
            let tower = document.getElementById(towerId);
            let towerTopDisc = tower.firstChild;

            if (!towerTopDisc) {
                return true;
            }

            let selectedDiscSize = parseInt(selectedDisc.dataset.size);
            let towerTopDiscSize = parseInt(towerTopDisc.dataset.size);

            return selectedDiscSize < towerTopDiscSize;
        }

        function checkWin() {
            let tower3 = document.getElementById("tower3");
            let tower3_data = [];
            Array.from(tower3.children).forEach((item) => {
                tower3_data.push(item.dataset.size)
            })

            let checkWin = true;

            tower3_data.map((item, index) => {
                return item > tower3_data[index + 1] ? checkWin = false : checkWin = true;
            })

            // check valida que el orden y la cantidad de discos sea correcta
            console.log(checkWin, tower3.childElementCount == 6)
            return checkWin === (tower3.childElementCount == 6) ;
        }
        document.querySelectorAll('.tower').forEach((item) => {
            item.addEventListener("drop", drop);
            item.addEventListener("dragover", allowDrop);
        })

        // Crear discos
        let tower1 = document.getElementById("tower1");

        
        for (let i = 1; i <= 6; i++) {
            createDisc(i, tower1);
        }

        function createDisc(size, tower) {
            let disc = document.createElement("div");
            disc.dataset.size = size;
            disc.draggable = true;
            disc.innerHTML = `<my-disco width="${size}"></my-disco>`;
            disc.addEventListener("dragstart", drag);
            tower.appendChild(disc);
        }
    },

    reset(){
        let towers = document.querySelectorAll(".tower");
        towers.forEach(element => {
            element.innerHTML = '';
        });
    }

}

export { towers }