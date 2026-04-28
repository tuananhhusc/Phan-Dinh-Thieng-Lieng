import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ArticleContent from "@/components/ArticleContent";
import ThemeToggle from "@/components/ThemeToggle";
import { tocItems } from "@/data/toc";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Phân Định Thiêng Liêng: Nền Tảng Thần Học, Tiến Trình Tâm Linh Và Ứng Dụng Trong Bối Cảnh Đương Đại",
    "author": {
      "@type": "Person",
      "name": "Nghiên cứu Thần học"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Societas Jesu"
    },
    "datePublished": "2023-10-01",
    "description": "Báo cáo nghiên cứu chuyên sâu về phân định thiêng liêng theo Linh đạo I-nhã.",
    "about": ["Spiritual Discernment", "Ignatian Spirituality", "Catholic Theology"]
  };

  return (
    <>
      <Script id="schema-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgressBar />
      <ThemeToggle />
      <Header />

      <main className="flex-grow">
        {/* Hero Image Section */}
        <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[60vh] bg-jesuit overflow-hidden border-b-[3px] border-gold">
          <Image
            src="/hero-image.png"
            alt="St. Ignatius of Loyola writing the Spiritual Exercises"
            fill
            className="object-cover object-top opacity-85 hover:opacity-100 transition-opacity duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-jesuit via-jesuit/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-center text-parchment">
             <div className="max-w-4xl mx-auto">
               <p className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                 Nghiên Cứu Chuyên Sâu
               </p>
               <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                 Phân Định Thiêng Liêng
               </h1>
               <div className="hero-meta flex items-center justify-center gap-4 text-sm opacity-80 italic">
                 <span>Thời gian đọc: ~15 phút</span>
               </div>
             </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10 relative items-start">

            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            {/* Reading column */}
            <div className="flex-1 w-full max-w-[var(--content-max)] mx-auto">
              {/* Ornament top */}
              <div className="flex justify-center mb-8 opacity-40">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-[1px] bg-gold" />
                  <span className="text-gold text-xs tracking-[0.3em] font-bold" style={{ fontFamily: "var(--font-heading)" }}>✦</span>
                  <div className="w-10 h-[1px] bg-gold" />
                </div>
              </div>

              {/* Article Content */}
              <div className="pt-2 sm:pt-4">
                <ArticleContent />
              </div>

              {/* Ornament bottom */}
              <div className="ornament mt-8">
                <span className="text-gold text-xs tracking-[0.3em] font-bold" style={{ fontFamily: "var(--font-heading)" }}>A·M·D·G</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
