import {GameEvent} from "../../../../types/network";

type Props = {event: GameEvent};

export default function EventCard({event}: Props) {
  return (
    <div className="rounded-md p-2 border-2 flex flex-col gap-2 my-6 min-w-64">
      <p className="font-bold">{event.description}</p>
      <p>Coins: {event.effect}</p>
    </div>
  );
}
