const { default: BaseComponent } = require("./BaseComponent");
import jQuery from 'jquery'
const $ = jQuery

class NavigationBottom extends BaseComponent{
    constructor(){
        super()
        this.current_page = "home"
        this._callback = function(id, navigationBottom){}
    }

    connectedCallback() {
        this.render();
    }

    render(){
        this.innerHTML = `
        <footer class="fixed-bottom navbar-light bg-light bottom-nav">
            <div class="row text-center">
                <div class="col ${this.current_page == "home" ? "active" : ""}" id="home" title="Home">
                    <i class="fa fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="col ${this.current_page == "provinsi" ? "active" : ""}" id="provinsi" title="Data Provinsi">
                    <i class="fa fa-database"></i>
                    <span>Data Provinsi</span>
                </div>
                <div class="col ${this.current_page == "about" ? "active" : ""}" id="about" title="About">
                    <i class="fa fa-info"></i>
                    <span>About</span>
                </div>

            </div>
        </footer>
        `

        $(this).find(".col").click((e) => {
            const elm = e.currentTarget
            const id = elm.id
            const title = elm.title
            this.current_page = id
            this.render()
            this._callback({
                id,
                title
            }, this)
        })
    }

    set callback(callback) {
        this._callback = callback
    }
}

export default NavigationBottom