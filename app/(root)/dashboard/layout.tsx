import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/sidebar";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="flex h-screen items-center justify-between w-full">
            <Sidebar />
            <main className="min-h-screen w-full">
                <DashboardHeader />
                {children}
            </main>
        </main>
    );
}
