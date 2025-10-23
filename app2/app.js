import renderScreen1 from "./screens/screen1.js";
import renderScreen2 from "./screens/screen2.js";

// const socket = io("/", { path: "/real-time" });

const SUPABASE_URL = "https://umddngftjhiavglsrhpy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZGRuZ2Z0amhpYXZnbHNyaHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NDU3MjksImV4cCI6MjA3NDEyMTcyOX0.CzpjI01fZuo5s2j8L-BMreFcQQPZze7iMhs4jDo-jEA";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const channel = supabase.channel("realtime-events");

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

let route = { path: "/", data: {} };
renderRoute(route);

function renderRoute(currentRoute) {
  switch (currentRoute?.path) {
    case "/":
      clearScripts();
      renderScreen1(currentRoute?.data);
      break;
    case "/screen2":
      clearScripts();
      renderScreen2(currentRoute?.data);
      break;
    default:
      const app = document.getElementById("app");
      app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  }
}

function navigateTo(path, data) {
  route = { path, data };
  renderRoute(route);
}

export { navigateTo, channel };
