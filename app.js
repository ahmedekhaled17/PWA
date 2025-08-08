if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch(err => console.log("SW registration failed", err));
}

const connectionStatus = document.getElementById("connection-status");
connectionStatus.style.position = "fixed";
connectionStatus.style.bottom = "0";
connectionStatus.style.left = "0";
connectionStatus.style.right = "0";
connectionStatus.style.padding = "10px";
connectionStatus.style.textAlign = "center";
connectionStatus.style.backgroundColor = "#f44336";
connectionStatus.style.color = "#fff";
connectionStatus.style.fontWeight = "bold";

function updateOnlineStatus() {
  if (navigator.onLine) {
    connectionStatus.style.display = "none";
  } else {
    connectionStatus.innerText = "Connection lost. You are offline.";
    connectionStatus.style.display = "block";
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("data-container");
      container.innerHTML = data.map(post => `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `).join('');
    })
    .catch(error => {
      document.getElementById("data-container").innerHTML = "<p>Failed to fetch posts.</p>";
      console.error("Error fetching data:", error);
    });
}

fetchPosts();
