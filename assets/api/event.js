function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle("active");
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-YFPQ99W5LS");

if (typeof tampilkanPerhatian === 'function') {
  tampilkanPerhatian();
} else {
  console.warn("Fungsi tampilkanPerhatian tidak ditemukan.");
}

const API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCovt6yclEdiO-65W8z4zrqQ&order=date&type=video&maxResults=50&key=AIzaSyCz8u1pXBYfd4ZDq6eJtbdWD1EYq3luAB0";

const EXCLUDED_VIDEO_IDS = new Set([
  "Xhur1vSrrFk",
  "qNBStLB0tw0",
  "Txyh9zWXjTA",
  "KfGWIsOOCeY",
  "TxyV4tqbVXg",
]);

async function fetchVideos() {
  console.log("Memulai fetch video...");
  try {
    const response = await fetch(API_URL);
    console.log("Response status:", response.status);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log("Data dari API:", data);

    if (!data.items || data.items.length === 0) {
      document.getElementById("youtube-videos").innerHTML =
        '<p class="text-center w-full">Tidak ada video ditemukan.</p>';
      return;
    }

    const container = document.getElementById("youtube-videos");
    container.innerHTML = "";

    data.items.forEach((item) => {
      const videoId = item.id.videoId;

      if (EXCLUDED_VIDEO_IDS.has(videoId)) {
        console.log("Melewati video:", videoId);
        return; 
      }

      const title = item.snippet.title;
      const publishedAt = new Date(item.snippet.publishedAt);
      const formattedDate = publishedAt.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const watchUrl = `https://youtu.be/${videoId}`;

      const article = document.createElement("article");
      article.className = "event-card";
      article.innerHTML = `
        <a class="thumb" href="${watchUrl}" target="_blank" rel="noopener" aria-label="${title}">
          <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${title}">
        </a>
        <div class="event-body">
          <div class="event-date">${formattedDate}</div>
          <h3 class="event-title">${title}</h3>
          <a class="btn-watch" href="${watchUrl}" target="_blank" rel="noopener">
            Watch Now
          </a>
        </div>
      `;

      container.appendChild(article);
      console.log("Menambahkan video:", title);
    });
  } catch (error) {
    console.error("Cant Load Video:", error);
    document.getElementById("youtube-videos").innerHTML =
      '<p class="text-center w-full">Tidak dapat memuat video YouTube.</p>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM siap, memanggil fetchVideos...");
  fetchVideos();
});