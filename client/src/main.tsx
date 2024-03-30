import React from 'react';
import ReactDOM from 'react-dom/client';

import RootLayout from '@/layout/RootLayout';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RootLayout>
            <App />
        </RootLayout>
    </React.StrictMode>,
);
