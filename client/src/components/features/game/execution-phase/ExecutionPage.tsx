import EventCard from "./EventCard";
import SegmentCard from "./SegmentCard";
import CoinCard from "./CoinCard";
import {useGameContext} from "../../../../context/GameContext";

export default function ExecutionPage() {
  const {selectedSegments, events, baseCoin} = useGameContext();
  const segments = selectedSegments;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2>3. Execution Phase</h2>
      <div className="flex gap-8 p-2 justify-between w-full h-full">
        <div className="flex flex-col  text-sm">
          {segments.map((segment, i) => {
            const event = events.length
              ? events[i % events.length]
              : {description: "No event", effect: 0};
            const evDelay = `${i + 0.8 + 0.8}s`;
            return (
              <div
                key={`${segment.from}-${segment.to}-${i}`}
                className="flex items-start gap-4 min-h-24"
              >
                <SegmentCard segment={segment} delay={i + 0.8} />
                <div
                  style={{
                    animation: `fadeInUp 700ms ease ${evDelay} forwards`,
                    opacity: 0,
                  }}
                >
                  <EventCard event={event} />
                </div>
              </div>
            );
          })}

          {segments.length > 0 && (
            <SegmentCard
              delay={segments.length + 0.7}
              isEndSegment={true}
              segment={segments[segments.length - 1]}
            />
          )}
        </div>
        <CoinCard baseCoin={baseCoin} events={events} />
      </div>
    </div>
  );
}
