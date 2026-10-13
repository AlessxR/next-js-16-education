import Image from 'next/image';

// import heroWallpaper from '@/assets/images/hero.jpg';

export function HeroBanner() {
    // return <Image src={heroWallpaper} alt="Hero Banner" />;
    return (
        <Image
            src="/images/hero.jpg"
            alt="Hero Banner"
            fill
            className="object-cover"
            // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 33vw"
            // priority
        />
    );
}
