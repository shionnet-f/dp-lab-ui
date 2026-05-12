type TitleSlideProps = {
  subtitle?: string;
};

export default function TitleSlide({ subtitle }: TitleSlideProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      {subtitle ? (
        <p className="w-full max-w-[1320px] whitespace-nowrap text-[32px] leading-[1.75] tracking-[0.01em] text-gray-700">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
