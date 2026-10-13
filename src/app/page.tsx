import { HeroBanner } from '@/components/hero-banner';

export default async function Home() {
    return (
        <main className="p-10 bg-black text-white min-h-screen">
            <HeroBanner />
        </main>
    );
}
