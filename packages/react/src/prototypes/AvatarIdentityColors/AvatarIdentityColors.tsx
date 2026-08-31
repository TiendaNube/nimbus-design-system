import React, { useEffect, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";
import { Toggle } from "@nimbus-ds/toggle";

// ---------------------------------------------------------------------------
// Disposable Playground prototype — see packages/react/src/prototypes/README.md
// Learning question: how should an Avatar represent a person with a photo vs.
// initials only, and how do we assign initials colors so the same person is
// always the same color (consistency) while different people stay visually
// distinct (identifiability)?
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Deterministic color assignment
// ---------------------------------------------------------------------------

/**
 * Fixed, small palette for initials-only avatars. Every background pairs with
 * a single #FFFFFF text color; `contrastRatio` is the WCAG 2.1 relative-
 * luminance contrast of that pair, computed once offline and pinned here so
 * the palette can't silently drift below the 4.5:1 AA threshold for normal
 * text. All eight clear it with margin (6.25–8.32:1). Kept to 8 hues on
 * purpose — a bigger palette reads as "more accurate" but two more hues in a
 * small set become hard to tell apart at avatar size, which defeats the
 * point of a color as an identity cue.
 */
export const AVATAR_PALETTE = [
  { name: "blue", background: "#1F4B99", text: "#FFFFFF", contrastRatio: 8.32 },
  { name: "purple", background: "#5A3E99", text: "#FFFFFF", contrastRatio: 8.13 },
  { name: "magenta", background: "#8C2E6B", text: "#FFFFFF", contrastRatio: 7.73 },
  { name: "red", background: "#A32B2B", text: "#FFFFFF", contrastRatio: 7.15 },
  { name: "orange", background: "#8A4B12", text: "#FFFFFF", contrastRatio: 6.78 },
  { name: "olive", background: "#5C5A1E", text: "#FFFFFF", contrastRatio: 7.15 },
  { name: "green", background: "#2F6B3B", text: "#FFFFFF", contrastRatio: 6.39 },
  { name: "teal", background: "#1B6B6B", text: "#FFFFFF", contrastRatio: 6.25 },
] as const;

/**
 * FNV-1a 32-bit hash. Dependency-free and stable across JS engines/renders —
 * used only to pick a palette index, never for anything security-sensitive.
 */
const hashStringToIndex = (id: string, modulo: number): number => {
  let hash = 0x811c9dc5;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0) % modulo;
};

/**
 * The same personId always resolves to the same palette entry — that's the
 * consistency guarantee this prototype exists to test. Different personIds
 * spread across the fixed palette, but with only 8 colors a roster of 8+
 * people can still collide (see two "magenta" people in the default roster
 * below). That collision is deliberate, not a bug: it's the concrete case
 * the learning question needs — does color alone stay identifying once two
 * people share a hue, or does the pairing with initials/name carry it?
 */
export const getIdentityColor = (personId: string) =>
  AVATAR_PALETTE[hashStringToIndex(personId, AVATAR_PALETTE.length)];

export const getInitials = (fullName: string): string =>
  fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

// ---------------------------------------------------------------------------
// Mocked photo state
// ---------------------------------------------------------------------------

// Mocked/simulated "photo" state: a locally embedded inline-SVG silhouette
// placeholder (no network fetch, no external image host) standing in for a
// real uploaded photo — not a real image pipeline.
const MOCK_PHOTO_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<circle cx="32" cy="32" r="32" fill="#C9CDD6"/>' +
    '<circle cx="32" cy="25" r="12" fill="#8A93A6"/>' +
    '<path d="M8 60c2-15 12-23 24-23s22 8 24 23" fill="#8A93A6"/>' +
    "</svg>"
)}`;

// ---------------------------------------------------------------------------
// Fictitious roster — invented names only, never real people/customer data.
// ---------------------------------------------------------------------------

export interface Person {
  id: string;
  name: string;
}

export const ROSTER: Person[] = [
  { id: "ana.gomez", name: "Ana Gómez" },
  { id: "bruno.silva", name: "Bruno Silva" },
  { id: "carla.diaz", name: "Carla Díaz" },
  { id: "diego.torres", name: "Diego Torres" },
  { id: "elena.fernandez", name: "Elena Fernández" },
  { id: "facundo.rojas", name: "Facundo Rojas" },
  { id: "gabriela.souza", name: "Gabriela Souza" },
  { id: "hugo.martins", name: "Hugo Martins" },
];

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

export type AvatarSize = "sm" | "md" | "lg";

const SIZE_PX: Record<AvatarSize, number> = { sm: 40, md: 56, lg: 72 };

interface AvatarProps {
  person: Person;
  hasPhoto: boolean;
  size?: AvatarSize;
}

// Circular swatch needs an arbitrary, per-identity hex background — Nimbus's
// Box only accepts token-restricted backgroundColor values, so this one
// visual piece is a plain styled element rather than a Box. Everything
// around it (layout, text, the toggle) stays on Nimbus components/tokens.
const Avatar: React.FC<AvatarProps> = ({ person, hasPhoto, size = "md" }) => {
  const dimension = SIZE_PX[size];

  if (hasPhoto) {
    return (
      <img
        src={MOCK_PHOTO_DATA_URI}
        alt={person.name}
        width={dimension}
        height={dimension}
        style={{ borderRadius: "50%", display: "block" }}
      />
    );
  }

  const color = getIdentityColor(person.id);

  return (
    <div
      role="img"
      aria-label={person.name}
      style={{
        width: dimension,
        height: dimension,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.background,
        color: color.text,
        fontWeight: 600,
        fontSize: Math.round(dimension * 0.36),
        fontFamily: "inherit",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {getInitials(person.name)}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Playground: one avatar, driven by Storybook args/controls.
// ---------------------------------------------------------------------------

export interface AvatarIdentityColorsProps {
  /** Which roster member to render. */
  personId?: string;
  /** Photo vs. initials-only. Starts the internal toggle in this state. */
  hasPhoto?: boolean;
  size?: AvatarSize;
}

export const AvatarIdentityColors: React.FC<AvatarIdentityColorsProps> = ({
  personId = ROSTER[0].id,
  hasPhoto: hasPhotoArg = false,
  size = "lg",
}) => {
  const person = ROSTER.find((candidate) => candidate.id === personId) ?? ROSTER[0];
  const [hasPhoto, setHasPhoto] = useState(hasPhotoArg);

  // Re-sync when a Storybook control changes the args, not on every render.
  useEffect(() => setHasPhoto(hasPhotoArg), [hasPhotoArg, personId]);

  const color = getIdentityColor(person.id);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="4"
      padding="8"
    >
      <Avatar person={person} hasPhoto={hasPhoto} size={size} />
      <Title as="h4">{person.name}</Title>
      <Toggle
        name={`toggle-${person.id}`}
        label={hasPhoto ? "Has photo" : "Initials only"}
        active={hasPhoto}
        onChange={(event) => setHasPhoto(event.target.checked)}
      />
      <Text fontSize="caption" color="neutral-textLow">
        Initials color: {color.name} · background {color.background} ·
        contrast {color.contrastRatio}:1 vs. white text
      </Text>
    </Box>
  );
};

// ---------------------------------------------------------------------------
// FullScreen: the whole roster, each avatar independently toggleable — the
// direct testable experience for the learning question.
// ---------------------------------------------------------------------------

export const AvatarIdentityRoster: React.FC<{ size?: AvatarSize }> = ({
  size = "lg",
}) => {
  const [photoById, setPhotoById] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ROSTER.map((person, index) => [person.id, index % 3 === 0]))
  );

  const togglePerson = (id: string) =>
    setPhotoById((current) => ({ ...current, [id]: !current[id] }));

  return (
    <Box display="flex" flexDirection="column" gap="6" padding="6">
      <Box display="flex" flexDirection="column" gap="1">
        <Title as="h3">Avatar identity &amp; color pilot</Title>
        <Text color="neutral-textLow">
          Toggle any card between a photo and initials only. A person&apos;s
          initials color never changes across toggles — it&apos;s derived
          deterministically from their id, not from the current photo state.
        </Text>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))"
        gap="5"
      >
        {ROSTER.map((person) => {
          const hasPhoto = Boolean(photoById[person.id]);
          const color = getIdentityColor(person.id);

          return (
            <Box
              key={person.id}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="3"
              padding="5"
              borderRadius="2"
              borderWidth="1"
              borderStyle="solid"
              borderColor="neutral-surfaceHighlight"
              backgroundColor="neutral-background"
            >
              <Avatar person={person} hasPhoto={hasPhoto} size={size} />
              <Text fontWeight="bold">{person.name}</Text>
              <Text fontSize="caption" color="neutral-textLow">
                {hasPhoto ? "Photo (mocked)" : `Initials · ${color.name}`}
              </Text>
              <Toggle
                name={`toggle-${person.id}`}
                label={hasPhoto ? "Photo" : "Initials"}
                active={hasPhoto}
                onChange={() => togglePerson(person.id)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
