import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import './globals.css';
export const metadata: Metadata = { title: 'Herbal-Ai Code Academy', description: 'Learn the Herbal-Ai capstone code line by line.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><div className="wrap"><Header /><main>{children}</main>
    <p className="foot">Lessons use real code from the Herbal-Ai capstone project. Lessons 3+ in each course are auto-generated, so the notes are pattern-based.</p></div></body></html>);
}
