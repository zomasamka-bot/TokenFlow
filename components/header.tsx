'use client'

interface HeaderProps {
  currentPage: string
  onHomeClick: () => void
  onActivityClick: () => void
}

export default function Header({ currentPage, onHomeClick, onActivityClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={onHomeClick}
          className="text-xl font-bold text-black hover:opacity-80 transition-opacity"
        >
          TokenFlow
        </button>

        <nav className="flex items-center gap-4">
          {currentPage === 'activity' && (
            <button
              onClick={onHomeClick}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Back to Home
            </button>
          )}
          {currentPage !== 'activity' && currentPage !== 'home' && (
            <button
              onClick={onActivityClick}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              Activity
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
