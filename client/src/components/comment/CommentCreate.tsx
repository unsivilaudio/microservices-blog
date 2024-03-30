import { FormEvent, useState } from 'react';
import axios from 'axios';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CommentCreateProps {
    postId: string;
}

export default function CommentCreate({ postId }: CommentCreateProps) {
    const [content, setContent] = useState('');

    async function onSubmit(e: FormEvent) {
        e.preventDefault();

        await axios.post(
            `http://${window.location.hostname}:4001/posts/${postId}/comments`,
            {
                content,
            },
        );

        setContent('');
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='mb-4'>
                <label
                    htmlFor='content'
                    className='mb-1 block text-sm font-bold uppercase'
                >
                    New Comment
                </label>
                <Input
                    id='content'
                    name='content'
                    onChange={e => setContent(e.target.value)}
                    value={content}
                />
            </div>
            <Button>Submit</Button>
        </form>
    );
}
