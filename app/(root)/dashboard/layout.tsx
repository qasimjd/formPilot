import Sidebar from "@/components/sidebar";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex min-h-screen items-center justify-between w-full">
            <Sidebar />
            {children}
        </main>
    );
}
