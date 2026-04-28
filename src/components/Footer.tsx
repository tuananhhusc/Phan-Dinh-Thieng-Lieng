export default function Footer() {
  return (
    <footer className="mt-16 bg-jesuit text-parchment">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold text-xs font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                IHS
              </div>
              <p className="text-xs font-bold text-parchment/80 tracking-wider uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                Phân Định Thiêng Liêng
              </p>
            </div>
            <p className="text-sm text-parchment/50 leading-relaxed">
              Báo cáo nghiên cứu chuyên sâu về nền tảng thần học, tiến trình tâm linh và ứng dụng trong bối cảnh đương đại.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-gold/80 mb-3 uppercase tracking-wider">
              Nguồn tham khảo
            </h4>
            <ul className="space-y-1.5 text-sm text-parchment/45">
              <li>✦ Sách Linh Thao — Thánh Inhaxiô Loyola</li>
              <li>✦ Giáo lý về Phân định — ĐTC Phanxicô</li>
              <li>✦ Tỉnh Dòng Tên Việt Nam</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs font-bold text-gold/80 mb-3 uppercase tracking-wider">
              Về Báo Cáo
            </h4>
            <p className="text-sm text-parchment/45 leading-relaxed">
              Tài liệu được biên soạn cho mục đích nghiên cứu học thuật và mục vụ.
            </p>
            <p className="text-sm text-gold/50 mt-3 italic" style={{ fontFamily: "var(--font-heading)" }}>
              Ad Maiorem Dei Gloriam
            </p>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-parchment/10 text-center">
          <p className="text-xs text-parchment/30">
            © {new Date().getFullYear()} · Omnia ad maiorem Dei gloriam
          </p>
        </div>
      </div>
    </footer>
  );
}
