import '../public/output.css';
import { Inter } from 'next/font/google'
import React from 'react';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BearTrap - Honeypot Management System',
  description: 'Manage your honeypots with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-beartrap-black text-beartrap-yellow`}>{children}</body>
    </html>
  )
}

