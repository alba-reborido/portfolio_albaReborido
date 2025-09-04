let i18n = {};

document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.getElementById("langMenu");
  const langItems = document.querySelectorAll(".dropdown-item");

  const loadLanguage = async (lang) => {
    try {
      const res = await fetch(`lang/${lang}.json`);
      if (!res.ok) throw new Error("No se pudo cargar el idioma");
      const data = await res.json();
      
      i18n = data; 

      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });

      langSelector.innerHTML = `${data.langFlag} ${data.langName}`;
      initFormValidation();
      
    } catch (err) {
      console.error(err);
    }
  };

  const savedLang = localStorage.getItem("lang") || "es";
  loadLanguage(savedLang);

  langItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = item.dataset.lang;
      localStorage.setItem("lang", lang);
      loadLanguage(lang);
    });
  });
});
