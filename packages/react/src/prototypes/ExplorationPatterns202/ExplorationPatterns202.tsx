import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Button } from "@nimbus-ds/button";
import { Icon } from "@nimbus-ds/icon";
import { ScrollPane } from "@nimbus-ds/scroll-pane";
import { CheckCircleIcon } from "@nimbus-ds/icons";

/** Public-safe sample data. */
export interface PlanSample {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  ribbonLabel?: string;
  bullets: string[];
  cta: string;
}

export const SAMPLE_PLANS: PlanSample[] = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "For starting out",
    price: "$ 29",
    period: "/month",
    bullets: ["Up to 100 products", "1 staff account", "Email support"],
    cta: "Choose Basic",
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "For growing stores",
    price: "$ 79",
    period: "/month",
    ribbonLabel: "Most popular",
    bullets: ["Up to 1,000 products", "5 staff accounts", "Priority support"],
    cta: "Choose Growth",
  },
  {
    id: "scale",
    name: "Scale",
    subtitle: "For established brands",
    price: "$ 199",
    period: "/month",
    bullets: ["Unlimited products", "20 staff accounts", "Dedicated manager"],
    cta: "Choose Scale",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "For large operations",
    price: "$ 499",
    period: "/month",
    bullets: ["Unlimited everything", "Custom integrations", "SLA"],
    cta: "Contact sales",
  },
];

/* ------------------------------------------------------------------ */
/* Dots indicator: light-background, localizable, announced.           */
/* Simulates what a standalone Core paginator could look like.         */
/* ------------------------------------------------------------------ */

export interface DotsIndicatorProps {
  total: number;
  activeIndex: number;
  /** Localizable label; the host app passes its own translation. */
  getLabel?: (current: number, total: number) => string;
  onSelect?: (index: number) => void;
  getDotLabel?: (index: number, total: number) => string;
}

// Native span: Box drops `style`, and a visually-hidden text needs clip rules.
const VISUALLY_HIDDEN: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

export const DotsIndicator: React.FC<DotsIndicatorProps> = ({
  total,
  activeIndex,
  getLabel = (c, t) => `Plan ${c} of ${t}`,
  onSelect,
  getDotLabel = (i, t) => `Go to plan ${i + 1} of ${t}`,
}) => (
  <Box display="flex" justifyContent="center" alignItems="center" gap="1">
    {/* Polite live region announces the position when it changes. */}
    <span role="status" aria-live="polite" style={VISUALLY_HIDDEN}>
      {getLabel(activeIndex + 1, total)}
    </span>
    {Array.from({ length: total }, (_, index) => {
      const active = index === activeIndex;
      return (
        // Native button for a 24px touch target around the 6px dot; Box has no
        // button-reset props, so the reset is inline (declared exception).
        <button
          key={`dot-${index}`}
          type="button"
          aria-label={getDotLabel(index, total)}
          aria-current={active ? "true" : undefined}
          onClick={() => onSelect?.(index)}
          style={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: active ? 32 : 24,
            height: 24,
            borderRadius: "var(--nimbus-shape-border-radius-full, 999px)",
          }}
        >
          <Box
            aria-hidden="true"
            width={active ? "24px" : "6px"}
            height="6px"
            borderRadius="full"
            backgroundColor={active ? "primary-interactive" : "neutral-surfaceHighlight"}
          />
        </button>
      );
    })}
  </Box>
);

/* ------------------------------------------------------------------ */
/* Plan card recomposed from Core primitives (no @nimbus-ds/patterns). */
/* ------------------------------------------------------------------ */

const PlanCard: React.FC<{ plan: PlanSample }> = ({ plan }) => {
  const hasRibbon = Boolean(plan.ribbonLabel);
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        aria-hidden={hasRibbon ? undefined : true}
        display="flex"
        justifyContent="center"
        alignItems="center"
        pt="0-5"
        pb="2"
        backgroundColor={hasRibbon ? "primary-interactive" : undefined}
        borderRadius="2"
      >
        <Text fontWeight="medium" color="neutral-background" textAlign="center">
          {plan.ribbonLabel || " "}
        </Text>
      </Box>
      <Box
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        gap="4"
        padding="4"
        backgroundColor="neutral-background"
        borderRadius="2"
        boxShadow="2"
        borderColor={hasRibbon ? "primary-interactive" : undefined}
        borderStyle={hasRibbon ? "solid" : undefined}
        borderWidth={hasRibbon ? "2" : undefined}
      >
        <Text fontWeight="bold" fontSize="highlight" color="neutral-textHigh">
          {plan.name}
        </Text>
        <Text color="neutral-textLow">{plan.subtitle}</Text>
        <Box display="flex" alignItems="baseline" gap="0-5">
          <Title as="h3" color="neutral-textHigh">
            {plan.price}
          </Title>
          <Text as="span" color="neutral-textHigh">
            {plan.period}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="2" flex="1 1 auto">
          {plan.bullets.map((bullet) => (
            <Box key={bullet} display="flex" gap="2" alignItems="center">
              <Icon
                color="primary-interactive"
                source={<CheckCircleIcon size="small" />}
              />
              <Text color="neutral-textLow">{bullet}</Text>
            </Box>
          ))}
        </Box>
        <Button appearance={hasRibbon ? "primary" : "neutral"}>{plan.cta}</Button>
      </Box>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Mobile carousel: ScrollPane + peek + scroll-synced dots.            */
/* ------------------------------------------------------------------ */

export interface MobilePlanCarouselProps {
  plans?: PlanSample[];
  /** Width of each card relative to the viewport; the remainder is the peek. */
  cardWidth?: string;
  /** Localizable region label for the scroll area. */
  regionLabel?: string;
  getLabel?: (current: number, total: number) => string;
  getDotLabel?: (index: number, total: number) => string;
}

export const MobilePlanCarousel: React.FC<MobilePlanCarouselProps> = ({
  plans = SAMPLE_PLANS,
  cardWidth = "82%",
  regionLabel = "Plans",
  getLabel,
  getDotLabel,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Simulation: ScrollPane has no snap, keyboard or active-item API. Its
  // `scrollContainerRef` is public, so the scroll area is enhanced from outside.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    el.style.scrollSnapType = "x mandatory";
    el.style.scrollPaddingLeft = "var(--nimbus-spacing-4)";
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "region");
    el.setAttribute("aria-label", regionLabel);
    el.setAttribute("aria-roledescription", "carousel");

    const update = () => {
      const items = Array.from(
        el.querySelectorAll<HTMLElement>("[data-plan-slide]")
      );
      if (!items.length) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (atEnd) {
        setActiveIndex(items.length - 1);
        return;
      }
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [regionLabel]);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    const item = el?.querySelectorAll<HTMLElement>("[data-plan-slide]")[index];
    if (!el || !item) return;
    el.scrollTo({
      left: item.offsetLeft - el.offsetLeft - 16,
      behavior: "smooth",
    });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.target !== scrollRef.current) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(Math.min(plans.length - 1, activeIndex + 1));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(Math.max(0, activeIndex - 1));
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="3" onKeyDown={onKeyDown}>
      <ScrollPane
        scrollContainerRef={scrollRef}
        showGradients={false}
        showScrollbar={false}
        scrollToItemOnClick={false}
        enableGrabScroll={false}
        contentContainerProps={{ gap: "3", margin: "0", px: "4", py: "1" }}
      >
        {plans.map((plan, i) => (
          // Native div: needs scroll-snap-align and a fixed flex-basis for the
          // peek, which Box (no `style`) cannot express. ScrollPane.Item is
          // avoided: it renders role="button" and would nest the card CTA.
          <div
            key={plan.id}
            data-plan-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${plans.length}`}
            style={{
              flex: `0 0 ${cardWidth}`,
              minWidth: 0,
              scrollSnapAlign: "start",
              display: "flex",
            }}
          >
            <Box width="100%">
              <PlanCard plan={plan} />
            </Box>
          </div>
        ))}
      </ScrollPane>
      <DotsIndicator
        total={plans.length}
        activeIndex={activeIndex}
        onSelect={scrollToIndex}
        getLabel={getLabel}
        getDotLabel={getDotLabel}
      />
    </Box>
  );
};
