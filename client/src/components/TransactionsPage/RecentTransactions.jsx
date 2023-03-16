import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { Card, ListGroup } from "react-bootstrap";
import "../../styles/global.css";
import { getTransactionsByUserIdApi } from "../../utils/APIs";
import auth from "../../utils/auth";

const RecentTransactions = () => {
  const [userTransactions, setUserTransactions] = useState([]);

  const renderTransactions = useMemo(
    () =>
      (userTransactions?.data || []).map((transaction) => (
        <ListGroup.Item
          key={transaction._id}
          className="d-flex justify-content-between"
        >
          <Card.Text className="bg-transparent">{transaction.type}</Card.Text>
          <Card.Text className="bg-transparent">
            {transaction.description}
          </Card.Text>
          <Card.Text className="bg-transparent">
            {transaction.type === "expense" ? (
              <Card.Text className="text-danger bg-transparent">
                - {transaction.amount}
              </Card.Text>
            ) : (
              <Card.Text className="text-success bg-transparent">
                + {transaction.amount}
              </Card.Text>
            )}
          </Card.Text>
        </ListGroup.Item>
      )),
    [userTransactions]
  );

  useEffect(() => {
    const getTransactions = async () => {
      const token = auth.loggedIn() ? auth.getToken() : null;

      if (!token) {
        setUserTransactions([]);
        return false;
      } else {
        const userId = auth.getProfile()?.data?._id;
        const response = await getTransactionsByUserIdApi(userId);
        const data = await response.json();
        setUserTransactions(data);
      }
    };
    getTransactions();
  }, []);

  return (
    <div className="recent-transactions">
      <Card className="w-100">
        <Card.Header className="">
          <Card.Title className="bg-transparent">
            Recent Transactions
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">{renderTransactions}</ListGroup>
      </Card>
    </div>
  );
};

export default RecentTransactions;
