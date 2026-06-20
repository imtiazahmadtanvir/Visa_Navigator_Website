const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-surface-subtle dark:bg-surface-dark">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-200 border-t-stamp-400 dark:border-ink-700 dark:border-t-stamp-400" />
      <span className="text-sm font-medium text-ink-400 dark:text-ink-400">Loading…</span>
    </div>
  )
}

export default Loading