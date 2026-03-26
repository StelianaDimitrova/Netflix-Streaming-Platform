# Movieflix Streaming Platform

## Project Overview
**Movieflix Streaming Platform** is a web application that replicates the functionality of popular streaming platforms. The app allows users to browse titles, watch trailers, and manage a personal list. Built with **React** and **TMDb API**.

## Key Features
- **Homepage**: Displays popular, top-rated, and upcoming titles.
- **Video Player**: Displays trailers via TMDb API.
- **Detail Modal**: View more details via a popup.
- **Personal List**: Add movies and TV shows to a watchlist.

## Technologies and Tools
- **React** & **React Router**
- **TMDb API**
- **CSS Modules** & **Material UI**
- **React Context API**

## Project Structure
- **src/api/** — API calls to TMDb.
- **src/application/** — State management and context.
- **src/presentation/** — UI components (MovieCard, Modal, etc.).

## How to Run Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/StelianaDimitrova/Movieflix-Streaming-Platform.git

2. **Navigate to the project folder:**
   ```bash
   cd Movieflix-Streaming-Platform

3. **Install dependencies:**
   ```bash
   npm install

4. **Create an .env file:**
In the root directory, create a **.env** file and add your key:
   ```bash
   VITE_TMDB_API_KEY=your_api_key_here

5. **Run the development server:**
   ```bash
   npm run dev
