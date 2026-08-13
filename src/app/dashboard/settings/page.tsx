import { notFound } from "next/navigation";

// next.js waiting for a export default function or a component
export default function SettingsPage() {
    const data = null;

    if (!data) notFound();

    return <div className="p-4 bg-zinc-50 border-2 border-zinc-500 rounded-md">
        <h1 className='text-xl font-bold text-black'>Content via Settings</h1>
        <p className='mt-2 text-zinc-600'>This page is located in /dashboard/settings</p>
    </div>;
}

