import { albums, playlists, BLOG_ART } from "@/content/albums";
import { favoritePlaylists, podcasts } from "@/content/media";
import { featuredTracks, getTrack, trackDuration } from "@/content/tracks";
import { profile } from "@/content/profile";
import { getSortedPostsMeta } from "@/lib/posts";
import { parseDuration } from "@/lib/time";
import HomeContent, {
  type Shelf,
  type ShelfItem,
} from "@/components/HomeContent";

export default function Home() {
  const posts = getSortedPostsMeta();

  const heroTrack = featuredTracks[0];
  const spotlightTrack = getTrack("waresport") ?? featuredTracks[1];

  const toTrackItem = (id: string): ShelfItem | null => {
    const track = getTrack(id);
    if (!track) return null;
    return {
      id: track.id,
      href: `/track/${track.id}`,
      title: track.title,
      subtitle: track.summary,
      art: track.art,
      image: track.image,
      track: {
        id: track.id,
        title: track.title,
        subtitle: track.org,
        href: `/track/${track.id}`,
        art: track.art,
        image: track.image,
        duration: parseDuration(trackDuration(track)),
      },
    };
  };

  const quickPicks: ShelfItem[] = [
    ...albums.map((a) => ({
      id: a.id,
      href: `/album/${a.id}`,
      title: a.title,
      subtitle: `${a.tracks.length} tracks`,
      art: a.art,
      image: a.image,
    })),
    ...(posts.length > 0
      ? [
          {
            id: "blog",
            href: "/blog",
            title: "Blog",
            subtitle: `${posts.length} posts`,
            art: BLOG_ART,
          },
        ]
      : []),
    ...playlists.map((p) => ({
      id: p.id,
      href: p.href,
      title: p.title,
      subtitle: p.description,
      art: p.art,
      image: p.image,
    })),
    {
      id: "artist",
      href: "/artist",
      title: "About Me",
      subtitle: "Artist",
      art: ["#3f3f46", "#18181b"] as [string, string],
      image: profile.photo || undefined,
    },
  ].slice(0, 8);

  const shelves: Shelf[] = [
    {
      id: "featured",
      title: "Featured this year",
      subtitle: "The work I'd lead with",
      category: "Work",
      items: featuredTracks
        .map((t) => toTrackItem(t.id))
        .filter((item): item is ShelfItem => item !== null),
    },
    {
      id: "albums",
      title: "Albums",
      subtitle: "Experience, projects, and research",
      category: "Work",
      items: albums.map((a) => ({
        id: a.id,
        href: `/album/${a.id}`,
        title: a.title,
        subtitle: `${a.year} · ${a.tracks.length} tracks`,
        art: a.art,
        image: a.image,
      })),
    },
  ];

  if (posts.length > 0) {
    shelves.push({
      id: "posts",
      title: "Latest writing",
      subtitle: "Build logs and notes",
      category: "Blog",
      items: posts.slice(0, 10).map((post) => ({
        id: post.slug,
        href: `/blog/${post.slug}`,
        title: post.title,
        subtitle: post.excerpt || `${post.minutes} min read`,
        art: BLOG_ART,
      })),
    });
  }

  shelves.push({
    id: "playlists",
    title: "Playlists",
    subtitle: "These ones need you",
    category: "Work",
    items: playlists.map((p) => ({
      id: p.id,
      href: p.href,
      title: p.title,
      subtitle: p.description,
      art: p.art,
      image: p.image,
    })),
  });

  if (favoritePlaylists.length > 0) {
    shelves.push({
      id: "my-playlists",
      title: "What I'm listening to",
      subtitle: "My own playlists",
      category: "Listening",
      items: favoritePlaylists.map((p) => ({
        id: p.id,
        href: p.url,
        title: p.title,
        subtitle: p.description,
        art: p.art,
        image: p.image,
        external: true,
      })),
    });
  }

  if (podcasts.length > 0) {
    shelves.push({
      id: "podcasts",
      title: "Podcasts",
      subtitle: "Worth your commute",
      category: "Listening",
      items: podcasts.map((p) => ({
        id: p.id,
        href: p.url,
        title: p.title,
        subtitle: `${p.creator} — ${p.description}`,
        art: p.art,
        image: p.image,
        external: true,
      })),
    });
  }

  return (
    <HomeContent
      role={`${profile.role} — here's everything I've been building.`}
      hero={{
        title: heroTrack.title,
        org: heroTrack.org,
        href: `/track/${heroTrack.id}`,
        art: heroTrack.art,
        image: heroTrack.image,
        summary: heroTrack.summary,
      }}
      spotlight={spotlightTrack ? toTrackItem(spotlightTrack.id) : null}
      quickPicks={quickPicks}
      shelves={shelves}
    />
  );
}
