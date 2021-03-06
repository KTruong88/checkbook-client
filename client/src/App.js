import { useReducer } from 'react';

// custom hooks
import useLastActivity from './modules/hooks/useLastActivity';

// components
import ActivityList from './modules/dashboard/activity-list/ActivityList';
import AccountActions from './modules/dashboard/actions/account-actions/AccountActions';

// mocks and configs
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
  const [lastActivity, setLastActivity] = useLastActivity();

  const accountActionHandler = (type, amount = 0) => {
    dispatch({ type, payload: amount });

    const [date, timeStamp] = new Date(Date.now()).toLocaleString().split(',');
    const action =
      amount >= 0
        ? `Deposit into ${type} account`
        : `Withdrew from ${type} account`;
    setLastActivity((prevState) => {
      return [
        {
          date,
          timeStamp,
          action,
          amount,
        },
        ...prevState,
      ];
    });
  };

  const { checkingAccountBalance, savingAccountBalance } = state;
  const totalAvailabletBalance = checkingAccountBalance + savingAccountBalance;

  return (
    <div className='app-container'>
      <div className='app-container__inner'>
        <h1 className='app-container__acc--balance'>{`Available Balance: ${totalAvailabletBalance}`}</h1>
        <h3>{`Checkings Account: ${checkingAccountBalance}`}</h3>
        <h3>{`Savings Account: ${savingAccountBalance}`}</h3>
        <div className='app-container__actions'>
          <AccountActions
            checking={checkingAccountBalance}
            saving={savingAccountBalance}
            accountActionHandler={accountActionHandler}
          />
        </div>
        <ActivityList accountActivity={lastActivity} />
      </div>
    </div>
  );
}

export default App;
