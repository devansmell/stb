(function () {
  const KEY = "stb-motion";
  const DEFAULT_ON = true;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const images = Array.from(document.querySelectorAll("img.bg[data-motion-src]"));
  if (!images.length) return;

  const readStored = () => {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  };
  const store = (value) => {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  };
  const preferred = () => {
    const saved = readStored();
    if (saved === "on" || saved === "off") return saved === "on";
    return DEFAULT_ON && !reduce.matches;
  };

  images.forEach((img) => { img.dataset.stillSrc = img.getAttribute("src"); });

  const button = document.createElement("button");
  button.type = "button";
  button.className = "motion-toggle";

  let on = false;

  const apply = (next) => {
    on = next;
    images.forEach((img) => {
      const target = on ? img.dataset.motionSrc : img.dataset.stillSrc;
      if (img.getAttribute("src") === target) return;
      if (on) {
        const loader = new Image();
        loader.onload = () => { if (on) img.src = target; };
        loader.src = target;
      } else {
        img.src = target;
      }
    });
    button.textContent = on ? "pause background" : "play background";
  };

  button.addEventListener("click", () => {
    apply(!on);
    store(on ? "on" : "off");
  });

  reduce.addEventListener("change", () => {
    if (!readStored()) apply(preferred());
  });

  document.body.appendChild(button);
  apply(preferred());
})();
