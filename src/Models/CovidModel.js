import { getIndonesiaData } from "../Api/IdCovid19"
export default {
    loadStats: async (statCards) => {
        const response = await (await getIndonesiaData()).json()
        statCards.total.count = response.jumlahKasus
        statCards.deaths.count = response.meninggal
        statCards.recovers.count = response.sembuh
        statCards.active.count = response.perawatan
    }
}