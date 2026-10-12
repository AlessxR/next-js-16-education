'use client';

import { createSneakerDrop } from '@/actions/sneaker';
import { useAction } from 'next-safe-action/hooks';
import { resumeToPipeableStream } from 'react-dom/server';

export default function NewDropPage() {
    const { execute, isPending, result } = useAction(createSneakerDrop);

    const mockSneaker = {
        title: 'Air Jordan 1 Retro High OG',
        price: 200,
        stock: 50,
    };

    const handleTriggerDrop = async () => {
        execute(mockSneaker);
    };

    return (
        <main className="p-5">
            <h2>Testing Server Action</h2>
            <p>
                {mockSneaker.title} (${mockSneaker.price.toFixed(2)}) - Stock:{' '}
                {mockSneaker.stock}
            </p>
            <button onClick={handleTriggerDrop} disabled={isPending}>
                {isPending ? 'Sending...' : 'Send!'}
            </button>

            <div className="mt-5">
                {result.serverError && (
                    <p className="text-red-500">
                        Mistakes of backend: ${result.serverError}
                    </p>
                )}

                {result.validationErrors && (
                    <p className="text-orange-500">
                        Validation errors contract:{' '}
                        {Object.values(result.validationErrors).join(', ')}
                    </p>
                )}

                {result.data?.success && (
                    <p className="text-emerald-500">
                        Sneaker drop created successfully! ID in DB: $
                        {result.data.data.id}
                    </p>
                )}
            </div>
        </main>
    );
}
