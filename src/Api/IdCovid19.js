const baseURL = "https://indonesia-covid-19.mathdro.id/api";
const headers =  {
    // "Content-Type": "application/json",
    // "Access-Control-Request-Headers": "x-requested-with"
}

module.exports = {
    getIndonesiaData : () => {
        return fetch(baseURL + "/",{
            method: "GET",
            headers
        })
    },
    getHarianData : () => {
        return fetch(baseURL + "/harian")
    },
    getDataPerProvinsi : () => {
        return fetch(baseURL + "/provinsi")
    }
}