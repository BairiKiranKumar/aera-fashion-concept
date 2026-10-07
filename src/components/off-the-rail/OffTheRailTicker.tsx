const ITEMS = [
  "New designs every Friday",
  "Subscribe to our newsletter",
  "Free UK delivery over £60",
  "Printed and stitched in London",
];

export function OffTheRailTicker() {
  // two identical halves, each wider than any screen, so the -50% loop is seamless
  const group = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="otr-ticker otr-ui" aria-label={ITEMS.join(". ")} role="marquee">
      <div className="otr-ticker__track" aria-hidden="true">
        {[0, 1].map((half) => (
          <div className="otr-ticker__group" key={half}>
            {group.map((text, i) => (
              <span className="otr-ticker__item" key={i}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
