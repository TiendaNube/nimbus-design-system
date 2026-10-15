import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Divider } from "@nimbus-ds/divider";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { CheckCircleIcon } from "@nimbus-ds/icons";

/**
 * Exploration for TiendaNube/nimbus-patterns#202: PlanDisplay on mobile (Plans 2.0).
 * Plan cards are recomposed here from Core components (nothing is imported from
 * @nimbus-ds/patterns). The mobile view is a ScrollPane carousel: one card per viewport
 * with the next one peeking, plus a dots indicator synced to scroll.
 */

export type PlanData = {
  id: string;
  name: string;
  tag?: string;
  ribbon?: string;
  price: string;
  previousPrice?: string;
  period: string;
  note?: string;
  bullets: { label: string; disabled?: boolean }[];
  cta: string;
};

export const SAMPLE_PLANS: PlanData[] = [
  {
    id: "start",
    name: "Start",
    price: "$ 4.900",
    period: "/ month",
    note: "Billed monthly",
    bullets: [
      { label: "Up to 100 products" },
      { label: "1 staff account" },
      { label: "Basic reports" },
      { label: "Abandoned cart recovery", disabled: true },
    ],
    cta: "Choose Start",
  },
  {
    id: "growth",
    name: "Growth",
    tag: "Popular",
    ribbon: "Recommended",
    price: "$ 9.900",
    previousPrice: "$ 12.900",
    period: "/ month",
    note: "Save 20% billed annually",
    bullets: [
      { label: "Up to 1.000 products" },
      { label: "5 staff accounts" },
      { label: "Advanced reports" },
      { label: "Abandoned cart recovery" },
    ],
    cta: "Choose Growth",
  },
  {
    id: "scale",
    name: "Scale",
    price: "$ 24.900",
    period: "/ month",
    note: "Billed monthly",
    bullets: [
      { label: "Unlimited products" },
      { label: "15 staff accounts" },
      { label: "Advanced reports" },
      { label: "Priority support" },
    ],
    cta: "Choose Scale",
  },
];

/** Four-plan sample used by the desktop story (layout above the carousel breakpoint). */
export const SAMPLE_PLANS_FOUR: PlanData[] = [
  ...SAMPLE_PLANS,
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$ 49.900",
    period: "/ month",
    note: "Billed annually",
    bullets: [
      { label: "Unlimited products" },
      { label: "Unlimited staff accounts" },
      { label: "Custom reports" },
      { label: "Dedicated manager" },
    ],
    cta: "Contact sales",
  },
];

// Native element: Box exposes neither a top-only radius nor a negative margin (same exception
// the production PlanDisplay.Card makes).
const RIBBON_STYLE: React.CSSProperties = {
  borderTopLeftRadius: "var(--nimbus-shape-border-radius-2)",
  borderTopRightRadius: "var(--nimbus-shape-border-radius-2)",
  marginBottom: "calc(var(--nimbus-spacing-2) * -1)",
  overflow: "hidden",
};

// Declared exception: Box has no visually-hidden prop.
const VISUALLY_HIDDEN: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

/** Local recomposition of PlanDisplay.Card + Header + Price + Content + Bullet + Footer. */
const PlanCard: React.FC<{ plan: PlanData }> = ({ plan }) => (
  <Box display="flex" flexDirection="column" height="100%">
    <div style={RIBBON_STYLE}>
      <Box
        aria-hidden={plan.ribbon ? undefined : true}
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt="0-5"
        pb="2"
        backgroundColor={plan.ribbon ? "primary-interactive" : undefined}
      >
        <Text fontWeight="medium" color="neutral-background" textAlign="center">
          {plan.ribbon || " "}
        </Text>
      </Box>
    </div>
    <Box
      flex="1 1 auto"
      display="flex"
      flexDirection="column"
      padding="4"
      backgroundColor="neutral-background"
      borderRadius="2"
      overflow="hidden"
      boxShadow={plan.ribbon ? undefined : "2"}
      borderColor={plan.ribbon ? "primary-interactive" : undefined}
      borderStyle={plan.ribbon ? "solid" : undefined}
      borderWidth={plan.ribbon ? "2" : undefined}
    >
      <Box display="flex" flexDirection="column" gap="3">
        <Box display="flex" justifyContent="space-between" alignItems="center" gap="2">
          <Text fontWeight="bold" fontSize="highlight" color="neutral-textHigh">
            {plan.name}
          </Text>
          {plan.tag && <Tag appearance="primary">{plan.tag}</Tag>}
        </Box>
        <Box display="flex" flexDirection="column" gap="2">
          <Box display="flex" alignItems="center" gap="0-5">
            <Title as="h3" color="neutral-textHigh">
              {plan.price}
            </Title>
            {plan.previousPrice && (
              <Text as="span" fontSize="base" textDecoration="line-through">
                {plan.previousPrice}
              </Text>
            )}
            <Text as="span" color="neutral-textHigh">
              {plan.period}
            </Text>
          </Box>
          {plan.note && (
            <Text as="p" fontSize="caption" color="neutral-textLow">
              {plan.note}
            </Text>
          )}
        </Box>
      </Box>
      <Box my="3">
        <Divider />
      </Box>
      <Box display="flex" flexDirection="column" gap="3">
        {plan.bullets.map((bullet) => (
          <Box key={bullet.label} display="flex" gap="2" alignItems="center">
            <Text
              as="span"
              color={bullet.disabled ? "neutral-interactive" : "primary-interactive"}
            >
              <Box as="span" display="flex" alignItems="center">
                <CheckCircleIcon />
              </Box>
            </Text>
            <Text
              fontWeight="regular"
              color={bullet.disabled ? "neutral-interactive" : "neutral-textLow"}
            >
              {bullet.label}
            </Text>
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column" mt="auto" pt="4">
        <Button appearance={plan.ribbon ? "primary" : "neutral"}>{plan.cta}</Button>
      </Box>
    </Box>
  </Box>
);

/** Desktop reference: the current PlanDisplay grid, recomposed. */
const PlanGrid: React.FC<{ plans: PlanData[]; minPlanWidth?: string }> = ({
  plans,
  minPlanWidth = "225px",
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

// Edge fade width: spacing token 8 (32px). The fallback only guards a missing variable.
const FADE_WIDTH = "var(--nimbus-spacing-8, 32px)";
// Side gutter (spacing "4" = 16px) kept before the first card and after the last one.
const GUTTER_PX = 16;
const DRAG_THRESHOLD_PX = 4;

/**
 * Mobile composition: ScrollPane + local dots. ScrollPane has no snap or active-item API, so:
 * - snap is simulated by setting scroll-snap-type on the exposed scroll container ref; the first
 *   card snaps to the start, the last to the end and the ones in between to the centre, so both
 *   ends are shown whole and the neighbours peek;
 * - ScrollPane's own gradients are off. A 32px mask fade is applied to the scroll container
 *   only on the edge that still has content to scroll to: none on the left at the first card,
 *   none on the right at the last one. Everything beyond those 32px stays fully opaque;
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

      // Fade only the side that overflows, and only its outer 32px.
      const left = atStart ? "#000" : "transparent";
      const right = atEnd ? "#000" : "transparent";
      const mask = `linear-gradient(to right, ${left} 0, #000 ${FADE_WIDTH}, #000 calc(100% - ${FADE_WIDTH}), ${right} 100%)`;
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
            // 85% leaves the next card peeking; snap alignment is the simulated part.
            style={{
              flex: "0 0 85%",
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
