export function MarketingFooter() {
  return (
    <footer className="p-6 text-sm text-muted-foreground">
      © {new Date().getFullYear()} MediFlow. <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
    </footer>
  );
}
