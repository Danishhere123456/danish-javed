(function () {
  var profile = window.profileData || {};

  function text(selector, value) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  function html(selector, value) {
    var element = document.querySelector(selector);
    if (element) element.innerHTML = value;
  }

  function addLink(container, label, href, external) {
    if (!href) return;
    var link = document.createElement("a");
    link.className = "contact-link";
    link.href = href;
    link.textContent = label + " ";
    var arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    link.appendChild(arrow);
    if (external) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    container.appendChild(link);
  }

  text("[data-name]", profile.name || "Your Name");
  text("[data-short-name]", profile.shortName || "YN");
  html("[data-headline]", profile.headline || "Curiosity turned into <em>useful work.</em>");
  text("[data-intro]", profile.intro || "A thoughtful home for ideas, projects, and the next question worth pursuing.");
  text("[data-about-title]", profile.aboutTitle || "Thoughtful by default. Practical on purpose.");
  text("[data-about]", profile.about || "");
  text("[data-availability]", profile.availability || "");
  document.title = (profile.name || "Your Name") + " | Profile";
  document.getElementById("year").textContent = new Date().getFullYear();

  var facts = document.getElementById("quick-facts");
  (profile.facts || []).forEach(function (fact) {
    var row = document.createElement("div");
    var term = document.createElement("dt");
    var detail = document.createElement("dd");
    term.textContent = fact[0];
    detail.textContent = fact[1];
    row.appendChild(term);
    row.appendChild(detail);
    facts.appendChild(row);
  });

  var grid = document.getElementById("project-grid");
  (profile.projects || []).forEach(function (project) {
    var card = document.createElement("article");
    card.className = "project-card";
    var label = document.createElement("p");
    label.className = "project-index";
    label.textContent = project.label;
    var title = document.createElement("h3");
    title.textContent = project.title;
    var description = document.createElement("p");
    description.textContent = project.description;
    card.appendChild(label);
    card.appendChild(title);
    card.appendChild(description);
    grid.appendChild(card);
  });

  var list = document.getElementById("principle-list");
  (profile.principles || []).forEach(function (principle, index) {
    var item = document.createElement("li");
    var number = document.createElement("span");
    number.className = "principle-number";
    number.textContent = "0" + (index + 1);
    var copy = document.createElement("div");
    var title = document.createElement("h3");
    title.textContent = principle.title;
    var description = document.createElement("p");
    description.textContent = principle.description;
    copy.appendChild(title);
    copy.appendChild(description);
    item.appendChild(number);
    item.appendChild(copy);
    list.appendChild(item);
  });

  var linkedinButton = document.querySelector("[data-linkedin]");
  if (profile.linkedin) {
    linkedinButton.href = profile.linkedin;
    linkedinButton.hidden = false;
  }

  var emailButton = document.querySelector("[data-email]");
  if (profile.email) {
    emailButton.href = "mailto:" + profile.email;
    emailButton.hidden = false;
  }

  var contact = document.getElementById("contact-links");
  addLink(contact, "LinkedIn", profile.linkedin, true);
  addLink(contact, "GitHub", profile.github, true);
  addLink(contact, "Email", profile.email ? "mailto:" + profile.email : "", false);
})();
