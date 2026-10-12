'use client';

import { createSneakerDrop } from '@/actions/sneaker';

export default function NewDropPage() {
    const mockSneaker = {
        title: 'Air Jordan 1 Retro High OG',
        price: 200,
        stock: 50,
    };

    const handleTriggerDrop = async () => {
        const result = await createSneakerDrop(mockSneaker);

        if (result.success) {
            alert(`Clothes successful created! ID: ${result.data.id}`);
        } else {
            alert(`Failed to create clothes. Error: ${result.error}`);
        }
    };

    return (
        <main className="p-5">
            <h2>Testing Server Action</h2>
            <p>
                {mockSneaker.title} (${mockSneaker.price.toFixed(2)}) - Stock:{' '}
                {mockSneaker.stock}
            </p>
            <button onClick={handleTriggerDrop}>Send!</button>
        </main>
    );
}
