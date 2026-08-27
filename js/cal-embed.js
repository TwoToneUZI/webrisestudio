// Zwei-Klick-Einbettung für cal.com:
// Der Kalender lädt erst, wenn der Besucher per Klick zustimmt (Datenschutz).
var CAL_LINK = "ahad-epdz9k/15min";

function ladeCalKalender() {
  var platzhalter = document.getElementById("cal-platzhalter");
  var ziel = document.getElementById("cal-inline");
  if (!ziel || ziel.dataset.geladen) return;
  ziel.dataset.geladen = "1";
  if (platzhalter) platzhalter.style.display = "none";
  ziel.style.display = "block";

  // Offizieller cal.com-Lader (erst jetzt, nach der Zustimmung)
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal, ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") { cal.ns[namespace] = api; p(cal, ar); } else { p(cal, ar); }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", { origin: "https://app.cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-inline",
    calLink: CAL_LINK,
    config: { layout: "month_view", theme: "light", useSlotsViewOnSmallScreen: "true" }
  });
}
