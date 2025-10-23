import renderScreen1 from "./screens/screen1.js";
import renderScreen2 from "./screens/screen2.js";

// const socket = io("/", { path: "/real-time" });

const SUPABASE_URL = "https://bwpeqoxncqfdwihfkzth.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3cGVxb3huY3FmZHdpaGZrenRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0OTM1NTYsImV4cCI6MjA3NDA2OTU1Nn0.p8bGMdjHt1yJCVhBDP-Y-SSA710MxR96Drht1kj3Tdg";

const supabase = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
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
