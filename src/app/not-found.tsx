import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
            <h1 className="text-6xl font-black text-zinc-200 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-zinc-200 mb-2">
                This page not found
            </h2>
            <p className="text-zinc-500 mb-8 max-w-sm">
                It looks like you're in the wrong place...
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-all"
            >
                Return to the Home Page
            </Link>
        </div>
    );
}
