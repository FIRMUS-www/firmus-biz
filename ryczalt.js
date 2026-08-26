(() => {
  const isRootPath = ["", "/", "/index.html"].includes(window.location.pathname);
  if (!isRootPath || window.location.hash !== "#ryczalt") return;

  const originalMain = document.getElementById("main");
  const topbar = document.getElementById("topbar");
  const skipLink = document.querySelector(".skip-link");
  const mobileBar = document.querySelector(".mobile-bar");

  document.body.classList.remove("is-standard-site", "is-personalized-site");
  document.body.classList.add("is-ryczalt-site");
  document.title = "Ryczałt 55 zł miesięcznie przez pierwszy rok — Firmus";

  if (originalMain) originalMain.hidden = true;
  if (skipLink) skipLink.setAttribute("href", "#ryczalt");

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      "content",
      "Księgowość na ryczałcie za 55 zł miesięcznie przez pierwszy rok. 660 zł za 12 miesięcy, płatne z góry. Oferta dla umów zawartych i opłaconych do 30 września 2026."
    );
  }

  if (topbar) {
    topbar.classList.add("is-visible");
    const nav = topbar.querySelector(".topbar__nav");
    if (nav) {
      nav.innerHTML = `
        <a href="#ryczalt" data-scroll-target="ryczalt-warunki">Warunki</a>
        <a href="#ryczalt" data-scroll-target="ryczalt-opinie">Opinie</a>
        <a href="#ryczalt" data-scroll-target="ryczalt-start">Sprawdź ofertę</a>
        <a class="topbar__phone" href="tel:+48727791155">Zadzwoń / WhatsApp</a>
      `;
    }
  }

  if (mobileBar) {
    const links = mobileBar.querySelectorAll("a");
    if (links[0]) {
      links[0].href = "#ryczalt";
      links[0].dataset.scrollTarget = "ryczalt-start";
      links[0].textContent = "Sprawdź ofertę";
    }
  }

  const campaign = document.createElement("main");
  campaign.id = "ryczalt";
  campaign.className = "ryczalt-main";
  campaign.innerHTML = `
    <section class="section-dark ryczalt-hero">
      <div class="container ryczalt-hero__grid">
        <div>
          <p class="ryczalt-kicker">RYCZAŁT · tylko do 30 września 2026</p>
          <h1>Księgowość na ryczałcie za <span>55 zł</span> miesięcznie</h1>
          <p class="ryczalt-hero__lead">
            <strong>Przez cały pierwszy rok.</strong> Księgowość online, faktury, KSeF, podatki i Twój księgowy w jednej appce.
          </p>
          <div class="ryczalt-hero__actions">
            <a class="btn btn-primary" href="#ryczalt" data-scroll-target="ryczalt-start" data-ryczalt-scenario="change">PRZENOSZĘ KSIĘGOWOŚĆ</a>
            <a class="btn btn-ghost" href="#ryczalt" data-scroll-target="ryczalt-start" data-ryczalt-scenario="start">DOPIERO ZAKŁADAM FIRMĘ</a>
          </div>
          <p class="ryczalt-hero__micro">
            660 zł brutto za 12 miesięcy. Oferta dla JDG na ryczałcie do 10 dokumentów sprzedażowych miesięcznie (z VAT albo bez VAT). Tylko do 30.09.2026. - płatne z góry.
          </p>
        </div>

      </div>
    </section>

    <section class="section" id="ryczalt-warunki">
      <div class="container">
        <div class="ryczalt-section-head">
          <p class="eyebrow">Tak. Naprawdę 55 zł.</p>
          <h2>To nie jest „OD” 55 zł</h2>
          <p>Zero niejasnych, skomplikowanych warunków. Prosta cena i konkretny termin.</p>
        </div>

        <div class="ryczalt-why">
          <strong>Skąd taka cena?</strong> To jednorazowa oferta na start aplikacji dla firm na ryczałcie.
        </div>

        <div class="ryczalt-why">
          <strong>A po pierwszym roku?</strong> Dwa miesiące przed końcem umowy dostaniesz ofertę dla stałego klienta. I spokojnie podejmiesz decyzję o kontynuacji współpracy.
        </div>

        <div class="ryczalt-why">
          <strong>A jeśli przekroczę 10 dokumentów miesięcznie?</strong> Rozmawiamy, dopasowujemy cenę do nowej sytuacji i działamy dalej.
        </div>
      </div>
    </section>

    <section class="section ryczalt-paths">
      <div class="container">
        <div class="ryczalt-section-head">
          <p class="eyebrow">Dwie proste drogi</p>
          <h2>Masz już firmę albo dopiero zaczynasz.</h2>
        </div>

        <div class="ryczalt-paths__grid">
          <article class="ryczalt-path">
            <span class="ryczalt-path__num">01</span>
            <h3>Jeśli już masz firmę</h3>
            <p>Nie musisz sam ogarniać przenosin. Pomagam przejść przez formalności i kontaktuję się z poprzednim biurem rachunkowym.</p>
            <a class="btn btn-primary" href="#ryczalt" data-scroll-target="ryczalt-start" data-ryczalt-scenario="change">PRZENOSZĘ KSIĘGOWOŚĆ</a>
          </article>

          <article class="ryczalt-path">
            <span class="ryczalt-path__num">02</span>
            <h3>Gdy zakładasz firmę</h3>
            <p>Pomogę Ci założyć firmę oraz dopełnić wszystkich niezbędnych formalności w urzędach.</p>
            <a class="btn btn-primary" href="#ryczalt" data-scroll-target="ryczalt-start" data-ryczalt-scenario="start">DOPIERO ZAKŁADAM FIRMĘ</a>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark ryczalt-guarantee">
      <div class="container ryczalt-guarantee__grid">
        <div class="ryczalt-guarantee__copy">
          <p class="eyebrow">Bez ryzyka</p>
          <h2>Masz <span>30 dni</span>, żeby sprawdzić Firmus bez ryzyka.</h2>
          <p>Podpisujesz umowę, opłacasz 660 zł i zaczynamy współpracę. Jeśli w ciągu 30 dni od podpisania umowy uznasz, że Firmus Ci nie odpowiada — rezygnujesz, a ja zwracam Ci całe 660 zł.</p>
          <p>Bez kary. Bez potrącania „pierwszego miesiąca”. Bez zobowiązania na pozostałą część roku.</p>
        </div>
      </div>
    </section>

    <section class="section" id="ryczalt-opinie">
      <div class="container">
        <div class="ryczalt-section-head">
          <p class="eyebrow">Opinie klientów</p>
          <h2>Nie wierz mi na słowo</h2>
          <p>To są prawdziwe opinie klientów Firmusa — dokładnie o kontakcie, zakładaniu firmy, formalnościach i pomocy w codziennych sprawach.</p>
        </div>

        <div class="ryczalt-testimonials__grid">
          <article class="ryczalt-testimonial"><blockquote>„Firma założona błyskawicznie i bez żadnych komplikacji. Bardzo cenię sobie konkretną komunikację oraz fakt, że wszystkie formalności zostały dopięte na ostatni guzik.”</blockquote><p>Maciej B.</p></article>
          <article class="ryczalt-testimonial"><blockquote>„Przed rozpoczęciem współpracy dostałem darmowe porady i informacje, o których powinien wiedzieć każdy właściciel firmy. Kontakt jest bardzo prosty i można uzyskać odpowiedź oraz poradę praktycznie w każdym momencie.”</blockquote><p>Artur K.</p></article>
          <article class="ryczalt-testimonial"><blockquote>„Otrzymałem bardzo dużą pomoc za bardzo atrakcyjną cenę. Największym atutem współpracy jest prosty i zrozumiały dla laika sposób przekazywania informacji.”</blockquote><p>Jacek B.</p></article>
          <article class="ryczalt-testimonial"><blockquote>„Pan Krzysztof okazuje ogromne wsparcie na każdym etapie, od założenia firmy po jej prowadzenie. Z czystym sercem mogę polecić każdemu.”</blockquote><p>Filip W.</p></article>
        </div>
      </div>
    </section>

    <section class="section ryczalt-start" id="ryczalt-start">
      <div class="container">
        <div class="ryczalt-start__intro">
          <p class="eyebrow">Prosta umowa</p>
          <h2>Sprawdź warunki umowy</h2>
          <p>Wypełnisz w 2 minuty - tylko podstawowe informacje</p>
        </div>

        <form class="ryczalt-wizard" name="firmus-umowa" method="POST" action="/thank-you.html" data-netlify="true" data-netlify-honeypot="bot-field" id="ryczaltForm">
          <input type="hidden" name="form-name" value="firmus-umowa" />
          <input type="hidden" name="zrodlo" value="ryczalt" />
          <input type="hidden" name="scenariusz" id="ryczaltScenario" />
          <input type="hidden" name="wybrana_liczba_dokumentow" id="ryczaltDocs" />
          <input type="hidden" name="wybrany_vat" id="ryczaltVat" />
          <input type="hidden" name="wybrani_pracownicy_umowy" value="" />
          <input type="hidden" name="wyliczona_cena" id="ryczaltPrice" />
          <input type="hidden" name="promo_kwalifikacja" id="ryczaltQualification" />
          <p class="hidden-field" aria-hidden="true"><label>Nie wypełniaj: <input name="bot-field" tabindex="-1" autocomplete="off" /></label></p>

          <div class="ryczalt-progress" aria-hidden="true"><span class="is-active"></span><span></span><span></span><span></span></div>

          <div class="ryczalt-step" data-step="1">
            <h3>1. Gdzie jesteś dzisiaj?</h3>
            <p class="ryczalt-step__lead">Wybierz jedną opcję.</p>
            <div class="ryczalt-choice-grid">
              <button class="ryczalt-choice" type="button" data-scenario="change">Mam firmę i chcę zmienić księgowość</button>
              <button class="ryczalt-choice" type="button" data-scenario="start">Dopiero zakładam firmę</button>
            </div>
          </div>

          <div class="ryczalt-step" data-step="2" hidden>
            <h3>2. Jaka jest skala?</h3>
            <p class="ryczalt-step__lead">Nie musi być co do sztuki — wybierz najbliższy przedział.</p>

            <fieldset class="ryczalt-choice-group">
              <legend>Dokumenty sprzedażowe miesięcznie</legend>
              <div class="ryczalt-choice-grid">
                <button class="ryczalt-choice" type="button" data-docs="0-10">0–10</button>
                <button class="ryczalt-choice" type="button" data-docs="11-20">11–20</button>
                <button class="ryczalt-choice" type="button" data-docs="21-50">21–50</button>
                <button class="ryczalt-choice" type="button" data-docs="50+">więcej niż 50</button>
              </div>
            </fieldset>

            <fieldset class="ryczalt-choice-group">
              <legend>VAT</legend>
              <div class="ryczalt-choice-grid">
                <button class="ryczalt-choice" type="button" data-vat="VAT">Jestem VAT-owcem</button>
                <button class="ryczalt-choice" type="button" data-vat="bez VAT">Nie jestem VAT-owcem</button>
                <button class="ryczalt-choice" type="button" data-vat="nie wiem">Nie wiem / sprawdźmy</button>
              </div>
            </fieldset>

            <div class="ryczalt-wizard__actions">
              <button class="btn btn-ghost" type="button" data-prev>Wstecz</button>
              <button class="btn btn-primary" type="button" data-next disabled>Dalej</button>
            </div>
          </div>

          <div class="ryczalt-step" data-step="3" hidden>
            <h3>3. Ostatnie dane.</h3>
            <p class="ryczalt-step__lead">Potrzebuję ich, żeby pokazać Ci właściwe warunki i tekst umowy.</p>
            <div class="ryczalt-form-grid">
              <label class="ryczalt-field">Imię / nazwa firmy<input type="text" name="imie_nazwa" id="ryczaltName" required autocomplete="name" /></label>
              <label class="ryczalt-field"><span>NIP <span id="ryczaltNipHint"></span></span><input type="text" name="nip" id="ryczaltNip" inputmode="numeric" autocomplete="off" /></label>
              <label class="ryczalt-field">E-mail<input type="email" name="email" id="ryczaltEmail" required autocomplete="email" /></label>
              <label class="ryczalt-field">Telefon<input type="tel" name="telefon" id="ryczaltPhone" required autocomplete="tel" /></label>
            </div>
            <div class="ryczalt-wizard__actions">
              <button class="btn btn-ghost" type="button" data-prev>Wstecz</button>
              <button class="btn btn-primary" type="button" data-check>CHCĘ WZÓR UMOWY</button>
            </div>
          </div>

          <div class="ryczalt-step" data-step="4" hidden>
            <div class="ryczalt-result" id="ryczaltResult"></div>
            <div class="ryczalt-contract-box">
              <strong>Najpierw sprawdź tekst umowy.</strong>
              <p>Zero ukrytych opłat, haczyków i drobnych druczków. Zobaczysz warunki przed podpisaniem i dopiero wtedy decydujesz.</p>
            </div>
            <label class="ryczalt-consent">
              <input type="checkbox" name="zgoda_umowa_kontakt" value="tak" required />
              <span>Chcę otrzymać tekst umowy i warunki współpracy. Akceptuję <a href="/polityka-prywatnosci.html">politykę prywatności</a>.</span>
            </label>
            <div class="ryczalt-wizard__actions">
              <button class="btn btn-ghost" type="button" data-prev>Wstecz</button>
              <button class="btn btn-primary" type="submit" id="ryczaltSubmit">SPRAWDŹ TEKST UMOWY</button>
            </div>
            <p class="ryczalt-step__lead" style="margin-top:18px">Wolisz od razu porozmawiać? <a href="tel:+48727791155"><strong>727 791 155</strong></a></p>
          </div>
        </form>
      </div>
    </section>

    <footer class="ryczalt-footer">
      <div class="container ryczalt-footer__grid">
        <div><strong>Firmus</strong><p>księgowość dla małych firm</p></div>
        <div><p>Firmus sp. z o.o. · NIP 5532583246</p><p><a href="mailto:ksiegowosc@firmus.biz.pl">ksiegowosc@firmus.biz.pl</a> · <a href="tel:+48727791155">727 791 155</a></p><p><a href="/regulamin.html">Regulamin</a> · <a href="/polityka-prywatnosci.html">Polityka prywatności</a></p></div>
      </div>
    </footer>
  `;

  if (originalMain) {
    originalMain.insertAdjacentElement("beforebegin", campaign);
  } else {
    document.body.appendChild(campaign);
  }

  document.querySelectorAll("[data-scroll-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.getElementById(link.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== "#ryczalt") {
        window.history.replaceState(null, "", `${window.location.pathname}#ryczalt`);
      }
    });
  });

  const state = {
    scenario: "",
    docs: "",
    vat: ""
  };

  const form = document.getElementById("ryczaltForm");
  const steps = Array.from(form.querySelectorAll(".ryczalt-step"));
  const progress = Array.from(form.querySelectorAll(".ryczalt-progress span"));
  let currentStep = 1;

  const setStep = (step) => {
    currentStep = step;
    steps.forEach((item) => {
      item.hidden = Number(item.dataset.step) !== step;
    });
    progress.forEach((item, index) => {
      item.classList.toggle("is-active", index < step);
    });
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectScenario = (scenario) => {
    state.scenario = scenario;
    document.getElementById("ryczaltScenario").value = scenario === "change" ? "zmiana księgowości" : "zakładanie firmy";
    form.querySelectorAll("[data-scenario]").forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.scenario === scenario);
    });
    const nip = document.getElementById("ryczaltNip");
    const hint = document.getElementById("ryczaltNipHint");
    if (scenario === "change") {
      nip.required = true;
      hint.textContent = "(wymagany)";
    } else {
      nip.required = false;
      hint.textContent = "(jeśli już masz)";
    }
  };

  document.querySelectorAll("[data-ryczalt-scenario]").forEach((link) => {
    link.addEventListener("click", () => {
      selectScenario(link.dataset.ryczaltScenario);
      window.setTimeout(() => setStep(2), 180);
    });
  });

  form.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      selectScenario(button.dataset.scenario);
      setStep(2);
    });
  });

  const updateStep2 = () => {
    const next = form.querySelector('[data-step="2"] [data-next]');
    next.disabled = !(state.docs && state.vat);
  };

  form.querySelectorAll("[data-docs]").forEach((button) => {
    button.addEventListener("click", () => {
      state.docs = button.dataset.docs;
      document.getElementById("ryczaltDocs").value = state.docs;
      form.querySelectorAll("[data-docs]").forEach((item) => item.classList.toggle("is-selected", item === button));
      updateStep2();
    });
  });

  form.querySelectorAll("[data-vat]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vat = button.dataset.vat;
      document.getElementById("ryczaltVat").value = state.vat;
      form.querySelectorAll("[data-vat]").forEach((item) => item.classList.toggle("is-selected", item === button));
      updateStep2();
    });
  });

  form.querySelector('[data-step="2"] [data-next]').addEventListener("click", () => setStep(3));

  form.querySelectorAll("[data-prev]").forEach((button) => {
    button.addEventListener("click", () => setStep(Math.max(1, currentStep - 1)));
  });

  form.querySelector("[data-check]").addEventListener("click", () => {
    const name = document.getElementById("ryczaltName");
    const nip = document.getElementById("ryczaltNip");
    const email = document.getElementById("ryczaltEmail");
    const phone = document.getElementById("ryczaltPhone");

    const requiredFields = [name, email, phone];
    if (state.scenario === "change") requiredFields.push(nip);

    const invalid = requiredFields.find((field) => !field.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }

    const qualified = state.docs === "0-10";
    const result = document.getElementById("ryczaltResult");
    const submit = document.getElementById("ryczaltSubmit");

    if (qualified) {
      result.classList.remove("ryczalt-result--wide");
      result.innerHTML = `
        <h3>Tak — wygląda na to, że możesz wejść w 55 zł.</h3>
        <p><strong>55 zł miesięcznie przez pierwszy rok · 660 zł brutto z góry · 30 dni pełnej gwarancji zwrotu.</strong></p>
        <ul>
          <li>umowę trzeba podpisać i opłacić do 30 września 2026,</li>
          <li>promocja obejmuje do 10 dokumentów sprzedażowych miesięcznie,</li>
          <li>VAT albo bez VAT,</li>
          <li>jeśli zrezygnujesz w ciągu 30 dni od podpisania umowy, zwracam całe 660 zł.</li>
        </ul>
      `;
      document.getElementById("ryczaltPrice").value = "55 zł/mies. — 660 zł brutto za 12 miesięcy";
      document.getElementById("ryczaltQualification").value = "promocja 55 zł";
      submit.textContent = "SPRAWDŹ TEKST UMOWY";
    } else {
      result.classList.add("ryczalt-result--wide");
      result.innerHTML = `
        <h3>Masz trochę więcej dokumentów — to nie problem.</h3>
        <p>Promocja 55 zł dotyczy firm do 10 dokumentów sprzedażowych miesięcznie, ale Firmus obsługuje również większe firmy. Nie zatrzymuję Cię na czerwonym świetle — dobiorę właściwy zakres i pokażę cenę przed zawarciem umowy.</p>
      `;
      document.getElementById("ryczaltPrice").value = "wycena indywidualna — powyżej 10 dokumentów";
      document.getElementById("ryczaltQualification").value = "większy zakres";
      submit.textContent = "SPRAWDŹ WARUNKI DLA MOJEJ FIRMY";
    }

    setStep(4);
  });

  window.addEventListener("hashchange", () => {
    if (window.location.hash !== "#ryczalt") window.location.reload();
  });
})();
