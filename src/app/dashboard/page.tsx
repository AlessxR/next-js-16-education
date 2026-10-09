import { Suspense } from 'react';

export default async function DashboardPage() {
    return (
        <main>
            <Suspense fallback={<ProfileSkeleton />}>
                <UserProfile />
            </Suspense>
        </main>
    );
}
