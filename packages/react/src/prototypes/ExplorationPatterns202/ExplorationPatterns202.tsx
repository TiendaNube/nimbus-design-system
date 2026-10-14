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
 * Dots indicator for light backgrounds. Simulates a new component: the existing
 * ProductUpdates.Paginator hardcodes colors for a primary background and an English label.
 * Each dot is a real button so the position can also be changed without a pointer.
 */
const CarouselDots: React.FC<{
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  getLabel: (index: number, total: number) => string;
}> = ({ total, activeIndex, onSelect, getLabel }) => (
  <Box display="flex" flexDirection="row" gap="2" justifyContent="center" alignItems="center">
    {Array.from({ length: total }, (_, index) => (
      <button
        key={`dot-${index}`}
        type="button"
        aria-label={getLabel(index, total)}
        aria-current={index === activeIndex ? "true" : undefined}
        onClick={() => onSelect(index)}
        style={{
          // Declared exception: a native button with a 24px touch target around a 6/24px dot.
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 24,
          height: 24,
        }}
      >
        <Box
          width={index === activeIndex ? "24px" : "6px"}
          height="6px"
          borderRadius="full"
          backgroundColor={index === activeIndex ? "primary-interactive" : "neutral-interactive"}
          aria-hidden="true"
        />
      </button>
    ))}
  </Box>
);

/**
 * Mobile composition: ScrollPane + local dots. ScrollPane has no snap or active-item API, so:
 * - snap is simulated by setting scroll-snap-type on the exposed scroll container ref;
 * - the active index is derived from a scroll listener on that same ref;
 * - focus/keyboard/region semantics are applied to the container through the ref, because
 *   ScrollPane forwards `rest` props to its outer Box, not to the scrolling element.
 */
const PlanCarousel: React.FC<{
  plans: PlanData[];
  carouselLabel?: string;
  getSlideLabel?: (index: number, total: number) => string;
  getDotLabel?: (index: number, total: number) => string;
  getPositionAnnouncement?: (index: number, total: number) => string;
}> = ({
  plans,
  carouselLabel = "Available plans",
  getSlideLabel = (i, t) => `Plan ${i + 1} of ${t}`,
  getDotLabel = (i, t) => `Go to plan ${i + 1} of ${t}`,
  getPositionAnnouncement = (i, t) => `Plan ${i + 1} of ${t}`,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlides = useCallback(
    () =>
      Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>("[data-plan-slide]") ?? []
      ),
    []
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      const slide = getSlides()[index];
      if (!container || !slide) return;
      const delta = slide.getBoundingClientRect().left - container.getBoundingClientRect().left;
      container.scrollTo({ left: container.scrollLeft + delta, behavior: "smooth" });
    },
    [getSlides]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.style.scrollSnapType = "x mandatory";
    container.tabIndex = 0;
    container.setAttribute("role", "region");
    container.setAttribute("aria-roledescription", "carousel");
    container.setAttribute("aria-label", carouselLabel);

    const updateActive = () => {
      const slides = getSlides();
      if (!slides.length) return;
      const containerLeft = container.getBoundingClientRect().left;
      const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - containerLeft);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
      });
      setActiveIndex(atEnd ? slides.length - 1 : nearest);
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

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    container.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updateActive);
    return () => {
      container.removeEventListener("scroll", updateActive);
      container.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updateActive);
    };
  }, [carouselLabel, getSlides, scrollToIndex]);

  // Keeps the keydown handler (registered once) reading the latest index.
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <ScrollPane
        scrollContainerRef={containerRef}
        showArrows={false}
        showScrollbar={false}
        showGradients={false}
        scrollToItemOnClick={false}
        contentContainerProps={{ gap: "3", paddingBottom: "2" }}
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
            style={{ flex: "0 0 85%", scrollSnapAlign: "start" }}
          >
            <PlanCard plan={plan} />
          </ScrollPane.Item>
        ))}
      </ScrollPane>
      <CarouselDots
        total={plans.length}
        activeIndex={activeIndex}
        onSelect={scrollToIndex}
        getLabel={getDotLabel}
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
};

/** Plans 2.0 responsive composition: grid on desktop, snapping carousel with dots on mobile. */
export const ExplorationPatterns202: React.FC<ExplorationPatterns202Props> = ({
  plans = SAMPLE_PLANS,
  view = "auto",
  carouselLabel,
}) => {
  const isMobile = useIsMobile();
  const showCarousel = view === "mobile" || (view === "auto" && isMobile);
  return showCarousel ? (
    <PlanCarousel plans={plans} carouselLabel={carouselLabel} />
  ) : (
    <PlanGrid plans={plans} />
  );
};

export default ExplorationPatterns202;
