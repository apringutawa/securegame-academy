import './globals.css';
import React from 'react';
export const metadata={title:'SecureGame Academy',description:'Belajar keamanan siber lewat permainan'};
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang='id'><body>{children}</body></html>)}
