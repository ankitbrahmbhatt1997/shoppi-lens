import React from 'react';

export default function LanguageOptions() {
  const languages = [
    { text: "हिन्दी", code: "hi" },
    { text: "বাংলা", code: "bn" },
    { text: "తెలుగు", code: "te" },
    { text: "मराठी", code: "mr" },
    { text: "தமிழ்", code: "ta" },
    { text: "ગુજરાતી", code: "gu" },
    { text: "ಕನ್ನಡ", code: "kn" },
    { text: "മലയാളം", code: "ml" },
    { text: "ਪੰਜਾਬੀ", code: "pa" },
  ];

  return (
    <div className="mt-2 text-center text-gray-200 text-[1.4rem]">
      Google offered in:
      {languages.map((lang, index) => (
        <a
          key={lang.code}
          href="#"
          className={`hover:underline text-[#99c3ff] ${
            index === 0 ? "pl-4" : ""
          } pr-3`}
        >
          {lang.text}
        </a>
      ))}
    </div>
  );
}
