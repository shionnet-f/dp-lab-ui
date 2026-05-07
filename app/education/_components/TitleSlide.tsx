type TitleSlideProps = {
  subtitle?: string;
};

export default function TitleSlide({ subtitle }: TitleSlideProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      {subtitle ? (
        <p className="max-w-[920px] text-[28px] leading-[1.8] tracking-[0.01em] text-gray-700">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
