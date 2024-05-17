import { FaChartLine } from 'react-icons/fa'

const ProgressSection = ({totalSavings, goalAmount}) => {
    const PercentageItem = ({ label, percentage }) => {
        return (
          <div className="flex justify-between">
            <p>{label}:</p>
            <p>{percentage.toFixed(0)}%</p>
          </div>
        )
      }
    
    const progress = totalSavings / goalAmount 
    return (
      <>
        <PercentageItem label="Savings Progress" percentage={progress * 100} />
        <div className="flex justify-center mt-8">
          <FaChartLine size={100} color="#3182CE" />
        </div>
      </>
    )
  }

  export default ProgressSection;