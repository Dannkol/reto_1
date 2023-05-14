import { api_post } from "./api/wins.js";

const myCronometro = (nick) => {
    document.querySelector('my-cronometro').setAttribute('estado','fin');
    document.querySelector('my-cronometro').setAttribute('nick',nick);
}

const reset = () => {
    document.querySelector('#my-ranking').innerHTML = '';
    document.querySelector('#my-ranking').innerHTML = `
    <div>
        <button class="btn" onclick="window.modal1.showModal()">Top</button>
        <dialog id="modal1" style="width: 100%; height: 100%;">
            <div class="contenido">
                <my-ranking>
                    <h1>TOP Campers</h1>
                </my-ranking>
                <button class="btn" onclick="window.modal1.close()" style="height: 50px; width: auto; position: absolute;" >Close</button>
            </div>
        </dialog>
    </div>
    
    `;
}

const post_win = (data) => {
    api_post(data)
}
export {myCronometro , post_win , reset}