import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinguaForge Online',
  description: 'Master languages. Collect cards. Conquer the world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}