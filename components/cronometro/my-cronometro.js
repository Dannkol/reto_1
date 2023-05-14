import config from "../config.js";
import { post_win } from "../../src/main_cronometro.js";
import { towers } from "../../src/main_towers.js";
import { reset } from "../../src/main_cronometro.js";

let componet = await config.phatname(import.meta.url)

let data = []

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
                return ["nick"];
            }

            handleEvent(chronometerCall, hours, minutes, seconds) {
                clearInterval(chronometerCall)
                this.shadowRoot.querySelector('#play').removeAttribute(`disabled`)
                //envio de data a la api
                data.push([hours, minutes, seconds])
                post_win(data)
            }

            sendMesaggerEvent(e) {
                console.log(e.target.textContent);
            }

            attributeChangedCallback(attr, oldValue, newValue) {

                data.push(newValue)
                this.shadowRoot.getElementById('pause').click();

            }
            connectedCallback() {
                let hours = `00`,
                    minutes = `00`,
                    seconds = `00`,
                    chronometerDisplay = this.shadowRoot.querySelector(`[data-chronometer]`),
                    chronometerCall
                function chronometer() {

                    seconds++

                    if (seconds < 10) seconds = `0` + seconds

                    if (seconds > 59) {
                        seconds = `00`
                        minutes++

                        if (minutes < 10) minutes = `0` + minutes
                    }

                    if (minutes > 59) {
                        minutes = `00`
                        hours++

                        if (hours < 10) hours = `0` + hours
                    }

                    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

                }

                this.shadowRoot.querySelector('#play').onclick = (event) => {
                    chronometerCall = setInterval(chronometer, 1000)
                    event.target.setAttribute(`disabled`, ``)
                    towers.init()
                }

                this.shadowRoot.querySelector('#pause').addEventListener('click', (e) => {
                    this.handleEvent(chronometerCall, hours, minutes, seconds)
                    
                })

                this.shadowRoot.querySelector('#reset').onclick = () => {
                    clearInterval(chronometerCall)
                    this.shadowRoot.querySelector('#play').removeAttribute(`disabled`)
                    chronometerDisplay.textContent = `00:00:00`
                    hours = `00`,
                    minutes = `00`,
                    seconds = `00`
                    towers.reset()
                    reset()
                    data = []
                }


            }
        }
        window.customElements.define(componet[1], this.name);
    }

}