import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import dict from "@/dictionaries/en.json";

/**
 * The float sits at z-50; the tour page's mobile CTA bar sits at z-40. Without
 * this behaviour the float covers that bar's own WhatsApp button — two of the
 * same control stacked, the useful one underneath.
 */

// Real timers throughout: the component uses a 1.5s mount delay, but the
// sticky-bar behaviour we care about is driven by a MutationObserver, which
// waitFor polls for directly. Fake timers would deadlock waitFor.
afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});

/**
 * Direct lookup for the suppressed cases. Once the button carries
 * aria-hidden="true" it leaves the accessibility tree, so getByRole cannot see
 * it — which is precisely the behaviour under test.
 */
function waLink(): HTMLAnchorElement {
  const el = document.querySelector<HTMLAnchorElement>('a[aria-label="Chat on WhatsApp"]');
  if (!el) throw new Error("WhatsApp link not rendered");
  return el;
}

function addStickyBar() {
  const bar = document.createElement("div");
  bar.setAttribute("data-sticky-cta", "");
  // jsdom reports offsetParent as null for detached/hidden nodes; attaching to
  // body with a layout-bearing display makes the visibility check meaningful.
  Object.defineProperty(bar, "offsetParent", { value: document.body, configurable: true });
  document.body.appendChild(bar);
  return bar;
}

describe("WhatsAppButton", () => {
  it("renders a WhatsApp link", () => {
    render(<WhatsAppButton dict={dict} />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.getAttribute("href")).toContain("wa.me");
  });

  it("is inert while a sticky CTA bar is on the page", async () => {
    addStickyBar();
    render(<WhatsAppButton dict={dict} />);

    await waitFor(() => {
      const link = waLink();
      expect(link.getAttribute("aria-hidden")).toBe("true");
      expect(link.className).toContain("pointer-events-none");
      // Removed from the tab order too, so it cannot be focused behind the bar.
      expect(link.getAttribute("tabindex")).toBe("-1");
    });
  });

  it("is interactive when no sticky bar is present", async () => {
    render(<WhatsAppButton dict={dict} />);

    await waitFor(() => {
      const link = screen.getByRole("link", { name: /whatsapp/i });
      expect(link.getAttribute("aria-hidden")).toBe("false");
      expect(link.getAttribute("tabindex")).toBeNull();
    });
  });

  // The bar mounts with the tour page rather than on first paint, so a one-shot
  // check at mount would miss it.
  it("reacts to a sticky bar appearing after mount", async () => {
    render(<WhatsAppButton dict={dict} />);
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("aria-hidden")).toBe("false");
    });

    addStickyBar();

    await waitFor(() => {
      const link = waLink();
      expect(link.getAttribute("aria-hidden")).toBe("true");
    });
  });

  it("comes back when the sticky bar is removed", async () => {
    const bar = addStickyBar();
    render(<WhatsAppButton dict={dict} />);

    await waitFor(() => {
      expect(
        waLink().getAttribute("aria-hidden"),
      ).toBe("true");
    });

    bar.remove();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("aria-hidden")).toBe("false");
    });
  });
});
