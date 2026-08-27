/* Webrise Studio 2.0 — ein kleines Skript für alles.
   Ohne JavaScript bleibt die Seite vollständig benutzbar. */

(function () {
  "use strict";

  var sanft = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Handy-Menü ─────────────────────────────────────────── */
  var menueKnopf = document.querySelector(".menue-knopf");
  var handyMenue = document.getElementById("handy-menue");

  if (menueKnopf && handyMenue) {
    menueKnopf.addEventListener("click", function () {
      var offen = menueKnopf.getAttribute("aria-expanded") === "true";
      menueKnopf.setAttribute("aria-expanded", String(!offen));
      handyMenue.setAttribute("data-offen", String(!offen));
      document.body.style.overflow = offen ? "" : "hidden";
    });

    // Beim Klick auf einen Link wieder zumachen
    handyMenue.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        menueKnopf.setAttribute("aria-expanded", "false");
        handyMenue.setAttribute("data-offen", "false");
        document.body.style.overflow = "";
      }
    });

    // Escape schließt
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && handyMenue.getAttribute("data-offen") === "true") {
        menueKnopf.setAttribute("aria-expanded", "false");
        handyMenue.setAttribute("data-offen", "false");
        document.body.style.overflow = "";
        menueKnopf.focus();
      }
    });
  }

  /* ── Videos: laden erst beim Antippen ───────────────────── */
  document.querySelectorAll("[data-video]").forEach(function (knopf) {
    knopf.addEventListener("click", function () {
      var rahmen = knopf.closest(".video-rahmen");
      var quelle = knopf.getAttribute("data-video");
      var poster = knopf.getAttribute("data-poster") || "";
      if (!rahmen || !quelle) return;

      var video = document.createElement("video");
      video.src = quelle;
      video.poster = poster;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "auto";

      rahmen.innerHTML = "";
      rahmen.appendChild(video);
      rahmen.style.cursor = "default";
    });
  });

  /* ── Sanftes Einblenden beim Scrollen ───────────────────── */
  if (!sanft || !("IntersectionObserver" in window)) return;

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (eintrag) {
      if (!eintrag.isIntersecting) return;
      var el = eintrag.target;
      var verzug = parseInt(el.getAttribute("data-verzug") || "0", 10);
      setTimeout(function () { el.classList.add("da"); }, verzug);
      beobachter.unobserve(el);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

  // Blöcke, die einlaufen dürfen
  var auswahl = ".kopfzeile-block, .leistung, .weiche-block, .ablauf li, " +
                ".video-halter, .punkt-block, .gesicht, .problem-raster, " +
                ".verlauf, .hoerprobe, .protokoll";

  document.querySelectorAll(auswahl).forEach(function (el) {
    // Was beim Laden schon im Bild steht, nicht verstecken
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("zeigt");
    beobachter.observe(el);
  });

  // Die Anrufliste läuft Zeile für Zeile ein — das ist das Erkennungszeichen
  document.querySelectorAll(".protokoll ol").forEach(function (liste) {
    if (liste.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    Array.prototype.forEach.call(liste.children, function (zeile, i) {
      zeile.classList.add("laeuft");
      zeile.setAttribute("data-verzug", String(i * 110));
      beobachter.observe(zeile);
    });
  });
})();
