import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    children: string;
};

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            className='rounded-lg border-none bg-blue-500 px-5 py-1 text-lg font-bold uppercase shadow-[0_2px_5px_1px_rgba(0,0,0,0.15)] outline-none duration-300 hover:bg-blue-700 hover:shadow-[0_2px_5px_3px_rgba(0,0,0,0.35)]'
            {...props}
        >
            {children}
        </button>
    );
}
