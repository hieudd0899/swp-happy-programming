import { Toaster } from 'sonner';
import { QueryClientProvider } from '../providers/query-client-provider';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider>
            <html lang="en">
                <body>
                    {children}
                    <Toaster />
                </body>
            </html>
        </QueryClientProvider>
    );
}
