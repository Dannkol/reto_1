import config from "../config.js";


let componet =  await config.phatname(import.meta.url)


export default {
    name :  componet[2],
    componet(){
        this.name = class extends HTMLElement{
            constructor(){
                super();
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = componet[0];
            }
            static get observedAttributes() {
                return ["width"];
            }

            handleEvent(e){
                
            }

            sendMesaggerEvent(e){
                console.log(e.target.textContent);
            }


            attributeChangedCallback(attr, oldValue, newValue) {
                // console.log(attr);
                //console.log(oldValue);
                var letters = '0123456789ABCDEF';
                var color = '#';
                
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                this.shadowRoot.querySelector("div").setAttribute("style", `${attr}:${40 * newValue}px;`)
                this.shadowRoot.querySelector("div").style.backgroundColor = color;
            }
            connectedCallback() {
                
            }
        }
        window.customElements.define(componet[1], this.name);
   }

}