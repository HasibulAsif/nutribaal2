import type React from "react"

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export default LoadingOverlay

