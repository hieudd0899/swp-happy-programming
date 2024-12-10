import { DefaultLayout } from '~/components/layouts';

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DefaultLayout>{children}</DefaultLayout>;
}
