import { uniqueId } from "./toastProvider.definitions";

describe("Toast ID generation", () => {
  it("keeps IDs unique when separate builds load the module", () => {
    const firstId = uniqueId();
    let secondId = "";

    jest.isolateModules(() => {
      const isolatedModule = jest.requireActual(
        "./toastProvider.definitions"
      ) as { uniqueId: () => string };
      secondId = isolatedModule.uniqueId();
    });

    expect(firstId).toMatch(/^nimbus-toast-\d+$/);
    expect(secondId).toMatch(/^nimbus-toast-\d+$/);
    expect(secondId).not.toBe(firstId);
  });
});
