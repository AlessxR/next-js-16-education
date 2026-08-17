import 'server-only';

export interface User {
    id: number;
    email: string;
}

export const USERS: User[] = [
    { id: 1, email: 'olivia.bennett@example.com' },
    { id: 2, email: 'marcus.hale@example.com' },
    { id: 3, email: 'priya.raman@example.com' },
    { id: 4, email: 'diego.ferreira@example.com' },
    { id: 5, email: 'anna.kowalski@example.com' },
    { id: 6, email: 'kenji.watanabe@example.com' },
    { id: 7, email: 'sofia.almeida@example.com' },
    { id: 8, email: 'liam.osullivan@example.com' },
    { id: 9, email: 'nadia.haddad@example.com' },
    { id: 10, email: 'tobias.lindqvist@example.com' },
];

export const db = {
    query: {
        users: {
            findMany: async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
                return USERS;
            },
        },
    },
};
