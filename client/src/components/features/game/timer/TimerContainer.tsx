import Timer from "./Timer";

type Props = {timeoutHandler: () => void; seconds: number};

export default function TimerContainer({timeoutHandler, seconds}: Props) {
  return (
    <div className="flex gap-2 items-center bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm">
      <p className="font-medium">Time left:</p>
      <Timer seconds={seconds} onTimeout={timeoutHandler} />
    </div>
  );
}
