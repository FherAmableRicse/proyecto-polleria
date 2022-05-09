import { getDataColors } from "../helpers/helper.js";

export const models = () => {
    const dashboardModel01 = document.getElementById("dashboardModel01");
    const dashboardModel02 = document.getElementById("dashboardModel02");
    const dashboardModel03 = document.getElementById("dashboardModel03");
    const etiquetasChart1 = ['2015', '2016', '2017', '2018','2019','2020','2021'];
    const etiquetasChart2 = ['ENE', 'FEB', 'MAR', 'ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const etiquetasChart3 = ['Sede-Centro', 'Sede-Lima', 'Sede-Cusco', 'Sede-Arequipa'];
    
    const datosVentasAno = {
        label: "Picos de Ventas",
        data: [38674,41362,46452,45647,46253,46532,47653],
        borderColor: "red",
        backgroundColor:"Yellow",
        borderWidth: 1,
    }

    const datosVentas2021 = {
        label: "Ventas por mes - AF 2021",
        data: [4500,2500,2000,1000,1234,5426,3245,3726,3642,2534,2753,2093], 
        borderColor: "red",
        backgroundColor:"Yellow",
        borderWidth: 1,
    };
    const datosVentas2022 = {
        label: "Ventas por mes - AF 2022",
        data: [5000,3400,2000,2000], 
        borderColor: "red",
        backgroundColor:"blue",
        borderWidth: 1,
    };
    
    const datosIngresos = {
        data: [4500,2500,2000,1000], 
        borderColor: getDataColors(),
        backgroundColor:getDataColors('90'),
    };
    
    new Chart(dashboardModel01, {
        type: 'line',
        data: {
            labels: etiquetasChart1,
            datasets: [datosVentasAno]},
        });
    new Chart(dashboardModel02, {
        type: 'bar',
        data: {
            labels: etiquetasChart2,
            datasets: [datosVentas2021,datosVentas2022]},
            options:{
                plugins:{
                legend:{
                position: 'bottom'
                }
                    }
                }
        });
    new Chart(dashboardModel03, {
        type: 'polarArea',
        data: {
            labels: etiquetasChart3,
            datasets: [datosIngresos]},
            options:{
                plugins:{
                legend:{
                position: 'bottom'
                }
                    }
                }
            });
}
export default models;