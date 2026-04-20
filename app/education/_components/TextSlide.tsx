
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

type TextSlideProps = {
  body: string[];
};

export default function TextSlide({ body }: TextSlideProps) {
  return (
    <div className="space-y-5">
      {body.map((b, i) => renderBlock(b, i))}
    </div>
  );
}
