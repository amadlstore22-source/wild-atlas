import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormSubmit } from "@/hooks/useFormSubmit";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("useFormSubmit", () => {
  it("starts in idle state", () => {
    const { result } = renderHook(() => useFormSubmit());
    expect(result.current.sending).toBe(false);
    expect(result.current.sent).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("sets sending=true while the request is in-flight", async () => {
    let resolveFetch!: (val: Response) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise<Response>((r) => { resolveFetch = r; }))
    );

    const { result } = renderHook(() => useFormSubmit());
    act(() => {
      result.current.submit({ name: "Test", email: "t@t.com", message: "hi" });
    });
    expect(result.current.sending).toBe(true);

    await act(async () => {
      resolveFetch(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    });
    expect(result.current.sending).toBe(false);
  });

  it("sets sent=true on a successful 200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 })))
    );

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
    });

    expect(result.current.sent).toBe(true);
    expect(result.current.error).toBe("");
  });

  it("sets error on a non-200 response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(new Response("{}", { status: 500 })))
    );

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
    });

    expect(result.current.sent).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  it("sets error on a network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network down")))
    );

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
    });

    expect(result.current.sent).toBe(false);
    expect(result.current.error).toMatch(/network/i);
  });

  it("ignores a second concurrent submit call (double-click guard)", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 }))
    );
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
      result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("calls onSuccess callback when the request succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(new Response(JSON.stringify({ ok: true }), { status: 200 })))
    );

    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFormSubmit({ onSuccess }));
    await act(async () => {
      await result.current.submit({ name: "Ali", email: "ali@example.com", message: "Hello" });
    });

    expect(onSuccess).toHaveBeenCalledOnce();
  });
});
