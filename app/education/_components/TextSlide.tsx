type TextBlock =
  | string
  | {
      type: "text";
      content: string;
    }
  | {
      type: "list";
      items: string[];
    };

type TextSlideProps = {
  body: TextBlock[];
};

function renderBlock(block: TextBlock, i: number) {
  if (typeof block === "string") {
    if (block.trim() === "") return null;
    return (
      <p key={i} className="text-[30px] leading-[1.85] tracking-[0.01em] text-gray-800">
        {block}
      </p>
    );
  }

  if (block.type === "text") {
    return (
      <p key={i} className="text-[30px] leading-[1.85] tracking-[0.01em] text-gray-800">
        {block.content}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={i} className="list-disc space-y-[16px] pl-[36px] text-[30px] leading-[1.7] text-gray-800">
        {block.items.map((item, j) => (
          <li key={j}>{item}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default function TextSlide({ body }: TextSlideProps) {
  return <div className="space-y-[28px]">{body.map((b, i) => renderBlock(b, i))}</div>;
}
