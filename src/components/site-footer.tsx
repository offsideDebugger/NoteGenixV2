export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Built for fast sharing and quick preview.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/offsidedebugger"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            @offsidedebugger
          </a>
          <a
            href="https://github.com/offsideDebugger/NoteGenixV2"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
