import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashboardSidebar user={session.user} />
      <main className="flex-1 p-6 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
