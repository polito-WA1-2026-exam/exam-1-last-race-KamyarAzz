import {useState} from "react";
import SegmentItem from "./SegmentItem";
import type {Segment} from "../../../../types/network";

type Props = {segments: Segment[]};

export default function GameRoutesContainer({segments}: Props) {
  const [availableSegments, setAvailableSegments] =
    useState<Segment[]>(segments);
  const [chosenRoutes, setChosenRoutes] = useState<Segment[]>([]);

  const isSameSegment = (a: Segment, b: Segment) => {
    return a.line === b.line && a.from === b.from && a.to === b.to;
  };

  const addSegment = (segment: Segment) => {
    setChosenRoutes((prev) => [...prev, segment]);

    setAvailableSegments((prev) =>
      prev.filter((s) => !isSameSegment(s, segment)),
    );
  };

  const removeSegment = (segment: Segment) => {
    setChosenRoutes((prev) => prev.filter((s) => !isSameSegment(s, segment)));

    setAvailableSegments((prev) => [...prev, segment]);
  };

  return (
    <div className="w-full h-full flex gap-4 text-white ">
      <div className="rounded-md border p-2 flex-2 overflow-auto min-h-0">
        <h3 className="mb-2 font-bold">Available Segments</h3>
        <div className="gap-2 overflow-auto grid grid-cols-2">
          {availableSegments.map((segment) => (
            <SegmentItem
              clickHandler={addSegment}
              key={`${segment.line}-${segment.from}-${segment.to}`}
              segment={segment}
            />
          ))}
        </div>
      </div>
      <div className="rounded-md border p-2 flex-1 overflow-auto min-h-0">
        <h3 className="mb-2 font-bold">Your Route</h3>
        {chosenRoutes.length === 0 ? (
          <p className="text-center">No route selected.</p>
        ) : (
          <div className="gap-2 overflow-auto flex flex-col">
            {chosenRoutes.map((segment) => (
              <SegmentItem
                clickHandler={removeSegment}
                key={`${segment.line}-${segment.from}-${segment.to}`}
                segment={segment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
