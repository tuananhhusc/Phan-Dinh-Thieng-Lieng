import fs from 'fs';

const raw = fs.readFileSync('d:/phandinhthienglieng/phandinhthienglieng.md', 'utf8');
const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

// Manual section mapping: line content prefix -> {id, tag}
const sectionMap = [
  { match: 'Dẫn Nhập Về Bản Chất Khởi Thủy', id: 'dan-nhap', tag: 'h2' },
  { match: 'Nền Tảng Nhân Học Và Thái Độ Nội Tâm', id: 'binh-tam', tag: 'h2' },
  { match: 'Các Yếu Tố Nền Tảng Tạo Nên Môi Trường', id: 'moi-truong-phan-dinh', tag: 'h2' },
  { match: 'Hiện Tượng Học Tâm Linh: Phân Định Các Chuyển Động', id: 'than-loai', tag: 'h2' },
  { match: 'Hiện Tượng An Ủi Thiêng Liêng', id: 'an-ui', tag: 'h3' },
  { match: 'Hiện Tượng Sầu Khổ Thiêng Liêng', id: 'sau-kho', tag: 'h3' },
  { match: 'Cơ Chế Ra Quyết Định: Ba Thời Kỳ', id: 'bau-chon', tag: 'h2' },
  { match: 'Thời Kỳ Thứ Nhất: Sự Hiển Linh', id: 'thoi-ky-1', tag: 'h3' },
  { match: 'Thời Kỳ Thứ Hai: Lọc Qua Lăng Kính', id: 'thoi-ky-2', tag: 'h3' },
  { match: 'Thời Kỳ Thứ Ba: Trí Năng Tự Do', id: 'thoi-ky-3', tag: 'h3' },
  { match: 'Chuẩn Mực Tối Hậu: Bậc Khiêm Nhường', id: 'khiem-nhuong', tag: 'h2' },
  { match: 'Áp Dụng Thực Tiễn: Sư Phạm Của Phút Hồi Tâm', id: 'hoi-tam', tag: 'h2' },
  { match: 'Chiều Kích Hiệp Hành: Nghệ Thuật Đồng Hành', id: 'dong-hanh', tag: 'h2' },
  { match: 'Dấu Chỉ Xác Chuẩn Và Tầm Quan Trọng', id: 'xac-chuan', tag: 'h2' },
  { match: 'Toàn Cảnh Hoạt Động Và Đào Tạo Phân Định', id: 'viet-nam', tag: 'h2' },
  { match: 'Đúc Kết: Di Sản Và Viễn Cảnh', id: 'duc-ket', tag: 'h2' },
  { match: 'Nguồn trích dẫn', id: 'nguon-trich-dan', tag: 'h2' },
];

// Sub-headings that should be h3 but are currently inline text
const subHeadings = [
  { match: 'Cách Thứ Nhất Của Thời Kỳ Thứ Ba', id: 'cach-1', tag: 'h3' },
  { match: 'Cách Thứ Hai Của Thời Kỳ Thứ Ba', id: 'cach-2', tag: 'h3' },
];

// Lines that should be blockquoted
const blockquoteStarts = ['Nguyên tắc vàng'];

// Table data (manually structured from the source)
const tableRows = [
  ['Trung Tâm Linh Đạo I Nhã Đắc Lộ (CIS)', '171 Lý Chính Thắng, Q.3, TP.HCM', 'Khóa "Phân định và Đồng hành thiêng liêng", "Lời Chúa & Hồi Tâm: Sư phạm cầu nguyện Linh thao" (12 tiết, học phí 350.000đ).', 'Lm. Đa Minh Nguyễn Đức Hạnh, S.J. & Lm. Giuse Nguyễn Văn Lộc, S.J.', '5'],
  ['Nhà Linh Thao SJ', 'Hố Nai 3, Trảng Bom, Đồng Nai', 'Khóa Linh thao 30 ngày (dành cho tu sĩ), Linh thao 8 ngày (cho mọi đối tượng, chi phí 1.700.000đ). Chương trình huấn luyện người đồng hành thiêng liêng.', 'Lm. Phêrô Nguyễn Bá Tinh, S.J. và ban huấn luyện', '10'],
  ['Học Viện Thánh Giuse Dòng Tên (SJJS)', 'Linh Xuân, TP. Thủ Đức, TP.HCM', 'Đào tạo Triết học, Thần học. Nghiên cứu chuyên sâu về di sản thần học Linh đạo I-nhã.', 'Các tu sĩ chuẩn bị lãnh nhận thánh chức', '4'],
  ['Cộng Đoàn Thánh Gia - Dòng Tên', 'Các cơ sở trực thuộc', 'Khóa Linh thao thường niên giúp nhận định ơn gọi, canh tân đời sống và bước theo Chúa.', 'Mọi người khao khát tìm hiểu và phân định ơn gọi', '10'],
  ['Linh Thao San Jose Inc (Jesuit Retreat Center)', '300 Manresa, Los Altos, CA, Hoa Kỳ', 'Linh thao linh hướng cá nhân 5 ngày hoặc 8 ngày. Tĩnh tâm cuối tuần (Lệ phí từ $625 - $1000).', 'Lm. Nguyễn Công Chánh, S.J., Thầy Đỗ Nghĩa, Thầy An Vũ', '11'],
  ['Trung Tâm Mục Vụ Gia Đình Đắc Lộ', '171 Lý Chính Thắng, Q.3, TP.HCM', 'Áp dụng linh đạo I-nhã vào thực tiễn đời sống hôn nhân, gia đình và xã hội.', 'Các gia đình Công giáo', '9'],
  ['Nền tảng học thuật và tài liệu (Linhthao.net)', 'Trực tuyến', 'Hệ thống tài liệu: Sách Linh Thao, Chú Giải Linh Thao, Được Làm Môn Đệ, Thao Luyện Nhẹ Nhàng.', 'Các nhà nghiên cứu, thao viên thực hành', '4'],
];

// References
const references = [
  { num: 1, author: 'Cộng đoàn Đời sống Kitô hữu Việt Nam', year: 'n.d.', title: 'Phân định thiêng liêng', publisher: 'CLC VN', url: 'https://www.geocities.ws/liempham/pdtl_hlclc.htm' },
  { num: 2, author: 'Tỉnh Dòng Tên Việt Nam', year: 'n.d.', title: 'Phân định thiêng liêng', publisher: 'dongten.net', url: 'https://dongten.net/phan-dinh-thieng-lieng/' },
  { num: 3, author: 'ĐTC Phanxicô', year: '2023', title: 'Giáo lý về Phân định: Bài 14 – Đồng hành thiêng liêng', publisher: 'Hội đồng Giám mục Việt Nam', url: 'https://hdgmvietnam.com/chi-tiet/tiep-kien-chung-04-01-2023-giao-ly-phan-dinh-dong-hanh-thieng-lieng-49098' },
  { num: 4, author: 'Tỉnh Dòng Tên Việt Nam', year: 'n.d.', title: 'Phân định Thánh Ý Chúa theo Linh đạo I-nhã', publisher: 'dongten.net', url: 'https://dongten.net/phan-dinh-thanh-y-chua-theo-linh-dao-i-nha/' },
  { num: 5, author: 'Trung Tâm Linh Đạo Inhã Đắc Lộ', year: 'n.d.', title: 'Giới thiệu Trung Tâm Linh Đạo Inhã Đắc Lộ', publisher: 'dongten.net', url: 'https://dongten.net/gioi-thieu-trung-tam-linh-dao-inha-dac-lo-va-tuyen-sinh-cho-cac-khoa-hoc/' },
  { num: 6, author: 'Trung Tâm Linh Đạo Inhã Đắc Lộ', year: 'n.d.', title: 'Khóa Học Lời Chúa và Phút Hồi Tâm', publisher: 'dongten.net', url: 'https://dongten.net/trung-tam-linh-dao-i-nha-khai-giang-khoa-hoc-ve-loi-chua-va-phut-hoi-tam/' },
  { num: 7, author: 'Cộng đoàn Đời sống Kitô hữu Việt Nam', year: 'n.d.', title: 'Đồng hành thiêng liêng', publisher: 'CLC VN', url: 'https://geocities.ws/liempham/dhtl.htm' },
  { num: 8, author: 'Phút Hồi Tâm', year: '2014', title: '5 bước làm Phút hồi tâm hằng ngày', publisher: 'phuthoitam.net', url: 'https://phuthoitam.net/2014/05/30/5-buoc-lam-phut-hoi-tam-hang-ngay/' },
  { num: 9, author: 'Trung tâm Mục vụ Gia đình Đắc Lộ', year: 'n.d.', title: 'Trung tâm Mục vụ Gia đình Đắc Lộ', publisher: 'trungtammucvugiadinhdaclo.com', url: 'https://trungtammucvugiadinhdaclo.com/?page_id=38' },
  { num: 10, author: 'Trung Tâm Linh Đạo I Nhã Đắc Lộ', year: 'n.d.', title: 'Linh Thao', publisher: 'trungtamlinhdaoinhadaclo.com', url: 'https://trungtamlinhdaoinhadaclo.com/category/linh-thao' },
  { num: 11, author: 'Linh Thao San Jose', year: 'n.d.', title: 'Linh Thao San Jose', publisher: 'linhthao.org', url: 'https://linhthao.org/lichtrinh.php' },
  { num: 12, author: 'Giáo phận Sài Gòn', year: 'n.d.', title: 'Địa Chỉ Các Dòng Tu trong TGP Sài Gòn', publisher: 'catholic.org.tw', url: 'https://vntaiwan.catholic.org.tw/vnchurch/dtsaigon.htm' },
  { num: 13, author: 'Klook', year: 'n.d.', title: '23 Ngôi Chùa Quanh Sài Gòn Nổi Tiếng Linh Thiêng', publisher: 'klook.com', url: 'https://www.klook.com/vi/blog/chua-sai-gon/' },
];

function esc(s) {
  if (!s) return '';
  // Replace HTML chars and also replace em-dash with space-hyphen-space
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/—/g, ' - ');
}

// Process citations: match pattern like word.NUMBER or ).NUMBER at end of sentences
function cite(s) {
  return s.replace(/([.)\]])(\d{1,2})(?=\s|[.,;:?!]|$)/g, (m, pre, num) => {
    const ref = references.find(r => r.num === parseInt(num));
    const titleAttr = ref ? ` title="${esc(ref.text)}"` : '';
    return `${pre}<sup className="cite"${titleAttr}>[${num}]</sup>`;
  });
}

let jsx = [];
let isFirstParagraph = true;
let skipUntilSection = false; // skip table raw lines
let tableInserted = false;

// Skip lines that belong to table raw data
const tableHeaderLine = 'Tên Cơ Sở / Tổ Chức / Tài Liệu';
const tableEndLine = 'Song song với';
let inTableZone = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Check if we hit reference section
  if (line === 'Nguồn trích dẫn') {
    jsx.push(`      <h2 id="nguon-trich-dan">Nguồn Trích Dẫn</h2>`);
    jsx.push(`      <ol className="pl-6 space-y-3 list-decimal text-sm">`);
    for (const ref of references) {
      jsx.push(`        <li>`);
      jsx.push(`          <span className="font-bold">${esc(ref.author)}</span> (${esc(ref.year)}). `);
      jsx.push(`          <em>${esc(ref.title)}</em>. ${esc(ref.publisher)}.`);
      jsx.push(`          <br /><a href="${ref.url}" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-burgundy transition-all break-all">${ref.url}</a>`);
      jsx.push(`        </li>`);
    }
    jsx.push(`      </ol>`);
    break; // done
  }

  // Table zone detection
  if (line === tableHeaderLine) {
    inTableZone = true;
    continue;
  }
  if (inTableZone) {
    if (line.startsWith('Song song với')) {
      inTableZone = false;
      // Insert the proper table, then continue with this paragraph
      if (!tableInserted) {
        tableInserted = true;
        jsx.push(`      <div className="overflow-x-auto">`);
        jsx.push(`        <table>`);
        jsx.push(`          <thead><tr><th>Cơ Sở / Tổ Chức</th><th>Địa Điểm</th><th>Hoạt Động & Nội Dung</th><th>Chuyên Gia / Đối Tượng</th><th>Nguồn</th></tr></thead>`);
        jsx.push(`          <tbody>`);
        for (const row of tableRows) {
          jsx.push(`            <tr><td>${esc(row[0])}</td><td>${esc(row[1])}</td><td>${esc(row[2])}</td><td>${esc(row[3])}</td><td>${esc(row[4])}</td></tr>`);
        }
        jsx.push(`          </tbody>`);
        jsx.push(`        </table>`);
        jsx.push(`      </div>`);
      }
      jsx.push(`      <p>${cite(esc(line))}</p>`);
      continue;
    }
    continue; // skip raw table lines
  }

  // Skip the title line since it's moved to the Hero section
  if (line.startsWith('Báo Cáo Nghiên Cứu Chuyên Sâu Về Phân Định')) continue;

  // Check section mapping
  let matched = false;
  for (const sec of sectionMap) {
    if (line.startsWith(sec.match)) {
      jsx.push(`      <${sec.tag} id="${sec.id}">${esc(line)}</${sec.tag}>`);
      matched = true;
      isFirstParagraph = sec.tag === 'h2' || sec.tag === 'h1';
      break;
    }
  }
  if (matched) continue;

  // Check sub-headings
  for (const sub of subHeadings) {
    if (line.startsWith(sub.match)) {
      jsx.push(`      <${sub.tag} id="${sub.id}">${cite(esc(line))}</${sub.tag}>`);
      matched = true;
      break;
    }
  }
  if (matched) continue;

  // Check blockquotes
  let isBq = false;
  for (const bqs of blockquoteStarts) {
    if (line.startsWith(bqs)) {
      jsx.push(`      <blockquote><p>${cite(esc(line))}</p></blockquote>`);
      isBq = true;
      break;
    }
  }
  if (isBq) continue;

  // Check if this is a "Đúc Kết" line that got missed (it doesn't end with period but has colon)
  if (line.startsWith('Đúc Kết:')) {
    jsx.push(`      <h2 id="duc-ket">${esc(line)}</h2>`);
    continue;
  }

  // Handle the "Tiến trình Phút Hồi Tâm" line (it's a paragraph, not a heading)
  if (line.startsWith('Tiến trình Phút Hồi Tâm thường kéo dài')) {
    jsx.push(`      <p>${cite(esc(line))}</p>`);
    continue;
  }

  // Handle "Sau khi đã quyết định" — this is a paragraph, not a heading
  if (line.startsWith('Sau khi đã quyết định')) {
    jsx.push(`      <p>${cite(esc(line))}</p>`);
    continue;
  }

  // Default: paragraph
  if (isFirstParagraph) {
    jsx.push(`      <p className="drop-cap">${cite(esc(line))}</p>`);
    isFirstParagraph = false;
  } else {
    jsx.push(`      <p>${cite(esc(line))}</p>`);
  }
}

const component = `export default function ArticleContent() {
  return (
    <article className="prose-article">
${jsx.join('\n')}
    </article>
  );
}
`;

fs.writeFileSync('d:/phandinhthienglieng/src/components/ArticleContent.tsx', component);
console.log('ArticleContent.tsx written successfully (' + jsx.length + ' elements)');
