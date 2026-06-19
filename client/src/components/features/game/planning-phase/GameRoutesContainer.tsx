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
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 text-white min-h-0">
      <div className="flex-1 flex flex-col rounded-xl border border-slate-700 bg-slate-900 min-h-75 lg:min-h-0 overflow-hidden shadow-lg">
        <div className="bg-slate-800 p-3 border-b border-slate-700 shrink-0">
          <h3 className="font-bold text-center">Available Segments</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {availableSegments.map((segment) => (
              <SegmentItem
                clickHandler={addSegment}
                key={`${segment.line}-${segment.from}-${segment.to}`}
                segment={segment}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col rounded-xl border border-slate-700 bg-slate-900 min-h-75 lg:min-h-0 overflow-hidden shadow-lg">
        <div className="bg-slate-800 p-3 border-b border-slate-700 shrink-0">
          <h3 className="font-bold text-center">Your Route</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {chosenRoutes.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-center text-sm text-slate-400">
                No route selected.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
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
    </div>
  );
}
