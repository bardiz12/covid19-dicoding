import BaseComponent from "./BaseComponent";

export default class JumbotronBox extends BaseComponent{

    connectedCallback() {
        this._caption = this.getAttribute("caption") || null
        this._src = this.getAttribute("src") || null
        this.render();
    }

    static get observedAttributes() {
        return ["title","src"];
    }

    render(){
        this.innerHTML = `
        <div class="my-jumbotron">
            <div class="caption">
                ${this._caption}
            </div>
            <div class="logo">
                <img class="jumb-image rounded-circle" src="${this._src}"/>
            </div>
        </div>
        `
    }
}

