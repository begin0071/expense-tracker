const dayjs = require("dayjs");
const { Monthly } = require("../models");
const { Transaction } = require("../models");
const { User } = require("../models");

// Create a new monthly record

let monthlySample = [
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

const createMonthly = async (req, res) => {
  try {
    const { month, year, expenses, income } = req.body;

    const newMonthly = await Monthly.create({
      month,
      year,
      expenses,
      income,
    });

    res.status(200).json(newMonthly);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get all
const getMonthlyDataById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const transaction = await Transaction.find({
      user: user_id,
    }).populate("user");

    // Put the sum of the amount of the transactions into the monthlySample array base on the month
    const monthlyData = monthlySample.map((item) => {
      // get total amount by type expense
      const totalExpense = transaction.reduce((acc, curr) => {
        if (
          dayjs(curr.date).format("MMMM") === item.month &&
          curr.type === "expense"
        ) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);

      // get total amount by type income
      const totalIncome = transaction.reduce((acc, curr) => {
        if (
          dayjs(curr.date).format("MMMM") === item.month &&
          curr.type === "income"
        ) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);

      return {
        ...item,
        amount_expense: totalExpense,
        amount_income: totalIncome,
      };
    });

    console.log("monthlyData", monthlyData);

    res.status(200).json({ data: monthlyData });
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get a single monthly record using the id
const getMonthlyById = async (req, res) => {
  try {
    const monthly = await Monthly.findOne({ _id: req.params.id });

    res.status(200).json(monthly);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update a monthly record
const updateMonthly = async (req, res) => {
  try {
    const monthly = await Monthly.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(monthly);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete monthly record
const deleteMonthly = async (req, res) => {
  try {
    const monthly = await Monthly.findOneAndDelete({
      _id: req.params.id,
    });

    res.status(200).json(monthly);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createMonthly,
  getMonthlyById,
  updateMonthly,
  deleteMonthly,
  getMonthlyDataById,
};
