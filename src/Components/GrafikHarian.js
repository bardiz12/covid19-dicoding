const { default: BaseComponent } = require("./BaseComponent");
import moment from 'moment';
import {getHarianData} from "../Api/IdCovid19"
import Chart from "chart.js"
import { beautifyNumber } from '../Utilities/Common';
moment.locale("id")

export default class GrafikHarian extends BaseComponent{

    constructor(){
        super()
        this.DATE_FORMAT = "YYYY-MM-DD"
        this._grafikdata = null
        this._dari = null
        this._sampai = null
    }

    connectedCallback() {
        this.render()
    }
    
    render(){
        this._dari = this._dari == null ? moment().subtract(14,"day") : this._dari;
        this._sampai = this._sampai == null ? moment() : this._sampai;
        this.innerHTML = `
        <div class="my-card card">
            <div class="row">
                <div class="col-12 col-md-6">
                    <span class="d-block">Dari</span>
                    <input type="date" class="form-control" id="input-dari" value="${this._dari.format(this.DATE_FORMAT)}">
                </div>
                <div class="col-12 col-md-6">
                    <span class="d-block">Sampai</span>
                    <input type="date" class="form-control"  id="input-sampai"  value="${this._sampai.format(this.DATE_FORMAT)}">
                </div>
            </div>
            <span class="mt-2 d-block">Menampilkan data dalam rentang ${this._sampai.diff(this._dari, "days")} hari</span>
            <canvas width="auto" height="400"></canvas>
        </div>
        `   
        this.querySelector("#input-dari").addEventListener("change",(e) => {
            // this._dari = e.returnValue
            this._dari = moment(e.target.value, this.DATE_FORMAT);
            this.render()
        })
        this.querySelector("#input-sampai").addEventListener("change",(e) => {
            // this._dari = e.returnValue
            this._sampai = moment(e.target.value, this.DATE_FORMAT);
            this.render()
        })

        // create grafik
        if(this._grafikdata != null){
            let ctx = this.querySelector("canvas")

            let labels = []
            const numericData = {
                kasusPositif:[],
                meninggal:[],
                sembuh:[],
                kasusBaru:[]
            }
            var options = {
                month: "long",
                day: "numeric"
            };
            const {data} = this._grafikdata
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const date = new Date(item.tanggal);

                if(this._dari.format("x") <= item.tanggal && item.tanggal <= this._sampai.format("x")){
                    labels.push(date.toLocaleDateString("id-ID", options))
                    numericData.kasusPositif.push(item.jumlahKasusKumulatif)
                    numericData.meninggal.push(item.jumlahPasienMeninggal)
                    numericData.sembuh.push(item.jumlahPasienSembuh)
                    numericData.kasusBaru.push(item.jumlahKasusBaruperHari);
                    

                }
            }
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                    {
                        label: "Kasus Positif",
                        backgroundColor: "#FFD484",
                        pointBackgroundColor: "#FFD484",
                        borderWidth: 5,
                        pointBorderColor: "#FFD484",
                        data: numericData.kasusPositif,
                        order: 3,
                        fill:false,
                    },
                    {
                        label: "Meninggal",
                        backgroundColor: "rgba(0,0,0,0)",
                        pointBackgroundColor: "#F76379",
                        borderWidth: 5,
                        pointBorderColor: "#F76379",
                        data: numericData.meninggal,
                        order: 1,
                        fill:false,
                    },
                    {
                        label: "Sembuh",
                        backgroundColor: "rgba(0,0,0,0)",
                        pointBackgroundColor: "#6DBFBA",
                        borderWidth: 5,
                        pointBorderColor: "#6DBFBA",
                        data: numericData.sembuh,
                        order: 2,
                        fill:false,
                    },
                    {
                        label: "Kasus Baru",
                        backgroundColor: "rgba(0,0,0,0)",
                        pointBackgroundColor: "black",
                        borderWidth: 5,
                        pointBorderColor: "black",
                        data: numericData.kasusBaru,
                        order: 2,
                        fill:false,
                    }
                    ]
                },
                options: {
                    scales: {
                    yAxes: [
                        {
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                        }
                    ],
                    xAxes: [
                        {
                        ticks: {
                            beginAtZero: true,
                            display: false,
                        },
                        gridLines: {
                            display: false
                        }
                        }
                    ]
                    },
                    legend: {
                    display: true,
                    position: "bottom",
                    flabels: {
                            fontColor: 'rgb(255, 99, 132)'
                        }
                    },
                    tooltips: {
                    enabled: true,
                    mode: "index",
                    intersect:false,
                    callbacks: {
                        label: function(tooltipItems, data) {
                        const index = tooltipItems.datasetIndex
                        const dataset = data.datasets[index]
                        return ` ${beautifyNumber(parseInt(tooltipItems.yLabel))} ${dataset.label}`;
                        },
                        
                    }
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    height: 600
                }
            });
        }
    }

    async loadData(){
        this._grafikdata = null;
        this.render()
        const response = await (await getHarianData()).json()
        this._grafikdata = response
        this.render()
    }


    get dari(){
        return this._dari
    }

    set dari(dari){
        this._dari = dari
    }

    get sampai(){
        return this._sampai
    }

    set sampai(sampai){
        this._sampai = sampai
    }

    get grafikData(){
        return this._grafikdata
    }

    set grafikData(grafikData){
        this._grafikdata = grafikData
        this.render();
    }
}