import './globals.css';

export const metadata = {
  title: 'Elite Tendency — Cinematic UK Rentals',
  description: 'A premium animation-led rental experience platform for the UK market.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
