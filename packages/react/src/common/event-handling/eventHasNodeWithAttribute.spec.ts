import { eventHasNodeWithAttribute } from "./eventHasNodeWithAttribute";
import { DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE } from "./events.constants";

const hasAttr = (e: MouseEvent) =>
  eventHasNodeWithAttribute(
    e as unknown as PointerEvent,
    DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE
  );

describe("eventHasNodeWithAttribute", () => {
  const createEvent = (
    options: {
      composedPath?: Array<unknown>;
      target?: EventTarget | null;
    } = {}
  ): MouseEvent => {
    const { composedPath, target } = options;
    const eventLike: Partial<MouseEvent> & {
      composedPath?: () => Array<unknown> | null;
    } = { target: target ?? null };

    if (composedPath) {
      eventLike.composedPath = () => composedPath as unknown as EventTarget[];
    }

    return eventLike as unknown as MouseEvent;
  };

  it("returns true when composedPath contains an Element with the attribute", () => {
    const target = document.createElement("button");
    const ancestorWithAttr = document.createElement("div");
    ancestorWithAttr.setAttribute(DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE, "");

    const event = createEvent({
      composedPath: [target, ancestorWithAttr, document.body],
      target,
    });

    expect(hasAttr(event)).toBe(true);
  });

  it("falls back to closest() when composedPath has no matching Element", () => {
    const ancestorWithAttr = document.createElement("div");
    ancestorWithAttr.setAttribute(
      DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE,
      "true"
    );
    const mid = document.createElement("section");
    const target = document.createElement("span");
    ancestorWithAttr.appendChild(mid);
    mid.appendChild(target);

    const event = createEvent({
      composedPath: [target, document.body],
      target,
    });

    expect(hasAttr(event)).toBe(true);
  });

  it("returns true when target itself has the attribute and no composedPath is provided", () => {
    const target = document.createElement("div");
    target.setAttribute(DEFAULT_OUTSIDE_PRESS_IGNORE_ATTRIBUTE, "yes");

    const event = createEvent({ target });

    expect(hasAttr(event)).toBe(true);
  });

  it("returns false when no composedPath and target is null", () => {
    const event = createEvent({ target: null });

    expect(hasAttr(event)).toBe(false);
  });

  it("returns false when neither composedPath nor closest() find a match", () => {
    const ancestor = document.createElement("div");
    const target = document.createElement("p");
    ancestor.appendChild(target);

    const textNode = document.createTextNode("text");

    const event = createEvent({
      composedPath: [target, textNode, document.body],
      target,
    });

    expect(hasAttr(event)).toBe(false);
  });

  it("returns false when composedPath is an empty array", () => {
    const target = document.createElement("button");
    const event = createEvent({ composedPath: [], target });
    expect(hasAttr(event)).toBe(false);
  });
});
