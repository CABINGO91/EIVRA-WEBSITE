/* =========================================
   EIVRA
   Website interactions
========================================= */


/* Årstall */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================
   Musepeker-glow
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

  document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

  });

}


/* =========================================
   Kontakt / visittkort
========================================= */

const contactButton = document.getElementById("contactButton");
const contactModal = document.getElementById("contactModal");
const closeContact = document.getElementById("closeContact");

function openContactCard() {

  if (!contactModal) return;

  contactModal.classList.add("active");
  contactModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  createQRCode();
}


function closeContactCard() {

  if (!contactModal) return;

  contactModal.classList.remove("active");
  contactModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


if (contactButton) {
  contactButton.addEventListener("click", openContactCard);
}


if (closeContact) {
  closeContact.addEventListener("click", closeContactCard);
}


/* Klikk utenfor kortet */

if (contactModal) {

  contactModal.addEventListener("click", (event) => {

    if (event.target.classList.contains("modal-backdrop")) {
      closeContactCard();
    }

  });

}


/* ESC lukker kortet */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeContactCard();
  }

});


/* =========================================
   QR-KODE
========================================= */

let qrCreated = false;

function createQRCode() {

  const qrContainer = document.getElementById("qrcode");

  if (!qrContainer || qrCreated) return;

  if (typeof QRCode === "undefined") {
    console.warn("QR-biblioteket er ikke lastet.");
    return;
  }

  /*
    QR-koden peker til EIVRA-nettsiden.
    Når nettsiden ligger på ditt endelige domene,
    vil kameraet åpne nettsiden direkte.
  */

  const destination =
    window.location.origin +
    window.location.pathname;

  new QRCode(qrContainer, {
    text: destination,
    width: 111,
    height: 111,
    colorDark: "#071006",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  qrCreated = true;
}


/* =========================================
   LAST NED KONTAKTINFO
========================================= */

const downloadVcard =
  document.getElementById("downloadVcard");


if (downloadVcard) {

  downloadVcard.addEventListener("click", () => {

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Stefan Vedvik Lindberg",
      "ORG:EIVRA",
      "TITLE:Utvikler",
      "TEL;TYPE=CELL:+4747837773",
      "EMAIL;TYPE=WORK:Stefan.Lindberg@eivra.no",
      "ADR;TYPE=WORK:;;Fredrikstad;;;Norway",
      "URL:https://eivra.no",
      "END:VCARD"
    ].join("\r\n");


    const blob = new Blob(
      [vcard],
      {
        type: "text/vcard;charset=utf-8"
      }
    );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href = url;
    link.download =
      "Stefan-Vedvik-Lindberg-EIVRA.vcf";


    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

  });

}


/* =========================================
   Smooth scrolling
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target =
      document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});