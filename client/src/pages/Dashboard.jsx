import Navigation from "../components/Navigation";
import { Wrapper } from "../components";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../styles/global.css";
import TransView from "../components/DashboardPage/TransView";
import AnalyticView from "../components/DashboardPage/AnalyticView";
import DashChart from "../components/DashboardPage/DashChart";

const Dashboard = (props) => {
  return (
    <>
      <Wrapper>
        <h1>Dashboard</h1>
        {/* <div className="flexbox-container row dashview">
          <AnalyticView />
          <DashChart />
        </div> */}

        <Container>
          <Row>
            <Col
              xs={12}
              md={12}
              lg={6}
              className="px-1"
              style={{ border: "solid 2px white" }}
            >
              <div className="py-3">
                <AnalyticView />
              </div>
            </Col>
            <Col
              xs={12}
              md={12}
              lg={6}
              className="px-1"
              style={{ border: "solid 2px white" }}
            >
              <div className="py-3">
                <DashChart />
              </div>
            </Col>
          </Row>
        </Container>
        <TransView />
      </Wrapper>
    </>
  );
};

export default Dashboard;
