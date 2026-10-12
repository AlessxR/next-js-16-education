'use server';

import { actionClient } from '@/lib/safe-action';
import z from 'zod';

const CreateSneakerSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters long' })
        .max(50, { message: 'Title must be at most 50 characters long' }),
    price: z
        .number()
        .min(1, { message: 'Price must be greater than 0' })
        .positive({ message: 'Price must be a positive number' }),
    stock: z
        .number()
        .int({ message: 'Stock must be an integer' })
        .nonnegative({ message: 'Stock must be greater than or equal to 0' })
        .min(0, { message: 'Stock must be greater than or equal to 0' }),
});

export const createSneakerDrop = actionClient
    .inputSchema(CreateSneakerSchema)
    .action(async ({ parsedInput }) => {
        console.log(`Payload: ${parsedInput}`);

        try {
            const res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...parsedInput,
                    category: 'mens-shoes',
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to create sneaker drop');
            }

            const data = await res.json();

            return {
                success: true,
                data,
            };
        } catch (error: any) {
            throw new Error(
                error.message ||
                    'An unexpected error occurred while creating the sneaker drop.',
            );
        }
    });
