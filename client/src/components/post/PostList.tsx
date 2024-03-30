import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import type { Posts } from '@/types/post';
import CommentCreate from '@/components/comment/CommentCreate';
import CommentList from '@/components/comment/CommentList';

export default function PostList() {
    const [posts, setPosts] = useState<Posts>({});

    const fetchPosts = useCallback(async () => {
        const res = await axios.get<Posts>(
            `http://${window.location.hostname}:4002/posts`,
        );

        setPosts(res.data);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const renderedPosts = Object.values(posts).map(post => (
        <li key={post.id} className='basis-[15rem] rounded-lg bg-slate-500 p-4'>
            <h3 className='mb-3'>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
        </li>
    ));

    return (
        <ul className='flex flex-wrap justify-between'>
            {renderedPosts.length ? (
                renderedPosts
            ) : (
                <h2 className='text-center'>No Posts Yet...</h2>
            )}
        </ul>
    );
}
