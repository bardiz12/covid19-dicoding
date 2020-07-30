import BaseComponent from "./BaseComponent";
import { CountUp } from "countup.js"
class StatCard extends BaseComponent{
    connectedCallback() {
        this._title = this.getAttribute("title") || null
        this.render();
    }

    static get observedAttributes() {
        return ["title", "count"];
    }

    

    render(){
        this.innerHTML = `
            <div class="my-card  animate__animated animate__bounceIn" style="border-bottom: 5px solid ${this._color}">
                <span class="title">${this._title}</span>
                <span class="counter"></span>
            </div>
        `


        let counter = new CountUp(this.querySelector(".counter"), this._count)
        counter.start();
    }

    set count(count){
        this._count = count
        this.render()
    }

    get count(){
        return this._count
    }

    set color(color){
        this._color = color
    }

    get color(){
        return this._color
    }
}

export default StatCard