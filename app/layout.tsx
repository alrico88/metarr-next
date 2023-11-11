import type { Metadata, Viewport } from 'next';
import { Cabin } from 'next/font/google';
import './globals.scss';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Credits from './components/Credits';

const cabin = Cabin({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'metarr',
  description: 'Web app to check METAR data and nearby stations',
  keywords: 'metar, parsed, nearby',
};

export const viewport: Viewport = {
  themeColor: '#ebf4f5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-100">
      <body className={clsx([cabin.className, 'h-100'])}>
        <div className="d-flex flex-column h-100">
          <div className="flex-shrink-0 pb-3">
            <div className="container">
              <div className="row py-2">
                <div className="col">
                  <Link href="/" className="text-decoration-none">
                    <h1 className="fw-bolder mb-0">
                      <Image
                        alt="metarr logo"
                        src="/logo.png"
                        height={30}
                        width={43}
                      ></Image>{' '}
                      metarr
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
            <main>{children}</main>
          </div>
          <footer className="mt-auto text-center bg-white py-3">
            <Credits />
          </footer>
        </div>
      </body>
    </html>
  );
}
