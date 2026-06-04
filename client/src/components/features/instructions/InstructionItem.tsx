type Props = {
  i: number;
  title: string;
  text: string;
};

export default function InstructionItem({i, title, text}: Props) {
  return (
    <div className="flex gap-5">
      <div className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-600 text-white">
        {i}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold">{title}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
