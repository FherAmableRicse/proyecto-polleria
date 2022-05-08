import { getDataColors } from "../helpers/helper.js";
export const modelsChart = () => {
    const dashboardModel01 = document.getElementById('dashboardModel01');
    const data = {
        labels: ['Sede-Centro', 'Sede-Lima', 'Sede-Cusco', 'Sede-Arequipa'],
    datasets:[{
        data: [4500,2500,2000,1000],
        borderColor: getDataColors(),
        backgroundColor:getDataColors('90')
        }]
    };
    const options = {
        plugins:{
        legend:{
            position:'bottom'
        }
        }
}
    new Chart(dashboardModel01, {
    type:'polarArea', 
    data,
    options
    });
}
export default modelsChart;