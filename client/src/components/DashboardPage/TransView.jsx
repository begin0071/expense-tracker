import "../../styles/global.css";
import { Wrapper } from "..";
import { Col, Container, Row, Card } from "react-bootstrap";
import RecentTransactions from "../TransactionsPage/RecentTransactions";

function TransView() {
  return (
    <>
      <Card
        xs={12}
        md={12}
        lg={6}
        className=" justify-content-center dash-item"
      >
        <h1>Recent Transactions</h1>
        <RecentTransactions />
      </Card>
    </>
  );
}

export default TransView;
