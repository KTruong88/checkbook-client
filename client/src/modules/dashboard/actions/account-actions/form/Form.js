const Form = ({
  checking,
  saving,
  transactionHandler,
  transactionInputRef,
  transactionAmountHandler,
  cancelHandler,
  accountHandler,
}) => {
  return (
    <>
      <form
        onSubmit={transactionHandler}
        className='account-dropdown__container'
      >
        <label htmlFor='account-dropdown'>Transaction for: </label>
        <select
          onChange={accountHandler}
          className='account-dropdown'
          name='account-dropdown'
          id='account-dropdown'
        >
          <option value='checking'>{`Checkings Account: $${checking}`}</option>
          <option value='saving'>{`Savings Account: $${saving}`}</option>
        </select>

        <label htmlFor='transaction'>Amount: </label>
        <input
          ref={transactionInputRef}
          onChange={transactionAmountHandler}
          className='transaction-input'
          type='input'
          name='transaction'
        />

        <div className='account-dropdown__buttons'>
          <button onClick={cancelHandler}>Cancel</button>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Form;
