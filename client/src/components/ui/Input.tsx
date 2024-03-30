import type { ComponentPropsWithRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'>;

export default function Input(props: InputProps) {
    return (
        <input
            className='w-full rounded-md border-slate-200 bg-slate-400 px-5 py-2 outline-none'
            {...props}
        />
    );
}
