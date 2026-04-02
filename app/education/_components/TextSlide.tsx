type TextSlideProps = {
  body: string[];
};

export default function TextSlide({ body }: TextSlideProps) {
  return (
    <div className="space-y-5">
      {body.map((line, index) => (
        <p key={index} className="text-lg leading-9 text-gray-800">
          {line}
        </p>
      ))}
    </div>
  );
}
