import type { Colourway, OffTheRailProduct } from "@/types/off-the-rail";

interface OffTheRailCaptionProps {
  product: OffTheRailProduct | null;
  colour: Colourway | null;
  count: number;
  fromPrice: number;
  hint: string;
  onSeeAvailability: () => void;
}

export function OffTheRailCaption({ product, colour, count, fromPrice, hint, onSeeAvailability }: OffTheRailCaptionProps) {
  return (
    <div className="otr-caption">
      <div className="otr-caption__inner" key={product ? `${product.id}-${colour?.id}` : "intro"} aria-live="polite">
        {product ? (
          <>
            <h2 className="otr-title otr-caption__name">{product.name}</h2>
            <div className="otr-caption__meta otr-ui">
              <span className="otr-caption__price">£{product.price}</span>
              <span className="otr-sep" aria-hidden="true" />
              <span className="otr-dots" aria-hidden="true">
                {product.colourways.map((c) => (
                  <span key={c.id} className="otr-dot" style={{ background: c.hex }} />
                ))}
              </span>
              <span>
                {product.status === "drops_friday"
                  ? "Drops Friday"
                  : `${product.colourways.length} colours`}
              </span>
            </div>
          </>
        ) : (
          <>
            <h2 className="otr-title otr-caption__name">This week&apos;s rail</h2>
            <div className="otr-caption__meta otr-ui">
              <span>{count} pieces</span>
              <span className="otr-sep" aria-hidden="true" />
              <span>From £{fromPrice}</span>
              <span className="otr-sep" aria-hidden="true" />
              <span>{hint}</span>
            </div>
          </>
        )}
      </div>
      <button type="button" className="otr-pill-btn otr-ui" onClick={onSeeAvailability}>
        See availability
      </button>
    </div>
  );
}
