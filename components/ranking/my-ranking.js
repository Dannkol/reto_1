import config from "../config.js";


let componet = await config.phatname(import.meta.url)


export default {
    name: componet[2],
    componet() {
        this.name = class extends HTMLElement {
            constructor() {
                super();
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = componet[0];
            }
            static get observedAttributes() {
                return [];
            }

            handleEvent(e) {

            }

            sendMesaggerEvent(e) {
                console.log(e.target.textContent);
            }


            attributeChangedCallback(attr, oldValue, newValue) {
                // console.log(attr);
                //console.log(oldValue);

            }
            connectedCallback() {

                const ulEl = this.shadowRoot.querySelector("ul");
                let number = 0;
                let activeIndex = 0;
                let rotate = 0
                const myWorker = new Worker('./components/ranking/wsranking.js', {
                    type : "module"
                })
                myWorker.postMessage([]);
                myWorker.addEventListener("message", (e) => {
                    console.log(e.data);
                    rotate = -360 / e.data[1];
                    init(e.data[0]);
                })


                function init(lista_ranking) {
                    /* items_ranking.forEach((holiday, idx) => {
                        const liEl = document.createElement("li");
                        liEl.style.setProperty("--day_idx", idx);
                        liEl.innerHTML = `<span>${idx + 1
                            }</span><span>${holiday}</span>`;
                        ulEl.append(liEl);
                    });
                    ulEl.style.setProperty("--rotateDegrees", rotate); */

                    ulEl.insertAdjacentHTML("beforeend", lista_ranking);
                    ulEl.style.setProperty("--rotateDegrees", rotate);

                }

                function mover(nr) {
                    number += nr;
                    ulEl.style.setProperty("--currentItem", number);
                    
                }

                this.shadowRoot.querySelectorAll("button").forEach((item) => {
                    item.addEventListener("click", (e) => {

                        e.target.id === "up" ?
                            mover(-1) :
                            e.target.id === "close" ?
                                this.shadowRoot.querySelector("ul").setAttribute("style", `--rotateDegrees: ${rotate};`) :
                                mover(1);

                    })
                })



            }
        }
        window.customElements.define(componet[1], this.name);
    }

}