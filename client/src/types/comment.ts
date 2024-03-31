export type Comment = {
    id: string;
    content: string;
    status: 'approved' | 'pending' | 'rejected';
};
