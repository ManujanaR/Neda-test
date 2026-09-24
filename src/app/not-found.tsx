import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
      <h1 className="text-3xl">Nothing lives at this address.</h1>
      <Link href="/" className="btn-link text-mute">
        Go to the start
      </Link>
    </div>
  );
}
