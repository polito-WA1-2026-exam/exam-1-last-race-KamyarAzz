type Props = {
  position: "left" | "right";
};

export default function StationElement({position}: Props) {
  return (
    <div
      className={`absolute flex ${position === "left" ? "left-12 top-10 bottom-0" : "bottom-10 top-0 right-12 items-end"}`}
    >
      {position === "left" ? (
        <>
          <div className="w-5 h-5 border-5 rounded-full border-red-500" />
          <div className="flex-1 h-full w-16 border-r-4 border-t-4 border-red-500 mt-2" />
        </>
      ) : (
        <>
          <div className="flex-1 h-full w-16 border-l-4 border-b-4 border-yellow-500 mb-2" />
          <div className="w-5 h-5 border-5 rounded-full border-yellow-500" />
        </>
      )}
    </div>
  );
}
