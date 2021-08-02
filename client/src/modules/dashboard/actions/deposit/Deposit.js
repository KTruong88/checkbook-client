import { useState, useRef } from 'react';

import Button from '../../../common/button/Button';
import Modal from '../../../common/modal/Modal';

import './Deposit.scss';

const Deposit = ({ checking, saving, clickHandler, dispatch }) => {
  const [selectedAccount, setSelectedAccount] = useState('checking');
  const [depositAmount, setDepositAmount] = useState(null);

  const accountHandler = (e) => setSelectedAccount(e.target.value);
  const depositAmountHandler = (e) => setDepositAmount(e.target.value);

  const depositHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: selectedAccount, payload: Number(depositAmount) });
  };

  const depositInputRef = useRef();
  const cancelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDepositAmount(0);
    depositInputRef.current.value = 0;
  };
  return (
    <>
      <Modal title='Select an account to deposit'>
        <form onSubmit={depositHandler} className='account-dropdown__container'>
          <label htmlFor='account-dropdown'>Deposit to: </label>
          <select
            onChange={accountHandler}
            className='account-dropdown'
            name='account-dropdown'
            id='account-dropdown'
          >
            <option value='checking'>{`Checkings Account: $${checking}`}</option>
            <option value='saving'>{`Savings Account: $${saving}`}</option>
          </select>

          <label htmlFor='deposit'>Amount: </label>
          <input
            ref={depositInputRef}
            onChange={depositAmountHandler}
            className='deposit-input'
            type='input'
            name='deposit'
          />

          <div className='account-dropdown__buttons'>
            <button onClick={cancelHandler}>Cancel</button>
            <button type='submit'>Deposit</button>
          </div>
        </form>
      </Modal>
      <Button
        styling={'action-deposit'}
        clickHandler={clickHandler}
        title='Deposit'
      />
    </>
  );
};

export default Deposit;
