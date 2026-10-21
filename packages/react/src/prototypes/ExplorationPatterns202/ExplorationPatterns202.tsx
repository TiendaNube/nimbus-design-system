import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Card } from "@nimbus-ds/card";
import { Divider } from "@nimbus-ds/divider";
import { Link } from "@nimbus-ds/link";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import {
  CashierIcon,
  CheckIcon,
  CloseIcon,
  GenerativeStarsIcon,
} from "@nimbus-ds/icons";

/**
 * Exploration for TiendaNube/nimbus-patterns#202: PlanDisplay on mobile (Plans 2.0).
 * Core Storybook cannot import @nimbus-ds/patterns, so the cards below are a faithful local
 * recomposition of the new PlanDisplay (Card with ribbon / gradient, Header, Price, Content,
 * Bullet, Footer, Spacing), read from nimbus-patterns at the recorded revision, using the
 * same sample content as its Default story. The mobile view is a ScrollPane carousel: one
 * card per viewport with the neighbours peeking, plus a dots indicator synced to scroll.
 */

type PlanBullet = {
  label: string;
  icon: "check" | "close" | "stars";
  disabled?: boolean;
  badge?: string;
};

export type PlanData = {
  id: string;
  subtitle: string;
  tag?: { label: string; appearance: "neutral" | "primary" };
  ribbonLabel?: string;
  gradient?: boolean;
  price: string;
  previousPrice?: string;
  period?: string;
  annualNote?: { text: string; highlight?: string };
  description: string;
  cta: string;
  ctaAppearance?: "primary" | "neutral";
  bullets: PlanBullet[];
  footer?: { before: string; link: string; after: string };
};

const PLAN_INICIAL: PlanData = {
  id: "inicial",
  subtitle: "Inicial",
  price: "Gratis",
  description: "Todo lo que necesitas para empezar a vender online.",
  cta: "Comenzar gratis",
  bullets: [
    { label: "Tu tienda lista para empezar a vender", icon: "check" },
    { label: "Productos y visitas sin límite", icon: "check" },
    { label: "Medios de pago y envío de Tiendanube", icon: "check" },
    { label: "Carga masiva de productos", icon: "close", disabled: true },
    { label: "Dominio propio", icon: "close", disabled: true },
  ],
};

const PLAN_ESENCIAL: PlanData = {
  id: "esencial",
  subtitle: "Esencial",
  tag: { label: "Plan actual", appearance: "neutral" },
  price: "$24.999",
  previousPrice: "$29.999",
  period: "/mes",
  annualNote: { text: "$269.990/año.", highlight: "Ahorra $30.000." },
  description: "Potenciá tu marca y vendé como una tienda profesional.",
  cta: "Subir de plan",
  bullets: [
    { label: "Incluye todo lo del plan anterior, más:", icon: "check" },
    { label: "Carga masiva de productos", icon: "check" },
    { label: "Dominio propio", icon: "check" },
    { label: "Campos personalizados en productos y órdenes", icon: "close", disabled: true },
    { label: "Hasta 3 tablas de precios mayoristas", icon: "close", disabled: true },
  ],
};

const PLAN_AVANZADO: PlanData = {
  id: "avanzado",
  subtitle: "Avanzado",
  ribbonLabel: "Más escogido",
  price: "$219.999",
  period: "/mes",
  description: "Gestión avanzada y control total para tu negocio.",
  cta: "Subir de plan",
  ctaAppearance: "primary",
  bullets: [
    { label: "Incluye todo lo del plan anterior, más:", icon: "check" },
    { label: "Campos personalizados en productos y órdenes", icon: "check" },
    { label: "Hasta 3 tablas de precios mayoristas", icon: "check", badge: "Nuevo" },
    { label: "IA ilimitada para potenciar tu gestión", icon: "stars" },
    { label: "Soporte prioritario y ejecutivo de cuenta", icon: "close", disabled: true },
  ],
  footer: { before: "Obtén", link: "Punto de venta Plus", after: "extra por $149.90/mes" },
};

const PLAN_EVOLUCION: PlanData = {
  id: "evolucion",
  subtitle: "Evolución",
  gradient: true,
  price: "$439.999",
  period: "/mes",
  description: "La solución completa para escalar sin límites.",
  cta: "Subir de plan",
  bullets: [
    { label: "Incluye todo lo del plan anterior, más:", icon: "check" },
    { label: "Soporte prioritario y ejecutivo de cuenta", icon: "check" },
    { label: "IA ilimitada para potenciar tu gestión", icon: "stars" },
  ],
};

export const SAMPLE_PLANS: PlanData[] = [PLAN_INICIAL, PLAN_ESENCIAL, PLAN_AVANZADO];

/** Four-plan sample (the new PlanDisplay Default story), for the 4-plan stories. */
export const SAMPLE_PLANS_FOUR: PlanData[] = [...SAMPLE_PLANS, PLAN_EVOLUCION];

const BULLET_ICONS = {
  check: <CheckIcon />,
  close: <CloseIcon />,
  stars: <GenerativeStarsIcon />,
};

// Same exception as PlanDisplay.Card: Box exposes neither a top-only radius nor a negative margin.
const RIBBON_STYLE: React.CSSProperties = {
  borderTopLeftRadius: "var(--nimbus-shape-border-radius-2)",
  borderTopRightRadius: "var(--nimbus-shape-border-radius-2)",
  marginBottom: "calc(var(--nimbus-spacing-2) * -1)",
  overflow: "hidden",
};

// Same gradient as PlanDisplay.Card (`gradient`, ignored when the card has a ribbon).
const GRADIENT_BACKGROUND =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

// Declared exception: Box has no visually-hidden prop.
const VISUALLY_HIDDEN: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

/** Mirrors PlanDisplay.CardSpacing: a divider with my="3". */
const CardSpacing: React.FC = () => (
  <Box my="3">
    <Divider />
  </Box>
);

/** Local recomposition of the new PlanDisplay.Card + Header + Price + Content + Bullet + Footer. */
const PlanCard: React.FC<{ plan: PlanData }> = ({ plan }) => {
  const hasRibbon = Boolean(plan.ribbonLabel);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <div style={RIBBON_STYLE}>
        <Box
          aria-hidden={hasRibbon ? undefined : true}
          display="flex"
          justifyContent="center"
          alignItems="center"
          pt="0-5"
          pb="2"
          backgroundColor={hasRibbon ? "primary-interactive" : undefined}
        >
          <Text fontWeight="medium" color="neutral-background" textAlign="center">
            {plan.ribbonLabel || " "}
          </Text>
        </Box>
      </div>
      <Box
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        padding="4"
        backgroundColor="neutral-background"
        backgroundImage={plan.gradient && !hasRibbon ? GRADIENT_BACKGROUND : undefined}
        borderRadius="2"
        overflow="hidden"
        boxShadow={hasRibbon ? undefined : "2"}
        borderColor={hasRibbon ? "primary-interactive" : undefined}
        borderStyle={hasRibbon ? "solid" : undefined}
        borderWidth={hasRibbon ? "2" : undefined}
      >
        {/* PlanDisplay.Header */}
        <Box display="flex" flexDirection="column" gap="3">
          {plan.tag ? (
            <Box display="flex" justifyContent="space-between" alignItems="center" gap="2">
              <Text fontWeight="bold" fontSize="highlight" color="neutral-textHigh">
                {plan.subtitle}
              </Text>
              <Tag appearance={plan.tag.appearance}>{plan.tag.label}</Tag>
            </Box>
          ) : (
            <Text fontWeight="bold" fontSize="highlight" color="neutral-textHigh">
              {plan.subtitle}
            </Text>
          )}
          {/* PlanDisplay.Price */}
          <Box display="flex" flexDirection="column" gap="2">
            <Box display="flex" alignItems="center" gap="0-5">
              <Title as="h3" color="neutral-textHigh">
                {plan.price}
              </Title>
              {plan.previousPrice && (
                <Text as="span" fontSize="base" textDecoration="line-through">
                  <span style={{ color: "var(--nimbus-colors-neutral-interactivePressed)" }}>
                    {plan.previousPrice}
                  </span>
                </Text>
              )}
              {plan.period && (
                <Text as="span" color="neutral-textHigh">
                  {plan.period}
                </Text>
              )}
            </Box>
            {plan.annualNote && (
              <Text as="p" fontSize="caption" color="neutral-textLow">
                {plan.annualNote.text}{" "}
                {plan.annualNote.highlight && (
                  <Text as="span" color="primary-textLow" fontSize="caption">
                    {plan.annualNote.highlight}
                  </Text>
                )}
              </Text>
            )}
          </Box>
        </Box>
        {/* PlanDisplay.Content: Card.Body + spacing + gap-3 column */}
        <Card.Body>
          <CardSpacing />
          <Box display="flex" flexDirection="column" gap="3">
            <Box display="flex" flexDirection="column" gap="3" pb="2">
              <Text>{plan.description}</Text>
              <Button appearance={plan.ctaAppearance} fullWidth>
                {plan.cta}
              </Button>
            </Box>
            {plan.bullets.map((bullet) => (
              // PlanDisplay.Bullet
              <Box key={bullet.label} display="flex" gap="2" alignItems="center">
                <Box display="flex" alignItems="center">
                  <Text
                    as="span"
                    color={bullet.disabled ? "neutral-interactive" : "primary-interactive"}
                  >
                    <Box as="span" display="flex" alignItems="center">
                      {BULLET_ICONS[bullet.icon]}
                    </Box>
                  </Text>
                </Box>
                <Text
                  fontWeight="regular"
                  color={bullet.disabled ? "neutral-interactive" : "neutral-textLow"}
                >
                  {bullet.label}
                  {bullet.badge && (
                    <>
                      {" "}
                      <span
                        style={{
                          display: "inline-flex",
                          gap: "var(--nimbus-spacing-2)",
                          verticalAlign: "middle",
                        }}
                      >
                        <Tag appearance="primary">{bullet.badge}</Tag>
                      </span>
                    </>
                  )}
                </Text>
              </Box>
            ))}
          </Box>
        </Card.Body>
        {/* PlanDisplay.Footer */}
        {plan.footer && (
          <Box display="flex" flexDirection="column" mt="auto">
            <CardSpacing />
            <Box display="flex" gap="2" alignItems="flex-start">
              <Text as="span" color="primary-interactive">
                <Box as="span" display="flex" alignItems="center">
                  <CashierIcon />
                </Box>
              </Text>
              <Box>
                <Text>
                  {plan.footer.before}{" "}
                  <Link as="a" href="#" appearance="primary" textDecoration="underline">
                    {plan.footer.link}
                  </Link>{" "}
                  {plan.footer.after}
                </Text>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/** Desktop reference: the new PlanDisplay grid (same layout props), recomposed. */
const PlanGrid: React.FC<{ plans: PlanData[]; minPlanWidth?: string }> = ({
  plans,
  minPlanWidth = "236px",
}) => (
  <Box
    display="grid"
    gridTemplateColumns={`repeat(auto-fit, minmax(${minPlanWidth}, 1fr))`}
    gap="6"
    justifyContent="center"
    alignItems="stretch"
  >
    {plans.map((plan) => (
      <PlanCard key={plan.id} plan={plan} />
    ))}
  </Box>
);

/**
 * Dots indicator mirroring ProductUpdates.Paginator (same structure: gap 1-5, 6px dots, active
 * dot elongated to 24px, role="img" with a position label, purely presentational) but with the
 * light-background colors this prototype already used instead of the primary-background ones.
 * Simulates a themable/localizable Paginator; the real one hardcodes colors and English text.
 */
const CarouselDots: React.FC<{
  total: number;
  activeIndex: number;
  getLabel: (index: number, total: number) => string;
}> = ({ total, activeIndex, getLabel }) => (
  <Box
    display="flex"
    flexDirection="row"
    gap="1-5"
    justifyContent="center"
    alignItems="center"
    role="img"
    aria-label={getLabel(activeIndex, total)}
  >
    {Array.from({ length: total }, (_, index) => (
      <Box
        key={`paginator-dot-${index}`}
        width={index === activeIndex ? "24px" : "6px"}
        height="6px"
        borderRadius="full"
        backgroundColor={index === activeIndex ? "primary-interactive" : "neutral-interactive"}
        aria-hidden="true"
      />
    ))}
  </Box>
);

// Visible part of the neighbouring card on each side of the active one, and the gap between cards
// (spacing "3" = 12px). The slide width is derived from them so the active card is always whole.
const PEEK_PX = 28;
const SLIDE_GAP_PX = 12;
// Edge fade: spans the whole peeking part of the neighbour card and ends nearly transparent, so
// it reads as a soft fade and not as a straight cut at the container edge.
const FADE_MAX_PX = PEEK_PX;
const FADE_EDGE_ALPHA = 0.1;
// Side gutter (spacing "4" = 16px) kept before the first card and after the last one.
const GUTTER_PX = 16;
const DRAG_THRESHOLD_PX = 4;

/**
 * Mobile composition: ScrollPane + local dots. ScrollPane has no snap or active-item API, so:
 * - snap is simulated by setting scroll-snap-type on the exposed scroll container ref; the first
 *   card snaps to the start, the last to the end and the ones in between to the centre, so both
 *   ends are shown whole and the neighbours peek;
 * - ScrollPane's own gradients are off. A subtle mask fade is applied to the scroll container
 *   only on the edge that still has content to scroll to: none on the left at the first card,
 *   none on the right at the last one. The fade spans only the visible part of the neighbour card (max 32px) and dims to 55%; the rest stays opaque;
 * - the active index is derived from a scroll listener on that same ref;
 * - mouse drag is simulated (ScrollPane's enableGrabScroll fights scroll-snap), so the carousel
 *   can be tested with a mouse, without a trackpad;
 * - focus/keyboard/region semantics are applied to the container through the ref, because
 *   ScrollPane forwards `rest` props to its outer Box, not to the scrolling element.
 */
const PlanCarousel: React.FC<{
  plans: PlanData[];
  carouselLabel?: string;
  getSlideLabel?: (index: number, total: number) => string;
  getPositionAnnouncement?: (index: number, total: number) => string;
}> = ({
  plans,
  carouselLabel = "Available plans",
  getSlideLabel = (i, t) => `Plan ${i + 1} of ${t}`,
  getPositionAnnouncement = (i, t) => `Plan ${i + 1} of ${t}`,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const getSlides = useCallback(
    () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-plan-slide]") ?? []
      ),
    []
  );

  // Scroll offset that puts slide `index` where its snap alignment says (start / centre / end).
  const getTargetLeft = useCallback(
    (index: number) => {
      const container = containerRef.current;
      const slide = getSlides()[index];
      if (!container || !slide) return 0;
      const maxLeft = container.scrollWidth - container.clientWidth;
      if (index <= 0) return 0;
      if (index >= getSlides().length - 1) return maxLeft;
      const slideRect = slide.getBoundingClientRect();
      const absoluteLeft =
        container.scrollLeft + slideRect.left - container.getBoundingClientRect().left;
      const target = absoluteLeft - (container.clientWidth - slideRect.width) / 2;
      return Math.max(0, Math.min(maxLeft, target));
    },
    [getSlides]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      containerRef.current?.scrollTo({ left: getTargetLeft(index), behavior: "smooth" });
    },
    [getTargetLeft]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.style.scrollSnapType = "x mandatory";
    container.style.scrollPaddingInline = `${GUTTER_PX}px`;
    container.style.cursor = "grab";
    container.tabIndex = 0;
    container.setAttribute("role", "region");
    container.setAttribute("aria-roledescription", "carousel");
    container.setAttribute("aria-label", carouselLabel);

    const update = () => {
      const slides = getSlides();
      if (!slides.length) return;
      // Card width in px: container width minus the peek and gap on both sides, so the centred
      // card is never cropped (a percentage resolved against the shrinking content box was).
      container.style.setProperty(
        "--plan-slide-width",
        `${Math.max(200, container.clientWidth - 2 * (PEEK_PX + SLIDE_GAP_PX))}px`
      );
      const box = container.getBoundingClientRect();
      const atStart = container.scrollLeft <= 2;
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 2;
      const centre = box.left + box.width / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - centre);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
      });
      setActiveIndex(atStart ? 0 : atEnd ? slides.length - 1 : nearest);

      // Subtle fade, limited to the neighbouring card peeking on each side: its width is the
      // visible part of that card (capped at FADE_MAX_PX), and it only dims to FADE_EDGE_ALPHA.
      const index = nearest;
      const prev = slides[index - 1];
      const next = slides[index + 1];
      const leftWidth =
        atStart || !prev
          ? 0
          : Math.max(0, Math.min(FADE_MAX_PX, prev.getBoundingClientRect().right - box.left));
      const rightWidth =
        atEnd || !next
          ? 0
          : Math.max(0, Math.min(FADE_MAX_PX, box.right - next.getBoundingClientRect().left));
      const edge = `rgba(0, 0, 0, ${FADE_EDGE_ALPHA})`;
      const mask = `linear-gradient(to right, ${leftWidth ? edge : "#000"} 0, #000 ${leftWidth}px, #000 calc(100% - ${rightWidth}px), ${rightWidth ? edge : "#000"} 100%)`;
      container.style.maskImage = mask;
      container.style.setProperty("-webkit-mask-image", mask);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const slides = getSlides();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(Math.min(slides.length - 1, activeIndexRef.current + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(Math.max(0, activeIndexRef.current - 1));
      }
    };

    // Mouse drag: snap and smooth scrolling are paused while dragging and restored on release,
    // when the browser (or scrollToIndex) settles on the nearest card. Touch uses native scroll.
    let startX = 0;
    let startLeft = 0;
    let pressing = false;
    let dragged = false;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      pressing = true;
      dragged = false;
      startX = event.clientX;
      startLeft = container.scrollLeft;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!pressing) return;
      const dx = event.clientX - startX;
      if (!dragged && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      if (!dragged) {
        dragged = true;
        container.style.scrollSnapType = "none";
        container.style.scrollBehavior = "auto";
        container.style.cursor = "grabbing";
        container.style.userSelect = "none";
      }
      container.scrollLeft = startLeft - dx;
    };
    const onPointerUp = () => {
      if (!pressing) return;
      pressing = false;
      if (!dragged) return;
      container.style.scrollBehavior = "";
      container.style.cursor = "grab";
      container.style.userSelect = "";
      container.style.scrollSnapType = "x mandatory";
      // Land on the nearest card even if the browser does not re-snap by itself.
      scrollToIndex(activeIndexRef.current);
    };
    // A drag must not activate the button under the cursor.
    const onClickCapture = (event: MouseEvent) => {
      if (dragged) {
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      }
    };

    update();
    container.addEventListener("scroll", update, { passive: true });
    container.addEventListener("keydown", onKeyDown);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("click", onClickCapture, true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", update);
    return () => {
      container.removeEventListener("scroll", update);
      container.removeEventListener("keydown", onKeyDown);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", update);
    };
  }, [carouselLabel, getSlides, scrollToIndex]);

  const lastIndex = plans.length - 1;

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <ScrollPane
        scrollContainerRef={containerRef}
        showArrows={false}
        showScrollbar={false}
        showGradients={false}
        scrollToItemOnClick={false}
        // The default margin (4px) plus a 12px left padding gives the first card a 16px gutter; the trailing spacer below
        // adds the right one, which flex overflow would otherwise drop (last card flush/cut).
        contentContainerProps={{ gap: "3", paddingLeft: "3", paddingBottom: "2" }}
      >
        {plans.map((plan, index) => (
          <ScrollPane.Item
            key={plan.id}
            data-plan-slide=""
            role="group"
            aria-roledescription="slide"
            aria-label={getSlideLabel(index, plans.length)}
            tabIndex={undefined}
            // Width comes from --plan-slide-width (set on the container) to leave the peek; snap alignment is the simulated part.
            style={{
              flex: "0 0 var(--plan-slide-width, 75%)",
              scrollSnapAlign: index === 0 ? "start" : index === lastIndex ? "end" : "center",
            }}
          >
            <PlanCard plan={plan} />
          </ScrollPane.Item>
        ))}
        {/* Spacer: the right gutter after the last card (gap 12px + 4px = 16px). */}
        <div aria-hidden="true" style={{ flex: "0 0 4px" }} />
      </ScrollPane>
      <CarouselDots
        total={plans.length}
        activeIndex={activeIndex}
        getLabel={getPositionAnnouncement}
      />
      <span aria-live="polite" aria-atomic="true" style={VISUALLY_HIDDEN}>
        {getPositionAnnouncement(activeIndex, plans.length)}
      </span>
    </Box>
  );
};

const MOBILE_QUERY = "(max-width: 767px)";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return isMobile;
};

export type ExplorationPatterns202Props = {
  plans?: PlanData[];
  /** "auto" switches at 767px with a media query (simulated breakpoint logic). */
  view?: "auto" | "mobile" | "desktop";
  carouselLabel?: string;
  /** Localizable position text, announced by the dots and the live region (e.g. "Plan 2 of 3"). */
  getPositionLabel?: (index: number, total: number) => string;
};

/** Plans 2.0 responsive composition: grid on desktop, snapping carousel with dots on mobile. */
export const ExplorationPatterns202: React.FC<ExplorationPatterns202Props> = ({
  plans = SAMPLE_PLANS,
  view = "auto",
  carouselLabel,
  getPositionLabel,
}) => {
  const isMobile = useIsMobile();
  const showCarousel = view === "mobile" || (view === "auto" && isMobile);
  return showCarousel ? (
    <PlanCarousel
      plans={plans}
      carouselLabel={carouselLabel}
      getSlideLabel={getPositionLabel}
      getPositionAnnouncement={getPositionLabel}
    />
  ) : (
    <PlanGrid plans={plans} />
  );
};

export default ExplorationPatterns202;
