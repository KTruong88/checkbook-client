import './ActivityList.scss';

const ActivityList = ({ accountActivity }) => {
  return (
    <>
      <div className='activity-list__header'>
        <span className='activity-list__header-date'>Date:</span>
        <span className='activity-list__header-time'>Time:</span>
        <span className='activity-list__header-action'>Action:</span>
      </div>
      <ul className='activity-list'>
        {accountActivity.length > 0 &&
          accountActivity.map((el, i) => {
            return (
              <li className='activity-list__item' key={i}>
                <span className='activity-list__item-date'>{el.date}</span>
                <span className='activity-list__item-time'>{el.timeStamp}</span>
                <span className='activity-list__item-action'>{el.action}</span>
                <span className='activity-list__item-amount'>
                  {`$ ${el.amount >= 0 ? '+' : null}${el.amount}`}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ActivityList;
