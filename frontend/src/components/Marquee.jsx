export default function Marquee({
  items,
  className = "",
  itemClassName = "",
  separator = "✦",
  reverse = false,
  speed = 28,
}) {
  const loop = [...items, ...items];

  return (
    <div className={`group overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: `${speed}s`,
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className={`flex shrink-0 items-center gap-3 whitespace-nowrap ${itemClassName}`}
          >
            {item}
            {separator && (
              <span aria-hidden="true" className="opacity-50">
                {separator}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
