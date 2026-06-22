    const words = [
      '"Full Stack Developer"',
      '"Digital Maker"',
      '"Interactive Web Creator"',
      '"3D Printing Maker"',
      '"Problem Solver"'
    ];

    const typingEl = document.getElementById("typing");
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = words[wordIndex];

      if (!deleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1200);
          return;
        }
      } else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 45 : 75);
    }

    type();

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
          const visible = filter === "all" || card.dataset.category === filter;
          card.style.display = visible ? "block" : "none";
        });
      });
    });

    const heroPanel = document.querySelector(".hero-panel");

    heroPanel.addEventListener("mousemove", (event) => {
      const rect = heroPanel.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      heroPanel.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroPanel.addEventListener("mouseleave", () => {
      heroPanel.style.transform = "rotateX(0deg) rotateY(0deg)";
    });


const labInput = document.getElementById("labInput");
const labRun = document.getElementById("labRun");
const labOutput = document.getElementById("labOutput");
const labChips = document.querySelectorAll(".lab-chip");

const commandResponses = {
  skills: [
    "Backend: C#, ASP.NET, .NET, SQL Server.",
    "Frontend: HTML, CSS, JavaScript, Tailwind CSS, interfacce responsive.",
    "Maker: stampa 3D FDM, prototipazione, gadget personalizzati."
  ],
  projects: [
    "Progetti principali: Sea Garden Apartments, Notte al Cerasia, gestionali aziendali, app accessi APS, stampa 3D.",
    "Focus: trasformare idee in prodotti digitali o fisici concreti."
  ],
  maker: [
    "Materiali disponibili: PLA, PETG, TPU.",
    "In arrivo: ABS e ASA dopo test tecnici.",
    "Output: gadget, prototipi, supporti, oggetti personalizzati."
  ],
  contact: [
    "Email: aversanicola@live.it",
    "GitHub: https://github.com/nicoave97",
    "LinkedIn: https://www.linkedin.com/in/nicola-aversa/",
    "Instagram: https://www.instagram.com/nicoave97/",
    "Puoi aprire una richiesta rapida dalla sezione Contatti."
  ],
  game: [
    "Progetto interattivo: Notte al Cerasia — Minigioco Evento.",
    "Link: https://nicoave97.github.io/NotteAlCerasiaMinigioco/"
  ],
  clear: []
};

function appendLabLine(content, type = "normal") {
  const p = document.createElement("p");
  if (type === "command") {
    p.innerHTML = `<span class="term-cyan">&gt; ${content}</span>`;
  } else if (type === "error") {
    p.innerHTML = `<span style="color:#fca5a5">${content}</span>`;
  } else {
    p.textContent = content;
  }
  labOutput.appendChild(p);
  labOutput.scrollTop = labOutput.scrollHeight;
}

function runLabCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  if (command === "clear") {
    labOutput.innerHTML = "";
    appendLabLine("Sistema pulito. Digita skills, projects, maker, contact o game.");
    return;
  }

  appendLabLine(command, "command");

  if (!commandResponses[command]) {
    appendLabLine("Comando non riconosciuto. Prova: skills, projects, maker, contact, game, clear.", "error");
    return;
  }

  commandResponses[command].forEach(line => appendLabLine(line));
}

if (labRun && labInput) {
  labRun.addEventListener("click", () => {
    runLabCommand(labInput.value);
    labInput.value = "";
    labInput.focus();
  });

  labInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      runLabCommand(labInput.value);
      labInput.value = "";
    }
  });
}

labChips.forEach(chip => {
  chip.addEventListener("click", () => runLabCommand(chip.dataset.command));
});

const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const projectData = {
  gestionale: {
    kicker: "SOFTWARE",
    title: "Gestionale aziendale",
    text: "Soluzioni web per gestione dati, utenti, documenti, report ed esportazioni. Il focus è semplificare flussi operativi, ridurre errori manuali e rendere i dati più facili da consultare.",
    tags: ["C#", "ASP.NET", "SQL Server", "DevExpress", "Excel/PDF"]
  },
  seagarden: {
    kicker: "REAL WEBSITE",
    title: "Sea Garden Apartments",
    text: "Sito web responsive per struttura ricettiva, con presentazione appartamenti, sezioni informative, contatti e collegamento al sito reale online.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive", "SEO base"]
  },
  accessi: {
    kicker: "APP CONCEPT",
    title: "App accessi APS",
    text: "Concept per gestione ingressi/uscite tramite QR code, ruoli utente e storico dati. Un progetto pensato per digitalizzare una necessità concreta associativa.",
    tags: ["Android", "Kotlin", "SQLite", "QR Code"]
  },
  cerasia: {
    kicker: "INTERACTIVE",
    title: "Notte al Cerasia — Minigioco",
    text: "Minigioco HTML creato come invito digitale interattivo per evento associativo. Unisce comunicazione, gioco, classifica e partecipazione.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Gamification"]
  },
  stampa3d: {
    kicker: "MAKER",
    title: "Stampa 3D personalizzata",
    text: "Gadget, portachiavi, prototipi e oggetti su misura realizzati tramite stampa 3D FDM, con attenzione a materiale, utilizzo e resa finale.",
    tags: ["FDM", "PLA", "PETG", "TPU", "Custom"]
  }
};

const modal = document.getElementById("projectModal");
const modalKicker = document.getElementById("projectModalKicker");
const modalTitle = document.getElementById("projectModalTitle");
const modalText = document.getElementById("projectModalText");
const modalTags = document.getElementById("projectModalTags");

document.querySelectorAll(".project-detail-btn").forEach(button => {
  button.addEventListener("click", () => {
    const data = projectData[button.dataset.project];
    if (!data || !modal) return;

    modalKicker.textContent = data.kicker;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    modalTags.innerHTML = data.tags.map(tag => `<span class="mini-tag">${tag}</span>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach(element => {
  element.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});


const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");

function openMobileMenu() {
  if (!mobileMenu || !mobileMenuBtn) return;
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
  mobileMenuBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  if (!mobileMenu || !mobileMenuBtn) return;
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  mobileMenuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", openMobileMenu);
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenuBackdrop) {
  mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
}

mobileMenuLinks.forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
