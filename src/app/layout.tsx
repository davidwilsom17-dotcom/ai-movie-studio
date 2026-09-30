import './globals.css'
export const metadata = { title: 'AI Movie Studio', description: 'Production-ready AI filmmaking' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
