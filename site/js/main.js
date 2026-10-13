/* Catalogue Nº 01 — behaviour. Static, client-only: GSAP + ScrollTrigger + Flip + Lenis. */
(() => {
  "use strict";
  const P = window.PROJECTS, CATS = window.CATS;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const pad = n => String(n + 1).padStart(2, "0");
  const imgSrc = p => `img/${p.img}.webp`;
  const byId = Object.fromEntries(P.map((p, i) => [p.id, i]));
  const ROOM_COLORS = { tools: "#ff3b2f", android: "#4ade9a", ai: "#b9a6ff", learn: "#8fd16a", games: "#ffb13b" };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ───────── smooth scroll ───────── */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToEl = (target, offset = 0) => {
    const el = typeof target === "string" ? $(target) : target;
    if (!el) return;
    lenis ? lenis.scrollTo(el, { offset, duration: 1.6 }) : el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.dataset.open) return;
    const id = a.getAttribute("href");
    if (id.length > 1 && $(id)) { e.preventDefault(); scrollToEl(id); }
  });

  /* counts follow the data, so adding a project never needs a copy edit */
  $("#cRepos").dataset.count = P.reduce((n, p) => n + (p.repo ? 1 : 0) + (p.repo2 ? 1 : 0), 0);
  $("#cCats").dataset.count = Object.keys(CATS).length - 1;
  $("#cLive").dataset.count = P.filter(p => p.live).length;
  $("#preTotal").textContent = "/" + String(P.length).padStart(2, "0");

  /* ───────── render: marquee ───────── */
  const mqTrack = $("#marquee");
  const mqHTML = P.map((p, i) => `<span class="mq-item"><span class="${i % 2 ? "o" : ""}">${esc(p.title)}</span><i></i></span>`).join("");
  mqTrack.innerHTML = mqHTML + mqHTML;

  /* ───────── render: flagships ───────── */
  const flagTrack = $("#flagTrack");
  flagTrack.innerHTML = P.filter(p => p.featured).sort((a, b) => a.featured - b.featured).map((p, k) => {
    const n = pad(k);
    return `<article class="fp" style="--c:${p.color}">
      <a class="fp-img" href="#${p.id}" data-open="${p.id}" data-cursor="Open" aria-label="Open ${esc(p.title)}">
        <img src="${imgSrc(p)}" alt="${esc(p.title)} — ${esc(p.tagline)}" width="960" height="960">
        <span class="fp-no" aria-hidden="true">${n}</span>
      </a>
      <div class="fp-body">
        <div>
          <p class="mono fp-kind">${n} / ${esc(p.kind)}</p>
          <h3 class="fp-title">${esc(p.title)}</h3>
          ${p.bn ? `<p class="fp-bn" lang="bn">${esc(p.bn)}</p>` : ""}
          <p class="fp-tag">${esc(p.tagline)}</p>
        </div>
        <div>
          ${p.stat ? `<div class="fp-stat"><b>${esc(p.stat[0])}</b><span class="mono">${esc(p.stat[1])}</span></div>` : ""}
          <ul class="fp-tags mono">${p.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="btn-row">
            <a class="btn solid" href="#${p.id}" data-open="${p.id}">Read the story</a>
            <a class="btn" href="${p.repo || p.live}" target="_blank" rel="noopener noreferrer">${p.repo ? "GitHub" : esc(p.liveLabel || "Live")} ↗</a>
          </div>
        </div>
      </div>
    </article>`;
  }).join("");

  /* ───────── render: android phones ───────── */
  $("#droidRow").innerHTML = P.filter(p => p.cat === "android").map(p => {
    const status = /development/i.test(p.note || "") ? "In development" : "Google Play · soon";
    return `<a class="phone" href="#${p.id}" data-open="${p.id}" data-cursor="Open" style="--c:${p.color}" data-reveal aria-label="Open ${esc(p.title)}">
      <div class="ph-bezel"><div class="ph-screen">
        <div class="ph-status" aria-hidden="true"><span>9:41</span><i class="ph-cam"></i><span>5G ▮▮▮</span></div>
        <div class="ph-hero"><img src="${imgSrc(p)}" alt="${esc(p.title)} — ${esc(p.tagline)}" loading="lazy" width="960" height="960"></div>
        <div class="ph-info">
          <h3>${esc(p.title)}${p.bn ? `<span class="bn" lang="bn">${esc(p.bn)}</span>` : ""}</h3>
          <p>${esc(p.tagline)}</p>
          <ul class="ph-chips">${p.tags.slice(0, 3).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
          <span class="ph-get">${status}</span>
        </div>
        <div class="ph-bar" aria-hidden="true"></div>
      </div></div>
    </a>`;
  }).join("");

  /* ───────── render: rooms ───────── */
  const catKeys = Object.keys(CATS).filter(k => k !== "all");
  $("#roomsGrid").innerHTML = catKeys.map((k, i) => {
    const c = P.filter(p => p.cat === k).length;
    return `<button class="room" data-room="${k}" style="--rc:${ROOM_COLORS[k]}" data-cursor="Filter">
      <span class="mono room-n">0${i + 1}</span><span class="room-arr" aria-hidden="true">↗</span>
      <div><div class="room-count">${String(c).padStart(2, "0")}</div><div class="room-name">${esc(CATS[k])}</div></div>
    </button>`;
  }).join("");

  /* ───────── render: archive ───────── */
  const filters = $("#filters"), grid = $("#grid"), list = $("#list");
  filters.innerHTML = Object.keys(CATS).map(k => {
    const c = k === "all" ? P.length : P.filter(p => p.cat === k).length;
    return `<button class="chip ${k === "all" ? "on" : ""}" role="tab" aria-selected="${k === "all"}" data-cat="${k}">${esc(CATS[k])}<sup>${c}</sup></button>`;
  }).join("");

  grid.innerHTML = P.map((p, i) => `
    <a class="card" href="#${p.id}" data-open="${p.id}" data-cat="${p.cat}" data-cursor="Open" style="--c:${p.color}" data-reveal>
      <div class="card-media">
        <img src="${imgSrc(p)}" alt="${esc(p.title)} — ${esc(p.tagline)}" loading="lazy" width="960" height="960">
        <span class="card-no mono">${pad(i)}</span>
        ${p.live ? '<span class="card-live mono">Live</span>' : ""}
      </div>
      <div class="card-info">
        <div><h3 class="card-title">${esc(p.title)}</h3><p class="card-kind mono">${esc(p.kind)}</p></div>
        <span class="card-go" aria-hidden="true">↗</span>
      </div>
      <p class="card-tag">${esc(p.tagline)}</p>
    </a>`).join("");

  list.innerHTML = P.map((p, i) => `
    <li><a class="row" href="#${p.id}" data-open="${p.id}" data-cat="${p.cat}" data-peek="${i}">
      <span class="mono">${pad(i)}</span>
      <span class="row-t">${esc(p.title)}</span>
      <span class="mono row-k">${esc(p.kind)}</span>
      <span class="mono row-c">${esc(CATS[p.cat])}</span>
      <span class="row-a" aria-hidden="true">↗</span>
    </a></li>`).join("");

  /* column offsets must follow the *visible* cards */
  const cards = $$(".card", grid), rows = $$(".row", list);
  const colCount = () => (innerWidth >= 1100 ? 4 : innerWidth >= 700 ? 3 : 2);
  const stagger3 = () => { const n = colCount(); cards.filter(c => !c.classList.contains("hide")).forEach((c, i) => c.dataset.col = i % n); };
  addEventListener("resize", stagger3);

  let curCat = "all", curView = "grid";
  const applyFilter = (cat, animate = true) => {
    curCat = cat;
    $$(".chip", filters).forEach(b => { const on = b.dataset.cat === cat; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
    const show = el => cat === "all" || el.dataset.cat === cat;
    if (curView === "grid" && animate && !reduce) {
      const state = Flip.getState(cards);
      cards.forEach(c => c.classList.toggle("hide", !show(c)));
      stagger3();
      rows.forEach(r => r.parentElement.classList.toggle("hide", !show(r)));
      Flip.from(state, {
        duration: .9, ease: "expo.out", absolute: true, stagger: .035,
        onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .8, ease: "expo.out", delay: .15 }),
        onLeave: els => gsap.to(els, { opacity: 0, scale: .85, duration: .35 })
      });
    } else {
      cards.forEach(c => c.classList.toggle("hide", !show(c)));
      stagger3();
      rows.forEach(r => r.parentElement.classList.toggle("hide", !show(r)));
    }
    ScrollTrigger.refresh();
  };
  filters.addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) applyFilter(b.dataset.cat); });
  $("#roomsGrid").addEventListener("click", e => {
    const r = e.target.closest(".room"); if (!r) return;
    applyFilter(r.dataset.room, false); scrollToEl("#archive");
  });
  stagger3();

  /* view toggle: grid ↔ index */
  $("#viewToggle").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || b.dataset.view === curView) return;
    curView = b.dataset.view;
    $$("button", $("#viewToggle")).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
    grid.hidden = curView !== "grid"; list.hidden = curView !== "list";
    const targets = curView === "grid" ? cards.filter(c => !c.classList.contains("hide")) : rows.filter(r => !r.parentElement.classList.contains("hide"));
    if (!reduce) gsap.fromTo(targets, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .9, ease: "expo.out", stagger: .03, clearProps: "transform" });
    ScrollTrigger.refresh();
  });

  /* card tilt + glare */
  if (fine && !reduce) {
    cards.forEach(card => {
      const m = $(".card-media", card);
      card.addEventListener("pointermove", e => {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        m.style.setProperty("--ry", ((x - .5) * 12).toFixed(2) + "deg");
        m.style.setProperty("--rx", ((.5 - y) * 12).toFixed(2) + "deg");
        m.style.setProperty("--mx", (x * 100) + "%");
        m.style.setProperty("--my", (y * 100) + "%");
      });
      card.addEventListener("pointerleave", () => { m.style.setProperty("--ry", "0deg"); m.style.setProperty("--rx", "0deg"); });
    });
  }

  /* index-view hover preview */
  const peek = $("#peek"), peekImg = $("img", peek);
  if (fine) {
    const px = gsap.quickTo(peek, "x", { duration: .5, ease: "power3" }), py = gsap.quickTo(peek, "y", { duration: .5, ease: "power3" });
    list.addEventListener("pointermove", e => { px(e.clientX + 28); py(e.clientY - peek.offsetHeight / 2); });
    list.addEventListener("pointerover", e => {
      const r = e.target.closest(".row"); if (!r) return;
      peekImg.src = imgSrc(P[+r.dataset.peek]);
      gsap.to(peek, { opacity: 1, scale: 1, rotate: gsap.utils.random(-5, 5), duration: .5, ease: "expo.out", overwrite: "auto" });
    });
    list.addEventListener("pointerleave", () => gsap.to(peek, { opacity: 0, scale: .6, duration: .35, overwrite: "auto" }));
  }

  /* ───────── modal ───────── */
  const modal = $("#modal"), panel = $(".modal-panel", modal), veil = $(".modal-veil", modal);
  const mImg = $("#mImg"), body = $(".m-body", modal);
  body.setAttribute("data-lenis-prevent", "");
  let openIdx = -1, lastFocus = null, isOpen = false;

  const fillModal = i => {
    const p = P[i]; openIdx = i;
    modal.style.setProperty("--mc", p.color);
    panel.style.setProperty("--mc", p.color);
    $(".m-visual", modal).style.setProperty("--mc", p.color);
    mImg.src = imgSrc(p); mImg.alt = `${p.title} — ${p.tagline}`;
    $("#mNo").textContent = `${pad(i)} / ${String(P.length).padStart(2, "0")}`;
    $("#mKind").textContent = `${CATS[p.cat]} · ${p.kind}`;
    $("#mTitle").textContent = p.title;
    const bn = $("#mBn"); bn.textContent = p.bn || ""; bn.lang = "bn";
    $("#mTag").textContent = p.tagline;
    $("#mIdea").textContent = p.idea; $("#mWhat").textContent = p.what;
    $("#mTags").innerHTML = p.tags.map(t => `<li>${esc(t)}</li>`).join("");
    const lbl = p.repo2 ? "Generator ↗" : "View on GitHub ↗";
    $("#mActions").innerHTML =
      (p.repo ? `<a class="btn solid" href="${p.repo}" target="_blank" rel="noopener noreferrer">${lbl}</a>` : "") +
      (p.repo2 ? `<a class="btn solid" href="${p.repo2[0]}" target="_blank" rel="noopener noreferrer">${esc(p.repo2[1])} ↗</a>` : "") +
      (p.live ? `<a class="btn ${p.repo ? "" : "solid"}" href="${p.live}" target="_blank" rel="noopener noreferrer">${esc(p.liveLabel || "Live demo")} ↗</a>` : "") +
      (!p.repo && !p.live && p.note ? `<p class="m-note mono">${esc(p.note)}</p>` : "");
    $("#mPos").textContent = `${pad(i)} of ${String(P.length).padStart(2, "0")}`;
    history.replaceState(null, "", "#" + p.id);
  };
  const animateIn = (swap = false) => {
    const kids = $$(".m-body > *", modal);
    if (reduce) return;
    gsap.fromTo(kids, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "expo.out", stagger: .05, delay: swap ? 0 : .35 });
    gsap.fromTo(mImg, { scale: swap ? 1.15 : 1.35, opacity: swap ? 0 : 1 }, { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out" });
  };
  const openModal = (id, fromEl) => {
    if (!(id in byId)) return;
    if (isOpen) return go(byId[id]);
    isOpen = true; lastFocus = fromEl || document.activeElement;
    fillModal(byId[id]);
    modal.hidden = false; lenis && lenis.stop(); document.documentElement.style.overflow = "hidden";
    body.scrollTop = 0; panel.scrollTop = 0;
    if (reduce) { $("#mClose").focus(); return; }
    gsap.killTweensOf([veil, panel]);
    gsap.fromTo(veil, { opacity: 0 }, { opacity: 1, duration: .6, ease: "power2.out" });
    gsap.fromTo(panel, { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 1.1, ease: "expo.inOut", clearProps: "clipPath" });
    animateIn(); $("#mClose").focus({ preventScroll: true });
  };
  const closeModal = () => {
    if (!isOpen) return; isOpen = false;
    history.replaceState(null, "", location.pathname + location.search);
    const done = () => { modal.hidden = true; lenis && lenis.start(); document.documentElement.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true }); };
    if (reduce) return done();
    gsap.to(veil, { opacity: 0, duration: .6 });
    gsap.to(panel, { clipPath: "inset(0 0 0 100%)", duration: .8, ease: "expo.inOut", onComplete: () => { gsap.set(panel, { clearProps: "clipPath" }); done(); } });
  };
  const go = i => {
    const n = (i + P.length) % P.length;
    if (reduce) { fillModal(n); return; }
    gsap.to($$(".m-body > *", modal), { y: -20, opacity: 0, duration: .25, stagger: .015, onComplete: () => { fillModal(n); body.scrollTop = 0; panel.scrollTop = 0; animateIn(true); } });
  };
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-open]");
    if (t) { e.preventDefault(); openModal(t.dataset.open, t); }
  });
  $("#mClose").addEventListener("click", closeModal);
  veil.addEventListener("click", closeModal);
  $("#mPrev").addEventListener("click", () => go(openIdx - 1));
  $("#mNext").addEventListener("click", () => go(openIdx + 1));
  document.addEventListener("keydown", e => {
    if (!isOpen) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") go(openIdx + 1);
    else if (e.key === "ArrowLeft") go(openIdx - 1);
    else if (e.key === "Tab") {
      const f = $$("a[href],button", modal).filter(x => x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  addEventListener("popstate", () => { const id = location.hash.slice(1); id in byId ? openModal(id) : closeModal(); });

  /* ───────── cursor ───────── */
  if (fine) {
    const cur = $(".cursor"), lab = $(".cursor-label");
    const cx = gsap.quickTo(cur, "x", { duration: .35, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: .35, ease: "power3" });
    addEventListener("pointermove", e => { cur.classList.add("on"); cx(e.clientX); cy(e.clientY); }, { passive: true });
    document.addEventListener("pointerleave", () => cur.classList.remove("on"));
    document.addEventListener("pointerover", e => {
      const d = e.target.closest("[data-cursor]");
      const label = d && d.dataset.cursor;
      cur.classList.toggle("big", !!label); lab.textContent = label || "";
      cur.classList.toggle("hot", !label && !!e.target.closest("a,button"));
    });
  }

  /* ───────── clock, year ───────── */
  const clock = $("#clock");
  const tick = () => { try { clock.textContent = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()); } catch (_) { clock.textContent = ""; } };
  tick(); setInterval(tick, 15000);
  $("#yr").textContent = new Date().getFullYear();

  /* ───────── text splitting ───────── */
  const splitChars = el => {
    const out = [];
    [...el.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        [...n.textContent].forEach(ch => { const s = document.createElement("span"); s.className = "ch"; s.textContent = ch; frag.appendChild(s); out.push(s); });
        n.replaceWith(frag);
      } else { n.classList.add("ch"); out.push(n); }
    });
    return out;
  };
  const chars = $$("[data-split]").flatMap(splitChars);
  chars.forEach(c => { c.style.display = "inline-block"; c.style.whiteSpace = "pre"; });
  gsap.set(chars, { yPercent: 115 });

  const splitWords = el => {
    const words = [];
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
          const s = document.createElement("span"); s.className = "w";
          const i = document.createElement("span"); i.className = "wi"; i.textContent = t; s.appendChild(i);
          frag.appendChild(s); words.push(i);
        });
        n.replaceWith(frag);
      } else walk(n);
    });
    walk(el); return words;
  };
  const words = splitWords($("#manifestoText"));
  gsap.set(words, { yPercent: 115, rotate: 4, transformOrigin: "0 100%" });

  /* footer title lines */
  $$(".foot-title span").forEach(s => { s.innerHTML = `<i style="display:block;font-style:inherit">${s.innerHTML}</i>`; });

  /* hero pill slideshow */
  const pill = $(".pill-in");
  const pillImgs = ["Obhijatri", "SecureChat", "Sangsad-Showdown", "Reelcraft", "Girlfriend-Teaches-English", "Dhoni-Hobar-Mojar-Khela"].map((n, i) => {
    const im = new Image(); im.src = `img/${n}.webp`; im.alt = ""; if (!i) im.className = "on"; pill.appendChild(im); return im;
  });
  let pi = 0; setInterval(() => { pillImgs[pi].classList.remove("on"); pi = (pi + 1) % pillImgs.length; pillImgs[pi].classList.add("on"); }, 1700);

  /* ───────── scroll choreography ───────── */
  const setupScroll = () => {
    /* progress */
    gsap.to(".progress i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });

    /* reveal batches */
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 92%", once: true,
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: .09, clearProps: "transform" })
    });

    /* hero parallax */
    gsap.to(".sun", { yPercent: 38, scale: 1.18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    $$(".float").forEach((f, i) => gsap.to(f, { yPercent: -30 - i * 14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } }));
    gsap.to(".hero-title", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    /* marquee with scroll-velocity */
    const mq = gsap.to(mqTrack, { xPercent: -50, ease: "none", duration: 46, repeat: -1 });
    let vel = 0, dir = 1;
    ScrollTrigger.create({ onUpdate: s => { dir = s.direction || dir; vel = Math.max(vel, Math.abs(s.getVelocity())); } });
    gsap.ticker.add(() => { vel *= .93; mq.timeScale(dir * (1 + Math.min(vel, 6000) / 260)); });

    /* manifesto: words rise out of a mask */
    gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.3, ease: "expo.out", stagger: .045, scrollTrigger: { trigger: "#manifestoText", start: "top 80%", once: true } });

    /* counters */
    $$("[data-count]").forEach(el => {
      const end = +el.dataset.count, suf = el.dataset.suffix || "", o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: "expo.out", onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }) });
    });

    /* rooms */
    gsap.from(".room", { opacity: 0, y: 60, duration: 1, ease: "expo.out", stagger: .1, scrollTrigger: { trigger: "#roomsGrid", start: "top 85%" } });

    /* footer */
    gsap.from(".foot-title i", { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: .12, scrollTrigger: { trigger: ".foot-title", start: "top 85%" } });
    gsap.from(".foot-sun", { yPercent: 30, ease: "none", scrollTrigger: { trigger: ".foot", start: "top bottom", end: "bottom bottom", scrub: true } });

    /* flagships: pinned horizontal scroll on desktop */
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => flagTrack.scrollWidth - innerWidth;
      const tween = gsap.to(flagTrack, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: ".flag-pin", pin: true, start: "top top", end: () => "+=" + dist(), scrub: .7,
          invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: s => gsap.set(".flag-bar i", { scaleX: s.progress })
        }
      });
      $$(".fp").forEach(fp => {
        gsap.fromTo($(".fp-img img", fp), { xPercent: -7 }, { xPercent: 7, ease: "none", scrollTrigger: { trigger: fp, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        gsap.from($(".fp-body", fp), { opacity: .15, x: 60, ease: "none", scrollTrigger: { trigger: fp, containerAnimation: tween, start: "left 90%", end: "left 45%", scrub: true } });
      });
    });
    mm.add("(max-width: 900px)", () => {
      $$(".fp").forEach(fp => gsap.from(fp, { opacity: 0, y: 60, duration: 1, ease: "expo.out", scrollTrigger: { trigger: fp, start: "top 88%" } }));
    });
  };

  /* magnetic button */
  if (fine && !reduce) {
    $$(".mag-btn").forEach(b => {
      const inner = $(".mag-in", b);
      const bx = gsap.quickTo(b, "x", { duration: .6, ease: "elastic.out(1,.5)" }), by = gsap.quickTo(b, "y", { duration: .6, ease: "elastic.out(1,.5)" });
      const ix = gsap.quickTo(inner, "x", { duration: .6, ease: "power3" }), iy = gsap.quickTo(inner, "y", { duration: .6, ease: "power3" });
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); bx(dx * .35); by(dy * .5); ix(dx * .15); iy(dy * .2); });
      b.addEventListener("pointerleave", () => { bx(0); by(0); ix(0); iy(0); });
    });
  }

  /* hero mouse parallax */
  if (fine && !reduce) {
    const depth = [[".f1", 28], [".f2", -40], [".f3", 18], [".f4", -22], [".sun", 14]];
    const q = depth.map(([s, d]) => ({ x: gsap.quickTo(s, "x", { duration: 1.2, ease: "power3" }), y: gsap.quickTo(s, "y", { duration: 1.2, ease: "power3" }), d }));
    $("#hero").addEventListener("pointermove", e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      q.forEach(o => { o.x(nx * o.d * 2); o.y(ny * o.d * 2); });
    });
  }

  /* ───────── intro ───────── */
  const pillEl = $(".pill");
  const pillBox = { w: pillEl.getBoundingClientRect().width, m: parseFloat(getComputedStyle(pillEl).marginLeft) };
  gsap.set(pillEl, { width: 0, marginLeft: 0, marginRight: 0 });
  const heroIn = () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(chars, { yPercent: 0, duration: 1.5, stagger: .035 }, 0)
      .to(".pill", { width: pillBox.w, marginLeft: pillBox.m, marginRight: pillBox.m, duration: 1.4, ease: "expo.inOut", clearProps: "width,marginLeft,marginRight" }, .35)
      .from(".hero-meta span", { opacity: 0, y: 14, duration: 1, stagger: .12 }, .5)
      .from(".hero-lede", { opacity: 0, y: 30, duration: 1.2 }, .8)
      .from(".hero-scroll", { opacity: 0, duration: 1 }, 1.1)
      .from(".float", { opacity: 0, y: 90, scale: .85, duration: 1.6, stagger: .12 }, .5)
      .from(".sun-core", { opacity: 0, duration: 2.4 }, 0)
      .from(".nav", { opacity: 0, y: -20, duration: 1 }, .9);
    return tl;
  };

  const finish = () => {
    document.body.classList.remove("is-loading");
    setupScroll();
    const h = location.hash.slice(1);
    if (h in byId) setTimeout(() => openModal(h), 600);
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  };

  let seen = false; try { seen = sessionStorage.getItem("seen") === "1"; sessionStorage.setItem("seen", "1"); } catch (_) {}
  if (reduce) {
    gsap.set(chars, { yPercent: 0 }); gsap.set(words, { yPercent: 0, rotate: 0 }); gsap.set(pillEl, { clearProps: "width,marginLeft,marginRight" }); $(".preloader").remove(); finish();
  } else if (seen) {
    const pre = $(".preloader");
    gsap.to(pre, { yPercent: -100, duration: .9, ease: "expo.inOut", onComplete: () => pre.remove() });
    heroIn().delay(.2).eventCallback("onComplete", finish);
  } else {
    const num = $("#preNum"), o = { v: 0 }, sun = $(".pre-sun");
    gsap.set(sun, { xPercent: -50, yPercent: -50, y: "75vh" });
    const tl = gsap.timeline();
    tl.to(o, { v: P.length, duration: 2.1, ease: "power2.inOut", onUpdate: () => { num.textContent = String(Math.round(o.v)).padStart(2, "0"); } }, 0)
      .to(sun, { y: 0, duration: 2.1, ease: "power2.inOut" }, 0)
      .to(sun, { scale: 14, duration: .9, ease: "expo.in" }, 2.15)
      .to(".pre-count,.pre-label", { opacity: 0, duration: .3 }, 2.2)
      .add(() => { heroIn().eventCallback("onComplete", finish); }, 3.0)
      .to(".preloader", { yPercent: -100, duration: 1.1, ease: "expo.inOut", onComplete: () => $(".preloader").remove() }, 3.0);
    tl.add(() => {}, 5.2);
  }
})();
