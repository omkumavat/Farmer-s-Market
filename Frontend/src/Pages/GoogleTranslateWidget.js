
/* global google */
import React, { useEffect } from "react";

const GoogleTranslateWidget = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("script[src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit']")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // Default language
              includedLanguages: "en,mr,hi", // Only allow English (en), Marathi (mr), and Hindi (hi)
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Optional: Compact layout
              autoDisplay: false, // Optional: Disable automatic display of translation
            },
            "google_translate_element"
          );
        };
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslateWidget;
