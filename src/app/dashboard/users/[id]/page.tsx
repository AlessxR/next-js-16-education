interface UserPageProps {
    // id должен строго совпадать с названием папки
    params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
    const { id } = await params;

    return <div className="text-black">ID: {id}</div>;
}
