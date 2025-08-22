import { eventHasNodeWithAttribute } from "./eventHasNodeWithAttribute";

describe("eventHasNodeWithAttribute", () => {
  const ATTRIBUTE = "data-ignore";

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
    ancestorWithAttr.setAttribute(ATTRIBUTE, "");

    const event = createEvent({
      composedPath: [target, ancestorWithAttr, document.body],
      target,
    });

    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, ATTRIBUTE)
    ).toBe(true);
  });

  it("falls back to closest() when composedPath has no matching Element", () => {
    const ancestorWithAttr = document.createElement("div");
    ancestorWithAttr.setAttribute(ATTRIBUTE, "true");
    const mid = document.createElement("section");
    const target = document.createElement("span");
    ancestorWithAttr.appendChild(mid);
    mid.appendChild(target);

    const event = createEvent({
      composedPath: [target, document.body],
      target,
    });

    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, ATTRIBUTE)
    ).toBe(true);
  });

  it("returns true when target itself has the attribute and no composedPath is provided", () => {
    const target = document.createElement("div");
    target.setAttribute(ATTRIBUTE, "yes");

    const event = createEvent({ target });

    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, ATTRIBUTE)
    ).toBe(true);
  });

  it("returns false when no composedPath and target is null", () => {
    const event = createEvent({ target: null });

    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, ATTRIBUTE)
    ).toBe(false);
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

    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, ATTRIBUTE)
    ).toBe(false);
  });

  it("returns false when composedPath is an empty array", () => {
    const target = document.createElement("button");
    const event = createEvent({ composedPath: [], target });
    expect(
      eventHasNodeWithAttribute(event as unknown as PointerEvent, "data-ignore")
    ).toBe(false);
  });
});
