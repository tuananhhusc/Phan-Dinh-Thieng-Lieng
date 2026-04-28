export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-jesuit text-parchment shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* IHS monogram + brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold text-sm font-bold tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
              IHS
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold tracking-widest text-parchment/80 uppercase">
                Báo Cáo Nghiên Cứu
              </p>
              <p className="text-[10px] text-parchment/50 tracking-wider">
                SOCIETAS JESU
              </p>
            </div>
          </div>

          {/* Center title */}
          <div className="text-center">
            <h1 className="text-sm sm:text-base font-bold text-parchment tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Phân Định Thiêng Liêng
            </h1>
            <p className="text-[10px] sm:text-xs text-parchment/50 mt-0.5 italic">
              Spiritual Discernment
            </p>
          </div>

          {/* Right: motto */}
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-gold/70 italic tracking-wide" style={{ fontFamily: "var(--font-heading)" }}>
              Ad Maiorem Dei Gloriam
            </p>
          </div>
          <div className="md:hidden w-9" />
        </div>
      </div>
      {/* Gold accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </header>
  );
}
