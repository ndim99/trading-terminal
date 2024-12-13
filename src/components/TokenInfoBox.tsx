interface TokenInfoBoxProps {
  isLoading: boolean;
  title: string;
  value: number | string;
}

export default function TokenInfoBox({
  isLoading,
  title,
  value,
}: TokenInfoBoxProps) {
  return (
    <div className="flex flex-col items-center text-center p-2 rounded-md border border-gray-600 w-full">
      {isLoading ? (
        <p className="2xl:h-[16px] lg:h-[14px] h-[12px] w-1/2 animate-pulse duration-300 bg-gray-700" />
      ) : (
        <p className="fontSizeFromBase font-normal text-secondary-colors">
          {title}
        </p>
      )}
      {isLoading ? (
        <p className="2xl:h-[18px] lg:h-[16px] h-[14px] w-1/2 animate-pulse duration-300 bg-gray-700" />
      ) : (
        <p className="fontSizeFromLg font-semibold text-primary-colors">
          {value}
        </p>
      )}
    </div>
  );
}
