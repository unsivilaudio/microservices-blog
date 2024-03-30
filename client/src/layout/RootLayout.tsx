import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main className='container mx-auto mt-6 max-w-[60rem] px-8 font-body'>
            {children}
        </main>
    );
}
