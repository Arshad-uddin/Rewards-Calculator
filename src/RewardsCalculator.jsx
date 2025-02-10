import React, { useState, useEffect } from "react";

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { customer: "Arshad", amount: 120, date: "2024-01-10" },
        { customer: "Teja", amount: 200, date: "2024-01-15" },
        { customer: "Arshad", amount: 90, date: "2024-02-05" },
        { customer: "Teja", amount: 130, date: "2024-02-17" },
        { customer: "Naresh", amount: 50, date: "2024-02-20" },
        { customer: "Arshad", amount: 110, date: "2024-03-01" },
        { customer: "Naresh", amount: 80, date: "2024-03-15" },
        { customer: "Teja", amount: 150, date: "2024-03-25" },
      ]);
    }, 1000);
  });
};

const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100) + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
};

const groupByCustomerAndMonth = (transactions) => {
  const rewards = {};

  transactions.forEach(({ customer, amount, date }) => {
    const month = date.substring(0, 7); // YYYY-MM format
    const points = calculatePoints(amount);

    if (!rewards[customer]) {
      rewards[customer] = {};
    }
    if (!rewards[customer][month]) {
      rewards[customer][month] = 0;
    }
    rewards[customer][month] += points;
  });

  return rewards;
};

const RewardsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setRewards(groupByCustomerAndMonth(data));
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Rewards Program</h2>
      {Object.keys(rewards).map((customer) => (
        <div key={customer} className="mb-4 p-2 border rounded shadow">
          <h3 className="font-semibold">{customer}</h3>
          <ul>
            {Object.keys(rewards[customer]).map((month) => (
              <li key={month}>
                {month}: {rewards[customer][month]} points
              </li>
            ))}
          </ul>
          <strong>
            Total: {Object.values(rewards[customer]).reduce((a, b) => a + b, 0)}
            points
          </strong>
        </div>
      ))}
    </div>
  );
};

export default RewardsCalculator;
