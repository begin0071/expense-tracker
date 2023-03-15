import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Card, ListGroup } from "react-bootstrap";

import { getWalletsApi } from "../../utils/APIs";
import "../../styles/global.css";
import auth from "../../utils/auth";

const NetWorthTable = ({ userId }) => {
  const [userWallets, setUserWallets] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  const renderWallets = useMemo(
    () =>
      (userWallets || []).map((wallet) => (
        <ListGroup.Item
          key={wallet._id}
          className="d-flex justify-content-between"
        >
          <Card.Text className="bg-transparent">{wallet.name}</Card.Text>
          <Card.Text className="bg-transparent">{wallet.balance}</Card.Text>
        </ListGroup.Item>
      )),
    [userWallets]
  );

  useEffect(() => {
    const getWallets = async () => {
      const response = await getWalletsApi(userId);
      const data = await response.json();

      // get user's total balance and set state
      const totalBalance = data.reduce(
        (acc, wallet) => acc + wallet.balance,
        0
      );

      setUserBalance(totalBalance);
      setUserWallets(data);
    };
    getWallets();
  }, [userId]);

  return (
    <div className="net-worth">
      <Card className="w-100">
        <Card.Header className="d-flex justify-content-between">
          <Card.Title className="bg-transparent">Net Worth</Card.Title>
          <Card.Title className="bg-transparent">{userBalance}</Card.Title>
        </Card.Header>
        <ListGroup variant="flush">{renderWallets}</ListGroup>
      </Card>
    </div>
  );
};

NetWorthTable.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default NetWorthTable;
