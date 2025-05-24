




import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/sidebar";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="relative flex gap-2 h-screen items-center justify-between w-full px-3 py-4">
            <Sidebar />
            <main className="min-h-screen w-full">
                <DashboardHeader />
                {children}
            </main>
        </div>
    );
}
