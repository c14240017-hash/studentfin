/* ============================================================
   StudentFin Prototype — State & Logic
   Data disimpan in-memory (state object). Tidak ada backend nyata,
   tapi semua kalkulasi (saldo, budget, chart) dihitung ulang secara live.
   ============================================================ */

const CATEGORIES = [
  {
    id: "makan",
    name: "Makan & Minum",
    icon: "ti-soup",
    color: "#3525CD",
    bg: "#E2DFFF",
  },
  {
    id: "kos",
    name: "Kos & Laundry",
    icon: "ti-bed",
    color: "#006C49",
    bg: "#E1F0E9",
  },
  {
    id: "transport",
    name: "Transportasi",
    icon: "ti-scooter",
    color: "#0C447C",
    bg: "#E6F1FB",
  },
  {
    id: "nongkrong",
    name: "Nongkrong",
    icon: "ti-coffee",
    color: "#993C1D",
    bg: "#FAECE7",
  },
  {
    id: "pulsa",
    name: "Pulsa & Internet",
    icon: "ti-wifi",
    color: "#654FA0",
    bg: "#F0ECF9",
  },
  {
    id: "belanja",
    name: "Belanja",
    icon: "ti-shopping-bag",
    color: "#E65100",
    bg: "#FFF3E0",
  },
  {
    id: "kuliah",
    name: "Kuliah & Tugas",
    icon: "ti-school",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    id: "kesehatan",
    name: "Kesehatan",
    icon: "ti-first-aid-kit",
    color: "#993556",
    bg: "#FBEAF0",
  },
  {
    id: "lainnya",
    name: "Lainnya",
    icon: "ti-dots",
    color: "#5F5E5A",
    bg: "#F1EFE8",
  },
];

function getCat(id) {
  return (
    CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
  );
}

const ACCOUNTS = [
  { id: "gopay", name: "GoPay" },
  { id: "bca", name: "BCA Mobile" },
  { id: "cash", name: "Tunai" },
  { id: "dana", name: "DANA" },
];

const today = new Date();
function daysAgo(n) {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
}
function fmtDate(d) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

let txIdCounter = 100;
function newTxId() {
  return "tx" + ++txIdCounter;
}

const state = {
  monthlyBudgetTotal:
    1500000 + 800000 + 600000 + 500000 + 200000 + 400000 + 300000 + 150000, // sum of category budgets
  categoryBudgets: {
    makan: 1500000,
    kos: 800000,
    transport: 600000,
    nongkrong: 500000,
    pulsa: 200000,
    belanja: 400000,
    kuliah: 300000,
    kesehatan: 150000,
  },
  startingBalance: 4250000,
  transactions: [
    {
      id: newTxId(),
      date: daysAgo(0),
      desc: "Indomie Geprek Kak Rina",
      cat: "makan",
      account: "gopay",
      amount: -18000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(0),
      desc: "Bayar Kos Bulanan",
      cat: "kos",
      account: "bca",
      amount: -650000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(1),
      desc: "Gojek ke Kampus",
      cat: "transport",
      account: "gopay",
      amount: -15000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(1),
      desc: "Kopi Kenangan",
      cat: "nongkrong",
      account: "gopay",
      amount: -25000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(2),
      desc: "Paket Data Telkomsel",
      cat: "pulsa",
      account: "dana",
      amount: -65000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(2),
      desc: "Laundry Kiloan",
      cat: "kos",
      account: "cash",
      amount: -20000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(3),
      desc: "Print Tugas + Jilid",
      cat: "kuliah",
      account: "cash",
      amount: -12000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(3),
      desc: "Nasi Padang Sederhana",
      cat: "makan",
      account: "cash",
      amount: -22000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(4),
      desc: "Nongkrong di Angkringan",
      cat: "nongkrong",
      account: "cash",
      amount: -45000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(4),
      desc: "Beli Skincare",
      cat: "belanja",
      account: "bca",
      amount: -89000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(5),
      desc: "Uang Saku Bulanan",
      cat: "lainnya",
      account: "bca",
      amount: 2500000,
      type: "income",
    },
    {
      id: newTxId(),
      date: daysAgo(5),
      desc: "Beli Beras 5kg",
      cat: "makan",
      account: "cash",
      amount: -65000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(6),
      desc: "Grab ke Mall",
      cat: "transport",
      account: "gopay",
      amount: -22000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(6),
      desc: "Vitamin & Obat Flu",
      cat: "kesehatan",
      account: "cash",
      amount: -35000,
      type: "expense",
    },
    {
      id: newTxId(),
      date: daysAgo(7),
      desc: "Ayam Geprek Bensu",
      cat: "makan",
      account: "gopay",
      amount: -28000,
      type: "expense",
    },
  ],
};

/* ---------- derived helpers ---------- */
function getCurrentBalance() {
  const net = state.transactions.reduce((sum, t) => sum + t.amount, 0);
  return state.startingBalance + net;
}
function getSpentByCategory() {
  const map = {};
  CATEGORIES.forEach((c) => (map[c.id] = 0));
  state.transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount);
    }
  });
  return map;
}
function getTotalSpent() {
  return state.transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Math.abs(t.amount), 0);
}
function getTotalIncome() {
  return state.transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
}
function rupiah(n) {
  const sign = n < 0 ? "-" : "";
  return sign + "Rp " + Math.abs(Math.round(n)).toLocaleString("id-ID");
}
function rupiahShort(n) {
  const abs = Math.abs(n);
  if (abs >= 1000000)
    return (
      (n < 0 ? "-" : "") +
      "Rp " +
      (abs / 1000000).toFixed(abs % 1000000 === 0 ? 0 : 1) +
      "jt"
    );
  if (abs >= 1000)
    return (n < 0 ? "-" : "") + "Rp " + (abs / 1000).toFixed(0) + "rb";
  return rupiah(n);
}

/* navigation wired below after all pages defined */
let currentPage = "dashboard";

function _showPageLegacy(page) {
  // stub — real showPage defined after page logic
}

/* ============================================================
   LOGIN
   ============================================================ */
document.getElementById("btn-login").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-password").value.trim();
  const err = document.getElementById("login-error");
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

/* allow Enter key to submit login */
["login-email", "login-password"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("btn-login").click();
  });
});

document.getElementById("btn-upgrade").addEventListener("click", () => {
  showPage("upgrade");
});

/* ============================================================
   INIT APP (called once after login)
   ============================================================ */
let appInitialized = false;
function initApp() {
  if (appInitialized) {
    showPage("dashboard");
    return;
  }
  appInitialized = true;
  populateFilterDropdowns();
  buildQuickAddCategoryGrid();
  showPage("dashboard");
}

/* ============================================================
   DASHBOARD
   ============================================================ */
let trendChartInstance = null;

function renderDashboard() {
  const balance = getCurrentBalance();
  const totalSpent = getTotalSpent();
  const remaining = Math.max(state.monthlyBudgetTotal - totalSpent, 0);
  const pctUsed = Math.min(
    Math.round((totalSpent / state.monthlyBudgetTotal) * 100),
    100,
  );

  document.getElementById("stat-balance").textContent = rupiah(balance);
  document.getElementById("stat-remaining").textContent = rupiah(remaining);
  document.getElementById("stat-remaining-bar").style.width = pctUsed + "%";
  document.getElementById("stat-remaining-bar").className =
    "progress-fill" +
    (pctUsed >= 100 ? " danger" : pctUsed >= 80 ? " warn" : "");
  document.getElementById("stat-remaining-pct").textContent =
    pctUsed + "% terpakai";

  const note = document.getElementById("stat-balance-note");
  if (pctUsed >= 100) {
    note.textContent = "Anggaran bulan ini terlampaui";
    note.parentElement.style.color = "var(--danger)";
  } else {
    note.textContent = "Tetap terkendali";
    note.parentElement.style.color = "var(--success)";
  }

  // health score: simple heuristic based on % budget used
  let health, label;
  if (pctUsed < 60) {
    health = 88;
    label = "Sangat Baik";
  } else if (pctUsed < 80) {
    health = 72;
    label = "Baik";
  } else if (pctUsed < 100) {
    health = 55;
    label = "Perlu Perhatian";
  } else {
    health = 35;
    label = "Waspada";
  }
  document.getElementById("stat-health").textContent = health;
  document.getElementById("stat-health-label").textContent = label;
  const healthColor =
    health >= 80
      ? "var(--success)"
      : health >= 60
        ? "#E65100"
        : "var(--danger)";
  document.getElementById("stat-health").style.color = healthColor;
  document.getElementById("stat-health-label").style.color = healthColor;

  renderCategoryBreakdown();
  renderRecentTransactions();
  renderTrendChart();
}

function renderCategoryBreakdown() {
  const spent = getSpentByCategory();
  const total = Object.values(spent).reduce((a, b) => a + b, 0) || 1;
  const sorted = CATEGORIES.map((c) => ({ ...c, amount: spent[c.id] || 0 }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6);

  const list = document.getElementById("dash-cat-list");
  list.innerHTML = "";
  if (sorted.length === 0) {
    list.innerHTML =
      '<div style="padding:24px;text-align:center;color:var(--text-faint);font-size:14px;">Belum ada pengeluaran tercatat.</div>';
    return;
  }
  sorted.forEach((c) => {
    const pct = Math.round((c.amount / total) * 100);
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
      </div>
    `;
    list.appendChild(row);
  });
}

function renderRecentTransactions() {
  const list = document.getElementById("dash-recent-list");
  list.innerHTML = "";
  const recent = [...state.transactions]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);
  if (recent.length === 0) {
    list.innerHTML =
      '<div class="empty-state"><i class="ti ti-receipt-off"></i>Belum ada transaksi.</div>';
    return;
  }
  recent.forEach((t) => {
    const c = getCat(t.cat);
    const row = document.createElement("div");
    row.className = "tx-row";
    row.innerHTML = `
      <div class="tx-left">
        <div class="tx-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
        <div>
          <div class="tx-name">${t.desc}</div>
          <div class="tx-meta">${fmtDate(t.date)} · ${ACCOUNTS.find((a) => a.id === t.account)?.name || t.account}</div>
        </div>
      </div>
      <div class="tx-amt ${t.type}">${t.type === "income" ? "+" : ""}${rupiah(t.amount)}</div>
    `;
    list.appendChild(row);
  });
}

function renderTrendChart() {
  const ctx = document.getElementById("trendChart");
  if (!ctx) return;
  // build last 7 days expense totals
  const labels = [];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const d = daysAgo(i);
    const dayKey = d.toDateString();
    labels.push(["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"][d.getDay()]);
    const total = state.transactions
      .filter((t) => t.type === "expense" && t.date.toDateString() === dayKey)
      .reduce((s, t) => s + Math.abs(t.amount), 0);
    data.push(total);
  }
  if (trendChartInstance) {
    trendChartInstance.destroy();
  }
  trendChartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: "#4F46E5",
          backgroundColor: "rgba(79,70,229,0.12)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointBackgroundColor: "#4F46E5",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (ctx) => rupiah(ctx.parsed.y) },
        },
      },
      scales: {
        y: {
          ticks: { callback: (v) => rupiahShort(v), font: { size: 10 } },
          grid: { color: "#EAE6F4" },
        },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

/* ============================================================
   TRANSACTIONS PAGE
   ============================================================ */
function populateFilterDropdowns() {
  const catSelect = document.getElementById("filter-category");
  CATEGORIES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    catSelect.appendChild(opt);
  });
  const accSelect = document.getElementById("filter-account");
  ACCOUNTS.forEach((a) => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.name;
    accSelect.appendChild(opt);
  });
}

function getFilteredTransactions() {
  const cat = document.getElementById("filter-category").value;
  const acc = document.getElementById("filter-account").value;
  const type = document.getElementById("filter-type").value;
  const search = document
    .getElementById("global-search")
    .value.trim()
    .toLowerCase();

  return [...state.transactions]
    .sort((a, b) => b.date - a.date)
    .filter((t) => {
      if (cat !== "all" && t.cat !== cat) return false;
      if (acc !== "all" && t.account !== acc) return false;
      if (type !== "all" && t.type !== type) return false;
      if (search && !t.desc.toLowerCase().includes(search)) return false;
      return true;
    });
}

function renderTransactions() {
  const tbody = document.getElementById("tx-table-body");
  const empty = document.getElementById("tx-empty");
  const rows = getFilteredTransactions();
  tbody.innerHTML = "";

  if (rows.length === 0) {
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
  }

  rows.forEach((t) => {
    const c = getCat(t.cat);
    const acc = ACCOUNTS.find((a) => a.id === t.account);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${fmtDate(t.date)}</td>
      <td><div class="tx-desc"><span style="width:8px;height:8px;border-radius:9999px;background:${c.color};display:inline-block;"></span>${t.desc}</div></td>
      <td><span class="chip">${c.name}</span></td>
      <td>${acc ? acc.name : t.account}</td>
      <td class="right amt-cell ${t.type}">${t.type === "income" ? "+" : ""}${rupiah(t.amount)}</td>
    `;
    tbody.appendChild(tr);
  });
}

["filter-category", "filter-account", "filter-type"].forEach((id) => {
  document.getElementById(id).addEventListener("change", renderTransactions);
});
document.getElementById("global-search").addEventListener("input", () => {
  if (currentPage === "transactions") renderTransactions();
});
document.getElementById("btn-clear-filters").addEventListener("click", () => {
  document.getElementById("filter-category").value = "all";
  document.getElementById("filter-account").value = "all";
  document.getElementById("filter-type").value = "all";
  document.getElementById("global-search").value = "";
  renderTransactions();
});
document.getElementById("btn-export").addEventListener("click", () => {
  showToast("Export CSV belum tersedia di prototype ini", "ti-info-circle");
});

/* ============================================================
   BUDGETS PAGE
   ============================================================ */
function renderBudgets() {
  const spent = getSpentByCategory();
  const totalSpent = getTotalSpent();
  const totalAlloc = state.monthlyBudgetTotal;
  const pct = Math.min(Math.round((totalSpent / totalAlloc) * 100), 999);

  document.getElementById("budget-total-alloc").textContent =
    rupiah(totalAlloc);
  document.getElementById("budget-total-spent").textContent =
    rupiah(totalSpent);
  document.getElementById("budget-total-bar").style.width =
    Math.min(pct, 100) + "%";
  document.getElementById("budget-total-bar").className =
    "progress-fill" + (pct >= 100 ? " danger" : pct >= 80 ? " warn" : "");
  document.getElementById("budget-total-pct").textContent = pct + "% terpakai";

  const grid = document.getElementById("budget-cards");
  grid.innerHTML = "";

  Object.keys(state.categoryBudgets).forEach((catId) => {
    const c = getCat(catId);
    const budget = state.categoryBudgets[catId];
    const used = spent[catId] || 0;
    const usedPct = Math.round((used / budget) * 100);
    const isOver = used > budget;
    const remaining = budget - used;

    const card = document.createElement("div");
    card.className = "budget-card" + (isOver ? " over" : "");
    card.innerHTML = `
      <div class="budget-top">
        <div class="budget-icon-name">
          <div class="cat-icon" style="width:40px;height:40px;background:${c.bg};color:${c.color};font-size:18px;"><i class="ti ${c.icon}"></i></div>
          <div style="font-weight:500;font-family:'Geist',sans-serif;font-size:14px;">${c.name}</div>
        </div>
        ${isOver ? `<div class="budget-overspent-tag"><i class="ti ti-alert-triangle"></i>Lebih</div>` : ""}
      </div>
      <div class="budget-figures">
        <div>
          <div class="budget-spent-label">Terpakai</div>
          <div class="budget-spent-amt ${isOver ? "over" : ""}">${rupiah(used)}</div>
        </div>
        <div>
          <div class="budget-of">dari ${rupiah(budget)}</div>
          <div class="budget-left ${isOver ? "over" : ""}">${isOver ? rupiah(remaining) + " lebih" : rupiah(remaining) + " sisa"}</div>
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill ${isOver ? "danger" : usedPct >= 80 ? "warn" : ""}" style="width:${Math.min(usedPct, 100)}%;"></div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   QUICK ADD MODAL
   ============================================================ */
let selectedQACategory = null;

function buildQuickAddCategoryGrid() {
  const grid = document.getElementById("qa-cat-grid");
  grid.innerHTML = "";
  CATEGORIES.filter((c) => c.id !== "lainnya")
    .slice(0, 8)
    .forEach((c) => {
      const btn = document.createElement("button");
      btn.className = "cat-btn";
      btn.dataset.cat = c.id;
      btn.innerHTML = `<i class="ti ${c.icon}" style="color:${c.color};"></i><span>${c.name}</span>`;
      btn.addEventListener("click", () => {
        selectedQACategory = c.id;
        document
          .querySelectorAll(".cat-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
      grid.appendChild(btn);
    });
}

function openQuickAdd() {
  document.getElementById("modal-overlay").classList.add("show");
  document.getElementById("qa-amount").value = "";
  document.getElementById("qa-desc").value = "";
  selectedQACategory = null;
  document
    .querySelectorAll(".cat-btn")
    .forEach((b) => b.classList.remove("selected"));
  setTimeout(() => document.getElementById("qa-amount").focus(), 50);
}
function closeQuickAdd() {
  document.getElementById("modal-overlay").classList.remove("show");
}

document.getElementById("btn-quickadd").addEventListener("click", openQuickAdd);
document.getElementById("modal-close").addEventListener("click", closeQuickAdd);
document.getElementById("qa-cancel").addEventListener("click", closeQuickAdd);
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target.id === "modal-overlay") closeQuickAdd();
});

/* format amount input live with thousands separator */
document.getElementById("qa-amount").addEventListener("input", (e) => {
  let raw = e.target.value.replace(/[^\d]/g, "");
  if (raw) {
    e.target.value = Number(raw).toLocaleString("id-ID");
  } else {
    e.target.value = "";
  }
});

document.getElementById("qa-submit").addEventListener("click", () => {
  const rawAmount = document
    .getElementById("qa-amount")
    .value.replace(/[^\d]/g, "");
  const amount = Number(rawAmount);
  const desc = document.getElementById("qa-desc").value.trim();

  if (!amount || amount <= 0) {
    showToast("Masukkan jumlah yang valid", "ti-alert-circle");
    document.getElementById("qa-amount").focus();
    return;
  }
  if (!selectedQACategory) {
    showToast("Pilih kategori terlebih dahulu", "ti-alert-circle");
    return;
  }

  const cat = getCat(selectedQACategory);
  const finalDesc = desc || cat.name;

  state.transactions.push({
    id: newTxId(),
    date: new Date(),
    desc: finalDesc,
    cat: selectedQACategory,
    account: "gopay",
    amount: -amount,
    type: "expense",
  });

  closeQuickAdd();
  showToast(`Tersimpan: ${finalDesc} · ${rupiah(amount)}`, "ti-circle-check");

  // re-render whichever page is active so updates are reflected immediately
  if (currentPage === "dashboard") renderDashboard();
  if (currentPage === "transactions") renderTransactions();
  if (currentPage === "budgets") renderBudgets();
});

/* allow Enter key inside quick add amount/desc to submit */
["qa-amount", "qa-desc"].forEach((id) => {
  document.getElementById(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("qa-submit").click();
  });
});

/* ESC to close modal */
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    document.getElementById("modal-overlay").classList.contains("show")
  ) {
    closeQuickAdd();
  }
});

/* ============================================================
   TOAST
   ============================================================ */
let toastTimeout = null;
function showToast(text, icon = "ti-circle-check") {
  const toast = document.getElementById("toast");
  document.getElementById("toast-text").textContent = text;
  toast.querySelector("i").className = "ti " + icon;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3200);
}
/* ============================================================
   NAVIGATION — extend to new pages
   ============================================================ */
const allPages = [
  "dashboard",
  "transactions",
  "budgets",
  "insight",
  "savings",
  "accounts",
  "reports",
  "upgrade",
];

// Override showPage to handle all pages
function showPage(page) {
  if (!allPages.includes(page)) return;
  currentPage = page;
  allPages.forEach((p) => {
    const el = document.getElementById("page-" + p);
    if (el) el.classList.toggle("hidden", p !== page);
  });
  document.querySelectorAll(".nav-item[data-page]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
  if (page === "dashboard") renderDashboard();
  if (page === "transactions") renderTransactions();
  if (page === "budgets") renderBudgets();
  if (page === "insight") renderInsight();
  if (page === "savings") renderSavings();
  if (page === "accounts") renderAccounts();
  if (page === "reports") renderReports();
  if (page === "upgrade") renderUpgrade();
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-page]").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

/* ============================================================
   STATIC DATA for new pages
   ============================================================ */
const ACCOUNTS_DATA = [
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    type: "Rekening •••• 4589",
    letter: "B",
    color: "#3525CD",
    balance: 8500000,
    sync: "Sync 2j lalu",
    syncOk: true,
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    type: "Tabungan •••• 1204",
    letter: "M",
    color: "#006C49",
    balance: 3500000,
    sync: "Sync 5j lalu",
    syncOk: true,
  },
  {
    id: "gopay",
    name: "GoPay",
    type: "E-Wallet",
    letter: "G",
    color: "#4F46E5",
    balance: 2800000,
    sync: "Sync gagal",
    syncOk: false,
  },
  {
    id: "ovo",
    name: "OVO",
    type: "E-Wallet",
    letter: "O",
    color: "#3525CD",
    balance: 1800000,
    sync: "Sync 1h lalu",
    syncOk: true,
  },
  {
    id: "cash",
    name: "Dompet Tunai",
    type: "Akun Manual",
    letter: "💵",
    color: "#464555",
    balance: 1850000,
    sync: "Diperbarui manual",
    syncOk: true,
  },
];

const SAVINGS_GOALS = [
  {
    id: "laptop",
    name: "Upgrade Laptop",
    icon: "ti-device-laptop",
    color: "#3525CD",
    bg: "rgba(79,70,229,0.15)",
    saved: 12500000,
    target: 18000000,
    status: "on-track",
    statusText: "Sesuai jadwal — target Januari",
  },
  {
    id: "emergency",
    name: "Dana Darurat",
    icon: "ti-shield-check",
    color: "#006C49",
    bg: "rgba(108,248,187,0.2)",
    saved: 4200000,
    target: 10000000,
    status: "on-track",
    statusText: "Proyeksi selesai: Maret 2025",
  },
  {
    id: "trip",
    name: "Liburan Semarang",
    icon: "ti-map-pin",
    color: "#684000",
    bg: "rgba(136,85,0,0.15)",
    saved: 850000,
    target: 3500000,
    status: "behind",
    statusText: "Sedikit di belakang jadwal",
  },
];

const AI_INSIGHTS = [
  {
    title: "Pengeluaran Makan Tinggi",
    body: "Pengeluaranmu untuk makan naik 15% bulan ini. Pertimbangkan masak sendiri untuk hemat hingga Rp 400rb/bulan.",
    accent: "var(--danger)",
  },
  {
    title: "Hemat Transportasi",
    body: "Mantap memanfaatkan shuttle kampus! Biaya transportasi turun Rp 150rb dibanding bulan lalu.",
    accent: "var(--success)",
  },
];

const PREV_REPORTS = [
  { month: "Mei 2025", spent: 3850000, net: 1400000, positive: true },
  { month: "April 2025", spent: 4500000, net: -250000, positive: false },
  { month: "Maret 2025", spent: 3200000, net: 1900000, positive: true },
];

/* ============================================================
   INSIGHT PAGE
   ============================================================ */
let incExpChartInst = null,
  donutChartInst = null;

function renderInsight() {
  renderIncomeExpenseChart();
  renderDonutChart();
  renderHeatmap();
}

function renderIncomeExpenseChart() {
  const ctx = document.getElementById("incomeExpenseChart");
  if (!ctx) return;
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"];
  const incomes = [2500000, 2500000, 3000000, 2500000, 2500000, 2500000];
  const expenses = [
    1800000,
    2100000,
    2400000,
    1950000,
    2200000,
    getTotalSpent(),
  ];
  if (incExpChartInst) incExpChartInst.destroy();
  incExpChartInst = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Pemasukan",
          data: incomes,
          borderColor: "#006C49",
          backgroundColor: "rgba(0,108,73,0.1)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
        },
        {
          label: "Pengeluaran",
          data: expenses,
          borderColor: "#3525CD",
          backgroundColor: "rgba(53,37,205,0.1)",
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => c.dataset.label + ": " + rupiah(c.parsed.y),
          },
        },
      },
      scales: {
        y: {
          ticks: { callback: (v) => rupiahShort(v), font: { size: 10 } },
          grid: { color: "#EAE6F4" },
        },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

function renderDonutChart() {
  const ctx = document.getElementById("donutChart");
  if (!ctx) return;
  const spent = getSpentByCategory();
  const data = CATEGORIES.filter((c) => spent[c.id] > 0).map((c) => ({
    name: c.name,
    val: spent[c.id],
    color: c.color,
  }));
  const total = data.reduce((s, d) => s + d.val, 0);
  document.getElementById("donut-center").textContent = rupiahShort(total);
  if (donutChartInst) donutChartInst.destroy();
  donutChartInst = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map((d) => d.name),
      datasets: [
        {
          data: data.map((d) => d.val),
          backgroundColor: data.map((d) => d.color),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: (c) => c.label + ": " + rupiah(c.parsed) },
        },
      },
    },
  });
  const legend = document.getElementById("donut-legend");
  legend.innerHTML = "";
  data.slice(0, 4).forEach((d) => {
    const pct = Math.round((d.val / total) * 100);
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex;align-items:center;gap:8px;font-size:12px;";
    row.innerHTML = `<div style="width:10px;height:10px;border-radius:9999px;background:${d.color};flex-shrink:0;"></div><div style="flex:1;color:var(--text);font-family:'Geist',sans-serif;font-weight:600;">${d.name}</div><div style="color:var(--text-muted);">${pct}%</div>`;
    legend.appendChild(row);
  });
}

function renderHeatmap() {
  const grid = document.getElementById("heatmap-grid");
  if (!grid) return;
  const times = [
    "Pagi (6-12)",
    "Siang (12-14)",
    "Sore (14-18)",
    "Malam (18-21)",
    "Larut (21-00)",
    "Dini (00-6)",
  ];
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  // Heatmap values (0-4 intensity)
  const data = [
    [1, 3, 1, 2, 0, 0],
    [2, 2, 1, 1, 0, 0],
    [1, 3, 2, 2, 0, 0],
    [1, 2, 1, 3, 1, 0],
    [2, 3, 2, 4, 3, 1],
    [1, 4, 3, 4, 4, 2],
    [1, 3, 3, 3, 2, 1],
  ];
  grid.innerHTML = "";
  // Empty top-left corner
  const corner = document.createElement("div");
  grid.appendChild(corner);
  // Day headers
  days.forEach((d) => {
    const h = document.createElement("div");
    h.className = "heatmap-col-header";
    h.textContent = d;
    h.style.fontFamily = "'Geist',sans-serif";
    h.style.fontSize = "11px";
    h.style.color = "var(--text-faint)";
    h.style.textAlign = "center";
    grid.appendChild(h);
  });
  // Rows
  times.forEach((t, ti) => {
    const lbl = document.createElement("div");
    lbl.className = "heatmap-label";
    lbl.textContent = t;
    grid.appendChild(lbl);
    days.forEach((_, di) => {
      const cell = document.createElement("div");
      cell.className = "hm-cell hm-" + data[di][ti];
      grid.appendChild(cell);
    });
  });
}

/* ============================================================
   SAVINGS GOALS PAGE
   ============================================================ */
let forecastChartInst = null;

function renderSavings() {
  const list = document.getElementById("goals-list");
  list.innerHTML = "";
  let totalLocked = 0;
  SAVINGS_GOALS.forEach((g) => {
    totalLocked += g.saved;
    const pct = Math.round((g.saved / g.target) * 100);
    const progressColor =
      g.status === "on-track"
        ? pct >= 50
          ? "var(--success)"
          : "var(--primary)"
        : "var(--danger)";
    const statusIcon =
      g.status === "on-track" ? "ti-trending-up" : "ti-alert-triangle";
    const statusColor =
      g.status === "on-track" ? "var(--success)" : "var(--danger)";
    const pctColor =
      g.status === "on-track"
        ? pct >= 50
          ? "var(--success)"
          : "var(--primary)"
        : "var(--danger)";
    const card = document.createElement("div");
    card.className = "goal-card";
    card.innerHTML = `
      <div style="position:absolute;width:120px;height:120px;right:0;top:0;background:${g.bg};border-bottom-left-radius:9999px;pointer-events:none;"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div class="goal-icon" style="background:${g.bg};color:${g.color};"><i class="ti ${g.icon}"></i></div>
          <div>
            <div class="goal-name">${g.name}</div>
            <div class="goal-status" style="color:${statusColor};"><i class="ti ${statusIcon}" style="font-size:12px;"></i>${g.statusText}</div>
          </div>
        </div>
        <button style="color:var(--text-faint);font-size:18px;" onclick="showToast('Edit target belum tersedia', 'ti-info-circle')"><i class="ti ti-dots-vertical"></i></button>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:8px;">
          <div>
            <span style="font-size:16px;font-weight:700;color:var(--text-muted);">Rp</span>
            <span style="font-size:26px;font-weight:700;">${(g.saved / 1000000).toFixed(1).replace(".", ",")}jt</span>
          </div>
          <div style="font-size:14px;color:var(--text-muted);">dari ${rupiah(g.target)}</div>
        </div>
        <div class="goal-progress-bar"><div class="goal-progress-fill" style="width:${pct}%;background:${progressColor};"></div></div>
        <div class="goal-pct-row"><span style="color:${pctColor};">${pct}% Selesai</span><span style="color:var(--text-muted);font-weight:600;">${rupiahShort(g.target - g.saved)} tersisa</span></div>
      </div>
    `;
    list.appendChild(card);
  });
  document.getElementById("total-locked").textContent = rupiah(totalLocked);
  renderForecastChart();
}

function renderForecastChart() {
  const ctx = document.getElementById("forecastChart");
  if (!ctx) return;
  const months = ["Sep", "Okt", "Nov", "Des", "Jan"];
  const actual = [10000000, 12000000, 13500000, null, null];
  const projected = [null, null, 13500000, 16000000, 18000000];
  if (forecastChartInst) forecastChartInst.destroy();
  forecastChartInst = new Chart(ctx, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Aktual",
          data: actual,
          borderColor: "var(--success)",
          borderWidth: 2.5,
          pointRadius: [3, 3, 4, 0, 0],
          tension: 0.3,
          spanGaps: false,
        },
        {
          label: "Proyeksi",
          data: projected,
          borderColor: "#777587",
          borderWidth: 2,
          borderDash: [5, 4],
          pointRadius: [0, 0, 4, 3, 3],
          tension: 0.3,
          spanGaps: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => c.dataset.label + ": " + rupiah(c.parsed.y),
          },
        },
      },
      scales: {
        y: {
          ticks: { callback: (v) => rupiahShort(v), font: { size: 10 } },
          grid: { color: "#EAE6F4" },
        },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      },
    },
  });
}

document.getElementById("btn-add-goal").addEventListener("click", () => {
  showToast(
    "Fitur tambah target belum tersedia di prototype",
    "ti-info-circle",
  );
});

/* ============================================================
   ACCOUNTS PAGE
   ============================================================ */
function renderAccounts() {
  const totalBal = ACCOUNTS_DATA.reduce((s, a) => s + a.balance, 0);
  document.getElementById("acc-total").textContent = rupiah(totalBal);
  const container = document.getElementById("acc-rows");
  container.innerHTML = "";
  ACCOUNTS_DATA.forEach((a) => {
    const row = document.createElement("div");
    row.className = "acc-row";
    row.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;">
        <div class="acc-logo" style="color:${a.color};">${a.letter}</div>
        <div>
          <div class="acc-name">${a.name}</div>
          <div class="acc-type">${a.type}</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="acc-balance">${rupiah(a.balance)}</div>
        <div class="acc-sync ${a.syncOk ? "" : "fail"}">${a.sync}</div>
      </div>
    `;
    container.appendChild(row);
  });
}

/* ============================================================
   REPORTS PAGE
   ============================================================ */
function renderReports() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const now = new Date();
  document.getElementById("report-title").textContent =
    `Ringkasan ${months[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById("report-spent").textContent = rupiah(getTotalSpent());
  document.getElementById("report-income").textContent =
    rupiah(getTotalIncome());

  // Category spending bars
  const spent = getSpentByCategory();
  const total = getTotalSpent() || 1;
  const sorted = CATEGORIES.map((c) => ({ ...c, amount: spent[c.id] || 0 }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
  const catList = document.getElementById("report-cat-list");
  catList.innerHTML = "";
  sorted.forEach((c) => {
    const pct = Math.round((c.amount / total) * 100);
    const row = document.createElement("div");
    row.className = "spending-summary-row";
    row.innerHTML = `
      <div class="ss-icon" style="background:${c.bg};color:${c.color};"><i class="ti ${c.icon}"></i></div>
      <div class="ss-main">
        <div class="ss-top"><span>${c.name}</span><span style="font-weight:600;">${rupiah(c.amount)}</span></div>
        <div class="ss-bar-wrap">
          <div class="ss-bar"><div class="ss-bar-fill" style="width:${pct}%;background:${c.color};"></div></div>
          <div class="ss-pct">${pct}%</div>
        </div>
      </div>
    `;
    catList.appendChild(row);
  });

  // AI Insights
  const aiList = document.getElementById("ai-insights-list");
  aiList.innerHTML = "";
  AI_INSIGHTS.forEach((ins) => {
    const item = document.createElement("div");
    item.className = "ai-insight-item";
    item.innerHTML = `
      <div class="ai-accent" style="background:${ins.accent};"></div>
      <div style="font-family:'Geist',sans-serif;font-size:14px;font-weight:500;margin-bottom:4px;">${ins.title}</div>
      <div style="font-size:13.5px;color:var(--text-muted);line-height:1.55;">${ins.body}</div>
    `;
    aiList.appendChild(item);
  });

  // Previous reports table
  const tbody = document.getElementById("prev-reports-body");
  tbody.innerHTML = "";
  PREV_REPORTS.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:36px;height:36px;background:${r.positive ? "rgba(79,70,229,0.1)" : "#E4E1EE"};border-radius:8px;display:flex;align-items:center;justify-content:center;color:${r.positive ? "var(--primary)" : "var(--text-muted)"};">
            <i class="ti ti-file-text" style="font-size:16px;"></i>
          </div>
          <div>
            <div style="font-family:'Geist',sans-serif;font-size:14px;font-weight:500;">${r.month}</div>
            <div style="font-size:12px;color:var(--text-faint);">Dibuat ${r.month.split(" ")[0]} ${parseInt(r.month.split(" ")[1]) + 0} awal</div>
          </div>
        </div>
      </td>
      <td style="color:var(--text-muted);">${rupiah(r.spent)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:4px;font-family:'Geist',sans-serif;font-size:12px;font-weight:600;color:${r.positive ? "var(--success)" : "var(--danger)"};">
          <i class="ti ${r.positive ? "ti-trending-up" : "ti-trending-down"}" style="font-size:14px;"></i>
          ${r.positive ? "+" : ""}${rupiah(r.net)}
        </div>
      </td>
      <td style="text-align:right;">
        <button style="font-size:18px;color:var(--border);" onclick="showToast('Download PDF bulan ${r.month}', 'ti-download')"><i class="ti ti-download"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

/* ============================================================
   UPGRADE PAGE
   ============================================================ */
let billingMode = "monthly";

function renderUpgrade() {
  document.querySelectorAll(".billing-opt").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.billing === billingMode);
  });
  const proPrice = billingMode === "yearly" ? 23200 : 29000;
  const hhPrice = billingMode === "yearly" ? 47200 : 59000;
  const fmt = (n) => "Rp " + n.toLocaleString("id-ID");
  document.getElementById("pro-price").textContent = fmt(proPrice);
  document.getElementById("household-price").textContent = fmt(hhPrice);
}

document.getElementById("billing-toggle").addEventListener("click", (e) => {
  const opt = e.target.closest("[data-billing]");
  if (!opt) return;
  billingMode = opt.dataset.billing;
  renderUpgrade();
});
