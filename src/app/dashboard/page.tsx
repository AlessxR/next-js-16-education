import { headers } from 'next/headers';

export default async function DashboardPage() {
    const headersStore = await headers();

    const token = headersStore.get('Connection');

    return <div>Your headers: {token}</div>;
}
