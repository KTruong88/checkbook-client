import { useState, useRef } from 'react';

import Modal from '../../../common/modal/Modal';
import Form from './form/Form';

import './AccountActions.scss';

const AccountActions = ({ checking, saving, accountActionHandler }) => {
  const [accountType, setAccountType] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('checking');
  const [transactionAmount, setTransactionAmount] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);

  const accountHandler = (e) => setSelectedAccount(e.target.value);
  const transactionAmountHandler = (e) => setTransactionAmount(e.target.value);
  const modalHandler = () => setModalStatus(!modalStatus);

  // Handle withdraw and deposit actions
  const transactionHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    accountActionHandler(
      selectedAccount,
      accountType === 'deposit'
        ? Number(transactionAmount)
        : -Math.abs(Number(transactionAmount))
    );
    setTransactionAmount(0);
    transactionInputRef.current.value = 0;
  };

  const transactionInputRef = useRef();
  const cancelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTransactionAmount(0);
    transactionInputRef.current.value = 0;
  };
  const withdrawClickHandler = () => {
    setAccountType('withdraw');
    return modalHandler();
  };
  const depositClickHandler = () => {
    setAccountType('deposit');
    return modalHandler();
  };
  const accountTypeTitle =
    accountType === 'withdraw'
      ? 'Select an account for withdrawal'
      : 'Select an account to deposit';
  return (
    <>
      {modalStatus && (
        <Modal title={accountTypeTitle} modalHandler={modalHandler}>
          <Form
            {...{
              checking,
              saving,
              transactionHandler,
              transactionInputRef,
              transactionAmountHandler,
              cancelHandler,
              accountHandler,
            }}
          />
        </Modal>
      )}

      <button className='action-transaction' onClick={withdrawClickHandler}>
        Withdraw
      </button>
      <button className='action-transaction' onClick={depositClickHandler}>
        Deposit
      </button>
    </>
  );
};

export default AccountActions;
