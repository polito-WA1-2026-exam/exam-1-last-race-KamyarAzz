import {Segment} from "../../../../types/network";

type Props = {segment: Segment; isEndSegment?: boolean; delay: number};

export default function SegmentCard({segment, isEndSegment, delay}: Props) {
  return isEndSegment ? (
    <div
      style={{
        animation: `fadeInLeft 400ms ease ${delay}s forwards`,
        opacity: 0,
      }}
      className="flex gap-4"
    >
      <p className="w-32 text-end text-white font-bold">{segment.to}</p>
      <div className="flex flex-col h-full items-center">
        <div
          style={{borderColor: segment.line, boxSizing: "border-box"}}
          className="w-5 h-5 border-5 rounded-full shrink-0"
        />
      </div>
    </div>
  ) : (
    <div className="flex h-full gap-4">
      <p
        style={{
          animation: `fadeInLeft 400ms ease ${delay}s forwards`,
          opacity: 0,
        }}
        className="w-32 text-end text-white font-bold"
      >
        {segment.from}
      </p>
      <div className="flex flex-col h-full items-center">
        <div
          style={{
            animation: `fadeInLeft 400ms ease ${delay}s forwards`,
            opacity: 0,
            borderColor: segment.line,
            boxSizing: "border-box",
          }}
          className="w-5 h-5 border-5 rounded-full shrink-0"
        />
        <div
          style={{
            animation: `growHeight 700ms ease ${delay + 0.2}s forwards`,
            transformOrigin: "top",
            borderColor: segment.line,
            opacity: 0,
          }}
          className="border-l-4 border-b-4 h-full"
        />
      </div>
    </div>
  );
}
