import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import type { Comment } from '@/types/comment';

interface CommentListProps {
    postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = useCallback(async () => {
        const res = await axios.get(
            `http://${window.location.hostname}:4001/posts/${postId}/comments`,
        );

        setComments(res.data);
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const renderedComments = comments.map(comment => (
        <li key={comment.id} className='p-1'>
            <p className='inline'>{comment.content}</p>
        </li>
    ));

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
