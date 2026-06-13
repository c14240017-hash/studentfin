/* ===================================================
   STUDENTFIN — script.js
   Budgeting App untuk Mahasiswa Kos Surabaya
   =================================================== */

/* ============================================================
   DATA: Simulasi kondisi keuangan
   ============================================================ */
const finData = {
  totalBudget: 1500000,
  spent: 920000,
  totalBalance: 2080000,
};


/* ============================================================
   SCREEN NAVIGATION
   UX Principle: Clear navigation state — user selalu tahu
   sedang ada di halaman mana lewat highlight aktif di bottom nav.
   ============================================================ */
function switchScreen(name) {
  // Sembunyikan semua screen
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
  });

  // Non-aktifkan semua nav item
  document.querySelectorAll(".nav-item").forEach((n) => {
    n.classList.remove("active");
  });

  // Tampilkan screen yang dipilih
  const screen = document.getElementById("screen-" + name);
  const navItem = document.getElementById("nav-" + name);

  if (screen) screen.classList.add("active");
  if (navItem) navItem.classList.add("active");
}


/* ============================================================
   BUDGET RING ANIMATION
   UX Principle: Visibility of System Status — animasi ring
   memberi user informasi kondisi keuangan secara visual
   dalam satu lihat, tanpa perlu baca angka.
   ============================================================ */
function animateBudgetRing() {
  const circumference = 515; // 2 * PI * 82 (radius)
  const usedRatio = finData.spent / finData.totalBudget;
  const leftRatio = Math.max(0, 1 - usedRatio);

  const ringUsed = document.getElementById("ringUsed");
  const ringLeft = document.getElementById("ringLeft");

  if (!ringUsed || !ringLeft) return;

  // Bagian merah (terpakai)
  const usedOffset = circumference * (1 - usedRatio);
  ringUsed.style.strokeDashoffset = usedOffset;

  // Bagian hijau (sisa) — mulai dari titik akhir bagian merah
  const leftLength = circumference * leftRatio;
  const leftOffset = circumference - (circumference * usedRatio);

  ringLeft.style.strokeDasharray = leftLength + " " + circumference;
  ringLeft.style.strokeDashoffset = leftOffset - leftLength;

  // Rotasi ring hijau supaya mulai dari ujung ring merah
  const rotateDeg = usedRatio * 360 - 90;
  ringLeft.style.transformOrigin = "100px 100px";
  ringLeft.style.transform = "rotate(" + rotateDeg + "deg)";
}


/* ============================================================
   MODAL: ADD TRANSACTION
   UX Principle: Minimize Input Friction — bottom sheet lebih
   natural di mobile, tidak memblok seluruh layar.
   ============================================================ */
function openModal() {
  document.getElementById("modal").classList.add("open");
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
}

// Tutup modal jika klik di luar sheet
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});


/* ============================================================
   ADD TRANSACTION
   UX Principle: Immediate Feedback — transaksi baru langsung
   muncul di atas list tanpa reload, memberikan konfirmasi instan.
   ============================================================ */
function addTx() {
  const amtInput = document.getElementById("inp-amount");
  const catInput = document.getElementById("inp-cat");
  const descInput = document.getElementById("inp-desc");
  const walletInput = document.getElementById("inp-wallet");

  const amount = parseInt(amtInput.value);
  const category = catInput.value;
  const description = descInput.value.trim();
  const wallet = walletInput.value;

  // Validasi input
  if (!amount || amount <= 0) {
    alert("Masukkan nominal dulu ya!");
    amtInput.focus();
    return;
  }

  // Tentukan icon berdasarkan kategori
  const iconMap = {
    "🍔 Makanan": { emoji: "🍔", cls: "icon-food" },
    "☕ Kopi & Nongkrong": { emoji: "☕", cls: "icon-coffee" },
    "🛵 Transport": { emoji: "🛵", cls: "icon-transport" },
    "🏠 Kebutuhan Kos": { emoji: "🏠", cls: "icon-default" },
    "📚 Edukasi": { emoji: "📚", cls: "icon-default" },
    "🛍️ Belanja": { emoji: "🛍️", cls: "icon-default" },
    "💊 Kesehatan": { emoji: "💊", cls: "icon-default" },
    "🎮 Hiburan": { emoji: "🎮", cls: "icon-default" },
  };

  const icon = iconMap[category] || { emoji: "💸", cls: "icon-default" };
  const label = description || category.replace(/^.{2}\s/, "");
  const formattedAmt = amount.toLocaleString("id-ID");

  // Buat elemen transaksi baru
  const newItem = document.createElement("div");
  newItem.className = "tx-item";
  newItem.setAttribute("data-cat", extractCatKey(category));
  newItem.innerHTML = `
    <div class="tx-icon ${icon.cls}">${icon.emoji}</div>
    <div class="tx-info">
      <div class="tname">${label}</div>
      <div class="tcat">${category.replace(/^.{2}\s/, "")} · ${wallet} · Baru saja</div>
    </div>
    <div class="tx-amt neg">-Rp ${formattedAmt}</div>
  `;

  // Sisipkan di bagian atas list transaksi
  const txList = document.getElementById("txList");
  txList.insertBefore(newItem, txList.firstChild);

  // Reset form
  amtInput.value = "";
  descInput.value = "";

  // Tutup modal dan pindah ke halaman transaksi
  closeModal();
  switchScreen("transactions");

  // Reset filter ke "Semua"
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  document.querySelector(".chip").classList.add("active");
  showAllTx();
}

// Helper: ambil kata kunci kategori untuk filter
function extractCatKey(category) {
  if (category.includes("Makanan")) return "Makanan";
  if (category.includes("Kopi")) return "Kopi";
  if (category.includes("Transport")) return "Transport";
  return "Lainnya";
}


/* ============================================================
   FILTER TRANSACTIONS
   UX Principle: Recognition over Recall — user tidak perlu
   ingat nama transaksi, tinggal tap chip untuk filter cepat.
   ============================================================ */
function filterTx(el, cat) {
  // Update chip aktif
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  el.classList.add("active");

  const items = document.querySelectorAll("#txList .tx-item");

  if (cat === "all") {
    showAllTx();
    return;
  }

  items.forEach((tx) => {
    const txCat = tx.getAttribute("data-cat") || "";
    tx.style.display = txCat === cat ? "" : "none";
  });
}

function showAllTx() {
  document.querySelectorAll("#txList .tx-item").forEach((tx) => {
    tx.style.display = "";
  });
}


/* ============================================================
   NOTIFICATION
   UX Principle: Proactive Error Prevention — sistem memberi
   tahu user sebelum mereka sadar ada masalah, bukan setelahnya.
   ============================================================ */
function showNotif() {
  // Simulasi notifikasi overbudget
  const notifText =
    "🔔 Notifikasi StudentFin\n\n" +
    "⚠️  Kopi & Nongkrong: Rp 198.000 dari budget Rp 150.000 (132%!)\n\n" +
    "💡  Tips: Kurangi Rp 50rb/minggu → hemat Rp 200rb/bulan.\n\n" +
    "✅  Transport masih aman: Rp 74rb dari Rp 200rb (37%)";

  alert(notifText);
}


/* ============================================================
   FORMAT CURRENCY HELPER
   ============================================================ */
function formatRupiah(amount) {
  if (amount >= 1000000) {
    return "Rp " + (amount / 1000000).toFixed(1).replace(".0", "") + "jt";
  } else if (amount >= 1000) {
    return "Rp " + (amount / 1000).toFixed(0) + "rb";
  }
  return "Rp " + amount.toLocaleString("id-ID");
}


/* ============================================================
   INIT — jalankan saat halaman siap
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  // Animasi budget ring saat load
  // Delay sedikit supaya animasi CSS transition terlihat
  setTimeout(animateBudgetRing, 350);

  // Set teks ring amount
  const remaining = finData.totalBudget - finData.spent;
  const ringAmt = document.getElementById("ringAmt");
  if (ringAmt) {
    ringAmt.textContent = formatRupiah(remaining);
  }
});
function syncAccounts(){
 const btn=document.querySelector('.sync-btn');
 if(!btn) return;
 btn.innerHTML='Syncing...';
 setTimeout(()=>{
  alert('✅ 4 transaksi baru ditemukan\nGoPay - Kopi Kenangan\nOVO - GrabBike\nBCA - Top Up GoPay\nDANA - Laundry');
  document.getElementById('lastSync').textContent='Baru saja';
  btn.innerHTML='🔄 Sync Now';
 },1500);
}

setInterval(()=>{const el=document.getElementById('lastSync'); if(el) el.textContent='Last updated just now';},5000);
