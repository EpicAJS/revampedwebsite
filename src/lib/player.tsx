"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type NowPlaying = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  art: [string, string];
  /** Runtime in seconds. Visual only today; real audio can supply this later. */
  duration: number;
};

type PlayerState = {
  current: NowPlaying | null;
  isPlaying: boolean;
  progress: number;
  play: (track: NowPlaying) => void;
  toggle: () => void;
  seek: (seconds: number) => void;
  isCurrent: (id: string) => boolean;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<NowPlaying | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  // Visual playback: advance progress in real time until the track ends.
  useEffect(() => {
    if (!isPlaying || !current) return;

    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      setProgress((prev) => {
        const next = prev + delta;
        if (next >= current.duration) {
          setIsPlaying(false);
          return current.duration;
        }
        return next;
      });

      raf = requestAnimationFrame(tick);
      frame.current = raf;
    };

    raf = requestAnimationFrame(tick);
    frame.current = raf;

    return () => cancelAnimationFrame(raf);
  }, [isPlaying, current]);

  const play = useCallback((track: NowPlaying) => {
    setCurrent((prev) => {
      if (prev?.id === track.id) {
        setIsPlaying((playing) => !playing);
        return prev;
      }
      setProgress(0);
      setIsPlaying(true);
      return track;
    });
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((playing) => (current ? !playing : playing));
  }, [current]);

  const seek = useCallback((seconds: number) => {
    setProgress(Math.max(0, seconds));
  }, []);

  const isCurrent = useCallback(
    (id: string) => current?.id === id && isPlaying,
    [current, isPlaying]
  );

  const value = useMemo(
    () => ({ current, isPlaying, progress, play, toggle, seek, isCurrent }),
    [current, isPlaying, progress, play, toggle, seek, isCurrent]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
