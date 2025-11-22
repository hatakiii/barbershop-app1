export interface User {
    id: number;
    clerkid: string;
    email: string;
    name?: string;
    createdat?: Date;
    updatedat?: Date;
    role?: string;
}