import { useState, Ref, useRef } from "react";

import Button from "./modules/common/button/Button";
import ActivityList from "./modules/dashboard/activity-list/ActivityList";
import Withdraw from "./modules/dashboard/actions/withdraw/Withdraw";
import Deposit from "./modules/dashboard/actions/deposit/Deposit";
import Transfer from "./modules/dashboard/actions/transfer/Transfer";

import "./App.scss";

function App() {
  const [checkingAccountBalance, setCheckingAccountBalance] = useState(1212.42);
  const [savingAccountBalance, setSavingAccountBalance] = useState(3030);
  const [lastActivity, setLastActivity] = useState([
    {
      date: "07/04/21",
      timeStamp: "9:22 AM",
      action: "Transfer from Checkings Account",
      amount: 25,
    },
    {
      date: "01/01/21",
      timeStamp: "12:22 PM",
      action: "Withdrawal from Savings Account",
      amount: 20,
    },
  ]);
  const totalAvailabletBalance = checkingAccountBalance + savingAccountBalance;

  const savingsEl = useRef(null);
  let amount = 0;
  const savingsAccountHandler = (e) => {
    setSavingAccountBalance((prevState) => prevState + 3);
    const [date, timeStamp] = new Date(Date.now()).toLocaleString().split(",");
    setLastActivity((prevState) => {
      return [
        {
          date,
          timeStamp,
          action: "savings account deposited $3",
          amount,
        },
        ...prevState,
      ];
    });
  };

  return (
    <div className='app-container'>
      <div className='app-container__inner'>
        <h1 className='app-container__acc--balance'>{`Available Balance: ${totalAvailabletBalance}`}</h1>
        <h3>{`Checkings Account: ${checkingAccountBalance}`}</h3>
        <h3 onClick={savingsAccountHandler} ref={savingsEl}>
          {`Savings Account: ${savingAccountBalance}`}
        </h3>
      </div>
      <div className="app-container__actions">
        <Withdraw />
        <Deposit />
        <Transfer />
      </div>
      <ActivityList accountActivity={lastActivity} />
    </div>
  );
}

export default App;
