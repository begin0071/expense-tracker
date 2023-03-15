import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";

import "../../styles/global.css";
import { createTransaction, getWalletsApi } from "../../utils/APIs";
import auth from "../../utils/auth";
import FormEI from "./FormEI";

const NewTransaction = ({ userId }) => {
  const [selectedKey, setSelectedKey] = useState("expense");
  const [userWallets, setUserWallets] = useState([]);

  const [expenseFormData, setExpenseFormData] = useState({
    wallet: {},
    amount: "",
    description: "",
    date: "",
    type: "expense",
    user: {},
  });

  const [incomeFormData, setIncomeFormData] = useState({
    wallet: {},
    amount: "",
    description: "",
    date: "",
    type: "income",
    user: {},
  });

  if (!auth.loggedIn()) {
    window.location.assign("/Account");
  } else {
    expenseFormData.user = { _id: auth.getProfile()?.data?._id || userId };
    incomeFormData.user = { _id: auth.getProfile()?.data?._id || userId };
  }

  const validateFormData = useCallback((formData) => {
    if (
      formData.amount === "" ||
      formData.description === "" ||
      formData.date === ""
    ) {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (formData.amount <= 0) {
      Swal.fire({
        title: "Warning",
        text: "Amount must be greater than 0!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  }, []);

  const handleSelect = (key) => setSelectedKey(key);

  const handleExpenseInput = (e) => {
    const { name, value } = e.target;

    if (name === "wallet") {
      setExpenseFormData({
        ...expenseFormData,
        wallet: { _id: value },
      });
    } else {
      setExpenseFormData({ ...expenseFormData, [name]: value });
    }
  };

  const handleExpenseSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateFormData(expenseFormData)) {
        return;
      }

      const response = await createTransaction(expenseFormData);

      console.log(response);
      if (!response.ok) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Transaction created!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    },
    [expenseFormData, validateFormData]
  );

  const handleIncomeInput = (e) => {
    const { name, value } = e.target;
    if (name === "wallet") {
      setIncomeFormData({
        ...incomeFormData,
        wallet: { _id: value },
      });
    } else {
      setIncomeFormData({ ...incomeFormData, [name]: value });
    }
  };

  const handleIncomeSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateFormData(incomeFormData)) {
        return;
      }

      const response = await createTransaction(incomeFormData);

      console.log(response);
      if (!response.ok) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Success!",
          text: "Transaction created!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    },
    [incomeFormData, validateFormData]
  );

  useEffect(() => {
    const getWallets = async () => {
      const response = await getWalletsApi(userId);
      const data = await response.json();
      setUserWallets(data);
    };
    getWallets();
  }, [userId]);

  return (
    <div class="new-transaction">
      <Card>
        <Card.Header>New Transaction</Card.Header>
        <Card.Body>
          <Tabs
            defaultActiveKey="expense"
            activeKey={selectedKey}
            id="transactions-tab"
            className="mb-3"
            onSelect={handleSelect}
            justify
          >
            <Tab eventKey="expense" title="Expense">
              <FormEI
                id="expense-form"
                optionData={userWallets}
                handleSubmit={handleExpenseSubmit}
                handleInput={handleExpenseInput}
              />
            </Tab>

            {/* <Tab eventKey="transfer" title="Transfer"></Tab> */}
            <Tab eventKey="income" title="Income">
              <FormEI
                id="income-form"
                optionData={userWallets}
                handleSubmit={handleIncomeSubmit}
                handleInput={handleIncomeInput}
              />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

NewTransaction.defaultProps = {
  userId: "",
};

NewTransaction.propTypes = {
  userId: PropTypes.string,
};

export default NewTransaction;
