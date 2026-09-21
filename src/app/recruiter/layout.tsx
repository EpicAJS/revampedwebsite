/**
 * Recruiter mode opts out of the app chrome entirely — no sidebar, no player.
 * It's a linkable, print-friendly document.
 */
export default function RecruiterLayout({
  children,
}: LayoutProps<"/recruiter">) {
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-white">{children}</div>;
}
