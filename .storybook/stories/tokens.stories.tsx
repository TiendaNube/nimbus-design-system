import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";
import { ThemeProvider, themeVars } from "@nimbus-ds/styles";

type CatalogCategory =
  | "all"
  | "semantic-colors"
  | "primitive-ramps"
  | "spacing-layout"
  | "shape-elevation"
  | "typography-motion";

interface ThemeValueMap {
  base: string;
  dark: string;
  next: string;
  "next-dark": string;
  "next-norteui": string;
  "next-norteui-dark": string;
}

interface SemanticColorEntry {
  id: string;
  group: string;
  tokenKey: string;
  kebabTokenKey: string;
  boxToken: string;
  varsPath: string;
  cssVar: string;
  cssVarName: string;
  values: ThemeValueMap;
  hasNextDiff: boolean;
}

interface PrimitiveRampStep {
  step: string;
  value: string;
  tokenPath: string;
}

interface PrimitiveRampGroup {
  group: string;
  steps: PrimitiveRampStep[];
}

interface ScaleEntry {
  id: string;
  subcategory: string;
  key: string;
  varsPath: string;
  boxPropHint: string;
  cssVar: string;
  cssVarName: string;
  values: ThemeValueMap;
  hasNextDiff: boolean;
}

const camelToKebab = (value: string): string =>
  value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const extractCssVarName = (cssVarExpression: string): string => {
  const match = /var\((--[^)]+)\)/.exec(cssVarExpression);
  return match ? match[1].trim() : cssVarExpression;
};

const isRecord = (val: unknown): val is Record<string, unknown> =>
  typeof val === "object" && val !== null && !Array.isArray(val);

const getTokenValue = (node: unknown): string => {
  if (isRecord(node) && "value" in node && node.value !== undefined) {
    return String(node.value);
  }
  return "";
};

const resolveStaticSemanticColorValues = (
  group: string,
  kebabKey: string,
  camelKey: string
): ThemeValueMap => {
  const colorRecord = tokens.color as Record<string, Record<string, unknown>>;
  const lightGroup = (tokens.color.light as Record<string, unknown>)[group];
  const darkGroup = (tokens.color.dark as Record<string, unknown>)[group];
  const nextGroup = (tokens.color.next as Record<string, unknown>)[group];
  const nextDarkGroup = (tokens.color["next-dark"] as Record<string, unknown>)[
    group
  ];
  const nextNorteuiGroup = colorRecord["next-norteui"]?.[group] ?? nextGroup;
  const nextNorteuiDarkGroup =
    colorRecord["next-norteui-dark"]?.[group] ?? nextDarkGroup;

  const lookup = (source: unknown): string => {
    if (!isRecord(source)) return "";
    return (
      getTokenValue(source[kebabKey]) || getTokenValue(source[camelKey]) || ""
    );
  };

  const baseVal = lookup(lightGroup);
  const darkVal = lookup(darkGroup) || baseVal;
  const nextVal = lookup(nextGroup) || baseVal;
  const nextDarkVal = lookup(nextDarkGroup) || darkVal;
  const nextNorteuiVal = lookup(nextNorteuiGroup) || nextVal;
  const nextNorteuiDarkVal = lookup(nextNorteuiDarkGroup) || nextDarkVal;

  return {
    base: baseVal,
    dark: darkVal,
    next: nextVal,
    "next-dark": nextDarkVal,
    "next-norteui": nextNorteuiVal,
    "next-norteui-dark": nextNorteuiDarkVal,
  };
};

const buildSemanticColorEntries = (
  computedMap: Record<string, ThemeValueMap>
): SemanticColorEntry[] => {
  const entries: SemanticColorEntry[] = [];
  const colorsContract = themeVars.colors as Record<
    string,
    Record<string, string>
  >;

  for (const [group, groupTokens] of Object.entries(colorsContract)) {
    if (!isRecord(groupTokens)) continue;
    for (const [tokenKey, cssVar] of Object.entries(groupTokens)) {
      if (typeof cssVar !== "string") continue;
      const kebabTokenKey = camelToKebab(tokenKey);
      const cssVarName = extractCssVarName(cssVar);
      const staticValues = resolveStaticSemanticColorValues(
        group,
        kebabTokenKey,
        tokenKey
      );
      const liveValues = computedMap[cssVarName];
      const values: ThemeValueMap = {
        base: liveValues?.base || staticValues.base,
        dark: liveValues?.dark || staticValues.dark,
        next: liveValues?.next || staticValues.next,
        "next-dark": liveValues?.["next-dark"] || staticValues["next-dark"],
        "next-norteui":
          liveValues?.["next-norteui"] || staticValues["next-norteui"],
        "next-norteui-dark":
          liveValues?.["next-norteui-dark"] ||
          staticValues["next-norteui-dark"],
      };
      const hasNextDiff =
        values["next-norteui"].toLowerCase() !== values.base.toLowerCase() ||
        values["next-norteui-dark"].toLowerCase() !==
          values.dark.toLowerCase() ||
        values.next.toLowerCase() !== values.base.toLowerCase() ||
        values["next-dark"].toLowerCase() !== values.dark.toLowerCase();

      entries.push({
        id: `colors.${group}.${tokenKey}`,
        group,
        tokenKey,
        kebabTokenKey,
        boxToken: `${group}-${kebabTokenKey}`,
        varsPath: `themeVars.colors.${group}.${tokenKey}`,
        cssVar,
        cssVarName,
        values,
        hasNextDiff,
      });
    }
  }

  return entries;
};

const PRIMITIVE_STEP_KEYS = [
  "0",
  "5",
  "10",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
  "95",
  "99",
  "100",
];

const buildPrimitiveRamps = (): PrimitiveRampGroup[] => {
  const ramps: PrimitiveRampGroup[] = [];
  const lightColors = tokens.color.light as Record<string, unknown>;

  for (const [group, groupObj] of Object.entries(lightColors)) {
    if (!isRecord(groupObj)) continue;
    const steps: PrimitiveRampStep[] = [];
    for (const stepKey of PRIMITIVE_STEP_KEYS) {
      const value = getTokenValue(groupObj[stepKey]);
      if (value) {
        steps.push({
          step: stepKey,
          value,
          tokenPath: `tokens.color.light.${group}[${JSON.stringify(
            stepKey
          )}].value`,
        });
      }
    }
    if (steps.length > 0) {
      ramps.push({ group, steps });
    }
  }

  return ramps;
};

const buildScaleEntries = (
  computedMap: Record<string, ThemeValueMap>
): ScaleEntry[] => {
  const list: ScaleEntry[] = [];

  const addEntry = (
    subcategory: string,
    key: string,
    varsPath: string,
    boxPropHint: string,
    cssVar: string,
    staticBase: string,
    staticDark = staticBase,
    staticNext = staticBase,
    staticNextDark = staticDark,
    staticNextNorteui = staticNext,
    staticNextNorteuiDark = staticNextDark
  ) => {
    const cssVarName = extractCssVarName(cssVar);
    const live = computedMap[cssVarName];
    const values: ThemeValueMap = {
      base: live?.base || staticBase,
      dark: live?.dark || staticDark,
      next: live?.next || staticNext,
      "next-dark": live?.["next-dark"] || staticNextDark,
      "next-norteui": live?.["next-norteui"] || staticNextNorteui,
      "next-norteui-dark": live?.["next-norteui-dark"] || staticNextNorteuiDark,
    };
    const hasNextDiff =
      values["next-norteui"].toLowerCase() !== values.base.toLowerCase() ||
      values["next-norteui-dark"].toLowerCase() !== values.dark.toLowerCase() ||
      values.next.toLowerCase() !== values.base.toLowerCase() ||
      values["next-dark"].toLowerCase() !== values.dark.toLowerCase();

    list.push({
      id: `${subcategory}.${key}`,
      subcategory,
      key,
      varsPath,
      boxPropHint,
      cssVar,
      cssVarName,
      values,
      hasNextDiff,
    });
  };

  for (const [key, cssVar] of Object.entries(themeVars.spacing)) {
    const raw = getTokenValue((tokens.spacing as Record<string, unknown>)[key]);
    addEntry(
      "spacing",
      key,
      `themeVars.spacing[${JSON.stringify(key)}]`,
      `padding="${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.breakpoint)) {
    const raw = getTokenValue(
      (tokens.breakpoint as Record<string, unknown>)[key]
    );
    addEntry(
      "breakpoint",
      key,
      `themeVars.breakpoint.${key}`,
      `breakpoint.${key}`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.zIndex)) {
    const raw = getTokenValue((tokens.zIndex as Record<string, unknown>)[key]);
    addEntry(
      "zIndex",
      key,
      `themeVars.zIndex[${JSON.stringify(key)}]`,
      `zIndex="$${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.shape.border.radius)) {
    const raw = getTokenValue(
      (tokens.shape.border.radius as Record<string, unknown>)[key]
    );
    addEntry(
      "borderRadius",
      key,
      `themeVars.shape.border.radius[${JSON.stringify(key)}]`,
      `borderRadius="${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.shape.border.width)) {
    const raw = getTokenValue(
      (tokens.shape.border.width as Record<string, unknown>)[key]
    );
    addEntry(
      "borderWidth",
      key,
      `themeVars.shape.border.width[${JSON.stringify(key)}]`,
      `borderWidth="${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.shadow.level)) {
    const lightRaw = getTokenValue(
      (tokens.shadow.light.level as Record<string, unknown>)[key]
    );
    const darkRaw =
      getTokenValue(
        (tokens.shadow.dark.level as Record<string, unknown>)[key]
      ) || lightRaw;
    addEntry(
      "shadow",
      `level.${key}`,
      `themeVars.shadow.level[${JSON.stringify(key)}]`,
      `boxShadow="${key}"`,
      cssVar,
      lightRaw,
      darkRaw,
      lightRaw,
      darkRaw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.utils)) {
    const baseFocus =
      key === "focus"
        ? `0 0 0 3px ${getTokenValue(
            tokens.color.light.primary["surface-highlight"]
          )}`
        : `0 0 0 3px ${getTokenValue(
            tokens.color.light.aiGenerative["surface-highlight"]
          )}`;
    const nextFocus =
      key === "focus"
        ? `0 0 0 3px ${getTokenValue(
            tokens.color.next.primary["surface-highlight"]
          )}`
        : baseFocus;
    const nextDarkFocus =
      key === "focus"
        ? `0 0 0 3px ${getTokenValue(
            tokens.color["next-dark"].primary["surface-highlight"]
          )}`
        : baseFocus;
    addEntry(
      "focusRing",
      key,
      `themeVars.utils.${key}`,
      `themeVars.utils.${key}`,
      cssVar,
      baseFocus,
      baseFocus,
      nextFocus,
      nextDarkFocus
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.fontFamily)) {
    const raw = getTokenValue(
      (tokens.font.family as Record<string, unknown>)[key]
    );
    addEntry(
      "fontFamily",
      key,
      `themeVars.fontFamily.${key}`,
      `fontFamily="${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.fontSize.title)) {
    const raw = getTokenValue(
      (tokens.font.size.title as Record<string, unknown>)[key]
    );
    addEntry(
      "fontSize.title",
      key,
      `themeVars.fontSize.title.${key}`,
      `<Title as="${key}">`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.fontSize.body)) {
    const raw = getTokenValue(
      (tokens.font.size.body as Record<string, unknown>)[key]
    );
    addEntry(
      "fontSize.body",
      key,
      `themeVars.fontSize.body.${key}`,
      `<Text fontSize="${key}">`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.fontWeight)) {
    const raw = getTokenValue(
      (tokens.font.weight as Record<string, unknown>)[key]
    );
    addEntry(
      "fontWeight",
      key,
      `themeVars.fontWeight.${key}`,
      `fontWeight="${key}"`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.lineWeight.title)) {
    const raw = getTokenValue(
      (tokens.line.height.title as Record<string, unknown>)[key]
    );
    addEntry(
      "lineHeight.title",
      key,
      `themeVars.lineWeight.title.${key}`,
      `lineHeight (title.${key})`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.lineWeight.body)) {
    const raw = getTokenValue(
      (tokens.line.height.body as Record<string, unknown>)[key]
    );
    addEntry(
      "lineHeight.body",
      key,
      `themeVars.lineWeight.body.${key}`,
      `lineHeight (body.${key})`,
      cssVar,
      raw
    );
  }

  for (const [key, cssVar] of Object.entries(themeVars.motion.speed)) {
    const raw = getTokenValue(
      (tokens.motion.speed as Record<string, unknown>)[key]
    );
    addEntry(
      "motion.speed",
      key,
      `themeVars.motion.speed.${key}`,
      `transition="${key}"`,
      cssVar,
      raw
    );
  }

  return list;
};

const collectAllCssVarNames = (node: unknown, out: string[] = []): string[] => {
  if (typeof node === "string") {
    out.push(extractCssVarName(node));
  } else if (isRecord(node)) {
    for (const val of Object.values(node)) {
      collectAllCssVarNames(val, out);
    }
  }
  return out;
};

interface TokenCatalogProps {
  initialCategory?: CatalogCategory;
  initialOnlyNextDiff?: boolean;
  initialSearch?: string;
}

const CopyChip: React.FC<{
  label: string;
  value: string;
  copiedKey: string | null;
  onCopy: (key: string, text: string) => void;
  idKey: string;
}> = ({ label, value, copiedKey, onCopy, idKey }) => {
  const isCopied = copiedKey === idKey;
  return (
    <button
      type="button"
      onClick={() => onCopy(idKey, value)}
      title={`Copy ${value}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "2px 6px",
        borderRadius: themeVars.shape.border.radius["1"],
        border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
        background: isCopied
          ? themeVars.colors.primary.surface
          : themeVars.colors.neutral.surface,
        color: isCopied
          ? themeVars.colors.primary.textLow
          : themeVars.colors.neutral.textHigh,
        fontFamily: themeVars.fontFamily.mono,
        fontSize: "11px",
        cursor: "pointer",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ opacity: 0.65, fontWeight: 600 }}>{label}:</span>
      <span>{isCopied ? "Copied!" : value}</span>
    </button>
  );
};

const TokenCatalog: React.FC<TokenCatalogProps> = ({
  initialCategory = "all",
  initialOnlyNextDiff = false,
  initialSearch = "",
}) => {
  const [category, setCategory] = useState<CatalogCategory>(initialCategory);
  const [onlyNextDiff, setOnlyNextDiff] =
    useState<boolean>(initialOnlyNextDiff);
  const [search, setSearch] = useState<string>(initialSearch);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [computedMap, setComputedMap] = useState<Record<string, ThemeValueMap>>(
    {}
  );

  const baseProbeRef = useRef<HTMLDivElement>(null);
  const darkProbeRef = useRef<HTMLDivElement>(null);
  const nextProbeRef = useRef<HTMLDivElement>(null);
  const nextDarkProbeRef = useRef<HTMLDivElement>(null);
  const nextNorteuiProbeRef = useRef<HTMLDivElement>(null);
  const nextNorteuiDarkProbeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setOnlyNextDiff(initialOnlyNextDiff);
  }, [initialOnlyNextDiff]);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !baseProbeRef.current ||
      !darkProbeRef.current ||
      !nextProbeRef.current ||
      !nextDarkProbeRef.current ||
      !nextNorteuiProbeRef.current ||
      !nextNorteuiDarkProbeRef.current
    ) {
      return;
    }

    const baseStyle = window.getComputedStyle(baseProbeRef.current);
    const darkStyle = window.getComputedStyle(darkProbeRef.current);
    const nextStyle = window.getComputedStyle(nextProbeRef.current);
    const nextDarkStyle = window.getComputedStyle(nextDarkProbeRef.current);
    const nextNorteuiStyle = window.getComputedStyle(
      nextNorteuiProbeRef.current
    );
    const nextNorteuiDarkStyle = window.getComputedStyle(
      nextNorteuiDarkProbeRef.current
    );

    const varNames = collectAllCssVarNames(themeVars);
    const nextComputed: Record<string, ThemeValueMap> = {};

    for (const varName of varNames) {
      nextComputed[varName] = {
        base: baseStyle.getPropertyValue(varName).trim(),
        dark: darkStyle.getPropertyValue(varName).trim(),
        next: nextStyle.getPropertyValue(varName).trim(),
        "next-dark": nextDarkStyle.getPropertyValue(varName).trim(),
        "next-norteui": nextNorteuiStyle.getPropertyValue(varName).trim(),
        "next-norteui-dark": nextNorteuiDarkStyle
          .getPropertyValue(varName)
          .trim(),
      };
    }

    setComputedMap(nextComputed);
  }, []);

  const handleCopy = (idKey: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(idKey);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === idKey ? null : prev));
    }, 1400);
  };

  const semanticColors = useMemo(
    () => buildSemanticColorEntries(computedMap),
    [computedMap]
  );
  const primitiveRamps = useMemo(() => buildPrimitiveRamps(), []);
  const scaleEntries = useMemo(
    () => buildScaleEntries(computedMap),
    [computedMap]
  );

  const normalizedQuery = search.trim().toLowerCase();

  const matchesQuery = (fields: string[]): boolean => {
    if (!normalizedQuery) return true;
    return fields.some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    );
  };

  const filteredSemanticColors = useMemo(
    () =>
      semanticColors.filter((entry) => {
        if (onlyNextDiff && !entry.hasNextDiff) return false;
        return matchesQuery([
          entry.id,
          entry.group,
          entry.tokenKey,
          entry.boxToken,
          entry.varsPath,
          entry.cssVarName,
          entry.values.base,
          entry.values.dark,
          entry.values.next,
          entry.values["next-dark"],
          entry.values["next-norteui"],
          entry.values["next-norteui-dark"],
        ]);
      }),
    [semanticColors, onlyNextDiff, normalizedQuery]
  );

  const filteredPrimitiveRamps = useMemo(() => {
    if (onlyNextDiff) {
      return primitiveRamps.filter(
        (ramp) =>
          (ramp.group === "next" ||
            ramp.group === "primary" ||
            ramp.group.startsWith("norteui-")) &&
          matchesQuery([
            ramp.group,
            ...ramp.steps.map((s) => `${s.step} ${s.value}`),
          ])
      );
    }
    return primitiveRamps.filter((ramp) =>
      matchesQuery([
        ramp.group,
        ...ramp.steps.map((s) => `${s.step} ${s.value}`),
      ])
    );
  }, [primitiveRamps, onlyNextDiff, normalizedQuery]);

  const filterScalesBySubcategory = (subcategories: string[]): ScaleEntry[] =>
    scaleEntries.filter((entry) => {
      if (!subcategories.includes(entry.subcategory)) return false;
      if (onlyNextDiff && !entry.hasNextDiff) return false;
      return matchesQuery([
        entry.id,
        entry.subcategory,
        entry.key,
        entry.varsPath,
        entry.boxPropHint,
        entry.cssVarName,
        entry.values.base,
        entry.values.next,
      ]);
    });

  const spacingAndLayoutEntries = useMemo(
    () => filterScalesBySubcategory(["spacing", "breakpoint", "zIndex"]),
    [scaleEntries, onlyNextDiff, normalizedQuery]
  );

  const shapeAndElevationEntries = useMemo(
    () =>
      filterScalesBySubcategory([
        "borderRadius",
        "borderWidth",
        "shadow",
        "focusRing",
      ]),
    [scaleEntries, onlyNextDiff, normalizedQuery]
  );

  const typographyAndMotionEntries = useMemo(
    () =>
      filterScalesBySubcategory([
        "fontFamily",
        "fontSize.title",
        "fontSize.body",
        "fontWeight",
        "lineHeight.title",
        "lineHeight.body",
        "motion.speed",
      ]),
    [scaleEntries, onlyNextDiff, normalizedQuery]
  );

  const totalNextDiffCount = useMemo(
    () =>
      semanticColors.filter((c) => c.hasNextDiff).length +
      scaleEntries.filter((s) => s.hasNextDiff).length,
    [semanticColors, scaleEntries]
  );

  const groupedSemanticColors = useMemo(() => {
    const map = new Map<string, SemanticColorEntry[]>();
    for (const entry of filteredSemanticColors) {
      const list = map.get(entry.group) ?? [];
      list.push(entry);
      map.set(entry.group, list);
    }
    return Array.from(map.entries());
  }, [filteredSemanticColors]);

  const showSection = (target: CatalogCategory): boolean =>
    category === "all" || category === target;

  const categoryButtons: { id: CatalogCategory; label: string }[] = [
    { id: "all", label: "All Foundations" },
    { id: "semantic-colors", label: "Semantic Colors" },
    { id: "primitive-ramps", label: "Primitive Ramps" },
    { id: "spacing-layout", label: "Spacing & Layout" },
    { id: "shape-elevation", label: "Shape & Elevation" },
    { id: "typography-motion", label: "Typography & Motion" },
  ];

  return (
    <div
      style={{
        fontFamily: themeVars.fontFamily.sans,
        color: themeVars.colors.neutral.textHigh,
        backgroundColor: themeVars.colors.neutral.background,
        padding: themeVars.spacing["6"],
        borderRadius: themeVars.shape.border.radius["3"],
        border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
        display: "flex",
        flexDirection: "column",
        gap: themeVars.spacing["6"],
      }}
    >
      {/* Hidden 0x0 probes to read live CSS custom properties across all 6 themes */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <ThemeProvider theme="base">
          <div ref={baseProbeRef} />
        </ThemeProvider>
        <ThemeProvider theme="dark">
          <div ref={darkProbeRef} />
        </ThemeProvider>
        <ThemeProvider theme="next">
          <div ref={nextProbeRef} />
        </ThemeProvider>
        <ThemeProvider theme="next-dark">
          <div ref={nextDarkProbeRef} />
        </ThemeProvider>
        <ThemeProvider theme="next-norteui">
          <div ref={nextNorteuiProbeRef} />
        </ThemeProvider>
        <ThemeProvider theme="next-norteui-dark">
          <div ref={nextNorteuiDarkProbeRef} />
        </ThemeProvider>
      </div>

      {/* Header & Summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: themeVars.spacing["3"],
          borderBottom: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
          paddingBottom: themeVars.spacing["4"],
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: themeVars.spacing["3"],
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h2,
                lineHeight: themeVars.lineWeight.title.h2,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Nimbus Design Tokens Catalog
            </h1>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.base,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Live reference for <code>@nimbus-ds/tokens</code> and{" "}
              <code>@nimbus-ds/styles</code> across <strong>base</strong>,{" "}
              <strong>dark</strong>, <strong>next</strong>, and{" "}
              <strong>next-dark</strong> themes.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: themeVars.spacing["2"],
            }}
          >
            <div
              style={{
                padding: `${themeVars.spacing["1-5"]} ${themeVars.spacing["3"]}`,
                borderRadius: themeVars.shape.border.radius["2"],
                background: themeVars.colors.neutral.surface,
                border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                fontSize: themeVars.fontSize.body.caption,
              }}
            >
              <strong>{semanticColors.length + scaleEntries.length}</strong>{" "}
              Contract Tokens
            </div>
            <div
              style={{
                padding: `${themeVars.spacing["1-5"]} ${themeVars.spacing["3"]}`,
                borderRadius: themeVars.shape.border.radius["2"],
                background: themeVars.colors.primary.surface,
                border: `1px solid ${themeVars.colors.primary.surfaceHighlight}`,
                color: themeVars.colors.primary.textHigh,
                fontSize: themeVars.fontSize.body.caption,
              }}
            >
              <strong>{totalNextDiffCount}</strong> Tokens Modified in{" "}
              <code>next</code>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: `${themeVars.spacing["2-5"]} ${themeVars.spacing["3"]}`,
            borderRadius: themeVars.shape.border.radius["2"],
            background: themeVars.colors.neutral.surface,
            border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
            fontSize: themeVars.fontSize.body.caption,
            color: themeVars.colors.neutral.textLow,
          }}
        >
          <strong>Tip (Path A / Norte UI):</strong> Use the Storybook toolbar
          theme selector at the top (<code>Side-by-Side (Base vs Next)</code> or{" "}
          <code>Side-by-Side (Dark vs Next Dark)</code>) to compare live token
          swatches side-by-side, or toggle{" "}
          <strong>Modified in Next (next ≠ base)</strong> below to inspect every
          overridden token.
        </div>

        {/* Interactive Filter Controls */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: themeVars.spacing["2"],
            marginTop: themeVars.spacing["1"],
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by token name, Box prop (e.g. primary-interactive), CSS var, or hex..."
            aria-label="Filter design tokens"
            style={{
              flex: "1 1 280px",
              padding: `${themeVars.spacing["2"]} ${themeVars.spacing["3"]}`,
              borderRadius: themeVars.shape.border.radius["2"],
              border: `1px solid ${themeVars.colors.neutral.interactive}`,
              background: themeVars.colors.neutral.background,
              color: themeVars.colors.neutral.textHigh,
              fontFamily: themeVars.fontFamily.sans,
              fontSize: themeVars.fontSize.body.base,
            }}
          />

          <button
            type="button"
            onClick={() => setOnlyNextDiff((prev) => !prev)}
            style={{
              padding: `${themeVars.spacing["2"]} ${themeVars.spacing["3"]}`,
              borderRadius: themeVars.shape.border.radius["2"],
              border: `1px solid ${
                onlyNextDiff
                  ? themeVars.colors.primary.interactive
                  : themeVars.colors.neutral.surfaceHighlight
              }`,
              background: onlyNextDiff
                ? themeVars.colors.primary.interactive
                : themeVars.colors.neutral.surface,
              color: onlyNextDiff
                ? themeVars.colors.neutral.background
                : themeVars.colors.neutral.textHigh,
              fontWeight: themeVars.fontWeight.medium,
              fontSize: themeVars.fontSize.body.caption,
              cursor: "pointer",
            }}
          >
            {onlyNextDiff
              ? `✓ Showing Modified in Next (${totalNextDiffCount})`
              : `Modified in Next (next ≠ base) (${totalNextDiffCount})`}
          </button>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: themeVars.spacing["1-5"],
          }}
        >
          {categoryButtons.map((btn) => {
            const active = category === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setCategory(btn.id)}
                style={{
                  padding: `${themeVars.spacing["1-5"]} ${themeVars.spacing["3"]}`,
                  borderRadius: themeVars.shape.border.radius.full,
                  border: `1px solid ${
                    active
                      ? themeVars.colors.primary.interactive
                      : themeVars.colors.neutral.surfaceHighlight
                  }`,
                  background: active
                    ? themeVars.colors.primary.surface
                    : "transparent",
                  color: active
                    ? themeVars.colors.primary.textHigh
                    : themeVars.colors.neutral.textLow,
                  fontWeight: active
                    ? themeVars.fontWeight.bold
                    : themeVars.fontWeight.regular,
                  fontSize: themeVars.fontSize.body.caption,
                  cursor: "pointer",
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: SEMANTIC COLORS */}
      {showSection("semantic-colors") && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: themeVars.spacing["4"],
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h4,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Semantic Colors (<code>themeVars.colors.*</code>)
            </h2>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.caption,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Top banner renders the active theme CSS variable live. The 4-row
              matrix below compares resolved values across <code>base</code>,{" "}
              <code>dark</code>, <code>next</code>, and <code>next-dark</code>.
            </p>
          </div>

          {groupedSemanticColors.length === 0 ? (
            <div
              style={{
                padding: themeVars.spacing["4"],
                borderRadius: themeVars.shape.border.radius["2"],
                background: themeVars.colors.neutral.surface,
                color: themeVars.colors.neutral.textLow,
                fontSize: themeVars.fontSize.body.base,
              }}
            >
              No semantic color tokens match the current filter.
            </div>
          ) : (
            groupedSemanticColors.map(([group, entries]) => (
              <div
                key={group}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: themeVars.spacing["2-5"],
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: themeVars.fontSize.body.highlight,
                    fontWeight: themeVars.fontWeight.bold,
                    textTransform: "capitalize",
                  }}
                >
                  {group} ({entries.length})
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(270px, 1fr))",
                    gap: themeVars.spacing["3"],
                  }}
                >
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      style={{
                        borderRadius: themeVars.shape.border.radius["2"],
                        border: `1px solid ${
                          entry.hasNextDiff
                            ? themeVars.colors.primary.interactive
                            : themeVars.colors.neutral.surfaceHighlight
                        }`,
                        background: themeVars.colors.neutral.background,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Live CSS Variable Swatch */}
                      <div
                        style={{
                          height: "64px",
                          background: entry.cssVar,
                          borderBottom: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          padding: themeVars.spacing["2"],
                        }}
                      >
                        <span
                          style={{
                            padding: "2px 6px",
                            borderRadius: themeVars.shape.border.radius["1"],
                            background: "rgba(0, 0, 0, 0.55)",
                            color: "#ffffff",
                            fontFamily: themeVars.fontFamily.mono,
                            fontSize: "11px",
                          }}
                        >
                          {entry.boxToken}
                        </span>
                        {entry.hasNextDiff && (
                          <span
                            style={{
                              padding: "2px 6px",
                              borderRadius: themeVars.shape.border.radius.full,
                              background: "#111827",
                              color: "#ffffff",
                              fontWeight: 700,
                              fontSize: "10px",
                              letterSpacing: "0.04em",
                            }}
                          >
                            NEXT ≠ BASE
                          </span>
                        )}
                      </div>

                      {/* Card Details */}
                      <div
                        style={{
                          padding: themeVars.spacing["3"],
                          display: "flex",
                          flexDirection: "column",
                          gap: themeVars.spacing["2"],
                        }}
                      >
                        <div
                          style={{
                            fontWeight: themeVars.fontWeight.bold,
                            fontSize: themeVars.fontSize.body.base,
                          }}
                        >
                          {entry.group}.{entry.tokenKey}
                        </div>

                        {/* 6-Theme Value Matrix */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "6px",
                            padding: themeVars.spacing["2"],
                            borderRadius: themeVars.shape.border.radius["1"],
                            background: themeVars.colors.neutral.surface,
                            fontFamily: themeVars.fontFamily.mono,
                            fontSize: "11px",
                          }}
                        >
                          {(
                            [
                              "base",
                              "dark",
                              "next",
                              "next-dark",
                              "next-norteui",
                              "next-norteui-dark",
                            ] as const
                          ).map((mode) => {
                            const val = entry.values[mode] || "—";
                            const isModified =
                              (mode === "next" &&
                                entry.values.next.toLowerCase() !==
                                  entry.values.base.toLowerCase()) ||
                              (mode === "next-dark" &&
                                entry.values["next-dark"].toLowerCase() !==
                                  entry.values.dark.toLowerCase()) ||
                              (mode === "next-norteui" &&
                                entry.values["next-norteui"].toLowerCase() !==
                                  entry.values.base.toLowerCase()) ||
                              (mode === "next-norteui-dark" &&
                                entry.values[
                                  "next-norteui-dark"
                                ].toLowerCase() !==
                                  entry.values.dark.toLowerCase());
                            return (
                              <div
                                key={mode}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                }}
                              >
                                <span
                                  style={{
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "3px",
                                    background:
                                      val !== "—" ? val : "transparent",
                                    border: "1px solid rgba(128,128,128,0.4)",
                                    flexShrink: 0,
                                  }}
                                />
                                <span
                                  style={{
                                    opacity: 0.7,
                                    fontSize: "10px",
                                  }}
                                >
                                  {mode}:
                                </span>
                                <span
                                  style={{
                                    fontWeight: isModified ? 700 : 400,
                                    textDecoration: isModified
                                      ? "underline"
                                      : "none",
                                  }}
                                >
                                  {val}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Copy Chips */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                          }}
                        >
                          <CopyChip
                            idKey={`${entry.id}-box`}
                            label="Box"
                            value={entry.boxToken}
                            copiedKey={copiedKey}
                            onCopy={handleCopy}
                          />
                          <CopyChip
                            idKey={`${entry.id}-vars`}
                            label="vars"
                            value={entry.varsPath}
                            copiedKey={copiedKey}
                            onCopy={handleCopy}
                          />
                          <CopyChip
                            idKey={`${entry.id}-css`}
                            label="css"
                            value={entry.cssVar}
                            copiedKey={copiedKey}
                            onCopy={handleCopy}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* SECTION 2: PRIMITIVE COLOR RAMPS */}
      {showSection("primitive-ramps") && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: themeVars.spacing["4"],
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h4,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Primitive Color Ramps (<code>tokens.color.light.*</code>)
            </h2>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.caption,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Underlying primitive palettes (steps <code>0</code> /{" "}
              <code>5</code> through <code>100</code>), including the{" "}
              <code>next</code> palette ramp used by Norte UI. Click any swatch
              to copy its hex value.
            </p>
          </div>

          {filteredPrimitiveRamps.map((ramp) => (
            <div
              key={ramp.group}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: themeVars.spacing["2"],
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: themeVars.spacing["2"],
                }}
              >
                <strong
                  style={{
                    fontSize: themeVars.fontSize.body.base,
                    textTransform: "capitalize",
                  }}
                >
                  {ramp.group === "next"
                    ? "Next (Legacy) Primary Ramp"
                    : ramp.group === "norteui-primary"
                    ? "Norte UI Primary Ramp"
                    : ramp.group}
                </strong>
                {(ramp.group === "next" ||
                  ramp.group === "norteui-primary") && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: themeVars.shape.border.radius.full,
                      background: themeVars.colors.primary.surface,
                      color: themeVars.colors.primary.textHigh,
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {ramp.group === "next" ? "Legacy" : "Norte UI"}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(82px, 1fr))",
                  gap: themeVars.spacing["1-5"],
                }}
              >
                {ramp.steps.map((step) => {
                  const idKey = `ramp-${ramp.group}-${step.step}`;
                  const isCopied = copiedKey === idKey;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => handleCopy(idKey, step.value)}
                      title={`Copy ${step.value} (${step.tokenPath})`}
                      style={{
                        padding: 0,
                        borderRadius: themeVars.shape.border.radius["2"],
                        border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                        background: themeVars.colors.neutral.background,
                        overflow: "hidden",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          height: "44px",
                          background: step.value,
                          borderBottom: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                        }}
                      />
                      <div
                        style={{
                          padding: "6px 8px",
                          fontFamily: themeVars.fontFamily.mono,
                          fontSize: "11px",
                          color: themeVars.colors.neutral.textHigh,
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>{step.step}</div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: themeVars.colors.neutral.textLow,
                          }}
                        >
                          {isCopied ? "Copied!" : step.value}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* SECTION 3: SPACING & LAYOUT */}
      {showSection("spacing-layout") && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: themeVars.spacing["4"],
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h4,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Spacing, Breakpoints &amp; zIndex
            </h2>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.caption,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Proportional scale for <code>themeVars.spacing</code>,{" "}
              <code>themeVars.breakpoint</code>, and{" "}
              <code>themeVars.zIndex</code>.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: themeVars.spacing["2-5"],
            }}
          >
            {spacingAndLayoutEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: themeVars.spacing["3"],
                  borderRadius: themeVars.shape.border.radius["2"],
                  border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                  background: themeVars.colors.neutral.surface,
                  display: "flex",
                  flexDirection: "column",
                  gap: themeVars.spacing["2"],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ fontSize: themeVars.fontSize.body.base }}>
                    {entry.subcategory}.{entry.key}
                  </strong>
                  <code
                    style={{
                      fontFamily: themeVars.fontFamily.mono,
                      fontSize: "12px",
                      color: themeVars.colors.primary.interactive,
                    }}
                  >
                    {entry.values.base}
                  </code>
                </div>

                {entry.subcategory === "spacing" && (
                  <div
                    style={{
                      height: "12px",
                      width: entry.cssVar,
                      maxWidth: "100%",
                      borderRadius: themeVars.shape.border.radius["0-5"],
                      background: themeVars.colors.primary.interactive,
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <CopyChip
                    idKey={`${entry.id}-box`}
                    label="Box"
                    value={entry.boxPropHint}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                  <CopyChip
                    idKey={`${entry.id}-vars`}
                    label="vars"
                    value={entry.varsPath}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: SHAPE & ELEVATION */}
      {showSection("shape-elevation") && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: themeVars.spacing["4"],
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h4,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Shape, Elevation &amp; Focus Rings
            </h2>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.caption,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Border radii, border widths, shadow elevation levels, and theme
              focus rings (<code>themeVars.utils.focus</code> adapts in{" "}
              <code>next</code>).
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: themeVars.spacing["3"],
            }}
          >
            {shapeAndElevationEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: themeVars.spacing["3"],
                  borderRadius: themeVars.shape.border.radius["2"],
                  border: `1px solid ${
                    entry.hasNextDiff
                      ? themeVars.colors.primary.interactive
                      : themeVars.colors.neutral.surfaceHighlight
                  }`,
                  background: themeVars.colors.neutral.surface,
                  display: "flex",
                  flexDirection: "column",
                  gap: themeVars.spacing["2-5"],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ fontSize: themeVars.fontSize.body.base }}>
                    {entry.subcategory}.{entry.key}
                  </strong>
                  {entry.hasNextDiff && (
                    <span
                      style={{
                        padding: "2px 6px",
                        borderRadius: themeVars.shape.border.radius.full,
                        background: themeVars.colors.primary.interactive,
                        color: themeVars.colors.neutral.background,
                        fontSize: "10px",
                        fontWeight: 700,
                      }}
                    >
                      NEXT ≠ BASE
                    </span>
                  )}
                </div>

                {/* Live Shape/Shadow Preview */}
                <div
                  style={{
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: themeVars.colors.neutral.background,
                    borderRadius:
                      entry.subcategory === "borderRadius"
                        ? entry.cssVar
                        : themeVars.shape.border.radius["2"],
                    border:
                      entry.subcategory === "borderWidth"
                        ? `${entry.cssVar} solid ${themeVars.colors.primary.interactive}`
                        : `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                    boxShadow:
                      entry.subcategory === "shadow" ||
                      entry.subcategory === "focusRing"
                        ? entry.cssVar
                        : "none",
                    fontFamily: themeVars.fontFamily.mono,
                    fontSize: "11px",
                    color: themeVars.colors.neutral.textLow,
                    padding: "0 8px",
                    textAlign: "center",
                  }}
                >
                  {entry.values.base}
                </div>

                {entry.hasNextDiff && (
                  <div
                    style={{
                      fontFamily: themeVars.fontFamily.mono,
                      fontSize: "11px",
                      color: themeVars.colors.neutral.textLow,
                    }}
                  >
                    <div>base: {entry.values.base}</div>
                    <div style={{ fontWeight: 700 }}>
                      next: {entry.values.next}
                    </div>
                    {entry.values["next-norteui"].toLowerCase() !==
                      entry.values.base.toLowerCase() && (
                      <div style={{ fontWeight: 700 }}>
                        next-norteui: {entry.values["next-norteui"]}
                      </div>
                    )}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <CopyChip
                    idKey={`${entry.id}-box`}
                    label="Box"
                    value={entry.boxPropHint}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                  <CopyChip
                    idKey={`${entry.id}-vars`}
                    label="vars"
                    value={entry.varsPath}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 5: TYPOGRAPHY & MOTION */}
      {showSection("typography-motion") && (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: themeVars.spacing["4"],
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: themeVars.fontSize.title.h4,
                fontWeight: themeVars.fontWeight.bold,
              }}
            >
              Typography &amp; Motion Tokens
            </h2>
            <p
              style={{
                margin: `${themeVars.spacing["1"]} 0 0`,
                fontSize: themeVars.fontSize.body.caption,
                color: themeVars.colors.neutral.textLow,
              }}
            >
              Font families, title/body sizes, weights, line heights, and motion
              speeds.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: themeVars.spacing["2-5"],
            }}
          >
            {typographyAndMotionEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  padding: themeVars.spacing["3"],
                  borderRadius: themeVars.shape.border.radius["2"],
                  border: `1px solid ${themeVars.colors.neutral.surfaceHighlight}`,
                  background: themeVars.colors.neutral.surface,
                  display: "flex",
                  flexDirection: "column",
                  gap: themeVars.spacing["2"],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <strong style={{ fontSize: themeVars.fontSize.body.base }}>
                    {entry.subcategory}.{entry.key}
                  </strong>
                  <code
                    style={{
                      fontFamily: themeVars.fontFamily.mono,
                      fontSize: "11px",
                      color: themeVars.colors.primary.interactive,
                    }}
                  >
                    {entry.values.base}
                  </code>
                </div>

                {entry.hasNextDiff &&
                  entry.values["next-norteui"].toLowerCase() !==
                    entry.values.base.toLowerCase() && (
                    <div
                      style={{
                        fontFamily: themeVars.fontFamily.mono,
                        fontSize: "11px",
                        fontWeight: 700,
                        color: themeVars.colors.neutral.textLow,
                      }}
                    >
                      next-norteui: {entry.values["next-norteui"]}
                    </div>
                  )}

                {(entry.subcategory.startsWith("fontSize") ||
                  entry.subcategory === "fontFamily" ||
                  entry.subcategory === "fontWeight") && (
                  <div
                    style={{
                      padding: themeVars.spacing["2"],
                      borderRadius: themeVars.shape.border.radius["1"],
                      background: themeVars.colors.neutral.background,
                      fontFamily:
                        entry.subcategory === "fontFamily"
                          ? entry.cssVar
                          : themeVars.fontFamily.sans,
                      fontSize: entry.subcategory.startsWith("fontSize")
                        ? entry.cssVar
                        : themeVars.fontSize.body.base,
                      fontWeight:
                        entry.subcategory === "fontWeight"
                          ? (entry.cssVar as unknown as number)
                          : undefined,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Nimbus Design System — Aa Bb Cc 123
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <CopyChip
                    idKey={`${entry.id}-box`}
                    label="Use"
                    value={entry.boxPropHint}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                  <CopyChip
                    idKey={`${entry.id}-vars`}
                    label="vars"
                    value={entry.varsPath}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const meta: Meta<typeof TokenCatalog> = {
  title: "Foundations/Design Tokens",
  component: TokenCatalog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TokenCatalog>;

export const Catalog: Story = {
  args: {
    initialCategory: "all",
    initialOnlyNextDiff: false,
  },
};

export const SemanticColors: Story = {
  args: {
    initialCategory: "semantic-colors",
    initialOnlyNextDiff: false,
  },
};

export const ModifiedInNext: Story = {
  args: {
    initialCategory: "all",
    initialOnlyNextDiff: true,
  },
};

export const PrimitiveColorRamps: Story = {
  args: {
    initialCategory: "primitive-ramps",
    initialOnlyNextDiff: false,
  },
};

export const SpacingAndLayout: Story = {
  args: {
    initialCategory: "spacing-layout",
    initialOnlyNextDiff: false,
  },
};

export const ShapeAndElevation: Story = {
  args: {
    initialCategory: "shape-elevation",
    initialOnlyNextDiff: false,
  },
};

export const TypographyAndMotion: Story = {
  args: {
    initialCategory: "typography-motion",
    initialOnlyNextDiff: false,
  },
};
