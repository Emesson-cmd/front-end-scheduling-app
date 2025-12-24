import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ServiceBook - Schedule Your Services',
  description: 'Easy online scheduling for barbershops, nail salons, and service professionals',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

function Navigation() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-blue-600">
          ServiceBook
        </a>
        <div className="flex gap-4">
          <a href="/customer/browse" className="text-gray-600 hover:text-gray-900">
            Browse Services
          </a>
          <a href="/customer/appointments" className="text-gray-600 hover:text-gray-900">
            My Appointments
          </a>
          <a href="/provider/dashboard" className="text-gray-600 hover:text-gray-900">
            Provider Dashboard
          </a>
          <a href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Login
          </a>
        </div>
      </div>
    </nav>
  )
}
