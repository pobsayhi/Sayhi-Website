import { useEffect, useState } from 'react';

// สร้าง formatter ครั้งเดียวนอก hook เพื่อไม่ต้องสร้าง object ใหม่ทุกวินาที
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Bangkok',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/**
 * useLocalTime — คืนเวลาท้องถิ่นกรุงเทพฯ รูปแบบ "HH:MM"
 * อัปเดตทุกวินาที และ clearInterval ตอน unmount
 */
function useLocalTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timeFormatter.format(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
}

export default useLocalTime;
