import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
    handleServerError: (error) => {
        console.log('Server error occurred:', error);

        return error.message || 'An unexpected error occurred on the server.';
    },
});
