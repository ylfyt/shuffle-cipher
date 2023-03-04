import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import RootProvider from './contexts/root';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
		<RootProvider>
			<App />
		</RootProvider>
	// </React.StrictMode>
);
