import MonthlyStats from "../components/AnalyticsPage/Monthly"
import YearlyStats from "../components/AnalyticsPage/Yearly";
import 'bootstrap/dist/css/bootstrap.css';
import Expenses from "../components/AnalyticsPage/expenses";



const Analytics = (props) => {

  return (
    <div>

      <h1>Analytics</h1>
      <div className="container-fluid mx-0 mr-0 my-20">
        <div className="row">
          <div className="col-6">
        
        <MonthlyStats/>
          </div>
          <div className="col-6">
          <YearlyStats/>
          </div>
          </div>
          </div>
          
          <Expenses/>
          
      
    </div>
  
  )
}

export default Analytics