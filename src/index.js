import "regenerator-runtime";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import "animate.css"
import jQuery from "jquery"
import PullToRefresh from 'pulltorefreshjs';
const $ = jQuery
//import Custom element component
import AppBar from "./Components/AppBar"
import Jumbotron from "./Components/Jumbotron"
import JumbotronTextOnly from "./Components/JumbotronTextOnly"
import StatCard from "./Components/StatCard"
import NavigationBottom from "./Components/Navigation"
import GrafikHarian from "./Components/GrafikHarian"
import ViewPerProvinsi from "./Components/ViewPerProvinsi"

//import custom helper
import {loadComponent, loadComponents} from "./Utilities/Common"
import {createStatsCards, changeAppBarTitle, createNavigationBottom, createGrafikHarian, createPerProvinsiTable} from "./View/CommonView";
import CovidModel from "./Models/CovidModel"

const state = {
    page:"home",
}

//load all custom element
// loadComponents(AppBar, Jumbotron, StatCard, NavigationBottom, JumbotronTextOnly, GrafikHarian, ViewPerProvinsi) //masih ada bug untuk batch loadCOmponents ini.


//load component manually
loadComponent("app-bar",AppBar)
loadComponent("jumbotron-box",Jumbotron)
loadComponent("stat-card",StatCard)
loadComponent("navigation-bottom",NavigationBottom)
loadComponent("jumbotron-text-only",JumbotronTextOnly)
loadComponent("grafik-harian",GrafikHarian)
loadComponent("view-per-provinsi",ViewPerProvinsi)

//create bottom navigation and add callback
createNavigationBottom((page, navigationBottom) => {
    if( state.page !== page.id){
        $("section").addClass("animate__animated animate__fadeOut")
        setTimeout(() => {
            changeAppBarTitle(page.title)
            $(`section`).removeClass("animate__fadeOut")
            $(`section`).addClass("d-none")

            $(`section#${page.id}-page`).removeClass("d-none")
            $(`section#${page.id}-page`).addClass("animate__fadeIn")
            state.page = page.id
            
        }, 250)
    }
})

//create 4 statistics card
const statCards = createStatsCards("#card-statistics")
CovidModel.loadStats(statCards) //init stats

//create grafik
const grafikComponent = createGrafikHarian("section#home-page main")
grafikComponent.loadData() //init data harian

//create table per provinsi
const provinsiTableView = createPerProvinsiTable("section#provinsi-page")
provinsiTableView.loadData() //ini data provinsi


//init Pull to Refresh mechanism
const ptr = PullToRefresh.init({
    mainElement: '#main-app',
    onRefresh() {
        if(state.page == "home"){
            CovidModel.loadStats(statCards)
            grafikComponent.loadData()
        }else if(state.page == "provinsi"){
            provinsiTableView.loadData()
        }
    }
});