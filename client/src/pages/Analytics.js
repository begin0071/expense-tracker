import { Wrapper } from "../components";
import Yearly from "../components/AnalyticsPage/Yearly"
import Monthly from "../components/AnalyticsPage/Monthly"
import Expenses from "../components/AnalyticsPage/Expenses"

const Analytics = (props) => {

  return (
    <Wrapper>
      <h1>Analytics</h1>
      <div class="flexbox-container">
        <Yearly class="flexbox-item flexbox-item-1"/>
        <Monthly class="flexbox-item flexbox-item-2"/>
        <Expenses class="flexbox-item flexbox-item-3"/>
      </div>
    </Wrapper>
  )
}

export default Analytics