'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Today component displays the current date and updates at midnight.
const Today = () => {
  // Initialize state with today's formatted date.
  const [today, setToday] = useState(format(new Date(), 'PPP'));

  useEffect(() => {
    const now = new Date();

    // Calculate milliseconds until midnight.
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    // Set a timeout to update the date when midnight is reached.
    const timer = setTimeout(() => {
      setToday(format(new Date(), 'PPP'));
    }, msUntilMidnight);

    // Cleanup the timeout when the component unmounts or updates.
    return () => clearTimeout(timer);
  }, [today]); // Dependency on 'today' ensures the effect runs after update.

  return <>{today}</>;
};

export default Today;
