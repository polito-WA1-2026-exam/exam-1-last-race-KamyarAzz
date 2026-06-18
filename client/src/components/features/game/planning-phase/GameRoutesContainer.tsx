import {useState} from "react";
import SegmentItem from "./SegmentItem";
import type {Segment} from "../../../../types/network";

type Props = {
  segments: Segment[];
  chosenRoutes: Segment[];
  setChosenRoutes: React.Dispatch<React.SetStateAction<Segment[]>>;
};

export default function GameRoutesContainer({
  segments,
  chosenRoutes,
  setChosenRoutes,
}: Props) {
  const [availableSegments, setAvailableSegments] =
    useState<Segment[]>(segments);

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
    <div className="w-full h-full flex gap-4 text-white min-h-0 min-w-0 overflow-auto">
      <div className="rounded-md border p-2 flex-none min-w-80 bg-slate-900 max-w-140 overflow-auto min-h-0">
        <h3 className="mb-2 font-bold">Available Segments</h3>
        <div className="gap-2 overflow-auto grid grid-cols-1 sm:grid-cols-2 min-w-0">
          {availableSegments.map((segment) => (
            <SegmentItem
              clickHandler={addSegment}
              key={`${segment.line}-${segment.from}-${segment.to}`}
              segment={segment}
            />
          ))}
        </div>
      </div>
      <div className="rounded-md border p-2 flex-none min-w-67.5 bg-slate-900 max-w-140 overflow-auto min-h-0">
        <h3 className="mb-2 font-bold">Your Route</h3>
        {chosenRoutes.length === 0 ? (
          <p className="text-center text-sm mt-2">No route selected.</p>
        ) : (
          <div className="gap-2 overflow-auto flex flex-col min-w-0">
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
