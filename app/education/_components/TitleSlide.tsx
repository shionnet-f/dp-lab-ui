
/* === education patch: block renderer === */
const renderBlock = (block, i) => {
  if (block && typeof block === 'object') {
    if (block.type === 'text') {
      return <p key={i} className="text-block">{block.content}</p>;
    }
    if (block.type === 'list' && Array.isArray(block.items)) {
      return (
        <ul key={i} className="list-block">
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    }
  }
  // fallback for string lines
  if (typeof block === 'string') {
    if (block.trim() === '') return null;
    return <p key={i} className="text-block">{block}</p>;
  }
  return null;
};

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
