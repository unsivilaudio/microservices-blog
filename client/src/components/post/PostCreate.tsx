import { type FormEvent, useState } from 'react';
import axios from 'axios';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function PostCreate() {
    const [title, setTitle] = useState('');

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        await axios.post(`http://${window.location.hostname}:4000/posts`, {
            title,
        });

        setTitle('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='mb-4'>
                    <label
                        className='mb-1 block text-sm font-bold'
                        htmlFor='title'
                    >
                        Title
                    </label>
                    <Input
                        type='text'
                        id='title'
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <Button>Submit</Button>
            </form>
        </div>
    );
}
