import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      const secs = now.getSeconds().toString().padStart(2, '0');
      const period = now.getHours() >= 12 ? 'PM' : 'AM';
      setTime(`IN — ${hours}:${mins}:${secs} ${period}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="header-clock">{time}</span>;
}
