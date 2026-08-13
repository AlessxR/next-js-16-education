'use client';

import { useEffect, useState } from 'react';

interface DashboardTemplateProps {
    children: React.ReactNode;
}

// this is the layout for the dashboard page
export default function DashboardTemplate({
    children,
}: DashboardTemplateProps) {
    const [text, setText] = useState('');

    useEffect(() => {
        console.log('Template: Monting(happens navigate)');
    }, []);

    return (
        <div className="flex-1 p-6 border-4 border-dashed border-purple-400 rounded-lg flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                    Dashboard Template
                </div>

                <div className="flex flex-col items-end">
                    <label className="text-[10px] font-bold text-purple-300 uppercase mb-1">
                        Volatile State (Template)
                    </label>
                    <input
                        className="w-56 p-2 text-sm border border-purple-200 rounded bg-white text-black placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500 outline-none"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="It will reset when switching..."
                    />
                </div>
            </div>
            {children}
        </div>
    );
}
