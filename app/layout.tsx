import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { LucideIcon } from 'lucide-react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';

const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Forge App - Workout Tracker</title>
        <meta name="description" content="Forge App is a modern workout tracker application designed to help users efficiently manage and track their fitness routines." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <LucideIcon name="dumbbell" className="w-6 h-6 mr-2" />
              <span className="text-lg font-bold">Forge App</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/workouts" className="hover:underline">Workouts</a></li>
                <li><a href="/progress" className="hover:underline">Progress</a></li>
                <li><a href="/settings" className="hover:underline">Settings</a></li>
              </ul>
            </nav>
          </header>
          <main className="flex-grow container mx-auto p-4">
            <Component {...pageProps} />
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; {new Date().getFullYear()} Forge App. All rights reserved.</p>
          </footer>
        </div>
      </Provider>
    </>
  );
};

export default Layout;