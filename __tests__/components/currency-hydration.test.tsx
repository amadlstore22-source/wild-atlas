import { describe, it, expect, afterEach } from "vitest";
import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import CurrencyProvider from "@/components/ui/CurrencyProvider";
import { useCurrency } from "@/lib/currency";
import { CURRENCY_COOKIE, formatPrice } from "@/lib/currency-core";

/**
 * THE INCIDENT (found 2026-09-29): pages are prerendered in EUR, and the
 * provider read the saved currency cookie in its first client render. For a
 * visitor who had picked USD, GBP or MAD that render disagreed with the HTML;
 * React threw hydration error #418 and threw away the entire server-rendered
 * page, rebuilding it in the browser (40/40 sampled nodes replaced on the live
 * site, footer included). Prices still ended up right, so nothing looked
 * broken — it only cost every non-euro visitor a second full render.
 *
 * Nothing else catches it: jsdom tests render on the client only, where the
 * old code was correct, and the build never hydrates. This test does what the
 * browser does — server HTML in EUR, a USD cookie, then hydrateRoot — and
 * requires zero recoverable errors AND the visitor's currency afterwards.
 */

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function Price() {
  const { format, currency } = useCurrency();
  return (
    <p>
      <span data-testid="code">{currency}</span> <span data-testid="price">{format(120)}</span>
    </p>
  );
}

const tree = (
  <CurrencyProvider>
    <Price />
  </CurrencyProvider>
);

afterEach(() => {
  document.cookie = `${CURRENCY_COOKIE}=; path=/; max-age=0`;
  document.body.innerHTML = "";
});

describe("currency provider hydration", () => {
  for (const currency of ["USD", "GBP", "MAD", "EUR"] as const) {
    it(`hydrates the EUR page without an error, then shows ${currency}`, async () => {
      // Server: no cookie, prerendered in the default currency.
      const html = renderToString(tree);
      expect(html).toContain(formatPrice(120, "EUR"));

      // Browser: the visitor's saved choice.
      document.cookie = `${CURRENCY_COOKIE}=${currency}; path=/`;
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);
      const serverNode = container.querySelector("p")!;

      const errors: unknown[] = [];
      await act(async () => {
        hydrateRoot(container, tree, {
          onRecoverableError: (e) => errors.push(e),
        });
      });

      expect(errors, "hydration mismatch: React discarded the server HTML").toEqual([]);
      // The server's DOM was kept, not rebuilt.
      expect(container.querySelector("p")).toBe(serverNode);
      expect(container.querySelector('[data-testid="code"]')!.textContent).toBe(currency);
      expect(container.querySelector('[data-testid="price"]')!.textContent).toBe(formatPrice(120, currency));
    });
  }
});
