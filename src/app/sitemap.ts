import { products } from './../db/schema';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000';

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/contacts`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    try {
        const res = await fetch(`https://dummyjson.com/products?limit=50`);

        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        const dynamicRoutes: MetadataRoute.Sitemap = data.products.map(
            (product: any) => ({
                url: `${baseUrl}/product/${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            }),
        );

        return [...staticRoutes, ...dynamicRoutes];
    } catch (error) {
        
        return staticRoutes;
    }
}
