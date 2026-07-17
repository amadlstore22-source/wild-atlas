import { describe, it, expect } from "vitest";
import { isRelevant } from "@/lib/news";

// Shorthand: a broad (non-country-scoped) travel feed, e.g. NYT Travel.
const travelFeed = (title: string, excerpt = "") =>
  isRelevant(title, excerpt, "travel", false);

// Shorthand: a broad news feed categorised as Morocco but not scoped, e.g. BBC Africa.
const africaFeed = (title: string, excerpt = "") =>
  isRelevant(title, excerpt, "morocco", false);

describe("news relevance: Morocco is a hard gate", () => {
  it("rejects travel articles about other countries", () => {
    // These are the real failure cases: every one matches a generic
    // RELEVANCE_KEYWORD ("travel", "trip", "holiday", "adventure"), which used
    // to be enough to publish them on a Morocco tour operator's homepage.
    expect(travelFeed("36 Hours in Kyoto: where to eat, stay and travel")).toBe(false);
    expect(travelFeed("The best holiday destinations in Portugal")).toBe(false);
    expect(travelFeed("A hiking adventure through the Peruvian Andes")).toBe(false);
    expect(travelFeed("Your next trip: Iceland's volcanic nature trails")).toBe(false);
    expect(travelFeed("Cultural heritage tour of Rome")).toBe(false);
  });

  it("accepts travel articles that are actually about Morocco", () => {
    expect(travelFeed("48 hours in Marrakech: souks, riads and rooftop views")).toBe(true);
    expect(travelFeed("Trekking the High Atlas", "A guide to hiking in Morocco")).toBe(true);
    expect(travelFeed("Essaouira is the coastal escape you have been missing")).toBe(true);
  });

  it("rejects generic African news that never mentions Morocco", () => {
    expect(africaFeed("Kenya opens new wildlife corridor in the Rift Valley")).toBe(false);
    expect(africaFeed("Nigeria's tech scene draws record investment")).toBe(false);
  });

  it("accepts African-feed news that is about Morocco", () => {
    expect(africaFeed("Morocco unveils new high-speed rail link")).toBe(true);
  });

  it("trusts country-scoped feeds without needing the country named", () => {
    // Guardian Morocco is editorially Morocco-only, so a headline that names
    // only a city is still legitimate — provided it is travel content.
    expect(isRelevant("A weekend trip to the blue city", "", "morocco", true)).toBe(true);
  });

  it("rejects non-travel stories even from a Morocco-scoped feed", () => {
    // Real example that reached the live page: Moroccan, but a press-conference
    // scuffle is not travel content. Being about Morocco is necessary, not
    // sufficient.
    expect(isRelevant("Morocco presser disrupted by fighting journalists", "", "morocco", true)).toBe(false);
  });

  it("still rejects politics, sport and crime even when Morocco-related", () => {
    expect(travelFeed("Morocco football team wins the cup")).toBe(false);
    expect(africaFeed("Morocco election results announced")).toBe(false);
    expect(africaFeed("Two killed in Casablanca attack")).toBe(false);
  });

  it("matches Morocco keywords on word boundaries, not substrings", () => {
    // "fes" must not match inside "manifesto"; "atlas" not inside "Atlassian".
    expect(travelFeed("Reading the manifesto of modern travel")).toBe(false);
    expect(travelFeed("Atlassian launches a new travel booking tool")).toBe(false);
  });

  it("requires a travel angle on travel feeds, not just any Morocco mention", () => {
    // A Morocco mention alone shouldn't publish an off-topic business piece.
    expect(travelFeed("Morocco raises corporate registration fees")).toBe(false);
  });
});
