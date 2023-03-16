import "../../styles/global.css";
import { Wrapper } from "../../components";
import { Col, Container, Row, Card } from "react-bootstrap";
import Chart from "../AnalyticsPage/Chart";

function AnalyticView() {
  return (
    <Card className="dash-item">
      {/* <Card xs={12} md={8} lg={6} className=" col-5 dash-item "> */}
      <h1>Analytics Chart</h1>
      <Chart />
      {/* </Card> */}
    </Card>
  );
}

export default AnalyticView;
