import { AdminLayout } from '~/components/layouts';

export default function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AdminLayout>{children}</AdminLayout>;
}
