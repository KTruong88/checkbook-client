import Button from '../../../common/button/Button';

import './Deposit.scss';

const Deposit = ({ clickHandler }) => {
  return <Button styling={'action-deposit'} clickHandler={clickHandler} title='Deposit' />;
};

export default Deposit;
