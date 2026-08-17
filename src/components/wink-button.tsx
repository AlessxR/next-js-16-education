'use client';

export function WinkButton({ name }: { name: string }) {
    return (
        <button onClick={() => alert(`You're alert ${name}!`)} className="ml-4">
            Alert!
        </button>
    );
}
