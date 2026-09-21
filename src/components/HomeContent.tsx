"use client";

import { useState } from "react";
import Link from "next/link";
import AlbumArt from "./AlbumArt";
import MediaCard from "./MediaCard";
import PlayButton from "./PlayButton";
import Greeting from "./Greeting";
import type { NowPlaying } from "@/lib/player";

export type ShelfItem = {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  art: [string, string];
  image?: string;
  external?: boolean;
  round?: boolean;
  track?: NowPlaying;
};

export type Shelf = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  items: ShelfItem[];
};

export default function HomeContent({
  role,
  hero,
  spotlight,
  quickPicks,
  shelves,
}: {
  role: string;
  hero: { title: string; org: string; href: string; art: [string, string]; image?: string; summary: string };
  spotlight: ShelfItem | null;
  quickPicks: ShelfItem[];
  shelves: Shelf[];
}) {
  const categories = ["All", ...new Set(shelves.map((s) => s.category))];
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? shelves : shelves.filter((s) => s.category === active);

  return (
    <div
      className="min-h-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(29,215,95,0.16) 0%, rgba(18,18,18,0) 340px)",
      }}
    >
      <div className="px-4 sm:px-6 pt-2 pb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">
          <Greeting />
        </h1>
        <p className="text-muted mb-6">{role}</p>

        {/* Featured banner, in the style of Spotify's promo card. */}
        <Link
          href={hero.href}
          className="group grid sm:grid-cols-[minmax(0,340px)_1fr] gap-5 rounded-lg bg-elevated p-4 mb-8 hover:bg-hover transition-colors"
        >
          <AlbumArt
            art={hero.art}
            image={hero.image}
            label={hero.title}
            priority
            sizes="(max-width: 640px) 90vw, 340px"
            className="w-full aspect-video sm:aspect-[4/3] shadow-lg"
          />
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">
              {hero.org} · Now playing
            </p>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">
              {hero.title}
            </h2>
            <p className="text-sm text-muted clamp-3 mb-5 max-w-xl">
              {hero.summary}
            </p>
            <span className="inline-flex w-fit rounded-full bg-white px-5 py-2 text-sm font-bold text-black group-hover:scale-105 transition">
              Listen now
            </span>
          </div>
        </Link>

        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-7">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  active === category
                    ? "bg-white text-black"
                    : "bg-hover text-white hover:bg-white/25"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {active === "All" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {quickPicks.map((pick) => (
              <QuickPick key={pick.id} item={pick} />
            ))}
          </div>
        )}

        {active === "All" && spotlight && (
          <section className="mb-12">
            <h2 className="text-2xl font-extrabold mb-4">Picked for you</h2>
            <div className="flex flex-col sm:flex-row items-start gap-6 rounded-lg bg-elevated p-5 max-w-2xl">
              <AlbumArt
                art={spotlight.art}
                image={spotlight.image}
                label={spotlight.title}
                sizes="(max-width: 640px) 60vw, 220px"
                className="w-44 h-44 sm:w-56 sm:h-56 shrink-0 shadow-xl"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-muted mb-2">
                  Project
                </p>
                <Link href={spotlight.href}>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 hover:underline">
                    {spotlight.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted mb-5 clamp-3">
                  {spotlight.subtitle}
                </p>
                {spotlight.track && (
                  <PlayButton track={spotlight.track} size={48} />
                )}
              </div>
            </div>
          </section>
        )}

        {visible.map((shelf) => (
          <section key={shelf.id} className="mb-12">
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold">{shelf.title}</h2>
              <p className="text-sm text-muted">{shelf.subtitle}</p>
            </div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {shelf.items.map((item) =>
                item.external ? (
                  <ExternalCard key={item.id} item={item} />
                ) : (
                  <MediaCard
                    key={item.id}
                    href={item.href}
                    title={item.title}
                    subtitle={item.subtitle}
                    art={item.art}
                    image={item.image}
                    round={item.round}
                    track={item.track}
                  />
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function QuickPick({ item }: { item: ShelfItem }) {
  const content = (
    <>
      <AlbumArt
        art={item.art}
        image={item.image}
        label={item.title}
        sizes="80px"
        className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
        rounded="rounded-none"
      />
      <span className="font-bold text-sm pr-3 truncate">{item.title}</span>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-md bg-white/10 hover:bg-white/20 transition-colors overflow-hidden";

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function ExternalCard({ item }: { item: ShelfItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-lg bg-card p-4 transition-colors hover:bg-hover"
    >
      <AlbumArt
        art={item.art}
        image={item.image}
        label={item.title}
        sizes="(max-width: 640px) 45vw, 220px"
        className="w-full aspect-square shadow-lg"
      />
      <div className="min-w-0">
        <p className="font-bold truncate">
          {item.title} <span className="text-muted">↗</span>
        </p>
        <p className="text-sm text-muted clamp-2">{item.subtitle}</p>
      </div>
    </a>
  );
}
