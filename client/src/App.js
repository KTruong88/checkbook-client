import { useState, useReducer } from 'react';

import ActivityList from './modules/dashboard/activity-list/ActivityList';
import Withdraw from './modules/dashboard/actions/withdraw/Withdraw';
import Deposit from './modules/dashboard/actions/deposit/Deposit';
import Transfer from './modules/dashboard/actions/transfer/Transfer';
import lastActivityMock from './modules/config/last-activity-mock';
import savingsAccountMock from './modules/config/savings-account-mock';
import checkingsAccountMock from './modules/config/checkings-account-mock';

import './App.scss';

const initialState = {
  status: 'idle',
  checkingAccountBalance: checkingsAccountMock(),
  savingAccountBalance: savingsAccountMock(),
  type: '',
  error: false,
};

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'checking': {
        return {
          ...state,
          checkingAccountBalance: state.checkingAccountBalance + action.payload,
        };
      }
      case 'saving': {
        console.log(state);
        return {
          ...state,
          savingAccountBalance: state.savingAccountBalance + action.payload,
        };
      }
      case 'transferCheckingToSaving': {
        return {
          ...state,
          savingAccountBalance: state.savingAccountBalance + action.payload,
          ...state,
          checkingAccountBalance: state.checkingAccountBalance - action.payload,
        };
      }
      case 'transferSavingToChecking': {
        return {
          ...state,
          savingAccountBalance: state.savingAccountBalance - action.payload,
          ...state,
          checkingAccountBalance: state.checkingAccountBalance + action.payload,
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastActivity, setLastActivity] = useState(lastActivityMock);

  const savingsAccountHandler = (amount = 0) => {
    dispatch({ type: 'saving', payload: amount });
    const [date, timeStamp] = new Date(Date.now()).toLocaleString().split(',');
    setLastActivity((prevState) => {
      return [
        {
          date,
          timeStamp,
          action: `Deposit into savings account`,
          amount,
        },
        ...prevState,
      ];
    });
  };

  const { checkingAccountBalance, savingAccountBalance, accountActivity } =
    state;
  const totalAvailabletBalance = checkingAccountBalance + savingAccountBalance;

  return (
    <div className='app-container'>
      <div className='app-container__inner'>
        <h1 className='app-container__acc--balance'>{`Available Balance: ${totalAvailabletBalance}`}</h1>
        <h3>{`Checkings Account: ${checkingAccountBalance}`}</h3>
        <h3>{`Savings Account: ${savingAccountBalance}`}</h3>
        <div className='app-container__actions'>
          <Withdraw />
          <Deposit clickHandler={savingsAccountHandler} />
          <Transfer />
        </div>
        <ActivityList accountActivity={lastActivity} />
      </div>
    </div>
  );
}

export default App;
