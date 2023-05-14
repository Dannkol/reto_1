
import { myCronometro } from "./main_cronometro.js";

const towers = {
    init() {

        let selectedDisc = null;
        let startX = 0;
        let startY = 0;

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
                    console.log(tower.firstChild);
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
            return checkWin === (tower3.childElementCount == 6);
        }


        //Touch

        function handleTouchStart(event) {
            let touch = event.targetTouches[0];
            
            selectedDisc = touch.target;
            startX = touch.clientX;
            startY = touch.clientY;
        
        }
        
        function handleTouchMove(event) {
            event.preventDefault();

        }
        
        function handleTouchEnd(event) {
            event.preventDefault();
            let touch = event.changedTouches[0];

            let tower = document.elementFromPoint(touch.clientX, touch.clientY);

            if (tower.id.startsWith("tower") && selectedDisc) {
                if (isValidMove(tower.id)) {
                    console.log(event)
                    tower.insertBefore(selectedDisc, tower.firstChild);
                    selectedDisc = null;
                    if (checkWin()) {
                        let nick = prompt("¡Has ganado! Por favor, escribe tu nombre");
                        myCronometro(nick);
                    }
                } else {
                    alert("Movimiento no válido");
                }
            }
        }


        //eventos de escucha
        document.querySelectorAll('.tower').forEach((item) => {
            item.addEventListener("dragstart", drag);
            item.addEventListener("drop", drop);
            item.addEventListener("dragover", allowDrop);

            // eventos de touch

            item.addEventListener("touchstart", handleTouchStart);
            item.addEventListener("touchmove", handleTouchMove);
            item.addEventListener('touchend', handleTouchEnd);

        })

        // Crear discos
        let tower1 = document.getElementById("tower1");

        for (let i = 1; i <= 6; i++) {
            tower1.innerHTML += `<my-disco data-size="${i}" width="${i}" draggable="true"></my-disco>`;
        }


    },

    reset() {
        let towers = document.querySelectorAll(".tower");
        towers.forEach(element => {
            element.innerHTML = '';
        });
    }

}

export { towers }