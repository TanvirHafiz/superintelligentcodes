/* The catalogue. Every project, in one place. */
window.PROJECTS = [
  {
    id: "obhijatri", title: "Obhijatri", bn: "অভিযাত্রী", tagline: "A web browser built for Bangla speakers",
    cat: "tools", kind: "Windows browser", img: "Obhijatri", color: "#e43e4b", featured: 1,
    idea: "Most browsers treat Bangla as an afterthought. What if Bangla were the default language, and the browser were light enough for older or low-memory PCs?",
    what: "A Windows 10/11 browser on WebView2 and WinUI 3, with phonetic Bangla typing, ad and tracker blocking, scam warnings, a Bangla calendar with prayer times, and a reader mode. No telemetry, no analytics, no cloud AI: page content never leaves your PC. Safe Browsing and breach checks use hash prefixes and k-anonymity. MIT licensed, with a test suite and a CI-built installer.",
    tags: ["WinUI 3", "WebView2", "Privacy", "Bangla"],
    stat: ["0", "telemetry"],
    repo: "https://github.com/TanvirHafiz/Obhijatri"
  },
  {
    id: "studiovox", title: "StudioVox", tagline: "Studio-quality voice cleanup, fully offline",
    cat: "tools", kind: "Python · Web UI + CLI", img: "StudioVox", color: "#5b7bd6",
    idea: "Cleaning a bad recording normally means a paid cloud service or hours in an audio editor. StudioVox chains state-of-the-art models on your own GPU: no uploads, no per-use cost.",
    what: "Feed it a noisy phone recording, a song vocal or a video. It runs denoising (DeepFilterNet or ClearerVoice), de-reverb, bandwidth super-resolution, optional generative restoration and a DSP finishing chain, from a FastAPI web UI or a CLI. On a real clip the DNSMOS noise score rose from 2.32 to 4.05, and the repo ships before-and-after audio so you can hear it.",
    tags: ["FastAPI", "DeepFilterNet", "GPU", "Audio"],
    stat: ["2.32→4.05", "DNSMOS score"],
    repo: "https://github.com/TanvirHafiz/studiovox"
  },
  {
    id: "securechat", title: "SecureChat", tagline: "Encrypted chat for when the network can't be trusted",
    cat: "tools", kind: "Browser · WebRTC", img: "SecureChat", color: "#4de3c1", featured: 3,
    idea: "What if two people need to talk privately when internet infrastructure is restricted or unreliable? SecureChat works like a modern Enigma machine.",
    what: "Both people share a one-time session code (like TIGER-4829) out loud. Each browser generates an ephemeral keypair, and the key is derived from the exchange plus the code. Every message is AES-256-GCM encrypted in the browser before sending. A relay only passes WebRTC handshake data. If an attacker swaps the keys, the derived keys won't match, so tampering is detectable.",
    tags: ["AES-256-GCM", "WebRTC", "E2EE", "JavaScript"],
    stat: ["AES-256", "in the browser"],
    repo: "https://github.com/TanvirHafiz/secure-chat"
  },
  {
    id: "skyroads", title: "SkyRoads HD", tagline: "A faithful remake of the 1993 DOS classic",
    cat: "games", kind: "TypeScript game", img: "SkyRoads-HD", color: "#ff8a3d", featured: 4,
    idea: "Most remakes only evoke the original. This one reconstructs it.",
    what: "The simulation runs at the original's exact tick rate (about 36 Hz) on fixed-point grids with reverse-engineered constants. Jump arcs, top speed, steering and fuel burn match the 1993 game. Rendering is decoupled from physics, so refresh rate never changes gameplay. On top: HD visuals, bloom and ten AI-generated planet backdrops.",
    tags: ["TypeScript", "Fixed-point", "Reverse engineering", "Canvas"],
    stat: ["36 Hz", "original tick rate"],
    repo: "https://github.com/TanvirHafiz/Skyroads-2k26"
  },
  {
    id: "gte", title: "Girlfriend Teaches English", tagline: "A realtime voice conversation partner",
    cat: "tools", kind: "Local voice AI", img: "Girlfriend-Teaches-English", color: "#fe987d",
    idea: "The hardest part of learning spoken English is finding someone patient to talk to. This is a local AI partner that talks with you, corrects you gently, and never gets tired.",
    what: "You speak and it listens (faster-whisper), thinks (a local Ollama model acting as an ESL teacher) and answers aloud (Kokoro-82M). Replies stream sentence by sentence, so it starts talking before the full answer is written, and you can interrupt mid-sentence. It rephrases your mistakes correctly instead of lecturing. Everything runs on your own machine.",
    tags: ["faster-whisper", "Ollama", "Kokoro TTS", "Realtime"],
    stat: ["100%", "on your machine"],
    repo: "https://github.com/TanvirHafiz/girlfriend-teaches-english"
  },
  {
    id: "sangsad", title: "Sangsad Showdown", tagline: "A 2D fighting game in one HTML file",
    cat: "games", kind: "Single-file game", img: "Sangsad-Showdown", color: "#e8742c",
    idea: "How much game can fit in a single file with no install and no server?",
    what: "Frame-data-driven combat with normals, specials, supers, combos and blocking, CPU AI at three difficulties, gamepad support, and a full title, character select, match and results flow. Art and audio are embedded, so it works offline. Download and double-click.",
    tags: ["HTML5", "Frame data", "Gamepad API", "Offline"],
    stat: ["1", "file. that's it."],
    repo: "https://github.com/TanvirHafiz/shangsad-showdown"
  },
  {
    id: "gamepad-mouse", title: "Gamepad Mouse", tagline: "Use an Xbox controller as a mouse",
    cat: "tools", kind: "Windows tray app", img: "Gamepad-Mouse", color: "#7fbf7f",
    idea: "The couch PC or media-centre problem. You shouldn't have to get up to click something.",
    what: "A Windows tray app: the left stick moves the pointer, the right stick scrolls, face buttons click, drag and middle-click, and the D-pad sends arrow keys. It has a precision mode, an on-screen keyboard toggle, and a Back+Start combo that switches it off so it stays out of your games. Starts with Windows if you like, and ships as a standalone .exe.",
    tags: ["Python", "Windows", "XInput", "Tray app"],
    repo: "https://github.com/TanvirHafiz/gamepad-mouse"
  },
  {
    id: "shortkiller", title: "Shortkiller", tagline: "A Chrome extension that removes YouTube Shorts",
    cat: "tools", kind: "Chrome extension", img: "Shortkiller", color: "#e5202e",
    idea: "Built to protect kids (or yourself) from the Shorts doom-scroll without breaking the rest of YouTube.",
    what: "It rewrites any /shorts/ link to the normal watch player before the swipe feed loads, using location.replace so Back can't return to Shorts. It hides every Shorts surface: home shelves, search results, the sidebar, channel tabs and notifications. Long-form videos, news shelves and community posts are left alone. One toggle, and turning it off restores everything with no reload.",
    tags: ["Chrome MV3", "JavaScript", "YouTube"],
    repo: "https://github.com/TanvirHafiz/shortkiller"
  },
  {
    id: "chrome2brave", title: "Chrome2Brave", tagline: "Send YouTube links to Brave automatically",
    cat: "tools", kind: "Extension + native host", img: "Chrome2Brave", color: "#f19952",
    idea: "Use Chrome for most things but watch YouTube in a different browser, without copy-pasting links.",
    what: "Chrome extensions can't launch other apps on their own, so this pairs the extension with a small native messaging host. Any YouTube link is caught before it loads and opened in Brave instead. Other links are untouched.",
    tags: ["Native messaging", "Chrome", "Brave"],
    repo: "https://github.com/TanvirHafiz/chrome2brave"
  },
  {
    id: "lego-builder", title: "LEGO 3D Builder", tagline: "Plan a build in 3D from a set's own piece list",
    cat: "tools", kind: "Browser 3D app", img: "Lego-Builder", color: "#f5c518", featured: 2,
    idea: "A set comes with a fixed pile of bricks. What can you build with exactly those pieces, and can you try it before touching a single brick?",
    what: "Enter a set number and the app pulls that set's exact piece inventory from Rebrickable (bring your own free API key), then loads real part geometry from the LDraw library on demand, only for the parts the set needs. Place bricks on a baseplate grid, orbit freely or snap to Top, Front and Side views, and watch the counter track pieces used. Snapping checks stud-to-hole alignment and orientation instead of running a physics engine. Undo, redo, save and export included. It runs entirely in the browser.",
    tags: ["React", "TypeScript", "Three.js", "LDraw", "Rebrickable API"],
    stat: ["16,500", "LDraw parts, loaded on demand"],
    live: "https://the-lego-builder.vercel.app", liveLabel: "Open the app"
  },
  {
    id: "resonate", title: "Resonate", tagline: "A local-first audio player with an on-device mood engine",
    cat: "tools", kind: "Windows desktop app", img: "Resonate", color: "#c98a52",
    idea: "Not a Winamp clone: more of a Spotify for the audio you already own, with recommendations that never leave your machine.",
    what: "A desktop player built with Tauri (Rust) and vanilla JavaScript. It plays your local library, internet radio, podcasts and audio-only YouTube, and tags every track with a mood using lightweight on-device signal analysis (tempo, energy, brightness). An affinity engine learns what you like from your listening history to power 'For You' and 'More Like This'. It adds a real three-band equalizer, playlists, a mini-player you can dock to a screen corner, lyrics and artist bios, and themes including one whose glow follows the mood of the playing track. No accounts, no cloud.",
    tags: ["Tauri", "Rust", "rodio", "On-device recommendations", "Equalizer"],
    stat: ["0", "cloud calls for recommendations"],
    repo: "https://github.com/TanvirHafiz/resonate-audio-player"
  },
  {
    id: "redline", title: "Redline", tagline: "An offline logbook for your car or bike",
    cat: "android", kind: "Android app", img: "Redline", color: "#e8222e",
    idea: "Vehicle apps want an account and a cloud. A logbook should live on your phone, work without signal, and tell you what your vehicle really costs to run.",
    what: "Log fuel and watch km/l and cost-per-km work themselves out, track expenses with renewal reminders, keep a service history by odometer, and log trips by hand or with a one-time GPS fix. Multiple vehicles, a lifetime driving score, over 20 milestone badges, a Places Visited list, and shareable Car Story and selfie trip cards. Fully offline, no account, no tracking, with backup and restore to a file. Dark cockpit-style design with gauge dials.",
    tags: ["Kotlin", "Jetpack Compose", "Room", "Offline-first", "Android"],
    note: "Android app. Google Play link coming soon."
  },
  {
    id: "uvr", title: "Ultra Voice Recorder", tagline: "A private, offline recorder that checks what your phone can really do",
    cat: "android", kind: "Android app", img: "Ultra-Voice-Recorder", color: "#7a5cff",
    idea: "Phones hide their best microphones and audio processing behind one record button. What if the recorder told you honestly what your hardware can do, and let you use all of it?",
    what: "On first run it scans the device's recording hardware, then records high-quality audio with manual control of the microphone, with classic user-controlled processing such as filters and compression rather than AI. It has no internet permission, nothing you record leaves your device, and every feature is free. It is designed so that a crash does not cost you a recording.",
    tags: ["Kotlin", "Jetpack Compose", "Audio DSP", "Offline", "Android"],
    note: "Android app. Google Play link coming soon."
  },
  {
    id: "amanat", title: "Amanat", bn: "আমানত", tagline: "Savings and money records for the Bangladeshi household",
    cat: "android", kind: "Android app", img: "Amanat", color: "#1f9d8a",
    idea: "Most savings apps assume bank APIs, one phone per person and a steady monthly salary. Real households keep cash in a tin box, a samiti or a brother's pocket, share a phone, and earn irregularly.",
    what: "Two pillars. The record: bKash, Nagad, Rocket and Upay keep poor history, so Amanat turns their notifications into a permanent, searchable, exportable ledger with categories, notes and fee totals. The savings: goals as jars, plus a map of where each taka actually sits (tin box, samiti, held by family, gold), with shared family goals on top. Offline, Bangla-first, holds no money and promises no returns.",
    tags: ["Kotlin", "Jetpack Compose", "Offline", "Bangla", "Mobile money"],
    note: "Android app. Google Play link coming soon."
  },
  {
    id: "offerbox", title: "Offerbox", tagline: "Save recurring restaurant deals and get reminded on time",
    cat: "android", kind: "Android app", img: "Offerbox", color: "#f08a3c",
    idea: "Half the best restaurant deals in Dhaka repeat every week, like 'Buy 1 Get 1 every Tuesday', and everyone forgets them. The app remembers for you.",
    what: "Save a recurring offer once and a local reminder arrives when it is valid. There is no sign-up, no phone number and no account. Offers come from a static feed that the owner edits in a Google Sheet and a GitHub Action validates and publishes, so there is no server to run; a bundled seed means the app works offline. Bangla and English, built with Kotlin, Jetpack Compose, Room and WorkManager. Currently in development.",
    tags: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "Bangla"],
    note: "Android app, in development."
  },
  {
    id: "reelcraft", title: "Reelcraft", tagline: "Idea in, shot-by-shot video prompts out",
    cat: "ai", kind: "Local pre-production", img: "Reelcraft", color: "#c9a468", featured: 5,
    idea: "AI video is a pipeline problem. Good results need a researched script and consistent prompts for every shot. Reelcraft is the pre-production step.",
    what: "It never generates images, video or audio itself. It optionally researches your topic (Google Trends, related searches and recent headlines, all free and keyless), lets a local model pick the most promising trending angle, writes a researched voiceover script, then breaks it into 3 to 6 shots. Each shot has an image prompt, a motion prompt, a speech line and a delivery note, targeted at Seedance, Kling, Veo or Wan. Projects are saved in a local SQLite database. Runs locally on Ollama.",
    tags: ["Ollama", "Prompting", "Storyboards"],
    stat: ["4", "fields per shot"],
    repo: "https://github.com/TanvirHafiz/reelcraft"
  },
  {
    id: "seedance", title: "Ollama Seedance Prompter", tagline: "Reference images to a spec-compliant video prompt",
    cat: "ai", kind: "Vision pipeline + GUI", img: "Ollama-Seedance-Prompter", color: "#8b5fe0",
    idea: "Seedance 2.0 prompts follow a strict format: section order, shot-to-duration math, timestamps and a continuity 'logic rule'. Tedious to hand-write and easy to get subtly wrong.",
    what: "Give it character and scene reference images plus a plain-English brief. A vision model describes each image like a cinematographer, a writer model composes the prompt in the exact format, and a structural validator checks the result. Fully local, no API keys or accounts, as a pipeline or a desktop GUI.",
    tags: ["Ollama", "Vision LLM", "Validator", "Desktop GUI"],
    repo: "https://github.com/TanvirHafiz/ollama-seedance-prompter"
  },
  {
    id: "srt-dub", title: "srt-dub", tagline: "Turn subtitles into a voice-cloned dub",
    cat: "ai", kind: "Python CLI", img: "srt-dub", color: "#d9a34a",
    idea: "The classic problem of a foreign film with English subtitles but no English audio.",
    what: "Give it an SRT file and a short voice sample. It generates every line in the cloned voice and time-fits each one to its original subtitle timestamps, producing one dub track ready to mux under the video. A local, automated CLI that uses a Chatterbox TTS server.",
    tags: ["Chatterbox TTS", "Voice cloning", "CLI", "ffmpeg"],
    repo: "https://github.com/TanvirHafiz/srt-dub"
  },
  {
    id: "auction", title: "Auction Card Translator", tagline: "A WordPress plugin for Japanese car auction sheets",
    cat: "ai", kind: "WordPress plugin", img: "Auction-Card-Translator", color: "#c7a29f",
    idea: "Car importers rely on auction sheets written in Japanese. The usual fix is manual translation, or plain text that loses the layout.",
    what: "Uses Google Gemini image models to translate the text directly on the card image while preserving its design. Drag-and-drop upload, side-by-side comparison with zoom, bulk upload (up to 10), private per-user history, a widget and a shortcode. Nonce checks, capability checks and file validation included.",
    tags: ["WordPress", "Gemini", "PHP", "Image translation"],
    repo: "https://github.com/TanvirHafiz/auction-card-translator"
  },
  {
    id: "ascii", title: "ASCII Art Generator", tagline: "Turn any photo into text art, now in colour",
    cat: "ai", kind: "Two tools", img: "ASCII-Art", color: "#37d23b",
    idea: "A fun way to turn any photo into text art. The Advanced version adds colour.",
    what: "Two small tools in one family: the original generator, and an Advanced edition that carries colour through into the characters.",
    tags: ["Image processing", "ASCII", "Colour"],
    repo: "https://github.com/TanvirHafiz/ASCII-art-generator",
    repo2: ["https://github.com/TanvirHafiz/ascii-art-advance", "Advanced"]
  },
  {
    id: "bd-news", title: "BD News Digest", tagline: "A daily summary ranked by how widely a story is covered",
    cat: "learn", kind: "Automated digest", img: "BD-News-Digest", color: "#8ac15e",
    idea: "If many independent newsrooms cover a story it is more likely to be credible, but only if you exclude wire copy that every outlet just republishes.",
    what: "Fetches RSS feeds twice a day, filters out wire stories, clusters related articles with embeddings, scores them and summarises with a local LLM (Ollama). It writes a daily page linking back to every original source, with a human review step before publishing. One page that saves you opening five newspapers.",
    tags: ["RSS", "Embeddings", "Ollama", "GitHub Pages"],
    repo: "https://github.com/TanvirHafiz/bd-news-digest",
    live: "https://tanvirhafiz.github.io/bd-news-digest/"
  },
  {
    id: "tiny-python", title: "Tiny Python", tagline: "Python explained as if you're five",
    cat: "learn", kind: "Interactive course", img: "Tiny-Python", color: "#9dca49",
    idea: "Most programming tutorials lose beginners in the first ten minutes.",
    what: "An interactive, browser-based course with a syllabus, step-by-step lessons, a glossary, a playground and a teachers' page. It needs no install.",
    tags: ["Education", "In-browser Python", "No install"],
    repo: "https://github.com/TanvirHafiz/tiny-python",
    live: "https://tanvirhafiz.github.io/tiny-python/"
  },
  {
    id: "faraid", title: "Islamic Inheritance Calculator", tagline: "Faraid, with the working shown",
    cat: "learn", kind: "Single-file calculator", img: "Islamic-Inheritance-Calculator", color: "#1d8f73",
    idea: "Faraid calculations are intricate, and mistakes cause real family disputes. A calculator that shows its working helps.",
    what: "One self-contained HTML file with no dependencies and no server. Handles estate breakdown, debts, funeral costs and bequests capped at 1/3. Covers all standard heirs, exclusion rules (hajb), fixed Qur'anic shares, residuary distribution, 'awl and radd, following Sunni (Hanafi-oriented) rules.",
    tags: ["Vanilla JS", "Zero dependencies", "Faraid"],
    repo: "https://github.com/TanvirHafiz/islamic-inheritance-calculator",
    live: "https://tanvirhafiz.github.io/islamic-inheritance-calculator/"
  },
  {
    id: "globe-trotter", title: "Globe Trotter", tagline: "A world map for the places you've been and the places you want to go",
    cat: "learn", kind: "Travel web app", img: "Globe-Trotter", color: "#c9a24a", featured: 6,
    idea: "Most travel trackers are just pins on a map. What if the map also told you whether your passport gets you in, the best months to go, and how much of the world you have really earned?",
    what: "Visited countries are coloured by your expertise tier, from Visitor (1 trip) up to Legend (8), and wishlist countries get their own colour. Click any country for visa rules for your passport, a safety advisory, best months to go, a live Wikipedia intro and Wikivoyage guide, plus local time, five-day weather, exchange rate and public holidays. A 'Where to go?' finder filters every country by weather, visa, safety and region. XP, levels and 16 achievements turn it into a game, and share cards are generated on your device. All data stays in your browser.",
    tags: ["React", "TypeScript", "d3-geo", "Cloudflare Workers", "Local-first"],
    stat: ["16", "achievements to unlock"],
    live: "https://globetrotter-app.tanvir-pro.workers.dev/", liveLabel: "Open the app"
  },
  {
    id: "aina", title: "Aina: Lights of Jahangirnagar", tagline: "A light-and-mirror puzzle set in Mughal Dhaka",
    cat: "games", kind: "Phaser puzzle game", img: "Aina", color: "#d9a441",
    idea: "What if a puzzle game about bending light were also a love letter to Dhaka's past? Nur, apprentice to a mirror-maker, follows a trail of light through 17th-century Jahangirnagar.",
    what: "A top-down light-and-mirror puzzle in the style of Mirrors: Tomblight Edition, set in Mughal Dhaka (1641 to 1684) across the Buriganga ghats, Bara Katra, Lalbagh Fort, Pari Bibi's tomb and the Shish Mahal. 24 levels over four chapters, with mirrors, splitters, colour filters, crystals, sun windows that cast real shadows, and a Night Garden chapter where you light a walkable path. Every level has a solver-verified par for a three-star rating, illustrated character portraits tell the story, each solved chamber unlocks a history note, and each chapter has its own Hindustani raga score. Built with Phaser 3, TypeScript and Vite.",
    tags: ["Phaser 3", "TypeScript", "Puzzle", "Dhaka history", "Hindustani music"],
    stat: ["24", "levels in 4 chapters"],
    repo: "https://github.com/TanvirHafiz/aina-lights-of-jahangirnagar",
    live: "https://tanvirhafiz.itch.io/aina-lights-of-jahangirnagar", liveLabel: "Play on itch.io"
  },
  {
    id: "hartal", title: "Hartal Ludo", bn: "হরতাল লুডু", tagline: "Ludo with bureaucracy and coalition politics",
    cat: "games", kind: "Single-file game", img: "Hartal-Ludo", color: "#c4473f",
    idea: "Classic Ludo, reskinned as satire about everyday civic life, using fictional archetype factions (not real parties or people).",
    what: "Fully in Bangla with an 'official gazette' look. A 16-card event deck (hartals, load-shedding and more), and a twist in the win condition: you become the provisional winner first, then must survive one more round to be confirmed. 2 to 4 players with optional computer opponents. One HTML file, no install.",
    tags: ["Bangla", "Satire", "HTML5", "Board game"],
    repo: "https://github.com/TanvirHafiz/hartal-ludo"
  },
  {
    id: "dhoni", title: "Dhoni Hobar Mojar Khela", bn: "ধনী হবার মজার খেলা", tagline: "Monopoly with a Bangladeshi twist",
    cat: "games", kind: "Single-file game", img: "Dhoni-Hobar-Mojar-Khela", color: "#e1ab66",
    idea: "Monopoly rules underneath, but the properties are Old Dhaka, Sylhet's tea gardens, Rajshahi's mango orchards and Chattogram's port. Chance cards become 'Summons', houses become 'Netar Bari', and jail becomes 'Hajot'.",
    what: "Play against up to four AI opponents or with local multiplayer. Visual ownership cues and a responsive layout. One HTML file, no build step.",
    tags: ["Bangla", "AI opponents", "HTML5", "Board game"],
    repo: "https://github.com/TanvirHafiz/Dhoni-hobar-mojar-khela"
  },
  {
    id: "poly-26", title: "POLY-26", tagline: "A tiny virtual game console that lives in your browser",
    cat: "games", kind: "10-in-1 browser console", img: "Poly-26", color: "#2fd6e6",
    idea: "What if a whole game console were just a web page? One 'primitive 10-in-1' cartridge, ten one-button arcade games, no assets to download.",
    what: "Ten minimalist arcade games (Stack, Helix Drop, Color Gate, Crowd Merge, Hole Eater, Rolling Path, Block Sort, Cone Hit, Cube Slice and Gravity Flip) behind a retro CRT interface. Every graphic, sound effect and chiptune is generated in code from cubes, spheres, cylinders, cones, tori and pyramids, with no image or sound files. Best scores are saved in the browser, restarts are instant, and controls are remappable for keyboard, gamepad or touch.",
    tags: ["HTML5", "Procedural audio", "Procedural graphics", "Gamepad", "Retro CRT"],
    stat: ["10", "games, zero asset files"],
    live: "https://tanvirhafiz.itch.io/poly-26", liveLabel: "Play on itch.io"
  }
];

window.CATS = {
  all: "Everything",
  tools: "Tools & apps",
  android: "Android apps",
  ai: "AI & media",
  learn: "Info & learning",
  games: "Games"
};
