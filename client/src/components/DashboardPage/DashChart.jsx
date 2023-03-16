import "../../styles/global.css";
import { Wrapper } from "..";
import { Col, Container, Row, Card, ListGroup } from "react-bootstrap";
import Chart from "../AnalyticsPage/Chart";
import { useEffect, useMemo, useState } from "react";
import auth from "../../utils/auth";
import { getTransactionsByUserIdApi, getWalletsApi } from "../../utils/APIs";

function DashChart() {
  const [userBalance, setUserBalance] = useState("");
  const [userTransactions, setUserTransactions] = useState([]);

  const getWallets = async () => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      setUserTransactions([]);
      return false;
    } else {
      const userId = auth.getProfile()?.data?._id;
      const response = await getWalletsApi(userId);
      const data = await response.json();

      // get user's total balance and set state
      const totalBalance = data.reduce(
        (acc, wallet) => acc + wallet.balance,
        0
      );
      setUserBalance(totalBalance);
    }
  };

  const getTransactions = async () => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      setUserTransactions([]);
      return false;
    } else {
      const userId = auth.getProfile()?.data?._id;
      const response = await getTransactionsByUserIdApi(userId);
      const data = await response.json();

      console.log("data: ", data);
      setUserTransactions(data);
    }
  };

  useEffect(() => {
    getWallets();
    getTransactions();
  }, []);

  return (
    <Card className="dash-item">
      {/* <Card xs={12} md={8} lg={6} className=" col-5 dash-item "> */}
      <h1>Stats</h1>
      <ul>
        <li>You have made: ${userTransactions?.total_income} </li>
        <li>SPENT: ${userTransactions?.total_expense}</li>
        <li>You have ${userBalance} left</li>
      </ul>
      {/* </Card> */}
    </Card>
  );
}

export default DashChart;
