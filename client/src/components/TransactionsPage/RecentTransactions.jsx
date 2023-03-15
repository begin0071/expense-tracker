import React from "react";
import PropTypes from "prop-types";

import { Card, ListGroup } from "react-bootstrap";
import "../../styles/global.css";

const RecentTransactions = ({ userId }) => {
  return (
    <div class="recent-transactions">
      <Card className="w-100">
        <Card.Header className="">
          <Card.Title className="bg-transparent">
            Recent Transactions
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item className="d-flex justify-content-between">
            <Card.Text className="bg-transparent">Saving</Card.Text>
            <Card.Text className="bg-transparent">Saving</Card.Text>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <Card.Text className="bg-transparent">Checking</Card.Text>
            <Card.Text className="bg-transparent">Checking</Card.Text>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <Card.Text className="bg-transparent">Spending</Card.Text>
            <Card.Text className="bg-transparent">Spending</Card.Text>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

RecentTransactions.defaultProps = {
  userId: "",
};

RecentTransactions.propTypes = {
  userId: PropTypes.string,
};

export default RecentTransactions;
