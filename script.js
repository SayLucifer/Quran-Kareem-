// Function to change between light and dark themes
const toggle = document.getElementById("theme-toggle");
const body = document.getElementById("body");

// Apply the saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  body.classList.replace("bg-gray-100", "bg-gray-900");
  body.classList.replace("text-gray-900", "text-gray-100");
  toggle.textContent = "☀️ الوضع النهاري";
}

// Event listener to toggle themes
toggle.addEventListener("click", () => {
  const isDark = body.classList.contains("bg-gray-900");

  if (isDark) {
    body.classList.replace("bg-gray-900", "bg-gray-100");
    body.classList.replace("text-gray-100", "text-gray-900");
    toggle.textContent = "🌙 الوضع الليلي";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.replace("bg-gray-100", "bg-gray-900");
    body.classList.replace("text-gray-900", "text-gray-100");
    toggle.textContent = "☀️ الوضع النهاري";
    localStorage.setItem("theme", "dark");
  }
});

// Load Surahs dynamically from the API
const listContainer = document.getElementById("surah-list");

fetch("https://api.alquran.cloud/v1/surah")
  .then(response => response.json())
  .then(data => {
    data.data.forEach(surah => {
      const li = document.createElement("li");
      li.className = "max-w-sm w-full bg-white shadow-lg rounded-lg p-4 mb-4";

      // Surah title and number
      const surahTitle = document.createElement("h3");
      surahTitle.className = "text-xl font-bold mb-2 text-center text-blue-600";
      surahTitle.textContent = `${surah.number}. ${surah.name}`;

      // Bookmark button
      const bookmarkButton = document.createElement("button");
      bookmarkButton.textContent = "📌";
      bookmarkButton.className = "bg-green-500 text-white px-4 py-2 rounded w-full";
      
      if (localStorage.getItem(`bookmark_${surah.number}`)) {
        bookmarkButton.textContent = "✅ Bookmarked";
      }

      bookmarkButton.addEventListener("click", () => {
        const isBookmarked = localStorage.getItem(`bookmark_${surah.number}`);
        if (isBookmarked) {
          localStorage.removeItem(`bookmark_${surah.number}`);
          bookmarkButton.textContent = "📌";
        } else {
          localStorage.setItem(`bookmark_${surah.number}`, surah.name);
          bookmarkButton.textContent = "✅ Bookmarked";
        }
      });

      // Append all elements to the list item
      li.appendChild(surahTitle);
      li.appendChild(bookmarkButton);
      listContainer.appendChild(li);
    });
  })
  .catch(() => {
    listContainer.innerHTML = "<li>تعذر تحميل البيانات. تحقق من الاتصال بالإنترنت.</li>";
  });

// Register the service worker to make it a PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Array of duas
const duas = [
  "اللهم اجعل هذا الكتاب صدقة عني وعن كل من أحببت وأحبني، وأسألك يا الله أن تجمعنا في الجنة.",
  "اللهم اجعل القرآن شفيعاً لنا يوم القيامة.",
  "اللهم اجعلني من أهل القرآن الذين هم أهل الله وخاصته.",
  "اللهم اجعل القرآن نوراً في قلبي، وشفاءً لصدري، وجلاءً لأحزاني.",
  "اللهم اجعلني من الذين يقرؤون القرآن في الدنيا، ويدخلون به الجنة في الآخرة."
];

function getRandomDuaa() {
  return duas[Math.floor(Math.random() * duas.length)];
}

function addDuaa() {
  const duaaText = getRandomDuaa();
  let duaaContainer = document.getElementById("duaa-container");

  if (!duaaContainer) {
    duaaContainer = document.createElement("div");
    duaaContainer.id = "duaa-container";
    duaaContainer.className = "text-center p-4 mt-4 bg-gray-200 text-gray-800";

    const duaaParagraph = document.createElement("p");
    duaaParagraph.id = "duaa-text";
    duaaParagraph.textContent = duaaText;

    duaaContainer.appendChild(duaaParagraph);
    document.body.appendChild(duaaContainer);
  } else {
    const duaaParagraph = duaaContainer.querySelector("#duaa-text");
    duaaParagraph.textContent = duaaText;
  }
}

window.onload = () => {
  addDuaa();
  setInterval(addDuaa, 3000);
};
