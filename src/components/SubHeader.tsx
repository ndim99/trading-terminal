interface SubHeaderProps {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}
export default function SubHeader({ screen, setScreen }: SubHeaderProps) {
  const TitleBox = ({ title }: { title: string }) => {
    return (
      <button
        onClick={() => setScreen(title)}
        className={`${
          screen === title
            ? "bg-gray-800 text-primary-colors"
            : "text-secondary-colors"
        } outline-0 rounded-md fontSizeFromLg font-normal w-full p-1.5`}
      >
        {title}
      </button>
    );
  };

  return (
    <div className="w-full rounded-md bg-[#010109] p-1 lg:hidden flex items-center gap-1 border border-gray-600 ">
      <TitleBox title={"Trade"} />
      <TitleBox title={"Chart"} />
      <TitleBox title={"Info"} />
      <TitleBox title={"Orders"} />
    </div>
  );
}
