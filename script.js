const KNOWN_PATHS = new Set([
  "",
  "index.html",
  "thank-you.html",
  "polityka-prywatnosci.html",
  "regulamin.html",
  "assets",
  "favicon.ico"
]);

function getCompanyNameFromPath() {
  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!rawPath) return "";

  const firstSegment = rawPath.split("/")[0];
  if (KNOWN_PATHS.has(firstSegment)) return "";

  try {
    return decodeURIComponent(firstSegment)
      .replace(/[+_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 80);
  } catch {
    return "";
  }
}

function applyPersonalizedEyebrow() {
  const companyName = getCompanyNameFromPath();
  const eyebrow = document.getElementById("offerEyebrow");
  const heroTitle = document.getElementById("heroTitle");
  const heroLead = document.getElementById("heroLead");

  if (!eyebrow) return;

  if (companyName) {
    document.body.classList.add("is-personalized-site");
    eyebrow.textContent = `Oferta dla firmy: ${companyName}`;
    if (heroTitle) {
      heroTitle.textContent = "Kompleksowa obsługa księgowa od 120 zł/msc";
    }
    if (heroLead) {
      heroLead.textContent = "Poniżej wycenisz koszt miesięcznej obsługi i sprawdzisz treść umowy.";
    }
    document.title = `Oferta dla firmy: ${companyName} — Firmus`;
    return;
  }

  document.body.classList.add("is-standard-site");
  eyebrow.textContent = "Myślisz o zmianie księgowości?";
}

const pricingConfig = {
  docs: [
    { label: "do 10", price: 120 },
    { label: "11–20", price: 170 },
    { label: "21–30", price: 220 },
    { label: "31–40", price: 280 },
    { label: "41–50", price: 340 },
    { label: "powyżej 50", price: null }
  ],
  staff: [
    { label: "brak", price: 0 },
    { label: "1–2 osoby", price: 120 },
    { label: "3–5 osób", price: 240 },
    { label: "więcej niż 5 osób", price: null }
  ]
};

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function setHiddenValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

function updatePrice() {
  const priceValue = document.getElementById("priceValue");
  const priceNote = document.getElementById("priceNote");
  const priceAssurance = document.getElementById("priceAssurance");

  if (!priceValue || !priceNote) return;

  const docsIndex = Number(getSelectedValue("docs"));
  const staffIndex = Number(getSelectedValue("staff"));

  const docsTier = pricingConfig.docs[docsIndex];
  const staffTier = pricingConfig.staff[staffIndex];

  const docsLabel = docsTier ? docsTier.label : "";
  const staffLabel = staffTier ? staffTier.label : "";

  setHiddenValue("hiddenDocs", docsLabel);
  setHiddenValue("hiddenStaff", staffLabel);

  if (!docsTier || !staffTier || docsTier.price === null || staffTier.price === null) {
    priceValue.textContent = "Wycena telefoniczna";
    priceNote.textContent = "";
    if (priceAssurance) {
      priceAssurance.textContent = "Ten zakres wymaga indywidualnego ustalenia ceny. Zadzwoń: 727 791 155.";
    }
    setHiddenValue("hiddenPrice", "Wycena telefoniczna");
    return;
  }

  const total = docsTier.price + staffTier.price;
  const priceText = `${total} zł brutto`;

  priceValue.textContent = priceText;
  priceNote.textContent = "";
  if (priceAssurance) {
    priceAssurance.innerHTML = "Ta cena znajdzie się w umowie.<br />Obejmuje rozliczenie miesiąca wraz z deklaracjami JPK oraz ZUS właściciela.";
  }
  setHiddenValue("hiddenPrice", priceText);
}

function initCalculator() {
  const inputs = document.querySelectorAll('.calculator input[type="radio"]');
  inputs.forEach((input) => {
    input.addEventListener("change", updatePrice);
  });
  updatePrice();
}

function initStickyTopbar() {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  if (document.body.classList.contains("is-standard-site")) {
    topbar.classList.add("is-visible");
    return;
  }

  const toggle = () => {
    topbar.classList.toggle("is-visible", window.scrollY > 320);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

applyPersonalizedEyebrow();
initStickyTopbar();
initCalculator();
initReveal();


function initOfferFlowMobileCta() {
  const offerFlow = document.querySelector(".offer-flow");
  if (!offerFlow || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        document.body.classList.toggle("is-in-offer-flow", entry.isIntersecting);
      });
    },
    {
      threshold: 0.08
    }
  );

  observer.observe(offerFlow);
}

initOfferFlowMobileCta();


function syncOfferFlowCtaVisibility() {
  const offerFlow = document.querySelector(".offer-flow");
  if (!offerFlow) return;

  const rect = offerFlow.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  const isVisible = rect.top < viewportHeight * 0.92 && rect.bottom > viewportHeight * 0.12;
  document.body.classList.toggle("is-in-offer-flow", isVisible);
}

window.addEventListener("scroll", syncOfferFlowCtaVisibility, { passive: true });
window.addEventListener("resize", syncOfferFlowCtaVisibility);
window.addEventListener("load", syncOfferFlowCtaVisibility);
syncOfferFlowCtaVisibility();

