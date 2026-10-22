function LoadingSpinner({ label = 'Carregando...' }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16 text-slate-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-red-500" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export default LoadingSpinner
