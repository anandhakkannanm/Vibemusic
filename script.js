/**
 * VibeMusic – script.js
 * =========================================================
 * Fully client-side music player with:
 *  - Playlist system
 *  - Real-time search
 *  - Play / Pause / Prev / Next / Shuffle / Repeat
 *  - Seekable progress bar & volume control
 *  - Keyboard shortcuts (Space, ArrowLeft, ArrowRight, M)
 *  - Dynamic card rendering with gradient covers
 *  - Auto-play next song on end
 * =========================================================
 */

/* ─────────────────────────────────────────────────────────
   1. SONG DATA
   Each song object:
   {
     id:      unique string,
     name:    song title,
     artist:  artist name,
     file:    path to audio file (in songs/),
     cover:   path to cover image (in covers/) OR null,
     emoji:   emoji used when no cover image,
     theme:   CSS class for gradient cover (cover-theme-N),
     genre:   genre tag
   }
───────────────────────────────────────────────────────── */
const SONGS = [
  {
    id: "s1",
    name: "Midnight Neon",
    artist: "Synth Collective",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: null,
    emoji: "🌃",
    theme: "cover-theme-1",
    genre: "Electronic",
    duration: "3:42"
  },
  {
    id: "s2",
    name: "Golden Hour",
    artist: "Aria Waves",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: null,
    emoji: "🌅",
    theme: "cover-theme-2",
    genre: "Pop",
    duration: "4:05"
  },
  {
    id: "s3",
    name: "City Lights",
    artist: "Urban Echo",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: null,
    emoji: "🏙️",
    theme: "cover-theme-3",
    genre: "Hip-Hop",
    duration: "3:28"
  },
  {
    id: "s4",
    name: "Ocean Breeze",
    artist: "Tidal Flow",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: null,
    emoji: "🌊",
    theme: "cover-theme-4",
    genre: "Ambient",
    duration: "5:12"
  },
  {
    id: "s5",
    name: "Electric Soul",
    artist: "Volt Empire",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: null,
    emoji: "⚡",
    theme: "cover-theme-5",
    genre: "Dance",
    duration: "3:55"
  },
  {
    id: "s6",
    name: "Neon Dreams",
    artist: "Pixel Pulse",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: null,
    emoji: "💜",
    theme: "cover-theme-6",
    genre: "Synthwave",
    duration: "4:18"
  },
  {
    id: "s7",
    name: "Skyline Rush",
    artist: "Nova Pilot",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: null,
    emoji: "🚀",
    theme: "cover-theme-7",
    genre: "EDM",
    duration: "3:34"
  },
  {
    id: "s8",
    name: "Vibe Rising",
    artist: "VibeMusic Artists",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: null,
    emoji: "🎵",
    theme: "cover-theme-8",
    genre: "Chill",
    duration: "4:47"
  },

  /* ── Tamil Vibes ── */
  {
    id: "t1",
    name: "Kaadhal Ondru",
    artist: "VibeMusic Originals",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    cover: null,
    emoji: "🌺",
    theme: "cover-theme-9",
    genre: "Tamil Indie",
    duration: "4:12"
  },
  {
    id: "t2",
    name: "Mazhai Paadal",
    artist: "VibeMusic Originals",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    cover: null,
    emoji: "🌧️",
    theme: "cover-theme-10",
    genre: "Tamil Folk",
    duration: "3:58"
  },
  {
    id: "t3",
    name: "Nila Nila Odi Va",
    artist: "VibeMusic Originals",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    cover: null,
    emoji: "🌙",
    theme: "cover-theme-11",
    genre: "Tamil Melody",
    duration: "4:35"
  },
  {
    id: "t4",
    name: "Vaa Vaa Maname",
    artist: "VibeMusic Originals",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    cover: null,
    emoji: "🎶",
    theme: "cover-theme-12",
    genre: "Tamil Pop",
    duration: "3:40"
  },
  {
    id: "t5",
    name: "Unnai Naan Kaanbhen",
    artist: "VibeMusic Originals",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
    cover: null,
    emoji: "💛",
    theme: "cover-theme-13",
    genre: "Tamil Soul",
    duration: "5:02"
  }
];

/* ─────────────────────────────────────────────────────────
   2. PLAYLISTS
   Each playlist references song IDs from SONGS array
───────────────────────────────────────────────────────── */
const PLAYLISTS = [
  {
    id: "pl1",
    name: "🔥 My Playlist",
    songIds: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"]
  },
  {
    id: "pl2",
    name: "🎧 Chill Vibes",
    songIds: ["s4", "s8", "s2", "s6"]
  },
  {
    id: "pl3",
    name: "⚡ High Energy",
    songIds: ["s5", "s7", "s3", "s1"]
  },
  {
    id: "pl4",
    name: "🌅 Morning Mix",
    songIds: ["s2", "s4", "s8", "s6", "s3"]
  },
  {
    id: "pl5",
    name: "🌺 Tamil Vibes",
    songIds: ["t1", "t2", "t3", "t4", "t5"]
  }
];

/* Trending = first 6 songs; Recently Played = last 4 (reversed) */
const TRENDING_IDS  = ["s1","s2","s3","s4","s5","s6"];
const RECENT_IDS    = ["s8","s7","s5","s3"];
const TAMIL_IDS     = ["t1","t2","t3","t4","t5"];

/* ─────────────────────────────────────────────────────────
   3. STATE
───────────────────────────────────────────────────────── */
const state = {
  currentSongId:     null,  // which song is loaded
  isPlaying:         false,
  isShuffle:         false,
  isRepeat:          false,
  isMuted:           false,
  volume:            0.8,
  activeSection:     "home",      // home | search | library
  activePlaylistId:  "pl1",
  likedSongs:        new Set(),
  history:           [],           // songs played (for prev logic)
  historyIndex:      -1,
};

/* Lookup maps for quick access */
const songById     = Object.fromEntries(SONGS.map(s => [s.id, s]));
const playlistById = Object.fromEntries(PLAYLISTS.map(p => [p.id, p]));

/* ─────────────────────────────────────────────────────────
   4. DOM REFS
───────────────────────────────────────────────────────── */
const audio           = document.getElementById("audioPlayer");
const btnPlay         = document.getElementById("btnPlay");
const btnPrev         = document.getElementById("btnPrev");
const btnNext         = document.getElementById("btnNext");
const btnShuffle      = document.getElementById("btnShuffle");
const btnRepeat       = document.getElementById("btnRepeat");
const btnMute         = document.getElementById("btnMute");
const btnHeroPlay     = document.getElementById("btnHeroPlay");
const btnLike         = document.getElementById("playerLikeBtn");
const playerSongName  = document.getElementById("playerSongName");
const playerArtist    = document.getElementById("playerArtist");
const playerCoverEl   = document.getElementById("playerCover");
const playerCoverGlow = document.getElementById("playerCoverGlow");
const progressBarBg   = document.getElementById("progressBarBg");
const progressFilled  = document.getElementById("progressBarFilled");
const progressThumb   = document.getElementById("progressThumb");
const currentTimeEl   = document.getElementById("currentTime");
const totalTimeEl     = document.getElementById("totalTime");
const volumeBarBg     = document.getElementById("volumeBarBg");
const volumeBarFilled = document.getElementById("volumeBarFilled");
const volumeThumb     = document.getElementById("volumeThumb");
const searchInput     = document.getElementById("searchInput");
const searchClear     = document.getElementById("searchClear");
const heroDisc        = document.getElementById("heroDisc");
const sidebarToggle   = document.getElementById("sidebarToggle");
const sidebar         = document.getElementById("sidebar");

/* Grid containers */
const trendingGrid    = document.getElementById("trendingGrid");
const recentGrid      = document.getElementById("recentGrid");
const searchGrid      = document.getElementById("searchGrid");
const noResults       = document.getElementById("noResults");
const playlistTabs    = document.getElementById("playlistTabs");
const playlistSongs   = document.getElementById("playlistSongs");
const sidebarPLList   = document.getElementById("sidebarPlaylistList");

/* Section elements */
const sections = {
  home:    document.getElementById("sectionHome"),
  search:  document.getElementById("sectionSearch"),
  library: document.getElementById("sectionLibrary"),
};
const navLinks = document.querySelectorAll(".nav-link");

/* ─────────────────────────────────────────────────────────
   5. HELPERS
───────────────────────────────────────────────────────── */

/** Format seconds → "m:ss" */
function fmtTime(sec) {
  if (isNaN(sec) || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/** Build cover HTML for a song (img or gradient div) */
function buildCoverHTML(song, cls = "card-cover") {
  if (song.cover) {
    return `<img class="${cls}" src="${song.cover}" alt="${song.name} cover"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="card-cover-gradient ${song.theme}" style="display:none">${song.emoji}</div>`;
  }
  return `<div class="card-cover-gradient ${song.theme}">${song.emoji}</div>`;
}

/** Build small thumb HTML for playlist rows */
function buildThumbHTML(song) {
  if (song.cover) {
    return `<img class="playlist-row-thumb" src="${song.cover}" alt="${song.name}"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="playlist-row-thumb-gradient ${song.theme}" style="display:none">${song.emoji}</div>`;
  }
  return `<div class="playlist-row-thumb-gradient ${song.theme}">${song.emoji}</div>`;
}

/** Get the flat song list for the currently active playlist */
function getActiveSongList() {
  const pl = playlistById[state.activePlaylistId];
  if (pl) return pl.songIds.map(id => songById[id]).filter(Boolean);
  return SONGS;
}

/** Random integer in [0, n) */
function randInt(n) { return Math.floor(Math.random() * n); }

/* ─────────────────────────────────────────────────────────
   6. RENDER FUNCTIONS
───────────────────────────────────────────────────────── */

/** Render a song card element and return it */
function createSongCard(song) {
  const card = document.createElement("div");
  card.className = "song-card";
  card.dataset.songId = song.id;
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Play ${song.name} by ${song.artist}`);

  card.innerHTML = `
    <div class="card-cover-wrap">
      ${buildCoverHTML(song)}
      <span class="card-playing-badge">NOW PLAYING</span>
      <div class="card-play-overlay" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div class="card-equalizer" aria-hidden="true">
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
      </div>
    </div>
    <p class="card-title">${song.name}</p>
    <p class="card-artist">${song.artist}</p>
  `;

  /* Click or keyboard */
  card.addEventListener("click", () => playSong(song.id));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playSong(song.id); }
  });

  return card;
}

/** Render the trending grid */
function renderTrending() {
  trendingGrid.innerHTML = "";
  TRENDING_IDS.forEach(id => {
    const song = songById[id];
    if (song) trendingGrid.appendChild(createSongCard(song));
  });
}

/** Render the recently played grid */
function renderRecent() {
  recentGrid.innerHTML = "";
  RECENT_IDS.forEach(id => {
    const song = songById[id];
    if (song) recentGrid.appendChild(createSongCard(song));
  });
}

/** Render the Tamil Vibes grid */
function renderTamilVibes() {
  const grid = document.getElementById("tamilVibesGrid");
  if (!grid) return;
  grid.innerHTML = "";
  TAMIL_IDS.forEach(id => {
    const song = songById[id];
    if (song) grid.appendChild(createSongCard(song));
  });
}

/** Render the sidebar playlist links */
function renderSidebarPlaylists() {
  sidebarPLList.innerHTML = "";
  PLAYLISTS.forEach(pl => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" data-pl-id="${pl.id}" class="${pl.id === state.activePlaylistId ? "active" : ""}">${pl.name}</a>`;
    li.querySelector("a").addEventListener("click", e => {
      e.preventDefault();
      switchSection("library");
      switchPlaylist(pl.id);
    });
    sidebarPLList.appendChild(li);
  });
}

/** Render playlist tabs in Library */
function renderPlaylistTabs() {
  playlistTabs.innerHTML = "";
  PLAYLISTS.forEach(pl => {
    const btn = document.createElement("button");
    btn.className = `playlist-tab ${pl.id === state.activePlaylistId ? "active" : ""}`;
    btn.textContent = pl.name;
    btn.dataset.plId = pl.id;
    btn.addEventListener("click", () => switchPlaylist(pl.id));
    playlistTabs.appendChild(btn);
  });
}

/** Render playlist song rows in Library */
function renderPlaylistSongs() {
  playlistSongs.innerHTML = "";
  const pl   = playlistById[state.activePlaylistId];
  if (!pl) return;
  const list = pl.songIds.map(id => songById[id]).filter(Boolean);

  /* Header row */
  const header = document.createElement("div");
  header.className = "playlist-row";
  header.style.cssText = "cursor:default; color:var(--text-muted); font-size:0.75rem; font-weight:600; letter-spacing:1px; border-bottom:1px solid var(--border-subtle); border-radius:0; padding-bottom:0.4rem; margin-bottom:0.25rem;";
  header.innerHTML = `<span style="text-align:center">#</span><span>TITLE</span><span>ARTIST</span><span style="text-align:right">TIME</span>`;
  playlistSongs.appendChild(header);

  list.forEach((song, idx) => {
    const row = document.createElement("div");
    row.className = `playlist-row ${song.id === state.currentSongId ? "active" : ""}`;
    row.dataset.songId = song.id;

    row.innerHTML = `
      <span class="playlist-row-num">${idx + 1}</span>
      <div class="playlist-row-info">
        ${buildThumbHTML(song)}
        <div>
          <p class="playlist-row-title">${song.name}</p>
          <p class="playlist-row-artist">${song.artist}</p>
        </div>
      </div>
      <span class="playlist-row-artist-col">${song.artist}</span>
      <span class="playlist-row-duration">${song.duration}</span>
    `;

    row.addEventListener("click", () => playSong(song.id));
    playlistSongs.appendChild(row);
  });
}

/* ─────────────────────────────────────────────────────────
   7. SECTION NAVIGATION
───────────────────────────────────────────────────────── */
function switchSection(sectionName) {
  if (state.activeSection === sectionName) return;
  state.activeSection = sectionName;

  /* Update content sections */
  Object.entries(sections).forEach(([key, el]) => {
    el.classList.toggle("active", key === sectionName);
  });

  /* Update nav links */
  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.section === sectionName);
  });

  /* If switching to search, focus input */
  if (sectionName === "search") {
    setTimeout(() => searchInput.focus(), 100);
  }

  /* If switching to library, re-render */
  if (sectionName === "library") {
    renderPlaylistTabs();
    renderPlaylistSongs();
  }

  /* Close sidebar on mobile */
  if (window.innerWidth <= 700) {
    sidebar.classList.remove("open");
  }
}

/** Switch active playlist */
function switchPlaylist(plId) {
  state.activePlaylistId = plId;
  renderPlaylistTabs();
  renderPlaylistSongs();
  renderSidebarPlaylists();
}

/* ─────────────────────────────────────────────────────────
   8. PLAYBACK CORE
───────────────────────────────────────────────────────── */

/** Load and play a specific song by ID */
function playSong(songId, autoPlay = true) {
  const song = songById[songId];
  if (!song) return;

  const isSameSong = state.currentSongId === songId;

  /* If same song and already playing, just toggle */
  if (isSameSong) {
    togglePlayPause();
    return;
  }

  /* Load new song */
  state.currentSongId = songId;
  audio.src = song.file;
  audio.volume = state.isMuted ? 0 : state.volume;

  /* Update player UI */
  updatePlayerUI(song);

  /* Push to history */
  state.historyIndex++;
  state.history.splice(state.historyIndex, Infinity, songId);

  if (autoPlay) {
    audio.play().then(() => {
      state.isPlaying = true;
      setPlayIcon(true);
      heroDisc.classList.add("playing");
    }).catch(err => {
      /* File not found or browser blocked autoplay */
      console.warn("Playback error:", err);
      state.isPlaying = false;
      setPlayIcon(false);
    });
  }

  /* Highlight cards */
  highlightActiveSong();
}

/** Toggle play / pause */
function togglePlayPause() {
  if (!state.currentSongId) {
    /* Nothing loaded yet – play first song */
    playSong(SONGS[0].id);
    return;
  }
  if (state.isPlaying) {
    audio.pause();
    state.isPlaying = false;
    setPlayIcon(false);
    heroDisc.classList.remove("playing");
  } else {
    audio.play().then(() => {
      state.isPlaying = true;
      setPlayIcon(true);
      heroDisc.classList.add("playing");
    }).catch(console.warn);
  }
}

/** Navigate to previous song */
function playPrev() {
  /* If within first 3s, go to previous in history; otherwise restart */
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  if (state.historyIndex > 0) {
    state.historyIndex--;
    const prevId = state.history[state.historyIndex];
    const song = songById[prevId];
    if (song) {
      state.currentSongId = prevId;
      audio.src = song.file;
      audio.volume = state.isMuted ? 0 : state.volume;
      updatePlayerUI(song);
      audio.play().catch(console.warn);
      state.isPlaying = true;
      setPlayIcon(true);
      heroDisc.classList.add("playing");
      highlightActiveSong();
      return;
    }
  }

  /* Fallback: go to previous in current playlist */
  const list = getActiveSongList();
  const idx  = list.findIndex(s => s.id === state.currentSongId);
  const prevIdx = (idx - 1 + list.length) % list.length;
  playSong(list[prevIdx].id);
}

/** Navigate to next song */
function playNext() {
  const list = getActiveSongList();
  if (!list.length) return;

  let nextIdx;
  if (state.isShuffle) {
    /* Pick random index different from current */
    do { nextIdx = randInt(list.length); }
    while (list.length > 1 && list[nextIdx].id === state.currentSongId);
  } else {
    const idx = list.findIndex(s => s.id === state.currentSongId);
    nextIdx = (idx + 1) % list.length;
  }
  playSong(list[nextIdx].id);
}

/* ─────────────────────────────────────────────────────────
   9. AUDIO EVENTS
───────────────────────────────────────────────────────── */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFilled.style.width = pct + "%";
  progressThumb.style.left   = pct + "%";
  progressBarBg.setAttribute("aria-valuenow", Math.round(pct));
  currentTimeEl.textContent  = fmtTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = fmtTime(audio.duration);
});

audio.addEventListener("ended", () => {
  if (state.isRepeat) {
    audio.currentTime = 0;
    audio.play().catch(console.warn);
  } else {
    playNext();
  }
});

audio.addEventListener("play",  () => { state.isPlaying = true;  setPlayIcon(true);  heroDisc.classList.add("playing");    updateCardPlayingState(); });
audio.addEventListener("pause", () => { state.isPlaying = false; setPlayIcon(false); heroDisc.classList.remove("playing"); updateCardPlayingState(); });

/* ─────────────────────────────────────────────────────────
   10. PROGRESS BAR – SEEK
───────────────────────────────────────────────────────── */
let isDraggingProgress = false;

function seekFromEvent(e) {
  const rect = progressBarBg.getBoundingClientRect();
  const x    = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const pct  = x / rect.width;
  if (audio.duration) {
    audio.currentTime = pct * audio.duration;
  }
}

progressBarBg.addEventListener("mousedown", e => {
  isDraggingProgress = true;
  seekFromEvent(e);
});
document.addEventListener("mousemove", e => {
  if (isDraggingProgress) seekFromEvent(e);
});
document.addEventListener("mouseup", () => { isDraggingProgress = false; });

/* Touch support */
progressBarBg.addEventListener("touchstart", e => {
  isDraggingProgress = true;
  seekFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener("touchmove", e => {
  if (isDraggingProgress) seekFromEvent(e.touches[0]);
}, { passive: true });
document.addEventListener("touchend", () => { isDraggingProgress = false; });

/* ─────────────────────────────────────────────────────────
   11. VOLUME CONTROL
───────────────────────────────────────────────────────── */
let isDraggingVolume = false;

function setVolumeFromEvent(e) {
  const rect = volumeBarBg.getBoundingClientRect();
  const x    = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
  const pct  = x / rect.width;
  state.volume   = pct;
  audio.volume   = state.isMuted ? 0 : pct;
  volumeBarFilled.style.width = (pct * 100) + "%";
  volumeThumb.style.left      = (pct * 100) + "%";
  volumeBarBg.setAttribute("aria-valuenow", Math.round(pct * 100));

  /* Auto-unmute if volume raised above 0 */
  if (pct > 0 && state.isMuted) {
    state.isMuted = false;
    audio.volume  = pct;
    updateMuteIcon();
  }
}

volumeBarBg.addEventListener("mousedown", e => {
  isDraggingVolume = true;
  setVolumeFromEvent(e);
});
document.addEventListener("mousemove", e => {
  if (isDraggingVolume) setVolumeFromEvent(e);
});
document.addEventListener("mouseup", () => { isDraggingVolume = false; });

/* ─────────────────────────────────────────────────────────
   12. CONTROL BUTTON EVENTS
───────────────────────────────────────────────────────── */
btnPlay.addEventListener("click", togglePlayPause);
btnPrev.addEventListener("click", playPrev);
btnNext.addEventListener("click", playNext);

btnShuffle.addEventListener("click", () => {
  state.isShuffle = !state.isShuffle;
  btnShuffle.classList.toggle("active", state.isShuffle);
});

btnRepeat.addEventListener("click", () => {
  state.isRepeat = !state.isRepeat;
  btnRepeat.classList.toggle("active", state.isRepeat);
});

btnMute.addEventListener("click", () => {
  state.isMuted = !state.isMuted;
  audio.volume  = state.isMuted ? 0 : state.volume;
  updateMuteIcon();
});

const btnTamilPlay = document.getElementById("btnTamilPlay");
const btnTamilView = document.getElementById("btnTamilView");
const tamilSeeAll  = document.getElementById("tamilSeeAll");
const tamilDisc    = document.querySelector(".tamil-disc");

if (btnTamilPlay) {
  btnTamilPlay.addEventListener("click", () => {
    switchPlaylist("pl5");
    playSong("t1");
    // spin the Tamil disc
    if (tamilDisc) tamilDisc.classList.add("playing");
  });
}

function goToTamilPlaylist() {
  switchSection("library");
  switchPlaylist("pl5");
}

if (btnTamilView)  btnTamilView.addEventListener("click", goToTamilPlaylist);
if (tamilSeeAll)   tamilSeeAll.addEventListener("click", e => { e.preventDefault(); goToTamilPlaylist(); });

/* Sync Tamil disc spin with audio state */
audio.addEventListener("play",  () => {
  const isTamilSong = state.currentSongId && state.currentSongId.startsWith("t");
  if (tamilDisc) tamilDisc.classList.toggle("playing", isTamilSong);
});
audio.addEventListener("pause", () => {
  if (tamilDisc) tamilDisc.classList.remove("playing");
});

btnHeroPlay.addEventListener("click", () => {
  if (state.currentSongId) {
    togglePlayPause();
  } else {
    playSong(SONGS[0].id);
    switchSection("home");
  }
});

btnLike.addEventListener("click", () => {
  if (!state.currentSongId) return;
  const liked = state.likedSongs.has(state.currentSongId);
  if (liked) {
    state.likedSongs.delete(state.currentSongId);
    btnLike.classList.remove("liked");
  } else {
    state.likedSongs.add(state.currentSongId);
    btnLike.classList.add("liked");
    /* Heart animation */
    btnLike.animate([
      { transform: "scale(1)" },
      { transform: "scale(1.4)" },
      { transform: "scale(1)" }
    ], { duration: 300, easing: "ease-out" });
  }
});

/* ─────────────────────────────────────────────────────────
   13. SEARCH
───────────────────────────────────────────────────────── */
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();

  /* Show/hide clear button */
  searchClear.classList.toggle("visible", q.length > 0);

  if (q.length === 0) {
    /* If in search section with empty query, go back to home */
    if (state.activeSection === "search") switchSection("home");
    return;
  }

  /* Switch to search section */
  if (state.activeSection !== "search") {
    switchSection("search");
  }

  /* Filter songs */
  const results = SONGS.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.genre.toLowerCase().includes(q)
  );

  searchGrid.innerHTML = "";
  noResults.style.display = results.length === 0 ? "block" : "none";
  results.forEach(song => searchGrid.appendChild(createSongCard(song)));

  /* Re-apply highlight */
  highlightActiveSong();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.classList.remove("visible");
  searchInput.dispatchEvent(new Event("input"));
  searchInput.focus();
});

/* ─────────────────────────────────────────────────────────
   14. NAV LINK EVENTS
───────────────────────────────────────────────────────── */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    switchSection(link.dataset.section);
  });
});

/* ─────────────────────────────────────────────────────────
   15. SIDEBAR TOGGLE (Mobile)
───────────────────────────────────────────────────────── */
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

/* Close sidebar when clicking outside on mobile */
document.addEventListener("click", e => {
  if (window.innerWidth <= 700 &&
      !sidebar.contains(e.target) &&
      !sidebarToggle.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

/* ─────────────────────────────────────────────────────────
   16. KEYBOARD SHORTCUTS
───────────────────────────────────────────────────────── */
document.addEventListener("keydown", e => {
  /* Don't intercept when typing in search box */
  if (e.target === searchInput) return;

  switch (e.code) {
    case "Space":
      e.preventDefault();
      togglePlayPause();
      break;
    case "ArrowRight":
      e.preventDefault();
      audio.currentTime = Math.min(audio.currentTime + 10, audio.duration || 0);
      break;
    case "ArrowLeft":
      e.preventDefault();
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
      break;
    case "KeyM":
      state.isMuted = !state.isMuted;
      audio.volume  = state.isMuted ? 0 : state.volume;
      updateMuteIcon();
      break;
    case "KeyN":
      playNext();
      break;
    case "KeyP":
      playPrev();
      break;
  }
});

/* ─────────────────────────────────────────────────────────
   17. UI UPDATE HELPERS
───────────────────────────────────────────────────────── */

/** Toggle play/pause icon in player button */
function setPlayIcon(playing) {
  const iconPlay  = btnPlay.querySelector(".icon-play");
  const iconPause = btnPlay.querySelector(".icon-pause");
  if (playing) {
    iconPlay.style.display  = "none";
    iconPause.style.display = "";
  } else {
    iconPlay.style.display  = "";
    iconPause.style.display = "none";
  }
}

/** Update mute icon */
function updateMuteIcon() {
  const up   = btnMute.querySelector(".icon-vol-up");
  const mute = btnMute.querySelector(".icon-vol-mute");
  up.style.display   = state.isMuted ? "none" : "";
  mute.style.display = state.isMuted ? "" : "none";
}

/** Update the player footer with new song info */
function updatePlayerUI(song) {
  playerSongName.textContent = song.name;
  playerArtist.textContent   = song.artist;

  /* Cover */
  playerCoverEl.innerHTML = "";
  if (song.cover) {
    const img = document.createElement("img");
    img.src   = song.cover;
    img.alt   = song.name;
    img.style.cssText = "width:100%;height:100%;object-fit:cover;";
    img.onerror = () => {
      playerCoverEl.innerHTML = `<div class="player-cover-gradient ${song.theme}">${song.emoji}</div>`;
    };
    playerCoverEl.appendChild(img);
  } else {
    playerCoverEl.innerHTML = `<div class="player-cover-gradient ${song.theme}">${song.emoji}</div>`;
  }

  /* Glow */
  playerCoverGlow.style.boxShadow = "";
  playerCoverGlow.classList.add("visible");

  /* Like button state */
  btnLike.classList.toggle("liked", state.likedSongs.has(song.id));

  /* Reset progress */
  progressFilled.style.width = "0%";
  progressThumb.style.left   = "0%";
  currentTimeEl.textContent  = "0:00";
  totalTimeEl.textContent    = song.duration || "0:00";
}

/** Highlight the active song across all grids */
function highlightActiveSong() {
  /* Remove active from all cards */
  document.querySelectorAll(".song-card").forEach(card => {
    card.classList.remove("active");
  });
  /* Remove active from playlist rows */
  document.querySelectorAll(".playlist-row").forEach(row => {
    row.classList.remove("active");
  });

  if (!state.currentSongId) return;

  /* Add active to matching cards */
  document.querySelectorAll(`.song-card[data-song-id="${state.currentSongId}"]`).forEach(card => {
    card.classList.add("active");
  });
  /* Add active to matching playlist rows */
  document.querySelectorAll(`.playlist-row[data-song-id="${state.currentSongId}"]`).forEach(row => {
    row.classList.add("active");
  });

  updateCardPlayingState();
}

/** Toggle is-playing class for equalizer animation */
function updateCardPlayingState() {
  document.querySelectorAll(".song-card").forEach(card => {
    card.classList.toggle("is-playing",
      card.dataset.songId === state.currentSongId && state.isPlaying
    );
  });
}

/* ─────────────────────────────────────────────────────────
   18. GREETING UPDATE
───────────────────────────────────────────────────────── */
function updateGreeting() {
  const hour = new Date().getHours();
  const eyebrow = document.querySelector(".hero-eyebrow");
  if (!eyebrow) return;
  if (hour < 12)      eyebrow.textContent = "Good Morning ☀️";
  else if (hour < 17) eyebrow.textContent = "Good Afternoon 🌤️";
  else if (hour < 21) eyebrow.textContent = "Good Evening 🌆";
  else                eyebrow.textContent = "Good Night 🌙";
}

/* ─────────────────────────────────────────────────────────
   19. INIT
───────────────────────────────────────────────────────── */
function init() {
  updateGreeting();
  renderTrending();
  renderRecent();
  renderTamilVibes();
  renderSidebarPlaylists();
  renderPlaylistTabs();
  renderPlaylistSongs();

  /* Set initial volume */
  audio.volume = state.volume;

  console.log("🎵 VibeMusic initialized. Keyboard shortcuts: Space=Play/Pause, ←/→=Seek 10s, M=Mute, N=Next, P=Prev");
}

init();
