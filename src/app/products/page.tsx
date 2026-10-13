import { products } from '@/db/schema';
import { db } from '@/lib/db';

// static or dynamic page
export const dynamic = 'force-dynamic'; // revalidate - 0, full off cached page. 'auto' - smart next js, 

export default async function ProductsListPage() {
    // get data from db
    const items = await db.select().from(products).orderBy(products.createdAt);

    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    );
}
