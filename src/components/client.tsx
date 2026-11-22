"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { heroLines, profile } from "@/content";

/* ---------- Nav: gains a glass background after scrolling ---------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav${scrolled ? " nav-scrolled" : ""}`}>
      <a href="#" className="nav-inner">
        <span className="nav-name">{profile.name}</span>
      </a>
    </nav>
  );
}

/* ---------- Hero: typewriter headline + photo reveal ---------- */
const totalChars = heroLines.reduce((n, l) => n + l.text.length, 0);

export function Hero() {
  const [typed, setTyped] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => setTyped(totalChars), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= totalChars) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, []);

  // Character offset where each line starts.
  const starts = heroLines.map((_, i) => heroLines.slice(0, i).reduce((n, l) => n + l.text.length, 0));
  return (
    <section className={`hero${loaded ? " hero-loaded" : ""}`}>
      <div className="hero-content">
        <h1 className="typewriter" aria-label={heroLines.map((l) => l.text).join("")}>
          <span aria-hidden="true">
            {heroLines.map((line, i) => {
              const shown = line.text.slice(0, Math.max(0, typed - starts[i]));
              if (!shown) return null;
              const cls = line.style === "highlight" ? "highlight-word" : line.style === "mono" ? "mono" : undefined;
              return cls ? (
                <span key={i} className={cls}>
                  {shown}
                </span>
              ) : (
                <span key={i}>{shown}</span>
              );
            })}
            <span className="cursor">|</span>
          </span>
        </h1>
      </div>
      <div className={`hero-image${loaded ? " hero-image-loaded" : ""}`}>
        <Image
          src={profile.photo}
          alt={profile.name}
          width={profile.photoWidth}
          height={profile.photoHeight}
          sizes="50vw"
          priority
          unoptimized={profile.photo.endsWith(".svg")}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </section>
  );
}

/* ---------- InView: adds "in-view" once the element scrolls into view ---------- */
export function InView({
  as: Tag = "div",
  className = "",
  children,
  threshold = 0.15,
}: {
  as?: "div" | "section" | "span";
  className?: string;
  children: ReactNode;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`${className}${seen ? " in-view" : ""}`}>
      {children}
    </Tag>
  );
}

/* ---------- Theme controls: palette, dark mode ---------- */
const palettes = [
  { name: "Soft Peach", bg: "linear-gradient(135deg, #fff5f0, #ffe8dc)" },
  { name: "Mint Green", bg: "linear-gradient(135deg, #eef8f7, #e6f1f0)" },
  { name: "Warm Beige", bg: "linear-gradient(135deg, #f5f3f0, #ebe8e3)" },
  { name: "Cool Gray", bg: "linear-gradient(135deg, #f8f9fa, #e9ecef)" },
  { name: "Soft Blue", bg: "linear-gradient(135deg, #f0f4f8, #dfe7ef)" },
  { name: "Subtle Purple", bg: "linear-gradient(135deg, #f5f3ff, #ebe8f5)" },
  { name: "Sage Green", bg: "linear-gradient(135deg, #f4f7f5, #e8eeea)" },
  { name: "Dusty Rose", bg: "linear-gradient(135deg, #fff0f3, #ffe4e9)" },
];

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function ThemeControls() {
  const [dark, setDark] = useState(false);
  const [bg, setBg] = useState(palettes[0].bg);
  const [open, setOpen] = useState(false);

  // Read the theme the head script already applied.
  useEffect(() => {
    const root = document.documentElement;
    const saved = root.style.getPropertyValue("--page-bg");
    const t = setTimeout(() => {
      setDark(root.classList.contains("dark-mode"));
      if (saved) setBg(saved);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark-mode", next);
    save("dark", next ? "1" : "0");
  };

  const pick = (value: string) => {
    setBg(value);
    setOpen(false);
    document.documentElement.style.setProperty("--page-bg", value);
    save("theme-bg", value);
  };

  return (
    <div className="theme-controls">
      <button
        className={`round-btn dark-mode-toggle${dark ? " active" : ""}`}
        onClick={toggleDark}
        title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </button>
      {!dark && (
        <div className={`theme-selector${open ? " open" : ""}`}>
          <button
            className="round-btn theme-toggle-btn"
            style={{ background: bg }}
            onClick={() => setOpen(!open)}
            title="Change theme colors"
            aria-label="Change theme colors"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="13.5" cy="6.5" r="1.5" />
              <circle cx="17.5" cy="10.5" r="1.5" />
              <circle cx="8.5" cy="7.5" r="1.5" />
              <circle cx="6.5" cy="12.5" r="1.5" />
              <path d="M12 2a10 10 0 0 0 0 20c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a6 6 0 0 0 6-6c0-4.9-4.5-9-10-9z" />
            </svg>
          </button>
          <div className="theme-options-panel">
            {palettes.map((p) => (
              <button
                key={p.name}
                className={`theme-option${p.bg === bg ? " active" : ""}`}
                style={{ background: p.bg }}
                title={p.name}
                aria-label={p.name}
                onClick={() => pick(p.bg)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Music player: jazz playlist pill, top right ---------- */
// Pixabay Content License tracks (free to use, no attribution required; credited anyway).
const tracks = [
  { src: "/music/jazz-lounge.mp3", name: "Jazz Lounge", artist: "Pixabay Artist", url: "https://pixabay.com/music/traditional-jazz-jazz-background-music-416542/" },
  { src: "/music/jazz-background.mp3", name: "Jazz Background", artist: "Pixabay Artist", url: "https://pixabay.com/music/traditional-jazz-jazz-background-music-349165/" },
  { src: "/music/jazz-cafe.mp3", name: "Jazz Cafe", artist: "Pixabay Artist", url: "https://pixabay.com/music/traditional-jazz-jazz-cafe-music-348267/" },
];
const VOLUME = 0.15;

export function MusicPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [touched, setTouched] = useState(false); // visitor has interacted at least once
  const [hover, setHover] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const fadeId = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldPlay = useRef(false);

  const fade = useCallback((el: HTMLAudioElement, to: number, done?: () => void) => {
    if (fadeId.current) clearInterval(fadeId.current);
    const from = el.volume;
    let step = 0;
    fadeId.current = setInterval(() => {
      step += 1;
      el.volume = Math.max(0, Math.min(1, from + ((to - from) * step) / 20));
      if (step >= 20) {
        if (fadeId.current) clearInterval(fadeId.current);
        fadeId.current = null;
        done?.();
      }
    }, 40);
  }, []);

  const start = useCallback(() => {
    const el = audio.current;
    if (!el) return;
    shouldPlay.current = true;
    el.play()
      .then(() => {
        setPlaying(true);
        fade(el, VOLUME);
      })
      .catch(() => {
        shouldPlay.current = false;
        setPlaying(false);
      });
  }, [fade]);

  const toggle = useCallback(() => {
    const el = audio.current;
    if (!el) return;
    setTouched(true);
    if (shouldPlay.current) {
      shouldPlay.current = false;
      setPlaying(false);
      fade(el, 0, () => el.pause());
    } else start();
  }, [fade, start]);

  const next = () => setIndex((i) => (i + 1) % tracks.length);

  // One audio element; swap the source when the track changes.
  useEffect(() => {
    if (!audio.current) {
      audio.current = new Audio();
      audio.current.preload = "none";
    }
    const el = audio.current;
    el.src = tracks[index].src;
    el.volume = 0;
    const onEnded = () => setIndex((i) => (i + 1) % tracks.length);
    el.addEventListener("ended", onEnded);
    if (shouldPlay.current) start();
    return () => el.removeEventListener("ended", onEnded);
  }, [index, start]);

  useEffect(
    () => () => {
      if (fadeId.current) clearInterval(fadeId.current);
      audio.current?.pause();
    },
    [],
  );

  // Browsers block autoplay, so start on the visitor's first click or key press.
  useEffect(() => {
    if (touched) return;
    const first = (e: Event) => {
      if ((e.target as Element | null)?.closest?.(".music-toggle")) return;
      if (e instanceof KeyboardEvent && e.code === "Space") return; // the Space handler covers it
      setTouched(true);
      start();
    };
    const events = ["pointerdown", "keydown"] as const;
    events.forEach((ev) => window.addEventListener(ev, first, { once: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, first));
  }, [touched, start]);

  // Space toggles play/pause, unless the visitor is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const a = document.activeElement as HTMLElement | null;
      if (a && (["INPUT", "TEXTAREA", "SELECT"].includes(a.tagName) || a.isContentEditable)) return;
      if (e.code !== "Space") return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const t = tracks[index];
  const expanded = hover || playing;
  return (
    <div
      className={`music-toggle${expanded ? " expanded" : ""}${!touched ? " pulsate" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="music-track-info" aria-hidden={!expanded}>
        <span className="music-track-name">{t.name}</span>
        <a href={t.url} target="_blank" rel="noopener noreferrer" className="music-track-credit" tabIndex={expanded ? 0 : -1}>
          {t.artist} · Pixabay
        </a>
      </div>
      <button className="music-skip-btn" onClick={next} aria-label="Skip to next track" title="Next track" tabIndex={expanded ? 0 : -1}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
      <button
        className="music-play-btn"
        onClick={toggle}
        aria-label={playing ? "Pause background music (Space)" : "Play background music (Space)"}
        title={playing ? "Pause (Space)" : "Play (Space)"}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}
