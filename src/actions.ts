'use server';

import { revalidateTag } from 'next/cache';

export async function handlePurhaseNotif(id: string) {
    revalidateTag(`sneaker-${id}`, { expire: 0 });
    revalidateTag('sneakers-data', { expire: 0 });
}
