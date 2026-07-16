export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b font-bold text-lg">TaskFlow</header>
      <main className="flex-1">{children}</main>
      <footer className="p-4 border-t text-center text-sm text-gray-500">© 2026 TaskFlow</footer>
    </div>
  )
}
