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
  const personalization = document.getElementById("offerEyebrow");
  const eyebrowLabel = document.getElementById("offerEyebrowLabel");
  const companyNameElement = document.getElementById("offerCompanyName");
  const heroTitle = document.getElementById("heroTitle");
  const heroLead = document.getElementById("heroLead");
  const heroNote = document.getElementById("heroNote");

  if (!personalization || !eyebrowLabel || !companyNameElement) return;

  if (companyName) {
    document.body.classList.add("is-personalized-site");
    eyebrowLabel.textContent = "Oferta przygotowana dla firmy";
    companyNameElement.textContent = companyName;
    companyNameElement.title = companyName;
    companyNameElement.hidden = false;

    if (heroTitle) {
      heroTitle.innerHTML = '<span class="hero-title-line">Zobacz, jak dobra</span><span class="hero-title-line hero-title-line--aside">(a przy tym niedroga)</span><span class="hero-title-line">może być księgowość</span><span class="hero-title-line">dla Twojej firmy.</span>';
    }

    if (heroLead) {
      heroLead.hidden = true;
    }

    if (heroNote) {
      heroNote.textContent = "Ceny brutto. Jasna umowa bez ukrytych warunków.";
    }

    document.title = `Oferta dla firmy: ${companyName} — Firmus`;
    return;
  }

  document.body.classList.add("is-standard-site");
  eyebrowLabel.textContent = "Myślisz o zmianie księgowości?";
  companyNameElement.textContent = "";
  companyNameElement.removeAttribute("title");
  companyNameElement.hidden = true;

  if (heroLead) {
    heroLead.hidden = false;
  }
}

const pricingConfig = {
  docs: [
    { label: "do 10", price: 120 },
    { label: "11–20", price: 170 },
    { label: "21–30", price: 220 },
    { label: "31–40", price: 270 },
    { label: "41–50", price: 330 },
    { label: "powyżej 50", price: null }
  ],
  vat: [
    { label: "bez VAT", multiplier: 1 },
    { label: "VAT", multiplier: 1.5 }
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
  const priceHandnote = document.querySelector(".price-handnote");

  if (!priceValue || !priceNote) return;

  const docsIndex = Number(getSelectedValue("docs"));
  const vatIndex = Number(getSelectedValue("vat"));
  const staffIndex = Number(getSelectedValue("staff"));

  const docsTier = pricingConfig.docs[docsIndex];
  const vatTier = pricingConfig.vat[vatIndex];
  const staffTier = pricingConfig.staff[staffIndex];

  const docsLabel = docsTier ? docsTier.label : "";
  const vatLabel = vatTier ? vatTier.label : "";
  const staffLabel = staffTier ? staffTier.label : "";

  setHiddenValue("hiddenDocs", docsLabel);
  setHiddenValue("hiddenVat", vatLabel);
  setHiddenValue("hiddenStaff", staffLabel);

  if (!docsTier || !vatTier || !staffTier || docsTier.price === null || staffTier.price === null) {
    priceValue.textContent = "Wycena telefoniczna";
    priceNote.textContent = "";
    if (priceHandnote) priceHandnote.classList.add("is-hidden");
    if (priceAssurance) {
      priceAssurance.textContent = "Ten zakres wymaga indywidualnego ustalenia ceny. Zadzwoń: 727 791 155.";
    }
    setHiddenValue("hiddenPrice", "Wycena telefoniczna");
    return;
  }

  const docsPrice = Math.round(docsTier.price * vatTier.multiplier);
  const total = docsPrice + staffTier.price;
  const priceText = `${total} zł brutto`;

  priceValue.innerHTML = `${total} <span class="price-currency">zł brutto</span>`;
  priceNote.textContent = "";
  if (priceHandnote) priceHandnote.classList.remove("is-hidden");
  if (priceAssurance) {
    const vatLine = vatTier.label === "VAT"
      ? "– rozliczenie podatków z VAT / JPK"
      : "– podatkowe rozliczenie miesiąca";
    priceAssurance.innerHTML = `W tej cenie:<br /><span>${vatLine}</span><br /><span>– deklaracje ZUS właściciela JDG</span><br /><span>– wygodna aplikacja do fakturowania z KSeF</span>`;
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

function initPersonalizedMobileBarVisibility() {
  const mobileBar = document.querySelector(".mobile-bar");

  if (!mobileBar) return;

  const updateMobileBarVisibility = () => {
    document.body.classList.toggle(
      "has-mobile-scroll",
      window.scrollY > 24
    );
  };

  updateMobileBarVisibility();
  window.addEventListener(
    "scroll",
    updateMobileBarVisibility,
    { passive: true }
  );
}

applyPersonalizedEyebrow();
initStickyTopbar();
initCalculator();
initPersonalizedMobileBarVisibility();
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



// CONTRACT PILL FIX — START
document.addEventListener("DOMContentLoaded", () => {
  const pill = document.querySelector("#umowa .contract-panel__copy .contract-text-pill");
  if (pill) {
    pill.textContent = "Tekst umowy";
    pill.style.setProperty("text-transform", "none", "important");
    pill.style.setProperty("letter-spacing", "0.02em", "important");
  }
});
// CONTRACT PILL FIX — END

// RYCZALT CAMPAIGN LOADER — START
function initRyczaltCampaignLoader() {
  const isRootPath = ["", "/", "/index.html"].includes(window.location.pathname);
  if (!isRootPath || window.location.hash !== "#ryczalt") return;

  if (!document.querySelector('link[data-ryczalt-styles]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/ryczalt.css?v=20260827-3";
    link.dataset.ryczaltStyles = "true";
    document.head.appendChild(link);
  }

  if (!document.querySelector('script[data-ryczalt-script]')) {
    const script = document.createElement("script");
    script.src = "/ryczalt.js?v=20260827-3";
    script.defer = true;
    script.dataset.ryczaltScript = "true";
    document.head.appendChild(script);
  }
}

initRyczaltCampaignLoader();
// RYCZALT CAMPAIGN LOADER — END
