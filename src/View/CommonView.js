module.exports = {
    createStatsCards : (parent) => {
        let items = {
            total:null,
            deaths:null,
            recovers:null,
            active:null
        }

        let attr = {
            total:{
                color:"#80D2FF",
                title:"Total kasus"
            },
            deaths:{
                color:"#F76379",
                title:"Meninggal"
            },
            recovers:{
                color:"#6DBFBA",
                title:"Sembuh"
            },
            active:{
                color:"#FFD483",
                title:"Kasus Aktif"
            }
            
        }

        let container = document.querySelector(parent)
        
        for (let key in items){
            let elm = document.createElement("stat-card")
            elm.setAttribute("class","col-lg-3 col-md-6 col-6 mb-2")
            elm.color = attr[key].color
            elm.title = attr[key].title
            elm.count = 0
            items[key] = elm
            container.appendChild(items[key])
        }
        console.log(items)
        return items
    },
    changeAppBarTitle: (title) => {
        document.querySelector("app-bar").title = title
    },
    createNavigationBottom: (callback) => {
        const elm = document.createElement("navigation-bottom")
        elm.callback = callback
        document.body.appendChild(elm)
    },
    createGrafikHarian : (parent) => {
        let container = document.querySelector(parent)
        
        let elm = document.createElement("grafik-harian")
        container.appendChild(elm)
        return elm
    },
    createPerProvinsiTable : (parent) => {
        const elm = document.createElement("view-per-provinsi")
        document.querySelector(parent).appendChild(elm)
        window.anu = elm;
        return elm
    }
}