import InstructionItem from "./InstructionItem";

export default function Instructions() {
  const instructions = [
    {
      title: "Study the underground network.",
      text: "Memorize the stations and connections.",
    },
    {
      title: "Plan your route.",
      text: "You will have 90 seconds to plan your route from start to destination",
    },
    {
      title: "Face random events.",
      text: "Each segments has a random event that can make you gain or lose coins.",
    },
    {
      title: "Reach your destination.",
      text: "Try to arrive with the highest score.",
    },
  ];

  return (
    <div className="w-full gap-2 min-w-75 flex flex-col">
      <h2 className="pb-2">📖 How to Play</h2>
      <div className="flex flex-col gap-5">
        {instructions.map((instruction, index) => (
          <InstructionItem
            key={index}
            i={index + 1}
            title={instruction.title}
            text={instruction.text}
          />
        ))}
      </div>
    </div>
  );
}
