import { describe, expect, it } from "vitest";
import { formatKES } from "./mockApi";

describe("formatKES", () => {
  it("formats whole numbers with the KES prefix and thousands separators", () => {
    expect(formatKES(750)).toBe("KES 750");
    expect(formatKES(17550)).toBe("KES 17,550");
  });

  it("formats zero", () => {
    expect(formatKES(0)).toBe("KES 0");
  });
});
