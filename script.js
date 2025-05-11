Function to change between light and dark themes
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
      const a = document.createElement("a");
      a.href = surah${surah.number}.html;  // Navigate to Surah page
      a.className = "text-blue-600 hover:text-blue-800 visited:text-purple-600 rounded-md px-3 py-1 bg-white hover:bg-gray-100 transition-colors duration-200 shadow";
      a.textContent = ${surah.number}. ${surah.name};
      
      // Create a bookmark button for each surah
      const bookmarkButton = document.createElement("button");
      bookmarkButton.textContent = "📌";
      bookmarkButton.className = "ml-2 bg-green-500 text-white px-2 py-1 rounded";
      
      // Check if the Surah is already bookmarked
      if (localStorage.getItem(bookmark_${surah.number})) {
        bookmarkButton.textContent = "✅ Bookmarked";
      }

      bookmarkButton.addEventListener("click", () => {
        const isBookmarked = localStorage.getItem(bookmark_${surah.number});
        if (isBookmarked) {
          localStorage.removeItem(bookmark_${surah.number});
          bookmarkButton.textContent = "📌";
        } else {
          localStorage.setItem(bookmark_${surah.number}, surah.name);
          bookmarkButton.textContent = "✅ Bookmarked";
        }
      });

      li.appendChild(a);
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

// Function to get a random duaa
function getRandomDuaa() {
  return duas[Math.floor(Math.random() * duas.length)];
}

// Function to display the duaa in the container
function addDuaa() {
  const duaaText = getRandomDuaa();
  const duaaContainer = document.getElementById("duaa-container");

  // If duaa container does not exist, create it
  if (!duaaContainer) {
    const duaaContainer = document.createElement("div");
    duaaContainer.id = "duaa-container";
    duaaContainer.className = "text-center p-4 mt-4 bg-gray-200 text-gray-800";

    // Add duaa text
    const duaaParagraph = document.createElement("p");
    duaaParagraph.id = "duaa-text";
    duaaParagraph.textContent = duaaText;

    // Append the duaa text to the container
    duaaContainer.appendChild(duaaParagraph);

    // Append the duaa container to the body
    document.body.appendChild(duaaContainer);
  } else {
    // If duaa container exists, just update the text
    const duaaParagraph = duaaContainer.querySelector("#duaa-text");
    duaaParagraph.textContent = duaaText;
  }
}

// Call the function to add duaa when the page loads
window.onload = () => {
  addDuaa(); // Add initial duaa

  // Change duaa every 3 seconds
  setInterval(addDuaa, 3000);
};
