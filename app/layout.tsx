import type { Metadata } from 'next'
import './globals.css'

import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Prawin Portfolio',
    description: 'Created by Prawin.jsx',
    generator: 'You',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>


        <ThemeProvider>{children}</ThemeProvider>
        </body>
        </html>
)
}
