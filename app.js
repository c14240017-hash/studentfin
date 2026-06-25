/* ============================================================
   StudentFin Prototype — State & Logic (v3)
   + Dark Mode toggle switch
   + Skeleton loading on page navigation
   + Nav dropdown groups
   + Edit / Delete transactions
   + Global search across all pages
   + CSV export
   + Auto-sync all pages
   + Responsive sidebar & mobile nav
   ============================================================ */

/* ---- CATEGORIES ---- */
const CATEGORIES = [
  { id:"makan",     name:"Makan & Minum",   icon:"ti-soup",         color:"#3525CD", bg:"#E2DFFF" },
  { id:"kos",       name:"Kos & Laundry",   icon:"ti-bed",          color:"#006C49", bg:"#E1F0E9" },
  { id:"transport", name:"Transportasi",    icon:"ti-scooter",      color:"#0C447C", bg:"#E6F1FB" },
  { id:"nongkrong", name:"Nongkrong",       icon:"ti-coffee",       color:"#993C1D", bg:"#FAECE7" },
  { id:"pulsa",     name:"Pulsa & Internet",icon:"ti-wifi",         color:"#654FA0", bg:"#F0ECF9" },
  { id:"belanja",   name:"Belanja",         icon:"ti-shopping-bag", color:"#E65100", bg:"#FFF3E0" },
  { id:"kuliah",    name:"Kuliah & Tugas",  icon:"ti-school",       color:"#2E7D32", bg:"#E8F5E9" },
  { id:"kesehatan", name:"Kesehatan",       icon:"ti-first-aid-kit",color:"#993556", bg:"#FBEAF0" },
  { id:"lainnya",   name:"Lainnya",         icon:"ti-dots",         color:"#5F5E5A", bg:"#F1EFE8" },
];

function getCat(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

/* ---- TAGS ---- */
const TAGS = [
  { id:"pribadi",    label:"Pribadi",    emoji:"\u{1F464}" },
  { id:"organisasi", label:"Organisasi", emoji:"\u{1F3E2}" },
  { id:"panitia",    label:"Panitia",    emoji:"\u{1F3AA}" },
  { id:"kuliah",     label:"Kuliah",     emoji:"\u{1F4DA}" },
  { id:"lainnya",    label:"Lainnya",    emoji:"\u{00B7}" },
];

function getTag(id) {
  return TAGS.find(t => t.id === id) || TAGS[TAGS.length - 1];
}

function tagPillHTML(tagId) {
  if (!tagId) return "";
  const t = getTag(tagId);
  return `<span class="tag-pill tag-${t.id}">${t.emoji} ${t.label}</span>`;
}

/* ---- ACCOUNTS ---- */
const ACCOUNTS = [
  { id:"gopay", name:"GoPay" },
  { id:"bca",   name:"BCA Mobile" },
  { id:"cash",  name:"Tunai" },
  { id:"dana",  name:"DANA" },
];

/* ---- DATE HELPERS ---- */
const today = new Date();

function daysAgo(n) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
}

function fmtDate(d) {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

let txIdCounter = 100;
function newTxId() { return "tx" + ++txIdCounter; }

/* ---- STATE ---- */
const state = {
  monthlyBudgetTotal: 1500000+800000+600000+500000+200000+400000+300000+150000,
  categoryBudgets: {
    makan:1500000, kos:800000, transport:600000, nongkrong:500000,
    pulsa:200000, belanja:400000, kuliah:300000, kesehatan:150000, lainnya:200000,
  },
  startingBalance: 4250000,
  transactions: [
    { id:newTxId(), date:daysAgo(0),  desc:"Indomie Geprek Kak Rina",  cat:"makan",     account:"gopay", amount:-18000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(0),  desc:"Bayar Kos Bulanan",         cat:"kos",       account:"bca",   amount:-650000,  type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(1),  desc:"Gojek ke Kampus",           cat:"transport", account:"gopay", amount:-15000,   type:"expense", tag:"kuliah" },
    { id:newTxId(), date:daysAgo(1),  desc:"Kopi Kenangan",             cat:"nongkrong", account:"gopay", amount:-25000,   type:"expense", tag:"organisasi" },
    { id:newTxId(), date:daysAgo(2),  desc:"Paket Data Telkomsel",      cat:"pulsa",     account:"dana",  amount:-65000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(2),  desc:"Laundry Kiloan",            cat:"kos",       account:"cash",  amount:-20000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(3),  desc:"Print Tugas + Jilid",       cat:"kuliah",    account:"cash",  amount:-12000,   type:"expense", tag:"kuliah" },
    { id:newTxId(), date:daysAgo(3),  desc:"Nasi Padang Sederhana",     cat:"makan",     account:"cash",  amount:-22000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(4),  desc:"Nongkrong di Angkringan",   cat:"nongkrong", account:"cash",  amount:-45000,   type:"expense", tag:"panitia" },
    { id:newTxId(), date:daysAgo(4),  desc:"Beli Skincare",             cat:"belanja",   account:"bca",   amount:-89000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(5),  desc:"Uang Saku Bulanan",         cat:"lainnya",   account:"bca",   amount:2500000,  type:"income",  tag:"pribadi" },
    { id:newTxId(), date:daysAgo(5),  desc:"Beli Beras 5kg",            cat:"makan",     account:"cash",  amount:-65000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(6),  desc:"Grab ke Mall",              cat:"transport", account:"gopay", amount:-22000,   type:"expense", tag:"organisasi" },
    { id:newTxId(), date:daysAgo(6),  desc:"Vitamin & Obat Flu",        cat:"kesehatan", account:"cash",  amount:-35000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(7),  desc:"Ayam Geprek Bensu",         cat:"makan",     account:"gopay", amount:-28000,   type:"expense", tag:"pribadi" },
    { id:newTxId(), date:daysAgo(8),  desc:"Iuran UKM Fotografi",       cat:"kuliah",    account:"gopay", amount:-100000,  type:"expense", tag:"organisasi" },
    { id:newTxId(), date:daysAgo(9),  desc:"Konsumsi Rapat Panitia",    cat:"makan",     account:"cash",  amount:-150000,  type:"expense", tag:"panitia" },
    { id:newTxId(), date:daysAgo(10), desc:"Beli Kertas A4 + Tinta",    cat:"kuliah",    account:"bca",   amount:-55000,   type:"expense", tag:"kuliah" },
  ],
};

/* ---- DERIVED HELPERS ---- */
function getCurrentBalance() {
  return state.startingBalance + state.transactions.reduce((s,t) => s + t.amount, 0);
}

function getSpentByCategory() {
  const map = {};
  CATEGORIES.forEach(c => (map[c.id] = 0));
  state.transactions.forEach(t => {
    if (t.type === "expense") map[t.cat] = (map[t.cat]||0) + Math.abs(t.amount);
  });
  return map;
}

function getTotalSpent() {
  return state.transactions.filter(t => t.type==="expense").reduce((s,t) => s+Math.abs(t.amount), 0);
}

function getTotalIncome() {
  return state.transactions.filter(t => t.type==="income").reduce((s,t) => s+t.amount, 0);
}

function rupiah(n) {
  const sign = n < 0 ? "-" : "";
  return sign + "Rp " + Math.abs(Math.round(n)).toLocaleString("id-ID");
}

function rupiahShort(n) {
  const abs = Math.abs(n);
  if (abs >= 1000000) return (n<0?"-":"") + "Rp " + (abs/1000000).toFixed(abs%1000000===0?0:1) + "jt";
  if (abs >= 1000)    return (n<0?"-":"") + "Rp " + (abs/1000).toFixed(0) + "rb";
  return rupiah(n);
}

let currentPage = "dashboard";

/* ============================================================
   DARK MODE — Toggle switch
============================================================ */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("btn-theme");
  if (btn) btn.setAttribute("aria-checked", theme === "dark" ? "true" : "false");
  localStorage.setItem("sf-theme", theme);
  if (currentPage === "dashboard") renderTrendChart();
  if (currentPage === "insight") { renderIncomeExpenseChart(); renderDonutChart(); }
  if (currentPage === "savings") renderForecastChart();
}

function initTheme() {
  const saved = localStorage.getItem("sf-theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  applyTheme(saved || preferred);
}

document.getElementById("btn-theme").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

document.getElementById("btn-theme").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    document.getElementById("btn-theme").click();
  }
});


/* ============================================================
   NAV DROPDOWN GROUPS
============================================================ */
document.querySelectorAll(".nav-group-toggle").forEach(toggle => {
  toggle.addEventListener("click", () => {
    const group = toggle.closest(".nav-group");
    const isOpen = group.classList.contains("open");
    group.classList.toggle("open", !isOpen);
    toggle.setAttribute("aria-expanded", !isOpen);
  });
});

function autoOpenNavGroup(page) {
  const analitikPages = ["insight", "reports"];
  const keuanganPages = ["savings", "accounts"];
  const gAnalitik = document.getElementById("nav-group-analitik");
  const gKeuangan = document.getElementById("nav-group-keuangan");
  if (gAnalitik) {
    gAnalitik.classList.toggle("open", analitikPages.includes(page));
    gAnalitik.classList.toggle("active", analitikPages.includes(page));
    const t = gAnalitik.querySelector(".nav-group-toggle");
    if (t) t.setAttribute("aria-expanded", analitikPages.includes(page));
  }
  if (gKeuangan) {
    gKeuangan.classList.toggle("open", keuanganPages.includes(page));
    gKeuangan.classList.toggle("active", keuanganPages.includes(page));
    const t = gKeuangan.querySelector(".nav-group-toggle");
    if (t) t.setAttribute("aria-expanded", keuanganPages.includes(page));
  }
}

/* ============================================================
   LOGIN
============================================================ */
document.getElementById("btn-login").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const pass  = document.getElementById("login-password").value.trim();
  const err   = document.getElementById("login-error");
  if (!email || !pass) {
    err.textContent = "Mohon isi email dan kata sandi.";
    err.style.display = "block";
    return;
  }
  err.style.display = "none";
  document.getElementById("screen-login").style.display = "none";
  document.getElementById("screen-app").style.display = "block";
  initApp();
});

["login-email","login-password"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("btn-login").click();
  });
});

document.getElementById("btn-upgrade").addEventListener("click", () => showPage("upgrade"));

/* ============================================================
   SKELETON LOADING — lightweight, non-destructive
============================================================ */
function removeSkeleton(pageId) {
  const page = document.getElementById("page-" + pageId);
  if (!page) return;
  const skeleton = page.querySelector(".skeleton-wrap");
  if (skeleton) skeleton.remove();
}

/* ============================================================
   INIT APP
============================================================ */
let appInitialized = false;

function initApp() {
  if (appInitialized) { showPage("dashboard"); return; }
  appInitialized = true;
  initTheme();
  populateFilterDropdowns();
  buildQuickAddCategoryGrid();
  initScrollIndicator();
  showPage("dashboard");
  initNotifications();
}

/* ============================================================
   NAVIGATION
============================================================ */
const allPages = ["dashboard","transactions","budgets","insight","savings","accounts","reports","upgrade"];

function showPage(page) {
  if (!allPages.includes(page)) return;
  currentPage = page;
  allPages.forEach(p => {
    const el = document.getElementById("page-"+p);
    if (el) el.classList.toggle("hidden", p !== page);
  });
  document.querySelectorAll(".nav-item[data-page]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
  document.querySelectorAll(".mobile-nav-item[data-page]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
  autoOpenNavGroup(page);

  if (page === "dashboard")    renderDashboard();
  if (page === "transactions") renderTransactions();
  if (page === "budgets")      renderBudgets();
  if (page === "insight")      renderInsight();
  if (page === "savings")      renderSavings();
  if (page === "accounts")   { renderAccounts(); startAutoSync(); }
  if (page === "reports")      renderReports();
  if (page === "upgrade")      renderUpgrade();
  if (page !== "accounts")     stopAutoSync();

  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => {
    showPage(btn.dataset.page);
    closeMobileMore();
  });
});

/* ============================================================
   MOBILE NAV — "+" button & "More" sheet
============================================================ */
document.getElementById("mobile-add-btn").addEventListener("click", openQuickAdd);

function openMobileMore() {
  document.getElementById("mobile-more-overlay").classList.add("show");
}

function closeMobileMore() {
  document.getElementById("mobile-more-overlay").classList.remove("show");
}

document.getElementById("mobile-more-btn").addEventListener("click", openMobileMore);
document.getElementById("mobile-more-overlay").addEventListener("click", e => {
  if (e.target.id === "mobile-more-overlay") closeMobileMore();
});

/* ============================================================
   GLOBAL SEARCH — works across all pages
============================================================ */
const globalSearch = document.getElementById("global-search");

globalSearch.addEventListener("input", () => {
  const q = globalSearch.value.trim().toLowerCase();
  if (!q) {
    if (currentPage === "transactions") renderTransactions();
    return;
  }
  if (currentPage !== "transactions") {
    showPage("transactions");
  } else {
    renderTransactions();
  }
});

globalSearch.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const q = globalSearch.value.trim().toLowerCase();
    if (q && currentPage !== "transactions") showPage("transactions");
  }
});

/* ============================================================
   DASHBOARD
============================================================ */
let trendChartInstance = null;

function renderDashboard() {
  const balance   = getCurrentBalance();
  const totalSpent = getTotalSpent();
  const remaining = Math.max(state.monthlyBudgetTotal - totalSpent, 0);
  const pctUsed   = Math.min(Math.round((totalSpent / state.monthlyBudgetTotal) * 100), 100);

  document.getElementById("stat-balance").textContent   = rupiah(balance);
  document.getElementById("stat-remaining").textContent = rupiah(remaining);

  const bar = document.getElementById("stat-remaining-bar");
  bar.style.width = pctUsed + "%";
  bar.className   = "progress-fill" + (pctUsed>=100?" danger":pctUsed>=80?" warn":"");
  document.getElementById("stat-remaining-pct").textContent = pctUsed + "% terpakai";

  const note = document.getElementById("stat-balance-note");
  if (pctUsed >= 100) {
    note.textContent = "Anggaran bulan ini terlampaui";
    note.parentElement.style.color = "var(--danger)";
  } else {
    note.textContent = "Tetap terkendali";
    note.parentElement.style.color = "var(--success)";
  }

  let health, label;
  if      (pctUsed < 60)  { health=88; label="Sangat Baik"; }
  else if (pctUsed < 80)  { health=72; label="Baik"; }
  else if (pctUsed < 100) { health=55; label="Perlu Perhatian"; }
  else                    { health=35; label="Waspada"; }
  document.getElementById("stat-health").textContent      = health;
  document.getElementById("stat-health-label").textContent = label;
  const hc = health>=80?"var(--success)":health>=60?"#E65100":"var(--danger)";
  document.getElementById("stat-health").style.color      = hc;
  document.getElementById("stat-health-label").style.color = hc;

  renderCategoryBreakdown();
  renderRecentTransactions();
  renderTrendChart();
}

function renderCategoryBreakdown() {
  const spent  = getSpentByCategory();
  const total  = Object.values(spent).reduce((a,b)=>a+b,0) || 1;
  const sorted = CATEGORIES
    .map(c => ({...c, amount: spent[c.id]||0}))
    .filter(c => c.amount > 0)
    .sort((a,b) => b.amount-a.amount)
    .slice(0, 6);

  const list = document.getElementById("dash-cat-list");
  list.innerHTML = "";
  if (!sorted.length) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-faint);font-size:13.5px;">Belum ada pengeluaran.</div>';
    return;
  }
  sorted.forEach(c => {
    const pct = Math.round((c.amount/total)*100);
    const row = document.createElement("div");
    row.className = "cat-row";
    row.innerHTML = `
      <div class="cat-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
      <div class="cat-row-main">
        <div class="cat-row-top"><span>${c.name}</span><span class="amt">${rupiahShort(c.amount)}</span></div>
        <div class="cat-bar-wrap">
          <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%;background:${c.color};"></div></div>
          <div class="cat-pct">${pct}%</div>
        </div>
      </div>`;
    list.appendChild(row);
  });
}

function renderRecentTransactions() {
  const list   = document.getElementById("dash-recent-list");
  list.innerHTML = "";
  const recent = [...state.transactions].sort((a,b)=>b.date-a.date).slice(0,5);
  if (!recent.length) {
    list.innerHTML = '<div class="empty-state"><i class="ti ti-receipt-off"></i>Belum ada transaksi.</div>';
    return;
  }
  recent.forEach(t => {
    const c   = getCat(t.cat);
    const acc = ACCOUNTS.find(a => a.id===t.account);
    const row = document.createElement("div");
    row.className = "tx-row";
    row.innerHTML = `
      <div class="tx-left">
        <div class="tx-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
        <div>
          <div class="tx-name">${t.desc}</div>
          <div class="tx-meta">
            ${fmtDate(t.date)} · ${acc?acc.name:t.account}
            ${t.tag ? tagPillHTML(t.tag) : ""}
          </div>
        </div>
      </div>
      <div class="tx-amt ${t.type}">${t.type==="income"?"+":""}${rupiah(t.amount)}</div>`;
    list.appendChild(row);
  });
}

function getChartColors() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  return {
    grid:  dark ? "rgba(255,255,255,0.06)" : "#EAE6F4",
    tick:  dark ? "#ABA9C4" : "#464555",
  };
}

function renderTrendChart() {
  const ctx = document.getElementById("trendChart");
  if (!ctx) return;
  const labels = [], data = [];
  for (let i=6; i>=0; i--) {
    const d = daysAgo(i);
    labels.push(["Min","Sen","Sel","Rab","Kam","Jum","Sab"][d.getDay()]);
    data.push(state.transactions
      .filter(t => t.type==="expense" && t.date.toDateString()===d.toDateString())
      .reduce((s,t) => s+Math.abs(t.amount), 0));
  }
  const {grid, tick} = getChartColors();
  if (trendChartInstance) trendChartInstance.destroy();
  trendChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        data,
        borderColor: "#7B6EFF",
        backgroundColor: "rgba(123,110,255,0.12)",
        borderWidth: 2.5, fill: true, tension: 0.35,
        pointRadius: 3, pointBackgroundColor: "#7B6EFF",
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend:{display:false}, tooltip:{callbacks:{label:ctx=>rupiah(ctx.parsed.y)}} },
      scales: {
        y: { ticks:{callback:v=>rupiahShort(v),font:{size:10},color:tick}, grid:{color:grid} },
        x: { grid:{display:false}, ticks:{font:{size:11},color:tick} },
      },
    },
  });
}

/* ============================================================
   TRANSACTIONS PAGE — with edit/delete
============================================================ */
function populateFilterDropdowns() {
  const catSelect = document.getElementById("filter-category");
  CATEGORIES.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id; opt.textContent = c.name;
    catSelect.appendChild(opt);
  });
  const accSelect = document.getElementById("filter-account");
  ACCOUNTS.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id; opt.textContent = a.name;
    accSelect.appendChild(opt);
  });
}

function getFilteredTransactions() {
  const cat    = document.getElementById("filter-category").value;
  const acc    = document.getElementById("filter-account").value;
  const type   = document.getElementById("filter-type").value;
  const tag    = document.getElementById("filter-tag").value;
  const search = globalSearch.value.trim().toLowerCase();

  return [...state.transactions]
    .sort((a,b) => b.date-a.date)
    .filter(t => {
      if (cat !== "all" && t.cat !== cat) return false;
      if (acc !== "all" && t.account !== acc) return false;
      if (type !== "all" && t.type !== type) return false;
      if (tag !== "all" && t.tag !== tag) return false;
      if (search && !t.desc.toLowerCase().includes(search)) return false;
      return true;
    });
}

function renderTransactions() {
  const tbody = document.getElementById("tx-table-body");
  const mobileList = document.getElementById("tx-mobile-list");
  const empty = document.getElementById("tx-empty");
  const rows  = getFilteredTransactions();
  tbody.innerHTML = "";
  if (mobileList) mobileList.innerHTML = "";

  if (!rows.length) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }

  rows.forEach(t => {
    const c   = getCat(t.cat);
    const acc = ACCOUNTS.find(a => a.id===t.account);

    // Desktop table row
    const tr  = document.createElement("tr");
    tr.innerHTML = `
      <td style="color:var(--text-muted);white-space:nowrap;">${fmtDate(t.date)}</td>
      <td><div class="tx-desc"><span style="width:7px;height:7px;border-radius:9999px;background:${c.color};display:inline-block;flex-shrink:0;"></span>${t.desc}</div></td>
      <td><span class="chip">${c.name}</span></td>
      <td>${t.tag ? tagPillHTML(t.tag) : '<span style="color:var(--text-faint);font-size:12px;">—</span>'}</td>
      <td style="color:var(--text-muted);">${acc?acc.name:t.account}</td>
      <td class="right amt-cell ${t.type}">${t.type==="income"?"+":""}${rupiah(t.amount)}</td>
      <td>
        <div class="tx-actions">
          <button class="tx-action-btn" data-edit="${t.id}" title="Edit" aria-label="Edit transaksi"><i class="ti ti-pencil"></i></button>
          <button class="tx-action-btn delete" data-delete="${t.id}" title="Hapus" aria-label="Hapus transaksi"><i class="ti ti-trash"></i></button>
        </div>
      </td>`;
    tbody.appendChild(tr);

    // Mobile card
    if (mobileList) {
      const card = document.createElement("div");
      card.className = "tx-mobile-card";
      card.innerHTML = `
        <div class="tx-mobile-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
        <div class="tx-mobile-body">
          <div class="tx-mobile-top">
            <div class="tx-mobile-name">${t.desc}</div>
            <div class="tx-mobile-amount ${t.type}">${t.type==="income"?"+":""}${rupiah(t.amount)}</div>
          </div>
          <div class="tx-mobile-meta">
            <span class="tx-mobile-date">${fmtDate(t.date)}</span>
            <span class="chip">${c.name}</span>
            ${t.tag ? tagPillHTML(t.tag) : ""}
          </div>
          <div class="tx-mobile-actions">
            <button class="tx-action-btn" data-edit="${t.id}" aria-label="Edit"><i class="ti ti-pencil"></i></button>
            <button class="tx-action-btn delete" data-delete="${t.id}" aria-label="Hapus"><i class="ti ti-trash"></i></button>
          </div>
        </div>`;
      mobileList.appendChild(card);
    }
  });
}

["filter-category","filter-account","filter-type","filter-tag"].forEach(id => {
  document.getElementById(id).addEventListener("change", renderTransactions);
});

document.getElementById("btn-clear-filters").addEventListener("click", () => {
  ["filter-category","filter-account","filter-type","filter-tag"].forEach(id => {
    document.getElementById(id).value = "all";
  });
  globalSearch.value = "";
  renderTransactions();
});

/* ---- Scroll indicator for table ---- */
function initScrollIndicator() {
  const scrollEl = document.getElementById("tx-table-scroll");
  const wrap = document.getElementById("tx-scroll-wrap");
  if (!scrollEl || !wrap) return;
  scrollEl.addEventListener("scroll", () => {
    const atStart = scrollEl.scrollLeft > 10;
    const atEnd = scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 10;
    wrap.classList.toggle("scrolled-start", atStart);
    wrap.classList.toggle("scrolled-end", atEnd);
  });
}

/* ---- Edit transaction ---- */
let editingTxId = null;

document.addEventListener("click", e => {
  const editBtn = e.target.closest("[data-edit]");
  if (editBtn) {
    const tx = state.transactions.find(t => t.id === editBtn.dataset.edit);
    if (tx) openEditTransaction(tx);
    return;
  }

  const deleteBtn = e.target.closest("[data-delete]");
  if (deleteBtn) {
    openDeleteConfirm(deleteBtn.dataset.delete);
    return;
  }
});

function openEditTransaction(tx) {
  editingTxId = tx.id;
  document.getElementById("modal-overlay").classList.add("show");
  qaRawAmount = String(Math.abs(tx.amount));
  qaAmountInput.value = qaRawAmount;
  document.getElementById("qa-desc").value = tx.desc;

  selectedQACategory = tx.cat;
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("selected", b.dataset.cat === tx.cat);
  });

  selectedQATag = tx.tag || null;
  document.querySelectorAll(".tag-option").forEach(b => {
    b.classList.toggle("selected-tag", b.dataset.tag === tx.tag);
  });

  updateAmountDisplay();

  const eyebrow = document.querySelector(".modal-eyebrow");
  const title = document.querySelector(".modal-title");
  const submitBtn = document.getElementById("qa-submit");
  if (eyebrow) eyebrow.textContent = "Edit Transaksi";
  if (title) title.textContent = "Ubah detail transaksi";
  if (submitBtn) submitBtn.innerHTML = '<i class="ti ti-check"></i>Simpan Perubahan';
}

/* ---- Delete transaction ---- */
let deletingTxId = null;

function openDeleteConfirm(txId) {
  const tx = state.transactions.find(t => t.id === txId);
  if (!tx) return;
  deletingTxId = txId;
  const desc = document.getElementById("confirm-desc");
  if (desc) desc.textContent = `"${tx.desc}" (${rupiah(Math.abs(tx.amount))}) akan dihapus permanen.`;
  document.getElementById("confirm-overlay").classList.add("show");
}

document.getElementById("confirm-cancel").addEventListener("click", () => {
  document.getElementById("confirm-overlay").classList.remove("show");
  deletingTxId = null;
});

document.getElementById("confirm-delete").addEventListener("click", () => {
  if (deletingTxId) {
    state.transactions = state.transactions.filter(t => t.id !== deletingTxId);
    showToast("Transaksi berhasil dihapus", "ti-trash");
    refreshAllPages();
  }
  document.getElementById("confirm-overlay").classList.remove("show");
  deletingTxId = null;
});

document.getElementById("confirm-overlay").addEventListener("click", e => {
  if (e.target.id === "confirm-overlay") {
    document.getElementById("confirm-overlay").classList.remove("show");
    deletingTxId = null;
  }
});

/* ---- CSV Export ---- */
document.getElementById("btn-export").addEventListener("click", () => {
  const rows = getFilteredTransactions();
  if (!rows.length) {
    showToast("Tidak ada transaksi untuk di-export", "ti-alert-circle");
    return;
  }

  const headers = ["Tanggal","Deskripsi","Kategori","Tag","Akun","Tipe","Jumlah"];
  const csvRows = [headers.join(",")];

  rows.forEach(t => {
    const c = getCat(t.cat);
    const acc = ACCOUNTS.find(a => a.id === t.account);
    const tag = t.tag ? getTag(t.tag).label : "";
    csvRows.push([
      fmtDate(t.date),
      '"' + t.desc.replace(/"/g, '""') + '"',
      c.name,
      tag,
      acc ? acc.name : t.account,
      t.type === "expense" ? "Pengeluaran" : "Pemasukan",
      t.amount,
    ].join(","));
  });

  const blob = new Blob(["﻿" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "studentfin-transaksi-" + new Date().toISOString().slice(0,10) + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`${rows.length} transaksi berhasil di-export ke CSV`, "ti-download");
});

/* ============================================================
   BUDGETS — with inline edit
============================================================ */
function renderBudgets() {
  const spent     = getSpentByCategory();
  const totalSpent = getTotalSpent();
  state.monthlyBudgetTotal = Object.values(state.categoryBudgets).reduce((a,b)=>a+b,0);
  const totalAlloc = state.monthlyBudgetTotal;
  const pct       = Math.min(Math.round((totalSpent/totalAlloc)*100), 999);

  document.getElementById("budget-total-alloc").textContent = rupiah(totalAlloc);
  document.getElementById("budget-total-spent").textContent = rupiah(totalSpent);
  const bar = document.getElementById("budget-total-bar");
  bar.style.width = Math.min(pct,100) + "%";
  bar.className   = "progress-fill" + (pct>=100?" danger":pct>=80?" warn":"");
  document.getElementById("budget-total-pct").textContent = pct + "% terpakai";

  const grid = document.getElementById("budget-cards");
  grid.innerHTML = "";

  Object.keys(state.categoryBudgets).forEach(catId => {
    const c       = getCat(catId);
    const budget  = state.categoryBudgets[catId];
    const used    = spent[catId] || 0;
    const usedPct = Math.round((used/budget)*100);
    const isOver  = used > budget;
    const remaining = budget - used;

    const card = document.createElement("div");
    card.className = "budget-card" + (isOver?" over":"");
    card.innerHTML = `
      <div class="budget-top">
        <div class="budget-icon-name">
          <div class="cat-icon" style="width:38px;height:38px;background:${c.bg};color:${c.color};font-size:17px;"><i class="ti ${c.icon}"></i></div>
          <div style="font-weight:600;font-family:'Geist',sans-serif;font-size:13.5px;">${c.name}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          ${isOver?'<div class="budget-overspent-tag"><i class="ti ti-alert-triangle"></i>Lebih</div>':""}
          <button class="budget-edit-btn" data-budget-edit="${catId}" aria-label="Edit anggaran ${c.name}"><i class="ti ti-pencil"></i></button>
        </div>
      </div>
      <div class="budget-figures">
        <div>
          <div class="budget-spent-label">Terpakai</div>
          <div class="budget-spent-amt ${isOver?"over":""}">${rupiah(used)}</div>
        </div>
        <div>
          <div class="budget-of" id="budget-of-${catId}">dari ${rupiah(budget)}</div>
          <div class="budget-left ${isOver?"over":""}">${isOver?rupiah(remaining)+" lebih":rupiah(remaining)+" sisa"}</div>
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill ${isOver?"danger":usedPct>=80?"warn":""}" style="width:${Math.min(usedPct,100)}%;"></div>
      </div>
      <div class="budget-edit-row" id="budget-edit-${catId}" style="display:none;">
        <input class="budget-edit-input" type="text" inputmode="numeric" placeholder="Jumlah anggaran baru" value="${budget}" data-cat="${catId}"/>
        <button class="budget-edit-save" data-budget-save="${catId}">Simpan</button>
      </div>`;
    grid.appendChild(card);
  });
}

document.addEventListener("click", e => {
  const editBtn = e.target.closest("[data-budget-edit]");
  if (editBtn) {
    const catId = editBtn.dataset.budgetEdit;
    const row = document.getElementById("budget-edit-" + catId);
    if (row) {
      const isVisible = row.style.display !== "none";
      row.style.display = isVisible ? "none" : "flex";
      if (!isVisible) row.querySelector("input").focus();
    }
    return;
  }

  const saveBtn = e.target.closest("[data-budget-save]");
  if (saveBtn) {
    const catId = saveBtn.dataset.budgetSave;
    const row = document.getElementById("budget-edit-" + catId);
    const input = row.querySelector("input");
    const val = parseInt(input.value.replace(/[^\d]/g, ""), 10);
    if (!val || val < 10000) {
      showToast("Minimum anggaran Rp 10.000", "ti-alert-circle");
      return;
    }
    state.categoryBudgets[catId] = val;
    showToast("Anggaran " + getCat(catId).name + " diubah ke " + rupiah(val), "ti-circle-check");
    renderBudgets();
    checkBudgetAlerts();
    return;
  }
});

/* ---- Add budget category ---- */
document.getElementById("btn-add-budget").addEventListener("click", () => {
  const select = document.getElementById("add-budget-cat");
  select.innerHTML = "";
  const existing = Object.keys(state.categoryBudgets);
  const available = CATEGORIES.filter(c => !existing.includes(c.id));
  if (!available.length) {
    showToast("Semua kategori sudah memiliki anggaran", "ti-info-circle");
    return;
  }
  available.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id; opt.textContent = c.name;
    select.appendChild(opt);
  });
  document.getElementById("add-budget-amount").value = "";
  document.getElementById("add-budget-overlay").classList.add("show");
});

document.getElementById("add-budget-close").addEventListener("click", () => {
  document.getElementById("add-budget-overlay").classList.remove("show");
});
document.getElementById("add-budget-cancel").addEventListener("click", () => {
  document.getElementById("add-budget-overlay").classList.remove("show");
});
document.getElementById("add-budget-overlay").addEventListener("click", e => {
  if (e.target.id === "add-budget-overlay") document.getElementById("add-budget-overlay").classList.remove("show");
});

document.getElementById("add-budget-save").addEventListener("click", () => {
  const catId = document.getElementById("add-budget-cat").value;
  const raw = document.getElementById("add-budget-amount").value.replace(/[^\d]/g, "");
  const amount = parseInt(raw, 10);
  if (!catId) { showToast("Pilih kategori", "ti-alert-circle"); return; }
  if (!amount || amount < 10000) { showToast("Minimum anggaran Rp 10.000", "ti-alert-circle"); return; }
  state.categoryBudgets[catId] = amount;
  const c = getCat(catId);
  document.getElementById("add-budget-overlay").classList.remove("show");
  showToast("Anggaran " + c.name + " ditambahkan: " + rupiah(amount), "ti-circle-check");
  addNotification("Kategori anggaran baru: <strong>" + c.name + "</strong> (" + rupiah(amount) + ")", "success", "ti-circle-check");
  renderBudgets();
  checkBudgetAlerts();
});

/* ============================================================
   QUICK ADD MODAL — with edit mode support
============================================================ */
let selectedQACategory = null;
let selectedQATag      = null;
let qaRawAmount        = "";

function buildQuickAddCategoryGrid() {
  const grid = document.getElementById("qa-cat-grid");
  grid.innerHTML = "";
  CATEGORIES.forEach(c => {
    const btn = document.createElement("button");
    btn.className   = "cat-btn";
    btn.dataset.cat = c.id;
    btn.type        = "button";
    btn.innerHTML   = `<i class="ti ${c.icon}" style="color:${c.color};"></i><span>${c.name.split(" ")[0]}</span>`;
    btn.addEventListener("click", () => {
      selectedQACategory = c.id;
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
    grid.appendChild(btn);
  });
}

document.querySelectorAll(".tag-option").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedQATag = btn.dataset.tag;
    document.querySelectorAll(".tag-option").forEach(b => b.classList.remove("selected-tag"));
    btn.classList.add("selected-tag");
  });
});

const qaAmountInput  = document.getElementById("qa-amount");
const amountDisplay  = document.getElementById("amount-display");
const amountCursor   = document.getElementById("amount-cursor");

qaAmountInput.addEventListener("input", e => {
  qaRawAmount = e.target.value.replace(/[^\d]/g, "");
  updateAmountDisplay();
});

function updateAmountDisplay() {
  const num = Number(qaRawAmount);
  if (num > 0) {
    amountDisplay.innerHTML = num.toLocaleString("id-ID") + '<span class="modal-amount-cursor" id="amount-cursor"></span>';
  } else {
    amountDisplay.innerHTML = '0<span class="modal-amount-cursor" id="amount-cursor"></span>';
  }
}

qaAmountInput.addEventListener("focus", () => {
  document.getElementById("amount-display-wrap").style.opacity = "1";
});

function openQuickAdd() {
  editingTxId = null;
  document.getElementById("modal-overlay").classList.add("show");
  qaRawAmount = "";
  selectedQACategory = null;
  selectedQATag      = null;
  qaAmountInput.value = "";
  document.getElementById("qa-desc").value = "";
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("selected"));
  document.querySelectorAll(".tag-option").forEach(b => b.classList.remove("selected-tag"));
  updateAmountDisplay();

  const eyebrow = document.querySelector(".modal-eyebrow");
  const title = document.querySelector(".modal-title");
  const submitBtn = document.getElementById("qa-submit");
  if (eyebrow) eyebrow.textContent = "Catat Pengeluaran";
  if (title) title.textContent = "Berapa yang kamu keluarkan?";
  if (submitBtn) submitBtn.innerHTML = '<i class="ti ti-check"></i>Simpan Transaksi';

  setTimeout(() => qaAmountInput.focus(), 80);
}

function closeQuickAdd() {
  document.getElementById("modal-overlay").classList.remove("show");
  editingTxId = null;
}

document.getElementById("btn-quickadd").addEventListener("click", openQuickAdd);
document.getElementById("modal-close").addEventListener("click", closeQuickAdd);
document.getElementById("qa-cancel").addEventListener("click", closeQuickAdd);
document.getElementById("modal-overlay").addEventListener("click", e => {
  if (e.target.id === "modal-overlay") closeQuickAdd();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if (document.getElementById("confirm-overlay").classList.contains("show")) {
      document.getElementById("confirm-overlay").classList.remove("show");
      deletingTxId = null;
    } else if (document.getElementById("modal-overlay").classList.contains("show")) {
      closeQuickAdd();
    }
  }
});

document.getElementById("qa-submit").addEventListener("click", () => {
  const amount = Number(qaRawAmount);
  const desc   = document.getElementById("qa-desc").value.trim();

  if (!amount || amount <= 0) {
    showToast("Masukkan jumlah yang valid", "ti-alert-circle");
    qaAmountInput.focus(); return;
  }
  if (!selectedQACategory) {
    showToast("Pilih kategori terlebih dahulu", "ti-alert-circle"); return;
  }

  const cat      = getCat(selectedQACategory);
  const finalDesc = desc || cat.name;

  if (editingTxId) {
    const tx = state.transactions.find(t => t.id === editingTxId);
    if (tx) {
      tx.desc = finalDesc;
      tx.cat = selectedQACategory;
      tx.amount = tx.type === "income" ? amount : -amount;
      tx.tag = selectedQATag || "pribadi";
      showToast(`Transaksi berhasil diubah`, "ti-circle-check");
    }
  } else {
    state.transactions.push({
      id:      newTxId(),
      date:    new Date(),
      desc:    finalDesc,
      cat:     selectedQACategory,
      account: "gopay",
      amount:  -amount,
      type:    "expense",
      tag:     selectedQATag || "pribadi",
    });
    showToast(`Tersimpan: ${finalDesc} · ${rupiah(amount)}`, "ti-circle-check");
  }

  closeQuickAdd();
  refreshAllPages();
});

["qa-desc"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("qa-submit").click();
  });
});

/* ============================================================
   AUTO-REFRESH — sync all visible pages when data changes
============================================================ */
function refreshAllPages() {
  if (currentPage === "dashboard")    renderDashboard();
  if (currentPage === "transactions") renderTransactions();
  if (currentPage === "budgets")      renderBudgets();
  if (currentPage === "insight")      renderInsight();
  if (currentPage === "savings")      renderSavings();
  if (currentPage === "accounts")     renderAccounts();
  if (currentPage === "reports")      renderReports();
  checkBudgetAlerts();
}

/* ============================================================
   TOAST
============================================================ */
let toastTimeout = null;
function showToast(text, icon="ti-circle-check") {
  const toast = document.getElementById("toast");
  document.getElementById("toast-text").textContent = text;
  toast.querySelector("i").className = "ti " + icon;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ============================================================
   STATIC DATA — other pages
============================================================ */
const ACCOUNTS_DATA = [
  { id:"bca",     name:"Bank Central Asia (BCA)", type:"Rekening •••• 4589", letter:"BCA", bg:"#003d79", balance:8500000,  sync:"Sync 2j lalu",      syncOk:true  },
  { id:"mandiri", name:"Bank Mandiri",             type:"Tabungan •••• 1204", letter:"MDR", bg:"#003366", balance:3500000,  sync:"Sync 5j lalu",      syncOk:true  },
  { id:"gopay",   name:"GoPay",                   type:"E-Wallet",           letter:"GP",  bg:"#00880e", balance:2800000,  sync:"Sync gagal",        syncOk:false },
  { id:"ovo",     name:"OVO",                     type:"E-Wallet",           letter:"OVO", bg:"#4c3494", balance:1800000,  sync:"Sync 1h lalu",      syncOk:true  },
  { id:"cash",    name:"Dompet Tunai",             type:"Akun Manual",        letter:"IDR", bg:"#5F5E5A", balance:1850000,  sync:"Diperbarui manual", syncOk:true  },
];

const SAVINGS_GOALS = [
  { id:"laptop",    name:"Upgrade Laptop",    icon:"ti-device-laptop", color:"#3525CD", bg:"rgba(79,70,229,0.15)",  saved:12500000, target:18000000, status:"on-track", statusText:"Sesuai jadwal — target Januari" },
  { id:"emergency", name:"Dana Darurat",      icon:"ti-shield-check",  color:"#006C49", bg:"rgba(108,248,187,0.2)", saved:4200000,  target:10000000, status:"on-track", statusText:"Proyeksi selesai: Maret 2025" },
  { id:"trip",      name:"Liburan Semarang",  icon:"ti-map-pin",       color:"#684000", bg:"rgba(136,85,0,0.15)",   saved:850000,   target:3500000,  status:"behind",   statusText:"Sedikit di belakang jadwal" },
];

const AI_INSIGHTS = [
  { title:"Pengeluaran Makan Tinggi",  body:"Pengeluaranmu untuk makan naik 15% bulan ini. Pertimbangkan masak sendiri untuk hemat Rp 400rb/bulan.", accent:"var(--danger)" },
  { title:"Hemat Transportasi",        body:"Mantap memanfaatkan shuttle kampus! Biaya transportasi turun Rp 150rb dibanding bulan lalu.",           accent:"var(--success)" },
];

const PREV_REPORTS = [
  { month:"Mei 2025",   spent:3850000, net:1400000,  positive:true  },
  { month:"April 2025", spent:4500000, net:-250000,  positive:false },
  { month:"Maret 2025", spent:3200000, net:1900000,  positive:true  },
];

/* ============================================================
   INSIGHT PAGE
============================================================ */
let incExpChartInst = null, donutChartInst = null;

function renderInsight() {
  renderIncomeExpenseChart();
  renderDonutChart();
  renderHeatmap();
}

function renderIncomeExpenseChart() {
  const ctx = document.getElementById("incomeExpenseChart");
  if (!ctx) return;
  const months   = ["Jan","Feb","Mar","Apr","Mei","Jun"];
  const incomes  = [2500000,2500000,3000000,2500000,2500000,2500000];
  const expenses = [1800000,2100000,2400000,1950000,2200000,getTotalSpent()];
  const {grid, tick} = getChartColors();
  if (incExpChartInst) incExpChartInst.destroy();
  incExpChartInst = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        { label:"Pemasukan",   data:incomes,  borderColor:"#4ADE80", backgroundColor:"rgba(74,222,128,0.1)", borderWidth:2.5, fill:true, tension:0.35, pointRadius:3 },
        { label:"Pengeluaran", data:expenses, borderColor:"#7B6EFF", backgroundColor:"rgba(123,110,255,0.1)", borderWidth:2.5, fill:true, tension:0.35, pointRadius:3 },
      ],
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.dataset.label+": "+rupiah(c.parsed.y)}}},
      scales:{
        y:{ticks:{callback:v=>rupiahShort(v),font:{size:10},color:tick},grid:{color:grid}},
        x:{grid:{display:false},ticks:{font:{size:11},color:tick}},
      },
    },
  });
}

function renderDonutChart() {
  const ctx = document.getElementById("donutChart");
  if (!ctx) return;
  const spent = getSpentByCategory();
  const data  = CATEGORIES.filter(c => spent[c.id]>0).map(c => ({name:c.name, val:spent[c.id], color:c.color}));
  const total = data.reduce((s,d) => s+d.val, 0);
  document.getElementById("donut-center").textContent = rupiahShort(total);
  if (donutChartInst) donutChartInst.destroy();
  donutChartInst = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map(d=>d.name),
      datasets: [{data:data.map(d=>d.val), backgroundColor:data.map(d=>d.color), borderWidth:0, hoverOffset:4}],
    },
    options: {
      responsive:true, maintainAspectRatio:false, cutout:"65%",
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.label+": "+rupiah(c.parsed)}}},
    },
  });
  const legend = document.getElementById("donut-legend");
  legend.innerHTML = "";
  data.slice(0,4).forEach(d => {
    const pct = Math.round((d.val/total)*100);
    const row = document.createElement("div");
    row.style.cssText = "display:flex;align-items:center;gap:7px;font-size:12px;";
    row.innerHTML = `<div style="width:9px;height:9px;border-radius:9999px;background:${d.color};flex-shrink:0;"></div><div style="flex:1;color:var(--text);font-family:'Geist',sans-serif;font-weight:700;">${d.name}</div><div style="color:var(--text-muted);">${pct}%</div>`;
    legend.appendChild(row);
  });
}

function renderHeatmap() {
  const grid = document.getElementById("heatmap-grid");
  if (!grid) return;
  const times = ["Pagi (6-12)","Siang (12-14)","Sore (14-18)","Malam (18-21)","Larut (21-00)","Dini (00-6)"];
  const days  = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
  const data  = [
    [1,3,1,2,0,0],[2,2,1,1,0,0],[1,3,2,2,0,0],
    [1,2,1,3,1,0],[2,3,2,4,3,1],[1,4,3,4,4,2],[1,3,3,3,2,1],
  ];
  grid.innerHTML = "";
  grid.appendChild(document.createElement("div"));
  days.forEach(d => {
    const h = document.createElement("div");
    h.className = "heatmap-col-header"; h.textContent = d;
    grid.appendChild(h);
  });
  times.forEach((t,ti) => {
    const lbl = document.createElement("div");
    lbl.className = "heatmap-label"; lbl.textContent = t;
    grid.appendChild(lbl);
    days.forEach((_,di) => {
      const cell = document.createElement("div");
      cell.className = "hm-cell hm-" + data[di][ti];
      grid.appendChild(cell);
    });
  });
}

/* ============================================================
   SAVINGS GOALS
============================================================ */
let forecastChartInst = null;

function renderSavings() {
  const list = document.getElementById("goals-list");
  list.innerHTML = "";
  let totalLocked = 0;
  SAVINGS_GOALS.forEach(g => {
    totalLocked += g.saved;
    const pct           = Math.round((g.saved/g.target)*100);
    const progressColor = g.status==="on-track" ? (pct>=50?"var(--success)":"var(--primary)") : "var(--danger)";
    const statusIcon    = g.status==="on-track" ? "ti-trending-up" : "ti-alert-triangle";
    const statusColor   = g.status==="on-track" ? "var(--success)" : "var(--danger)";
    const pctColor      = g.status==="on-track" ? (pct>=50?"var(--success)":"var(--primary)") : "var(--danger)";

    const card = document.createElement("div");
    card.className = "goal-card";
    card.innerHTML = `
      <div style="position:absolute;width:100px;height:100px;right:0;top:0;background:${g.bg};border-bottom-left-radius:9999px;pointer-events:none;"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div class="goal-icon" style="background:${g.bg};color:${g.color};"><i class="ti ${g.icon}"></i></div>
          <div>
            <div class="goal-name">${g.name}</div>
            <div class="goal-status" style="color:${statusColor};"><i class="ti ${statusIcon}" style="font-size:11px;"></i>${g.statusText}</div>
          </div>
        </div>
        <button style="color:var(--text-faint);font-size:17px;" aria-label="Opsi target" onclick="showToast('Edit target belum tersedia','ti-info-circle')"><i class="ti ti-dots-vertical"></i></button>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:7px;">
          <div>
            <span style="font-size:15px;font-weight:700;color:var(--text-muted);">Rp</span>
            <span style="font-size:24px;font-weight:700;">${(g.saved/1000000).toFixed(1).replace(".",",")}jt</span>
          </div>
          <div style="font-size:13px;color:var(--text-muted);">dari ${rupiah(g.target)}</div>
        </div>
        <div class="goal-progress-bar"><div class="goal-progress-fill" style="width:${pct}%;background:${progressColor};"></div></div>
        <div class="goal-pct-row"><span style="color:${pctColor};">${pct}% Selesai</span><span style="color:var(--text-muted);">${rupiahShort(g.target-g.saved)} tersisa</span></div>
      </div>`;
    list.appendChild(card);
  });
  document.getElementById("total-locked").textContent = rupiah(totalLocked);
  renderForecastChart();
}

function renderForecastChart() {
  const ctx = document.getElementById("forecastChart");
  if (!ctx) return;
  const {grid, tick} = getChartColors();
  const months    = ["Sep","Okt","Nov","Des","Jan"];
  const actual    = [10000000,12000000,13500000,null,null];
  const projected = [null,null,13500000,16000000,18000000];
  if (forecastChartInst) forecastChartInst.destroy();
  forecastChartInst = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        { label:"Aktual",   data:actual,    borderColor:"var(--success)", borderWidth:2.5, pointRadius:[3,3,4,0,0], tension:0.3, spanGaps:false },
        { label:"Proyeksi", data:projected, borderColor:"var(--text-faint)", borderWidth:2, borderDash:[5,4], pointRadius:[0,0,4,3,3], tension:0.3, spanGaps:false },
      ],
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>c.dataset.label+": "+rupiah(c.parsed.y)}}},
      scales:{
        y:{ticks:{callback:v=>rupiahShort(v),font:{size:10},color:tick},grid:{color:grid}},
        x:{grid:{display:false},ticks:{font:{size:11},color:tick}},
      },
    },
  });
}

document.getElementById("btn-add-goal").addEventListener("click", () => {
  showToast("Fitur tambah target belum tersedia", "ti-info-circle");
});

/* ============================================================
   ACCOUNTS — with auto-sync
============================================================ */
function renderAccounts() {
  const totalBal = ACCOUNTS_DATA.reduce((s,a) => s+a.balance, 0);
  document.getElementById("acc-total").textContent = rupiah(totalBal);
  const container = document.getElementById("acc-rows");
  container.innerHTML = "";
  ACCOUNTS_DATA.forEach(a => {
    const row = document.createElement("div");
    row.className = "acc-row";
    row.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;">
        <div class="acc-logo" style="background:${a.bg};">${a.letter}</div>
        <div>
          <div class="acc-name">${a.name}</div>
          <div class="acc-type">${a.type}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="acc-balance">${rupiah(a.balance)}</div>
        <div class="acc-sync ${a.syncOk?"":"fail"}">
          ${a.syncOk?'<span class="sync-status-live"><i class="ti ti-circle-check"></i></span>':''}<span class="acc-sync-text">${a.sync}</span>
        </div>
      </div>`;
    container.appendChild(row);
  });
}

/* ============================================================
   REPORTS
============================================================ */
function renderReports() {
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  const now    = new Date();
  document.getElementById("report-title").textContent = `Ringkasan ${months[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById("report-spent").textContent  = rupiah(getTotalSpent());
  document.getElementById("report-income").textContent = rupiah(getTotalIncome());

  const spent  = getSpentByCategory();
  const total  = getTotalSpent() || 1;
  const sorted = CATEGORIES.map(c=>({...c,amount:spent[c.id]||0})).filter(c=>c.amount>0).sort((a,b)=>b.amount-a.amount).slice(0,5);
  const catList = document.getElementById("report-cat-list");
  catList.innerHTML = "";
  sorted.forEach(c => {
    const pct = Math.round((c.amount/total)*100);
    const row = document.createElement("div");
    row.className = "spending-summary-row";
    row.innerHTML = `
      <div class="ss-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
      <div class="ss-main">
        <div class="ss-top"><span>${c.name}</span><span style="font-weight:700;">${rupiah(c.amount)}</span></div>
        <div class="ss-bar-wrap">
          <div class="ss-bar"><div class="ss-bar-fill" style="width:${pct}%;background:${c.color};"></div></div>
          <div class="ss-pct">${pct}%</div>
        </div>
      </div>`;
    catList.appendChild(row);
  });

  const aiList = document.getElementById("ai-insights-list");
  aiList.innerHTML = "";
  AI_INSIGHTS.forEach(ins => {
    const item = document.createElement("div");
    item.className = "ai-insight-item";
    item.innerHTML = `
      <div class="ai-accent" style="background:${ins.accent};"></div>
      <div style="padding-left:12px;">
        <div style="font-family:'Geist',sans-serif;font-size:13.5px;font-weight:700;margin-bottom:3px;">${ins.title}</div>
        <div style="font-size:13px;color:var(--text-muted);line-height:1.55;">${ins.body}</div>
      </div>`;
    aiList.appendChild(item);
  });

  const tbody = document.getElementById("prev-reports-body");
  tbody.innerHTML = "";
  PREV_REPORTS.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:34px;height:34px;background:${r.positive?"var(--primary-tint)":"var(--chip-bg)"};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${r.positive?"var(--primary)":"var(--text-muted)"};">
            <i class="ti ti-file-text" style="font-size:15px;"></i>
          </div>
          <div>
            <div style="font-family:'Geist',sans-serif;font-size:13.5px;font-weight:600;">${r.month}</div>
            <div style="font-size:11.5px;color:var(--text-faint);">Dibuat awal bulan</div>
          </div>
        </div>
      </td>
      <td style="color:var(--text-muted);">${rupiah(r.spent)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:4px;font-family:'Geist',sans-serif;font-size:12px;font-weight:700;color:${r.positive?"var(--success)":"var(--danger)"};">
          <i class="ti ${r.positive?"ti-trending-up":"ti-trending-down"}" style="font-size:13px;"></i>
          ${r.positive?"+":""}${rupiah(r.net)}
        </div>
      </td>
      <td style="text-align:right;">
        <button style="font-size:17px;color:var(--text-faint);" aria-label="Download laporan ${r.month}" onclick="showToast('Download PDF ${r.month}','ti-download')"><i class="ti ti-download"></i></button>
      </td>`;
    tbody.appendChild(tr);
  });
}

/* ============================================================
   UPGRADE
============================================================ */
let billingMode = "monthly";

function renderUpgrade() {
  document.querySelectorAll(".billing-opt").forEach(opt => {
    opt.classList.toggle("active", opt.dataset.billing === billingMode);
  });
  const proPrice = billingMode === "yearly" ? 23200 : 29000;
  const hhPrice  = billingMode === "yearly" ? 47200 : 59000;
  const fmt = n => "Rp " + n.toLocaleString("id-ID");
  document.getElementById("pro-price").textContent       = fmt(proPrice);
  document.getElementById("household-price").textContent = fmt(hhPrice);
}

document.getElementById("billing-toggle").addEventListener("click", e => {
  const opt = e.target.closest("[data-billing]");
  if (!opt) return;
  billingMode = opt.dataset.billing;
  renderUpgrade();
});

/* ============================================================
   AUTO-SYNC — Accounts page
============================================================ */
let autoSyncInterval = null;
let syncTimestampInterval = null;
let lastSyncTime = Date.now();

function startAutoSync() {
  if (autoSyncInterval) return;
  lastSyncTime = Date.now();
  updateAllSyncTimestamps();

  autoSyncInterval = setInterval(() => {
    performSync(true);
  }, 30000);

  syncTimestampInterval = setInterval(() => {
    updateAllSyncTimestamps();
    refreshSyncDisplay();
  }, 5000);
}

function stopAutoSync() {
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
    autoSyncInterval = null;
  }
  if (syncTimestampInterval) {
    clearInterval(syncTimestampInterval);
    syncTimestampInterval = null;
  }
}

const SYNC_TX_POOL = [
  { desc:"Transfer masuk dari Shopee",    cat:"lainnya",   type:"income",  min:50000,  max:350000  },
  { desc:"Cashback GoPay",                cat:"lainnya",   type:"income",  min:5000,   max:25000   },
  { desc:"Top-up OVO dari BCA",           cat:"lainnya",   type:"expense", min:50000,  max:200000  },
  { desc:"Pembayaran QRIS Warteg",        cat:"makan",     type:"expense", min:12000,  max:30000   },
  { desc:"Auto-debit Spotify",            cat:"pulsa",     type:"expense", min:54990,  max:54990   },
  { desc:"Transfer dari orang tua",       cat:"lainnya",   type:"income",  min:500000, max:1500000 },
  { desc:"Bayar parkir kampus",           cat:"transport", type:"expense", min:2000,   max:5000    },
  { desc:"Beli snack Indomaret",          cat:"makan",     type:"expense", min:10000,  max:45000   },
  { desc:"Refund belanja online",         cat:"belanja",   type:"income",  min:30000,  max:150000  },
  { desc:"Iuran Wi-Fi kos",              cat:"pulsa",     type:"expense", min:50000,  max:100000  },
  { desc:"Jual buku bekas",              cat:"lainnya",   type:"income",  min:25000,  max:80000   },
  { desc:"Bayar laundry express",         cat:"kos",       type:"expense", min:15000,  max:35000   },
];

function generateSyncTransaction() {
  const template = SYNC_TX_POOL[Math.floor(Math.random() * SYNC_TX_POOL.length)];
  const amount = Math.round((template.min + Math.random() * (template.max - template.min)) / 1000) * 1000;
  const accountIds = ["gopay","bca","dana","cash"];
  const tagIds = ["pribadi","organisasi","kuliah","lainnya"];

  return {
    id:      newTxId(),
    date:    new Date(),
    desc:    template.desc,
    cat:     template.cat,
    account: accountIds[Math.floor(Math.random() * accountIds.length)],
    amount:  template.type === "income" ? amount : -amount,
    type:    template.type,
    tag:     tagIds[Math.floor(Math.random() * tagIds.length)],
  };
}

function performSync(silent) {
  lastSyncTime = Date.now();

  ACCOUNTS_DATA.forEach(a => {
    if (a.id !== "cash") {
      const delta = Math.round((Math.random() - 0.35) * 80000);
      a.balance = Math.max(100000, a.balance + delta);
    }
    a.syncOk = true;
  });

  if (!silent) {
    const newTx = generateSyncTransaction();
    state.transactions.push(newTx);
    refreshAllPages();
  }

  updateAllSyncTimestamps();

  const icon = document.getElementById("sync-icon");
  if (icon) {
    icon.style.animation = "spin .8s ease";
    icon.addEventListener("animationend", () => { icon.style.animation = ""; }, { once: true });
  }

  renderAccounts();

  document.querySelectorAll(".acc-balance").forEach(el => {
    el.classList.add("acc-balance-updating");
    el.addEventListener("animationend", () => el.classList.remove("acc-balance-updating"), { once: true });
  });

  if (!silent) {
    const tx = state.transactions[state.transactions.length - 1];
    const label = tx.type === "income" ? "+" + rupiah(tx.amount) : rupiah(tx.amount);
    showToast(`Sync selesai — "${tx.desc}" (${label})`, "ti-cloud-check");
  }
}

function updateAllSyncTimestamps() {
  const elapsed = Math.round((Date.now() - lastSyncTime) / 1000);
  ACCOUNTS_DATA.forEach(a => {
    if (a.id === "cash") {
      a.sync = "Diperbarui otomatis";
    } else if (elapsed < 5) {
      a.sync = "Baru saja";
    } else if (elapsed < 60) {
      a.sync = elapsed + " detik lalu";
    } else if (elapsed < 3600) {
      a.sync = Math.floor(elapsed / 60) + " menit lalu";
    } else {
      a.sync = Math.floor(elapsed / 3600) + " jam lalu";
    }
  });
}

function refreshSyncDisplay() {
  const rows = document.querySelectorAll(".acc-sync-text");
  ACCOUNTS_DATA.forEach((a, i) => {
    if (rows[i]) rows[i].textContent = a.sync;
  });
}

document.addEventListener("click", e => {
  if (e.target.closest("#btn-sync-all")) {
    performSync(false);
  }
});

/* ============================================================
   NOTIFICATION SYSTEM
============================================================ */
const notifications = [];

function addNotification(text, type, icon) {
  notifications.unshift({
    id: Date.now(),
    text: text,
    type: type || "info",
    icon: icon || "ti-info-circle",
    time: new Date(),
    read: false,
  });
  if (notifications.length > 20) notifications.pop();
  updateNotifBadge();
  renderNotifPanel();
}

function updateNotifBadge() {
  const dot = document.getElementById("notif-dot");
  const unread = notifications.filter(n => !n.read).length;
  if (dot) dot.style.display = unread > 0 ? "" : "none";
}

function renderNotifPanel() {
  const list = document.getElementById("notif-list");
  if (!list) return;
  if (!notifications.length) {
    list.innerHTML = '<div class="notif-empty"><i class="ti ti-bell-off"></i>Belum ada notifikasi</div>';
    return;
  }
  list.innerHTML = "";
  notifications.forEach(n => {
    const ago = getTimeAgo(n.time);
    const item = document.createElement("div");
    item.className = "notif-item" + (n.read ? "" : " unread");
    item.innerHTML = `
      <div class="notif-icon ${n.type}"><i class="ti ${n.icon}"></i></div>
      <div class="notif-body">
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${ago}</div>
      </div>`;
    list.appendChild(item);
  });
}

function getTimeAgo(date) {
  const s = Math.round((Date.now() - date.getTime()) / 1000);
  if (s < 10) return "Baru saja";
  if (s < 60) return s + " detik lalu";
  if (s < 3600) return Math.floor(s/60) + " menit lalu";
  if (s < 86400) return Math.floor(s/3600) + " jam lalu";
  return Math.floor(s/86400) + " hari lalu";
}

document.getElementById("btn-notif").addEventListener("click", e => {
  e.stopPropagation();
  const panel = document.getElementById("notif-panel");
  panel.classList.toggle("show");
  renderNotifPanel();
});

document.getElementById("notif-clear").addEventListener("click", () => {
  notifications.forEach(n => n.read = true);
  updateNotifBadge();
  renderNotifPanel();
});

document.addEventListener("click", e => {
  const panel = document.getElementById("notif-panel");
  if (panel.classList.contains("show") && !e.target.closest("#notif-panel") && !e.target.closest("#btn-notif")) {
    panel.classList.remove("show");
  }
});

/* ============================================================
   BUDGET ALERTS — check after each data change
============================================================ */
const alertedCategories = new Set();

function checkBudgetAlerts() {
  const spent = getSpentByCategory();
  Object.keys(state.categoryBudgets).forEach(catId => {
    const budget = state.categoryBudgets[catId];
    const used = spent[catId] || 0;
    const pct = Math.round((used/budget)*100);
    const c = getCat(catId);

    if (pct >= 100 && !alertedCategories.has(catId + "-over")) {
      alertedCategories.add(catId + "-over");
      addNotification(
        `<strong>${c.name}</strong> melebihi anggaran! Terpakai ${rupiah(used)} dari ${rupiah(budget)} (${pct}%)`,
        "warn", "ti-alert-triangle"
      );
    } else if (pct >= 80 && pct < 100 && !alertedCategories.has(catId + "-warn")) {
      alertedCategories.add(catId + "-warn");
      addNotification(
        `<strong>${c.name}</strong> hampir habis — ${pct}% terpakai (${rupiah(used)} dari ${rupiah(budget)})`,
        "warn", "ti-alert-circle"
      );
    }
  });

  const totalSpent = getTotalSpent();
  const totalPct = Math.round((totalSpent/state.monthlyBudgetTotal)*100);
  if (totalPct >= 100 && !alertedCategories.has("total-over")) {
    alertedCategories.add("total-over");
    addNotification(
      `<strong>Total anggaran bulan ini terlampaui!</strong> Pengeluaran ${rupiah(totalSpent)} dari ${rupiah(state.monthlyBudgetTotal)}`,
      "warn", "ti-urgent"
    );
  } else if (totalPct >= 80 && totalPct < 100 && !alertedCategories.has("total-warn")) {
    alertedCategories.add("total-warn");
    addNotification(
      `Total anggaran sudah <strong>${totalPct}%</strong> terpakai. Sisa ${rupiah(state.monthlyBudgetTotal - totalSpent)}`,
      "info", "ti-info-circle"
    );
  }
}


// Initial alerts on first load
function initNotifications() {
  addNotification("Selamat datang kembali! Ini ringkasan keuanganmu hari ini.", "info", "ti-hand-wave");
  checkBudgetAlerts();
}

