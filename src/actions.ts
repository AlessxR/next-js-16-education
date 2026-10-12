'use server';

import { revalidateTag, updateTag } from 'next/cache';

export async function updateProductInfo() {
    updateTag('all-products'); // this will invalidate the cache for the tag "all-products", and this cleared all cached data with this tag, so next time when you visit the page, it will fetch new data from the server and cache it again with the same tag "all-products" and cache life "hours"
    revalidateTag('all-products'); // this will revalidate the cache for the tag "all-products", and this will fetch new data from the server and cache it again with the same tag "all-products" and cache life "hours"
}
