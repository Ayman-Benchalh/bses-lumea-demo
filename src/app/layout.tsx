import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMÉA — Your glow, your ritual | Luxury Moroccan Beauty',
  description: 'Premium Moroccan beauty e-commerce flagship demonstration by BSES (Benchalh Solution E-commerce System).',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

