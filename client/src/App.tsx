import PostCreate from '@/components/post/PostCreate';
import PostList from '@/components/post/PostList';

export default function App() {
    return (
        <div>
            <section className='mb-4'>
                <h1 className='mb-3'>Create Post</h1>
                <PostCreate />
            </section>
            <section className='mb-4'>
                <h1 className='mb-3'>Posts</h1>
                <PostList />
            </section>
        </div>
    );
}
