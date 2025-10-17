'use client';

import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo-client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  SPACEAI Employee Directory
                </h1>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ApolloProvider>
      </body>
    </html>
  );
}