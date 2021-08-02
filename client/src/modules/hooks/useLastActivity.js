import { useState } from 'react';
import lastActivityMock from '../config/last-activity-mock';

const useLastActivity = () => {
  const [lastActivity, setLastActivity] = useState(lastActivityMock);

  return [lastActivity, setLastActivity];
};

export default useLastActivity;
