(() => {
  const pageLanguage = document.currentScript.dataset.language;
  const url = new URL(window.location.href);
  const selected = url.searchParams.get("lang");
  const storageKey = "fondlab-language";
  const supported = (language) => language === "en" || language === "zh";

  if (supported(selected)) {
    try {
      localStorage.setItem(storageKey, selected);
    } catch {
      // The explicit selection still works when browser storage is unavailable.
    }
    return;
  }

  // The Chinese address can be shared directly.
  if (pageLanguage !== "en") return;

  let preference;
  try {
    preference = localStorage.getItem(storageKey);
  } catch {
    // Fall back to the browser's language when storage is unavailable.
  }

  const browserLanguage = navigator.languages?.[0] || navigator.language || "en";
  const language = supported(preference)
    ? preference
    : /^zh(?:-|$)/i.test(browserLanguage) ? "zh" : "en";

  if (language === "zh") {
    const target = new URL("./zh/", url);
    target.search = url.search;
    target.hash = url.hash;
    window.location.replace(target);
  }
})();
