export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <div className="contents">
      <main className="main">
        {children}
      </main>
    </div>
    </>
  )
  
}