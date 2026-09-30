import './globals.css'
export const metadata = { title: 'AI Movie Studio', description: 'Production-ready AI filmmaking platform' }
export default function RootLayout({children}:{children:React.ReactNode}) {
  return (<html lang="en"><body style={{margin:0,background:'#0a0a0a',color:'white',fontFamily:'sans-serif'}}>{children}</body></html>)
}
