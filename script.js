// ============================
// LOGIN FUNCTIONALITY
// ============================
let currentAnimal = "duck"; // default for login
const icon = document.getElementById("animal-icon");
const message = document.getElementById("message");

if (icon) { // only run if login page exists
  icon.addEventListener("click", () => {
    if (currentAnimal === "duck") {
      currentAnimal = "chicken";
      icon.textContent = "🐔";
    } else {
      currentAnimal = "duck";
      icon.textContent = "🦆";
    }
  });
}

function login() {
  const passwordInput = document.getElementById("password");
  if (!passwordInput) return; // skip if login page not present

  const password = passwordInput.value;

  // Hardcoded passwords
  const duckPassword = "duck123";
  const chickenPassword = "chicken123";

  if (currentAnimal === "duck" && password === duckPassword) {
    message.style.color = "lightgreen";
    message.textContent = "✅ Welcome back Lord blvnk";
    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 1000);
  } else if (currentAnimal === "chicken" && password === chickenPassword) {
    message.style.color = "lightgreen";
    message.textContent = "✅ Login successful (send some snaps btw)";
    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "quit rushing type again, correctly this time";
  }
}

// ============================
// SIDEBAR TOGGLE
// ============================
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.querySelector(".sidebar");

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// ============================
// FILTER MOVIES BY STATUS
// ============================
function filterMoviesByStatus(status) {
  const movies = document.querySelectorAll(".movie-tile");
  movies.forEach(movie => {
    if (status === "all") {
      movie.style.display = "block";
    } else if (movie.dataset.status === status) {
      movie.style.display = "block";
    } else {
      movie.style.display = "none";
    }
  });
}
// Movie data: all start as not-watched and rating 0
const movies = [
  { title: "6sense", img: "movie posters/6sense.jpg", status: "not-watched", rating: 0 },
  { title: "Anomalisa", img: "movie posters/Anomalisa.jpg", status: "not-watched", rating: 0 },
  { title: "Berserk (1997)", img: "movie posters/Berserk (1997).jpg", status: "not-watched", rating: 0 },
  { title: "blackswan", img: "movie posters/blackswan.jpg", status: "not-watched", rating: 0 },
  { title: "Burning", img: "movie posters/Burning.jpg", status: "not-watched", rating: 0 },
  { title: "caddo", img: "movie posters/caddo.jpg", status: "not-watched", rating: 0 },
  { title: "different man", img: "movie posters/different man.jpg", status: "not-watched", rating: 0 },
  { title: "dogtooth", img: "movie posters/dogtooth.jpg", status: "not-watched", rating: 0 },
  { title: "drive", img: "movie posters/drive.jpg", status: "not-watched", rating: 0 },
  { title: "eyes", img: "movie posters/eyes.jpg", status: "not-watched", rating: 0 },
  { title: "fog", img: "movie posters/fog.jpg", status: "not-watched", rating: 0 },
  { title: "Forgotten", img: "movie posters/Forgotten.jpg", status: "not-watched", rating: 0 },
  { title: "ghost", img: "movie posters/ghost.jpg", status: "not-watched", rating: 0 },
  { title: "heat", img: "movie posters/heat.jpg", status: "not-watched", rating: 0 },
  { title: "heaven", img: "movie posters/heaven.jpg", status: "not-watched", rating: 0 },
  { title: "Mystic River", img: "movie posters/Mystic River.jpg", status: "not-watched", rating: 0 },
  { title: "NO COUNTRY FOR OLD MEN", img: "movie posters/NO COUNTRY FOR OLD MEN.jpg", status: "not-watched", rating: 0 },
  { title: "Nocturnal Animals", img: "movie posters/Nocturnal Animals.jpg", status: "not-watched", rating: 0 },
  { title: "PAN'S LABYRINTH", img: "movie posters/PAN'S LABYRINTH .jpg", status: "not-watched", rating: 0 },
  { title: "pianist", img: "movie posters/pianist.jpg", status: "not-watched", rating: 0 },
  { title: "Pleasantville", img: "movie posters/Pleasantville.jpg", status: "not-watched", rating: 0 },
  { title: "primal", img: "movie posters/primal.jpg", status: "not-watched", rating: 0 },
  { title: "Psycho", img: "movie posters/Psycho.jpg", status: "not-watched", rating: 0 },
  { title: "Requiem for a Dream", img: "movie posters/Requiem for a Dream.jpg", status: "not-watched", rating: 0 },
  { title: "river wind", img: "movie posters/river wind.jpg", status: "not-watched", rating: 0 },
  { title: "saw the devil", img: "movie posters/saw the devil.jpg", status: "not-watched", rating: 0 },
  { title: "source code", img: "movie posters/source code.jpg", status: "not-watched", rating: 0 },
  { title: "Synecdoche", img: "movie posters/Synecdoche.jpg", status: "not-watched", rating: 0 },
  { title: "tell no one", img: "movie posters/tell no one.jpg", status: "not-watched", rating: 0 },
  { title: "the departed", img: "movie posters/the departed .jpg", status: "not-watched", rating: 0 },
  { title: "The Machinist", img: "movie posters/The Machinist.jpg", status: "not-watched", rating: 0 }
];

// Save and load from localStorage for persistence
function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}
function loadMovies() {
  const data = localStorage.getItem("movies");
  if (data) {
    const arr = JSON.parse(data);
    arr.forEach((m, i) => {
      movies[i].status = m.status;
      movies[i].rating = m.rating;
    });
  }
}
loadMovies();

function renderMovies(filterStatus = "all") {
  const grid = document.querySelector(".movie-grid");
  if (!grid) return;
  grid.innerHTML = "";
  movies.forEach((movie, idx) => {
    if (filterStatus === "all" || movie.status === filterStatus) {
      const div = document.createElement("div");
      div.className = "movie-tile";
      div.innerHTML = `
        <img src="${movie.img}" alt="${movie.title}">
        <div style="margin:8px 0;">
          <button class="toggle-status" data-idx="${idx}">
            ${movie.status === "watched" ? "Unmark Watched" : "Mark as Watched"}
          </button>
        </div>
        <div class="star-rating" data-idx="${idx}">
          ${[1,2,3,4,5].map(star => `
            <span class="star" data-star="${star}" style="cursor:pointer; color:${movie.rating >= star ? "#FFD700" : "#888"}">&#9733;</span>
          `).join("")}
        </div>
      `;
      grid.appendChild(div);
    }
  });

  // Add event listeners for status toggle
  document.querySelectorAll(".toggle-status").forEach(btn => {
    btn.onclick = function() {
      const idx = +this.dataset.idx;
      movies[idx].status = movies[idx].status === "watched" ? "not-watched" : "watched";
      saveMovies();
      renderMovies(filterStatus);
    };
  });

  // Add event listeners for star rating
  document.querySelectorAll(".star-rating").forEach(div => {
    div.onclick = function(e) {
      if (e.target.classList.contains("star")) {
        const idx = +this.dataset.idx;
        const star = +e.target.dataset.star;
        movies[idx].rating = star;
        saveMovies();
        renderMovies(filterStatus);
      }
    };
  });
}

// On homepage.html, show all movies
if (window.location.pathname.endsWith("homepage.html")) {
  renderMovies("all");
}
if (window.location.pathname.endsWith("watched.html")) {
  renderMovies("watched");
}
if (window.location.pathname.endsWith("unwatched.html")) {
  renderMovies("not-watched");
}
// Add these functions to your script.js

function exportMovies() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(movies));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "movies.json");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
}

function importMovies(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        imported.forEach((m, i) => {
          movies[i] = m;
        });
        saveMovies();
        renderMovies("all");
      }
    } catch (err) {
      alert("Invalid file!");
    }
  };
  reader.readAsText(file);
}