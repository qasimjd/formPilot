import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/sidebar";



export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex min-h-screen w-full flex-row px-2 md:px-4 md:gap-4 gap-2">
            <Sidebar />
            <main className="flex w-[calc(100%-264px)] flex-1 flex-col bg-dark-300 py-4 xs:p-10">
                <DashboardHeader />
                {children}
            </main>
        </div>
    );
};