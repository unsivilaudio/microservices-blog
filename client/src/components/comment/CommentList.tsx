import type { Comment } from '@/types/comment';

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    const renderedComments = comments.map(comment => {
        let content: string = '';
        if (comment.status === 'approved') {
            content = comment.content;
        }

        if (comment.status === 'pending') {
            content = 'This comment is awaitng moderation';
        }

        if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
        }

        return (
            <li key={comment.id} className='p-1'>
                <p className='inline'>{content}</p>
            </li>
        );
    });

    return (
        <ul className='mb-2 list-inside list-disc divide-y-[1px] divide-slate-300 rounded-lg border border-slate-300 bg-slate-600 p-2'>
            {renderedComments.length ? (
                renderedComments
            ) : (
                <h4 className='text-center'>No Comments Yet...</h4>
            )}
        </ul>
    );
}
