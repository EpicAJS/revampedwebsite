/**
 * Things Abhijay listens to, as opposed to things he built.
 *
 * These link out rather than embedding, so nothing here depends on the Spotify
 * API. Add entries and they appear on the home page and in Your Library;
 * leave a list empty and its shelf hides itself.
 *
 * To add a cover, drop a square image in `public/covers/` and set `image`.
 */

export type ExternalMedia = {
  id: string;
  title: string;
  /** Playlist owner, or the podcast host/network. */
  creator: string;
  description: string;
  /** Where it opens — an open.spotify.com link, or anywhere else. */
  url: string;
  art: [string, string];
  image?: string;
};

/** Abhijay's own playlists. */
export const favoritePlaylists: ExternalMedia[] = [
  // {
  //   id: "late-night-debugging",
  //   title: "Late Night Debugging",
  //   creator: "Abhijay Salvi",
  //   description: "What's on when the build is red at 2am.",
  //   url: "https://open.spotify.com/playlist/...",
  //   art: ["#3b2c7c", "#14102e"],
  // },
];

/** Podcasts worth someone else's time. */
export const podcasts: ExternalMedia[] = [
  // {
  //   id: "acquired",
  //   title: "Acquired",
  //   creator: "Ben Gilbert & David Rosenthal",
  //   description: "Company histories told properly.",
  //   url: "https://open.spotify.com/show/...",
  //   art: ["#2c6f7c", "#102630"],
  // },
];
