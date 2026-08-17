'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState, useTransition } from 'react';

interface Project {
    id: number;
    title: string;
    desc: string;
    category: string;
    stars: number;
    date: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Next Shop',
        desc: 'An online store built on App Router with a cart and Stripe checkout.',
        category: 'web',
        stars: 128,
        date: '2025-02-14',
    },
    {
        id: 2,
        title: 'Task Flow',
        desc: 'A kanban board with drag-and-drop and real-time syncing.',
        category: 'web',
        stars: 342,
        date: '2024-11-03',
    },
    {
        id: 3,
        title: 'Weather CLI',
        desc: 'A command-line utility for weather forecasts with request caching.',
        category: 'tools',
        stars: 57,
        date: '2025-06-21',
    },
    {
        id: 4,
        title: 'Pixel Runner',
        desc: 'An arcade platformer on Canvas with procedurally generated levels.',
        category: 'games',
        stars: 219,
        date: '2024-08-30',
    },
    {
        id: 5,
        title: 'Fit Tracker',
        desc: 'A mobile workout tracker with offline mode and progress charts.',
        category: 'mobile',
        stars: 86,
        date: '2025-04-09',
    },
];

const CATEGORIES = ['all', ...new Set(PROJECTS.map((p) => p.category))];

const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'popular', label: 'Most stars' },
];

// '2025-02-14' -> '14.02.2025' (no Date here, so SSR and client can't disagree on the timezone)
const formatDate = (date: string) => date.split('-').reverse().join('.');

function ProjectsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get('query') || '',
    );

    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'newest';

    // debounce: the typed text is pushed to the URL at most once every 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (searchQuery) {
                params.set('query', searchQuery);
            } else {
                params.delete('query');
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                });
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, pathname, router]);

    const filteredProjects = useMemo(() => {
        const urlQuery = searchParams.get('query') || '';

        return PROJECTS.filter((project) => {
            const matchesQuery =
                project.title.toLowerCase().includes(urlQuery.toLowerCase()) ||
                project.desc.toLowerCase().includes(urlQuery.toLowerCase());

            const matchesCategory =
                category === 'all' || project.category === category;

            return matchesQuery && matchesCategory;
        }).sort((a, b) => {
            if (sort === 'popular') {
                return b.stars - a.stars;
            }

            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [searchParams, category, sort]);

    const updateParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        });
    };

    const resetAll = () => {
        setSearchQuery('');
        startTransition(() => {
            router.replace(pathname, { scroll: false });
        });
    };

    const queryString = searchParams.toString();

    return (
        <div className="min-h-screen bg-black text-zinc-200 p-8 font-sans">
            <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-2">
                        Project Library
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Status Management: Search, Filters, and Sorting
                    </p>
                </div>

                <div className="h-8 flex items-center">
                    {isPending && (
                        <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            Sync...
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <aside className="space-y-8 lg:sticky lg:top-8">
                    <div className="space-y-3">
                        <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            Search
                        </label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Name or description..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="space-y-3">
                        <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            Category
                        </span>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.map((item) => {
                                const isActive = category === item;

                                return (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            updateParams('category', item)
                                        }
                                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm capitalize transition-colors ${
                                            isActive
                                                ? 'bg-blue-500/10 text-blue-400 font-semibold'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        {item}
                                        <span className="text-[10px] text-zinc-600 tabular-nums">
                                            {item === 'all'
                                                ? PROJECTS.length
                                                : PROJECTS.filter(
                                                      (p) =>
                                                          p.category === item,
                                                  ).length}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                            Sort
                        </span>
                        <div className="flex flex-col gap-1">
                            {SORT_OPTIONS.map((option) => {
                                const isActive = sort === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            updateParams('sort', option.value)
                                        }
                                        className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isActive
                                                ? 'bg-blue-500/10 text-blue-400 font-semibold'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={resetAll}
                        className="w-full rounded-lg border border-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:border-zinc-700 hover:text-white"
                    >
                        Reset
                    </button>

                    <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-3">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">
                            URL state
                        </span>
                        <code className="block break-all text-[11px] text-emerald-400">
                            {queryString ? `?${queryString}` : '— empty —'}
                        </code>
                    </div>
                </aside>

                <section className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                            Found: {filteredProjects.length} of{' '}
                            {PROJECTS.length}
                        </span>
                    </div>

                    {filteredProjects.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-zinc-800 py-20 text-center">
                            <p className="text-lg font-bold text-white">
                                Nothing found
                            </p>
                            <p className="mt-1 text-sm text-zinc-500">
                                Try changing your query or resetting the
                                filters.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {filteredProjects.map((project) => (
                                <article
                                    key={project.id}
                                    className="group flex flex-col rounded-xl border border-zinc-900 bg-zinc-950 p-5 transition-colors hover:border-blue-500/50"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <h2 className="text-lg font-bold text-white transition-colors group-hover:text-blue-400">
                                            {project.title}
                                        </h2>
                                        <span className="shrink-0 rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                            {project.category}
                                        </span>
                                    </div>

                                    <p className="flex-1 text-sm leading-relaxed text-zinc-500">
                                        {project.desc}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3 text-xs">
                                        <span className="font-bold text-amber-400 tabular-nums">
                                            ★ {project.stars}
                                        </span>
                                        <span className="text-zinc-600 tabular-nums">
                                            {formatDate(project.date)}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={null}>
            <ProjectsContent />
        </Suspense>
    );
}
