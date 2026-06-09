import type {Segment} from "../../../../types/network";

type Props = {
  segment: Segment;
  clickHandler: (segment: Segment) => void;
};

export default function SegmentItem({segment, clickHandler}: Props) {
  return (
    <div
      onClick={() => clickHandler(segment)}
      className="flex justify-center cursor-pointer hover:bg-blue-700 duration-150 gap-2 p-2 text-sm rounded-md bg-blue-800"
    >
      <div>{segment.from}</div>
      <div>→</div>
      <div>{segment.to}</div>
    </div>
  );
}
