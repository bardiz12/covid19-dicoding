import BaseComponent from "./BaseComponent"
class AppBar extends BaseComponent{

    connectedCallback() {
        this._title = this.getAttribute("title") || null
        this.render();
    }

    static get observedAttributes() {
        return ["title"];
    }

    render(){
        this.innerHTML =  `
        <nav class="navbar navbar-dark bg-main">
            <span class="navbar-brand mb-0 h1">${this._title}</span>
        </nav>
        `
    }
    
}

export default AppBar;