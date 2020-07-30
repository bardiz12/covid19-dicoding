import BaseComponent from "./BaseComponent";

export default class JumbotronTextOnly extends BaseComponent{

    connectedCallback() {
        this._caption = this.getAttribute("caption") || null
        this.render();
    }

    static get observedAttributes() {
        return ["caption"];
    }

    render(){
        this.innerHTML = `
        <div class="my-jumbotron">
                <div class="caption text-center font-italic">
                    ${this._caption}
                </div>
            </div>
        `
    }
}

