import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getMonthlyAnalyticsApi } from "../../utils/APIs";
import auth from "../../utils/auth";
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultData = [
  {
    month: "January",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "February",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "March",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "April",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "May",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "June",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "July",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "August",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "September",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "October",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "November",
    amount_expense: 0,
    amount_income: 0,
  },
  {
    month: "December",
    amount_expense: 0,
    amount_income: 0,
  },
];

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Chart = () => {
  // get data from API
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const getData = async () => {
    const token = auth.loggedIn() ? auth.getToken() : null;

    if (!token) {
      setExpenseData(defaultData);
      setIncomeData(defaultData);
      return false;
    } else {
      const userId = auth.getProfile()?.data?._id;
      const response = await getMonthlyAnalyticsApi(userId);
      const data = await response.json();

      setExpenseData(data.data.map((item) => item.amount_expense));
      setIncomeData(data.data.map((item) => item.amount_income));
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(51, 124, 160)",
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(237, 107, 90)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Money by Month",
      },
    },
  };

  useEffect(() => {
    getData();
  }, []);

  return <Bar options={options} data={data} />;
};

export default Chart;
