import {useEffect, useState} from "react";

type TimerProps = {
  seconds: number;
  onTimeout?: () => void;
};

export default function Timer({seconds, onTimeout}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;

  return (
    <span className={timeLeft <= 10 ? "text-red-600" : "text-white"}>
      {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </span>
  );
}
