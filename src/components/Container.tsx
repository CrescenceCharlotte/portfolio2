export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto w-full px-4 ${className}`}>
      {children}
    </div>
  )
}




