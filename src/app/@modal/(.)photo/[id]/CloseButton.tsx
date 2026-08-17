'use client';

import { useRouter } from 'next/navigation';

export function CloseButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="text-white bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl uppercase text-sm font-bold tracking-widest transition-colors"
        >
            Close
        </button>
    );
}
