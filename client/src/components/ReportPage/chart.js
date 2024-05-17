import {Chart,ArcElement} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

const Chart1 = ({ data }) => {
    const chartData = {
      labels: ['Total Income', 'Total Expenses', 'Total Savings'],
      datasets: [
        {
          label: 'Financial Overview',
          backgroundColor: ['#3182CE', '#EF4444', '#10B981'],
          borderColor: ['#3182CE', '#EF4444', '#10B981'],
          borderWidth: 1,
          hoverBackgroundColor: ['#3182CE', '#EF4444', '#10B981'],
          hoverBorderColor: ['#3182CE', '#EF4444', '#10B981'],
          data: data,
        },
      ],
    }
  
    const chartOptions = {
      
    }
  
    return <Doughnut data={chartData} options={chartOptions} />
  }

  export default Chart1;