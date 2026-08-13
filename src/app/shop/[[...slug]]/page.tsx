interface ShopPageProps {
    // id должен строго совпадать с названием папки
    params: Promise<{ slug: string[] }>;
}

export default async function UserPage({ params }: ShopPageProps) {
    const { slug } = await params;

    const currentSlug = slug || [];
    const [category, brand, model] = currentSlug;

    return (
        <div className="p-10 font-sans bg-white min-h-screen">
            <header className="mb-10">
                <h1 className="text-5xl text-black font-black uppercase tracking-tighter">
                    {category ? `Catalog / ${category}` : 'Main Store'}
                </h1>
                <p className="text-zinc-400 mt-2 font-medium">
                    {brand
                        ? `Exploring ${brand} collection`
                        : 'Browse all out products'}
                </p>
            </header>

            <nav className="flex items-center gap-3 mb-10">
                <span className="text-black font-medium">Shop</span>

                {currentSlug.map((segment, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="text-zinc-300">/</span>
                        <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-bold text-zinc-800">
                            {segment}
                        </span>
                    </div>
                ))}
            </nav>

            <div className="grid grid-cols-1 gap-6">
                {!category && (
                    <div className="p-20 bg-black text-white rounded-[3rem] text-center">
                        <h2 className="text-3xl font-bold">
                            Welcome to the shop!
                        </h2>
                        <p className="opacity-50 mt-2">
                            Select a category above to get started.
                        </p>
                    </div>
                )}

                {category && (
                    <div className="p-8 bg-white border border-zinc-200 rounded-4xl shadow-sm">
                        <p className="text-xs font-mono text-blue-500 font-bold uppercase">
                            Active Filter
                        </p>
                        <div className="text-black mt-4 space-y-2">
                            <p>
                                <strong>Category:</strong> {category}
                            </p>
                            {brand && (
                                <p>
                                    <strong>Brand:</strong> {brand}
                                </p>
                            )}
                            {model && (
                                <p>
                                    <strong>Model:</strong> {model}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <p className="mt-10 text-[10px] text-zinc-400 font-mono bg-zinc-50 p-3 rounded border border-zinc-100 inline-block">
                [DEBUG] Raw segments array: {JSON.stringify(slug)}
            </p>
        </div>
    );
}
