/**
 * Animates a copy of a product image from `source` into the visible cart icon
 * (any element with [data-cart-target] that is currently on screen), then
 * makes the icon "gulp". Pure DOM + Web Animations, so it never re-renders React.
 */
export function flyToCart(source: Element | null | undefined, imageSrc: string) {
  if (!source || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const target = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]")).find((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
  });
  if (!target) return;

  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = Math.min(Math.max(Math.min(from.width, from.height), 60), 140);

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  Object.assign(img.style, {
    position: "fixed",
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    objectFit: "contain",
    zIndex: "9999",
    pointerEvents: "none",
    filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.25))",
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(img);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const flight = img.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 120}px) scale(0.7) rotate(-20deg)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12) rotate(25deg)`, opacity: 0.4 },
    ],
    { duration: 800, easing: "cubic-bezier(0.5, 0, 0.3, 1)" }
  );

  flight.onfinish = () => {
    img.remove();
    target.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.35) rotate(-8deg)" },
        { transform: "scale(0.92) rotate(6deg)" },
        { transform: "scale(1)" },
      ],
      { duration: 450, easing: "ease-out" }
    );
  };
}
