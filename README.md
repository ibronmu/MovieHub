# 🎬 MovieHub – Movie Discovery Dashboard

A responsive movie discovery web app built with React, TypeScript, and Tailwind CSS. Browse popular, top-rated, upcoming, and now-playing movies, search with filters, save favorites, and switch between light/dark themes.

## ✨ Features

- **Home Page** – Browse sections: Now Playing, Popular, Top Rated, Upcoming (first 5 movies each, with "View All" links)
- **Search & Filters** – Debounced search with modal filters (genre, year, rating, sort)
- **Movie Details** – Full movie info + similar movies + back navigation + add to favorites button
- **Favorites** – Save/remove movies using localStorage, dedicated Favorites page
- **Theme Toggle** – Light/Dark mode with persistent preference
- **Responsive Design** – Works on mobile, tablet, and desktop
- **Type Safety** – Full TypeScript support
- **Performance** – TanStack Query for caching & background updates

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| TanStack Query | Data fetching & caching |
| React Router DOM | Routing |
| Axios | API requests |
| Lucide React | Icons |
| TMDB API | Movie data |

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibronmu/moviehub.git
   cd movie-dasboard
Install dependencies

bash
npm install
Set up environment variables

Create a .env file in the root directory

Add your TMDB API key (get one from TMDB)

env
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
Run the development server

bash
npm run dev
Open http://localhost:5173 to view it.

🚀 Building for production
bash
npm run build
The build output will be in the dist folder. You can preview it with:

bash
npm run preview
📁 Project Structure
text
src/
├── api/              # Axios instance & TMDB API calls
├── components/
│   ├── layout/       # Sidebar layout
│   ├── movie/        # MovieCard, etc.
│   ├── search/       # SearchBar with filter modal
│   ├── states/       # Loading, Error, EmptyState
│   └── ui/           # Reusable UI components
├── context/          # Theme & Favorites contexts
├── hooks/            # Custom React Query hooks
├── pages/            # All route pages
├── routes/           # Router configuration
├── types/            # TypeScript interfaces
└── utils/            # Helper functions (debounce, etc.)
🧪 How to use
Browse movies – Scroll through home page sections or use sidebar links.

Search – Type in the search bar on home page; click "Filters" to refine by genre, year, rating, or sort.

View details – Click any movie card to see full info + similar movies.

Favorites – Click the heart icon on any movie card or the details page. All favorites are saved in your browser.

Theme – Toggle light/dark mode from the sidebar button.

🔗 Live Demo
[Add your Vercel/Netlify link here after deployment]

📝 Notes
The app uses TMDB API – you need a free API key.

Favorites are stored in localStorage and persist across sessions.

The "View All" links on home page lead to full category pages (/now-playing, /popular, /top-rated, /upcoming).

👨‍💻 Author
Your Name – GitHub

📄 License
MIT

Built as a take-home project for Frontend Engineer position.
Data provided by The Movie Database (TMDB)