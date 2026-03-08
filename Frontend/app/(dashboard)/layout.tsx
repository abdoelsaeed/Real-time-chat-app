import Sidebar from "../_components/Sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 min-h-0 min-w-0">
                {children}
            </main>
        </div>
    )
}
