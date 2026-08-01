# -*- coding: utf-8 -*-
"""Build the standalone index-submission checklist HTML from index_data.json."""
import json, sys

data = json.load(open(sys.argv[1], encoding="utf-8"))
out_path = sys.argv[2]

# Flatten a plain newline list per tier for the bulk-copy buttons.
for t in data["tiers"]:
    t["plain"] = "\n".join(r["u"] for r in t["rows"])
ALL_PLAIN = "\n".join(r["u"] for t in data["tiers"] for r in t["rows"])

payload = json.dumps(data, ensure_ascii=False)

HTML = r'''<title>Search Console — Index Queue · Marrakech Eco Tours</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root {
    --ground: #f4f2ee;
    --panel: #fbfaf7;
    --panel-2: #efece5;
    --ink: #23201b;
    --ink-2: #5c564c;
    --ink-3: #8b8478;
    --rule: #e0dbd0;
    --rule-2: #d3cdbf;
    --clay: #b8532e;
    --clay-ink: #93401f;
    --done: #4f7a4e;
    --done-bg: #e7efe4;
    --mono: ui-monospace, "SF Mono", "JetBrains Mono", "Cascadia Code", Menlo, Consolas, monospace;
    --sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --sh: 0 1px 2px rgba(35,32,27,.04), 0 1px 1px rgba(35,32,27,.03);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --ground: #16140f; --panel: #1e1b15; --panel-2: #262219;
      --ink: #ece7dc; --ink-2: #aca597; --ink-3: #756e60;
      --rule: #322d23; --rule-2: #40392d;
      --clay: #e08256; --clay-ink: #f0a37e;
      --done: #86b183; --done-bg: #1c261a;
      --sh: none;
    }
  }
  :root[data-theme="light"] {
    --ground: #f4f2ee; --panel: #fbfaf7; --panel-2: #efece5;
    --ink: #23201b; --ink-2: #5c564c; --ink-3: #8b8478;
    --rule: #e0dbd0; --rule-2: #d3cdbf; --clay: #b8532e; --clay-ink: #93401f;
    --done: #4f7a4e; --done-bg: #e7efe4; --sh: 0 1px 2px rgba(35,32,27,.04),0 1px 1px rgba(35,32,27,.03);
  }
  :root[data-theme="dark"] {
    --ground: #16140f; --panel: #1e1b15; --panel-2: #262219;
    --ink: #ece7dc; --ink-2: #aca597; --ink-3: #756e60;
    --rule: #322d23; --rule-2: #40392d; --clay: #e08256; --clay-ink: #f0a37e;
    --done: #86b183; --done-bg: #1c261a; --sh: none;
  }

  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--ground); color: var(--ink);
    font-family: var(--sans); line-height: 1.5;
    -webkit-font-smoothing: antialiased; font-feature-settings: "cv05","ss01";
  }
  .wrap { max-width: 880px; margin: 0 auto; padding: 0 20px 96px; }

  /* ---- sticky header ---- */
  header {
    position: sticky; top: 0; z-index: 20;
    background: color-mix(in srgb, var(--ground) 88%, transparent);
    backdrop-filter: blur(12px) saturate(1.2);
    border-bottom: 1px solid var(--rule);
  }
  .head-inner { max-width: 880px; margin: 0 auto; padding: 18px 20px 16px; }
  .eyebrow {
    font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--clay); font-weight: 600; margin: 0 0 5px;
  }
  h1 { font-size: 20px; margin: 0; letter-spacing: -.01em; font-weight: 650; }
  h1 span { color: var(--ink-3); font-weight: 400; }

  .bar {
    margin-top: 14px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  }
  .track {
    flex: 1 1 220px; height: 8px; border-radius: 99px; background: var(--panel-2);
    overflow: hidden; min-width: 180px; border: 1px solid var(--rule);
  }
  .fill {
    height: 100%; width: 0%; background: var(--clay);
    border-radius: 99px; transition: width .35s cubic-bezier(.4,0,.2,1);
  }
  .count {
    font-family: var(--mono); font-size: 13px; color: var(--ink-2);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }
  .count b { color: var(--ink); font-weight: 600; }
  .reset {
    font: inherit; font-size: 12px; color: var(--ink-3); background: none;
    border: 0; cursor: pointer; padding: 4px 2px; text-decoration: underline;
    text-underline-offset: 2px;
  }
  .reset:hover { color: var(--clay); }

  /* ---- intro note ---- */
  .note {
    margin: 22px 0 8px; padding: 14px 16px; background: var(--panel);
    border: 1px solid var(--rule); border-left: 3px solid var(--clay);
    border-radius: 8px; font-size: 13.5px; color: var(--ink-2); box-shadow: var(--sh);
  }
  .note b { color: var(--ink); font-weight: 600; }
  .note code {
    font-family: var(--mono); font-size: 12px; background: var(--panel-2);
    padding: 1px 5px; border-radius: 4px; color: var(--ink);
  }

  /* ---- tier section ---- */
  section { margin-top: 26px; }
  .tier-head {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    padding-bottom: 10px; border-bottom: 1px solid var(--rule-2);
  }
  .tier-num {
    font-family: var(--mono); font-size: 12px; color: var(--clay);
    font-weight: 600; padding-top: 2px;
  }
  .tier-title { font-size: 15.5px; font-weight: 600; margin: 0; letter-spacing: -.005em; }
  .tier-n { font-family: var(--mono); font-size: 12px; color: var(--ink-3); font-variant-numeric: tabular-nums; }
  .tier-hint { flex-basis: 100%; font-size: 12.5px; color: var(--ink-3); margin: 3px 0 0; }
  .copytier {
    margin-left: auto; font: inherit; font-size: 12px; font-weight: 500;
    color: var(--clay-ink); background: var(--panel); border: 1px solid var(--rule-2);
    padding: 5px 11px; border-radius: 7px; cursor: pointer; white-space: nowrap;
    transition: background .15s, border-color .15s;
  }
  .copytier:hover { background: var(--panel-2); border-color: var(--clay); }
  .copytier.ok { color: var(--done); border-color: var(--done); }

  ul { list-style: none; margin: 8px 0 0; padding: 0; }
  li {
    display: flex; align-items: center; gap: 12px; padding: 7px 10px 7px 8px;
    border-radius: 8px; border: 1px solid transparent;
  }
  li:hover { background: var(--panel); border-color: var(--rule); }
  li.done { opacity: .55; }
  li.done .slug { text-decoration: line-through; text-decoration-color: var(--ink-3); }

  .box {
    appearance: none; flex: none; width: 18px; height: 18px; margin: 0;
    border: 1.5px solid var(--rule-2); border-radius: 5px; background: var(--panel);
    cursor: pointer; position: relative; transition: background .12s, border-color .12s;
  }
  .box:hover { border-color: var(--clay); }
  .box:checked { background: var(--done); border-color: var(--done); }
  .box:checked::after {
    content: ""; position: absolute; left: 5px; top: 1.5px; width: 5px; height: 10px;
    border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg);
  }
  .box:focus-visible { outline: 2px solid var(--clay); outline-offset: 2px; }

  .meta { flex: 1 1 auto; min-width: 0; display: flex; align-items: center; gap: 10px; }
  .slug {
    font-family: var(--mono); font-size: 13px; color: var(--ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .loc {
    font-family: var(--mono); font-size: 10px; font-weight: 600; letter-spacing: .05em;
    color: var(--ink-3); text-transform: uppercase; flex: none;
  }
  .chip {
    flex: none; font-size: 10.5px; font-weight: 600; letter-spacing: .03em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 99px;
    background: var(--panel-2); color: var(--ink-2); border: 1px solid var(--rule);
  }
  .chip.tour { color: var(--clay-ink); background: color-mix(in srgb, var(--clay) 12%, var(--panel)); border-color: color-mix(in srgb, var(--clay) 30%, var(--rule)); }
  .chip.category, .chip.destination { color: var(--ink); }

  .cp {
    flex: none; font: inherit; font-size: 11px; color: var(--ink-2);
    background: none; border: 1px solid var(--rule); border-radius: 6px;
    padding: 3px 9px; cursor: pointer; font-family: var(--mono);
    transition: background .12s, color .12s, border-color .12s;
  }
  .cp:hover { background: var(--panel-2); color: var(--ink); border-color: var(--rule-2); }
  .cp.ok { color: var(--done); border-color: var(--done); }
  .cp:focus-visible { outline: 2px solid var(--clay); outline-offset: 2px; }
  a.open { color: var(--ink-3); flex: none; text-decoration: none; font-size: 14px; padding: 0 2px; }
  a.open:hover { color: var(--clay); }

  .toast {
    position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%) translateY(20px);
    background: var(--ink); color: var(--ground); font-size: 13px; font-weight: 500;
    padding: 9px 16px; border-radius: 9px; opacity: 0; pointer-events: none;
    transition: opacity .2s, transform .2s; z-index: 40; box-shadow: 0 8px 24px rgba(0,0,0,.18);
    font-family: var(--mono);
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>

<header>
  <div class="head-inner">
    <p class="eyebrow">Google Search Console · Index Queue</p>
    <h1>Pages to request indexing <span>· marrakechecotours.com</span></h1>
    <div class="bar">
      <div class="track"><div class="fill" id="fill"></div></div>
      <span class="count" id="count"><b>0</b> / __TOTAL__ submitted</span>
      <button class="reset" id="reset">reset progress</button>
    </div>
  </div>
</header>

<div class="wrap">
  <div class="note">
    Two ways to work through this. <b>Fastest:</b> hit <b>Copy all</b> on a tier, paste the
    block into a <b>sitemap or bulk URL tool</b>. <b>Per-page:</b> in Search Console use
    <code>URL Inspection</code> → paste a URL → <b>Request indexing</b>. Tick each row as you go —
    your progress is saved on this device. Work <b>Tier 1 first</b>; those are the pages that earn bookings.
  </div>

  <div style="margin:18px 0 4px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
    <button class="copytier" id="copyall" style="margin-left:0;">Copy ALL __TOTAL__ URLs</button>
    <span class="tier-hint" style="flex-basis:auto;margin:0;">for pasting into a bulk indexing tool or a text sitemap</span>
  </div>

  <div id="sections"></div>
</div>

<div class="toast" id="toast"></div>

<script>
const DATA = __PAYLOAD__;
const ALL_PLAIN = __ALLPLAIN__;
const LS = "mec-index-v1";
let doneSet = new Set(JSON.parse(localStorage.getItem(LS) || "[]"));

const KIND_LABEL = { home:"home", tour:"tour", category:"category", destination:"dest",
  guide:"guide", blog:"blog", static:"page" };

const toast = (msg) => {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 1600);
};
const copy = async (text, label) => {
  try { await navigator.clipboard.writeText(text); toast(label); }
  catch { const ta=document.createElement("textarea"); ta.value=text; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove(); toast(label); }
};

function save(){ localStorage.setItem(LS, JSON.stringify([...doneSet])); updateProgress(); }
function updateProgress(){
  const total = DATA.total, n = doneSet.size;
  document.getElementById("fill").style.width = (total? (n/total*100):0) + "%";
  document.getElementById("count").innerHTML = "<b>"+n+"</b> / "+total+" submitted";
}

function render(){
  const root = document.getElementById("sections");
  DATA.tiers.forEach(tier => {
    const sec = document.createElement("section");
    const head = document.createElement("div"); head.className = "tier-head";
    head.innerHTML =
      '<span class="tier-num">TIER '+tier.id+'</span>' +
      '<h2 class="tier-title">'+tier.name+'</h2>' +
      '<span class="tier-n">'+tier.rows.length+' URLs</span>' +
      '<button class="copytier" data-plain="'+tier.id+'">Copy all</button>' +
      '<p class="tier-hint">'+tier.hint+'</p>';
    sec.appendChild(head);

    const ul = document.createElement("ul");
    tier.rows.forEach(r => {
      const li = document.createElement("li");
      const isDone = doneSet.has(r.u);
      if (isDone) li.classList.add("done");
      const kind = r.kind, kl = KIND_LABEL[kind] || kind;
      const locBadge = r.loc ? '<span class="loc">'+r.loc+'</span>' : '';
      li.innerHTML =
        '<input type="checkbox" class="box"'+(isDone?" checked":"")+' aria-label="mark submitted">' +
        '<div class="meta">'+locBadge+
          '<span class="slug" title="'+r.u+'">'+r.slug+'</span>' +
          '<span class="chip '+kind+'">'+kl+'</span>' +
        '</div>' +
        '<button class="cp" data-u="'+r.u+'">copy</button>' +
        '<a class="open" href="'+r.u+'" target="_blank" rel="noopener" title="open page" aria-label="open page">&#8599;</a>';
      const box = li.querySelector(".box");
      box.addEventListener("change", () => {
        if (box.checked){ doneSet.add(r.u); li.classList.add("done"); }
        else { doneSet.delete(r.u); li.classList.remove("done"); }
        save();
      });
      li.querySelector(".cp").addEventListener("click", (e) => {
        copy(r.u, "URL copied");
        const b=e.target; b.classList.add("ok"); b.textContent="copied";
        setTimeout(()=>{ b.classList.remove("ok"); b.textContent="copy"; }, 1200);
        if(!box.checked){ box.checked=true; box.dispatchEvent(new Event("change")); }
      });
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    root.appendChild(sec);

    head.querySelector(".copytier").addEventListener("click", (e) => {
      copy(tier.plain, tier.rows.length+" URLs copied");
      const b=e.target; b.classList.add("ok"); b.textContent="copied ✓";
      setTimeout(()=>{ b.classList.remove("ok"); b.textContent="Copy all"; }, 1400);
    });
  });
}

document.getElementById("copyall").addEventListener("click", (e) => {
  copy(ALL_PLAIN, DATA.total+" URLs copied");
  const b=e.target; b.textContent="copied ✓ all "+DATA.total;
  setTimeout(()=>{ b.textContent="Copy ALL "+DATA.total+" URLs"; }, 1600);
});
document.getElementById("reset").addEventListener("click", () => {
  if(!confirm("Clear all ticked pages on this device?")) return;
  doneSet = new Set(); save();
  document.querySelectorAll(".box").forEach(b=>b.checked=false);
  document.querySelectorAll("li.done").forEach(li=>li.classList.remove("done"));
});

render();
updateProgress();
</script>'''

HTML = (HTML
        .replace("__TOTAL__", str(data["total"]))
        .replace("__PAYLOAD__", payload)
        .replace("__ALLPLAIN__", json.dumps(ALL_PLAIN, ensure_ascii=False)))
open(out_path, "w", encoding="utf-8").write(HTML)
print("wrote", out_path, len(HTML), "bytes")
