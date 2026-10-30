import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Link } from "@nimbus-ds/link";
import { Popover } from "@nimbus-ds/popover";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { ChevronRightIcon } from "@nimbus-ds/icons";

export interface TrailItem {
  id: string;
  label: string;
}

export interface BreadcrumbTrailProps {
  items: TrailItem[];
  /** Maximum visible items before the middle ones collapse into "…". */
  maxVisible?: number;
  onNavigate: (id: string) => void;
}

const Separator: React.FC = () => (
  <Box as="span" display="inline-flex" alignItems="center" aria-hidden="true">
    <ChevronRightIcon size="small" />
  </Box>
);

/** Simulated Breadcrumb: a nav landmark with an ordered list of links. */
export const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({
  items,
  maxVisible = 4,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const collapse = items.length > maxVisible;
  const first = items[0];
  const tail = collapse ? items.slice(-(maxVisible - 2)) : items.slice(1);
  const hidden = collapse ? items.slice(1, items.length - tail.length) : [];

  const renderLink = (item: TrailItem, isCurrent: boolean) =>
    isCurrent ? (
      <Text as="span" fontWeight="medium" aria-current="page">
        {item.label}
      </Text>
    ) : (
      <Link
        as="a"
        href={`#${item.id}`}
        appearance="neutral"
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          onNavigate(item.id);
        }}
      >
        {item.label}
      </Link>
    );

  const entries: React.ReactNode[] = [
    <li key={first.id}>{renderLink(first, items.length === 1)}</li>,
  ];
  if (collapse) {
    entries.push(
      <li key="collapsed">
        <Popover
          visible={open}
          onVisibility={setOpen}
          enabledClick
          enabledDismiss
          position="bottom-start"
          content={
            <Box display="flex" flexDirection="column" gap="1">
              {hidden.map((item) => (
                <Button
                  key={item.id}
                  appearance="transparent"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(item.id);
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          }
        >
          <Button
            appearance="transparent"
            aria-label={`Show ${hidden.length} hidden levels`}
          >
            …
          </Button>
        </Popover>
      </li>
    );
  }
  tail.forEach((item) => {
    entries.push(
      <li key={item.id}>
        {renderLink(item, item.id === items[items.length - 1].id)}
      </li>
    );
  });

  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box
        as="ol"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap="2"
        margin="none"
        padding="none"
        style={{ listStyle: "none" }}
      >
        {entries.map((entry, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <li aria-hidden="true">
                <Separator />
              </li>
            )}
            {entry}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

const TREE: Record<string, { label: string; parent?: string }> = {
  home: { label: "Home" },
  products: { label: "Products", parent: "home" },
  catalog: { label: "Catalog", parent: "products" },
  shoes: { label: "Shoes", parent: "catalog" },
  running: { label: "Running shoes", parent: "shoes" },
  trail: { label: "Trail running shoe, model A", parent: "running" },
};

const pathTo = (id: string): TrailItem[] => {
  const out: TrailItem[] = [];
  let cur: string | undefined = id;
  while (cur) {
    out.unshift({ id: cur, label: TREE[cur].label });
    cur = TREE[cur].parent;
  }
  return out;
};

export interface Exploration553Props {
  /** Simulates a narrow screen by constraining the content width. */
  narrow?: boolean;
  maxVisible?: number;
}

/** Mock App Shell: static side menu plus content area with the trail. */
export const Exploration553: React.FC<Exploration553Props> = ({
  narrow = false,
  maxVisible = 4,
}) => {
  const [current, setCurrent] = useState("trail");
  const trail = pathTo(current);
  const children = Object.entries(TREE)
    .filter(([, v]) => v.parent === current)
    .map(([id, v]) => ({ id, label: v.label }));

  return (
    <Box display="flex" gap="4" padding="4" minHeight="100vh">
      {!narrow && (
        <Box
          display="flex"
          flexDirection="column"
          gap="2"
          width="200px"
          borderRightWidth="1"
          borderStyle="solid"
          borderColor="neutral-surfaceHighlight"
          paddingRight="4"
        >
          <Text fontWeight="bold">Menu (simulated)</Text>
          <Link as="a" href="#home" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrent("home"); }}>Home</Link>
          <Link as="a" href="#products" onClick={(e: React.MouseEvent) => { e.preventDefault(); setCurrent("products"); }}>Products</Link>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="column"
        gap="4"
        flex="1"
        style={{ maxWidth: narrow ? 320 : undefined }}
      >
        <BreadcrumbTrail
          items={trail}
          maxVisible={narrow ? 3 : maxVisible}
          onNavigate={setCurrent}
        />
        <Title as="h1">{TREE[current].label}</Title>
        <Text color="neutral-textLow">
          You are {trail.length - 1} level{trail.length === 2 ? "" : "s"} below
          Home. Click an ancestor in the trail to go back.
        </Text>
        {children.length > 0 && (
          <Box display="flex" flexDirection="column" gap="1">
            <Text fontWeight="medium">Go deeper</Text>
            {children.map((c) => (
              <Button key={c.id} onClick={() => setCurrent(c.id)}>
                {c.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
