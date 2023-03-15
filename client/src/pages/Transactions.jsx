import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import NetWorthTable from "../components/TransactionsPage/NetWorth";
import RecentTransactions from "../components/TransactionsPage/RecentTransactions";
import NewTransaction from "../components/TransactionsPage/NewTransaction";
import { Wrapper } from "../components";
import Navigation from "../components/Navigation";
import auth from "../utils/auth";

const Transactions = () => {
  let userId = "";
  if (!auth.loggedIn()) {
    window.location.assign("/Account");
  } else {
    userId = auth.getProfile()?.data?._id;
  }

  return (
    <Wrapper>
      <h1>Transactions</h1>
      <div class="flexbox-container"></div>

      <Container>
        <Row>
          <Col xs={12} md={12} lg={6}>
            <div className="py-3">
              <NetWorthTable userId={userId} />
            </div>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <div className="py-3">
              <NewTransaction userId={userId} />
            </div>
            <div className="py-3">
              <RecentTransactions userId={userId} />
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Transactions;
