import { Wrapper } from "../components";
import Yearly from "../components/AnalyticsPage/Yearly";
import Monthly from "../components/AnalyticsPage/Monthly";
import Expenses from "../components/AnalyticsPage/Expenses";
import Chart from "../components/AnalyticsPage/Chart";
import Navigation from "../components/Navigation";

const Analytics = (props) => {
  return (
    <Wrapper>
      <h1>Analytics</h1>
      <div className="flexbox-container">
        <Chart className="analytics-chart" />
      </div>
    </Wrapper>
  );
};

export default Analytics;
