type TitleSlideProps = {
  subtitle?: string;
};

export default function TitleSlide({ subtitle }: TitleSlideProps) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      {subtitle ? (
        <p className="max-w-3xl text-xl leading-9 text-gray-700">{subtitle}</p>
      ) : null}
    </div>
  );
}
