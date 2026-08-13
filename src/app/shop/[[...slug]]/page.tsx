interface ShopPageProps {
    // id должен строго совпадать с названием папки
    params: Promise<{ slug: string[] }>;
}

export default async function UserPage({ params }: ShopPageProps) {
    const { slug } = await params;

    const currentSlug = slug || '';
    const [category, brand, model] = currentSlug;

    return (
        <div className="p-10 font-sans bg-white min-h-screen">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
                Catalog / {brand || 'All Brands'}
            </h1>

            <nav className="flex items-center gap-3 mb-10">
                <span className="text-zinc-400 font-medium">Shop</span>

                {slug.map((segment, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="text-zinc-300">/</span>
                        <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-bold text-zinc-800">
                            {segment}
                        </span>
                    </div>
                ))}
            </nav>

            <div className="max-w-2xl p-8 bg-zinc-900 rounded-4xl text-whtie shadow-2xl transition-all hover:scale-[1.01]">
                <div className="space-y-4">
                    <div>
                        <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Category
                        </span>
                        <p className="text-2xl capitalize font-medium">
                            {category}
                        </p>
                    </div>
                    {brand && (
                        <div>
                            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Brand
                            </span>
                            <p className="text-2xl capitalize font-medium">
                                {brand}
                            </p>
                        </div>
                    )}
                    {model && (
                        <div className="pt-6 border-t border-zinc-800">
                            <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Model
                            </span>
                            <p className="text-5xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
                                {model.replace('-', ' ')}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-10 text-[10px] text-zinc-400 font-mono bg-zinc-50 p-3 rounded border border-zinc-100 inline-block">
                [DEBUG] Raw segments array: {JSON.stringify(slug)}
            </p>
        </div>
    );
}
