import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { category, slug } = await params;
    const res = await fetch(`https://dummyjson.com/products/${slug}`);

    if (!res.ok) {
        return {};
    }

    const product = await res.json();

    return {
        title: `Product "${product.title}"`,
        description: `Description "${product.description}"`,
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { category, slug } = await params;

    const res = await fetch(`https://dummyjson.com/products/${slug}`);
    if (!res.ok) {
        notFound();
    }

    const product = await res.json();

    return (
        <div className="p-8 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl mt-10">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {category}
            </span>
            <h1 className="text-3xl font-bold text-white mt-2">
                {product.title}
            </h1>
            <p className="text-gray-400 mt-4">{product.description}</p>
            <div className="text-2xl font-mono text-white mt-6">
                {product.price}
            </div>
        </div>
    );
}
