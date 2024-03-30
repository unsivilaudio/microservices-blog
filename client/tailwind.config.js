/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
    theme: {
        extend: {
            fontFamily: {
                body: ['Maven Pro', 'monospace', 'sans-serif'],
                title: ['Kanit', 'Helvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
