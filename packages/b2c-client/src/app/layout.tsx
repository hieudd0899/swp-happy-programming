import { QueryClientProvider } from 'common/providers/query-client-provider';
import { Toaster } from '~/components/ui/sonner';
import './globals.css';
import { ThemeProvider } from '~/providers/theme-provider';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        disableTransitionOnChange
                        enableSystem
                    >
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </QueryClientProvider>
    );
}
