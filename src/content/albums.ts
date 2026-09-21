import { profile } from "./profile";
import { tracksOfKind, type Track, type TrackKind } from "./tracks";

export type Album = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  kind: TrackKind;
  year: string;
  art: [string, string];
  tracks: Track[];
};

function album(
  id: string,
  title: string,
  subtitle: string,
  description: string,
  kind: TrackKind,
  year: string,
  art: [string, string]
): Album {
  return {
    id,
    title,
    subtitle,
    description,
    kind,
    year,
    art,
    tracks: tracksOfKind(kind),
  };
}

export const albums: Album[] = [
  album(
    "experience",
    "Work Experience",
    profile.name,
    "Internships and roles, newest first — from reinforcement learning infrastructure at Amazon to warehouse robotics at UPS.",
    "experience",
    "2024 – 2026",
    ["#1f6f4a", "#0b2b1c"]
  ),
  album(
    "projects",
    "Projects",
    profile.name,
    "Things I built because I wanted them to exist — a sports club SaaS, award-winning hackathon projects, and assorted computer vision.",
    "project",
    "2023 – 2026",
    ["#7c3f2c", "#2e1510"]
  ),
  album(
    "research",
    "Research",
    profile.name,
    "Speech accessibility, prosthetic control, climate modeling, and soft robotics.",
    "research",
    "2022 – 2026",
    ["#2c3f7c", "#10152e"]
  ),
];

export const albumsById = new Map(albums.map((a) => [a.id, a]));

export function getAlbum(id: string) {
  return albumsById.get(id);
}

/** Which album a given track belongs to, for breadcrumbs on track pages. */
export function albumForTrack(kind: TrackKind) {
  return albums.find((a) => a.kind === kind);
}

export type PlaylistMeta = {
  id: string;
  title: string;
  description: string;
  href: string;
  art: [string, string];
};

export const playlists: PlaylistMeta[] = [
  {
    id: "ama",
    title: "Ask Me Anything",
    description:
      "Questions from visitors, answered by me. Ask one and it shows up here once I reply.",
    href: "/playlist/ama",
    art: ["#5a2c7c", "#20102e"],
  },
  {
    id: "recommendations",
    title: "Song Recommendations",
    description:
      "Actual music. Submit a song and I'll add the good ones to my rotation.",
    href: "/playlist/recommendations",
    art: ["#7c2c5a", "#2e1020"],
  },
];
