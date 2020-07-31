const { default: BaseComponent } = require("./BaseComponent");
import {getDataPerProvinsi} from "../Api/IdCovid19"
import {CountUp} from "countup.js"
import {beautifyNumber} from '../Utilities/Common'

class ViewPerProvinsi extends BaseComponent{

    constructor(){
        super()
        this._status = "loading";
        this._data = null
    }

    connectedCallback() {
        this.render();
    }

    async loadData(){
        this._status = "loading";
        this.render()
        const response = await (await getDataPerProvinsi()).json()
        this._data = response
        this._status = "completed"
        this.render()
    }

    render(){
       if(this._status == "loading"){
            this.innerHTML =  `
            
            <div class="d-block text-center mt-5">
                <i class='fa fa-spin fa-spinner fa-3x d-block'></i>
                Memuat data...
            </div>
            `
       }else if(this._status == 'completed'){
            let content = ''

            for (let i = 0; i < this._data.data.length; i++) {
                const kota = this._data.data[i];
                content += `
                    <tr>
                        <td>
                            ${kota.provinsi}
                        </td>
                        <td class="num">${beautifyNumber(kota.kasusPosi)}</td>
                        <td class="num">${beautifyNumber(kota.kasusSemb)}</td>
                        <td class="num">${beautifyNumber(kota.kasusMeni)}</td>
                    </tr>
                `
            }

            this.innerHTML = `
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Kota</th>
                        <th>Positif</th>
                        <th>Sembuh</th>
                        <th>Meninggal</th>
                    </tr>
                </thead>
                <tbody class="bg-white">
                    ${content}
                </tbody>
            </table>
           `

           

            // $(this.querySelector("table")).DataTable();
       }
    }
    
}

export default ViewPerProvinsi