import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { LanguageProvider } from '@/lib/LanguageContext';
import './globals.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="bg-background text-foreground flex min-h-screen">
                <LanguageProvider>
                    <div className="fixed top-0 left-0 right-0 h-1 bg-yellow-400 z-[100] animate-pulse"></div>
                    <Sidebar />
                    <div className="flex-1 flex flex-col ml-64">
                        <TopBar />
                        <main className="flex-1 p-8 overflow-auto">
                            {children}
                        </main>
                    </div>
                </LanguageProvider>
            </body>
        </html>
    );
}
