'use server';

import { products } from '@/db/schema';
import { db } from '@/lib/db';
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
            // create a new record, and send this record to postgresql
            const [newProduct] = await db
                .insert(products)
                .values({
                    name: parsedInput.title,
                    price: Math.round(parsedInput.price),
                    stock: parsedInput.stock,
                })
                .returning();

            return {
                success: true,
                productId: newProduct.id,
            };
        } catch (error: any) {
            throw new Error(
                error.message ||
                    'An unexpected error occurred while creating the sneaker drop.',
            );
        }
    });

const ToggleFavoriteSchema = z.object({
    id: z.number(),
});

export const toggleFavorite = actionClient
    .inputSchema(ToggleFavoriteSchema)
    .action(async ({ parsedInput }) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (parsedInput.id === 2) {
            throw new Error('Failed to refresh status for this model');
        }

        return {
            success: true,
            id: parsedInput.id,
        };
    });
