import { beforeEach, vi } from "vitest";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

vi.stubGlobal("__vite_asset__", "");

vi.mock("vue-sonner", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
  };
});

vi.mock("@/router", () => ({
  router: { push: vi.fn(), replace: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});
