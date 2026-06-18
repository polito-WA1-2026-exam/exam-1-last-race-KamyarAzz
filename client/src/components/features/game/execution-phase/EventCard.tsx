import {GameEvent} from "../../../../types/network";

type Props = {event: GameEvent};

export default function EventCard({event}: Props) {
  return (
    <div className="rounded-md p-2 border-2 flex flex-col gap-2 my-6 min-w-64">
      <p className="font-bold">Event: {event.description}</p>
      <p>
        Effect:{" "}
        <span className={event.effect > 0 ? "text-green-600" : "text-red-600"}>
          {event.effect > 0 && "+"}
          {event.effect} Coins
        </span>
      </p>
    </div>
  );
}
