import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export const dynamicParams = true;

// this name reserved by framework Next.js, this function will be called by framework Next.js to generate static params for dynamic routes, and this function will be called at build time, so you can use this function to fetch data from server and return the params for dynamic routes, and this function will be called only once at build time, so you can use this function to fetch data from server and return the params for dynamic routes, and this function will be called only once at build time, so you can use this function to fetch data from server and return the params for dynamic routes
export async function generateStaticParams() {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    return data.products.map((product: any) => ({ id: product.id.toString() }));
}

async function fetchProduct(id: string) {
    'use cache';

    cacheLife('days');

    const res = await fetch(`https://dummyjson.com/products/${id}`);

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();
    return data;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await fetchProduct(id);

    return (
        <div className="p-8 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl mt-10">
            <h1 className="text-3xl font-bold text-white mt-2">
                {product.title}
            </h1>
            <p className="text-gray-300 mt-4">{product.description}</p>
            <div className="text-2xl font-mono text-white mt-6">
                ${product.price}
            </div>
        </div>
    );
}
