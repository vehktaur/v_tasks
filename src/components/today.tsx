'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Today = () => {
  const [today, setToday] = useState(format(new Date(), 'PPP'));

  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timer = setTimeout(() => {
      setToday(format(new Date(), 'PPP'));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [today]);

  return <>{today}</>;
};

export default Today;
