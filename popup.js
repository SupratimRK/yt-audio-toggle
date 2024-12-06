const toggle = document.getElementById("toggle-switch");
const statusMessage = document.getElementById("video-status");

// Check and apply the saved state on page load
window.addEventListener('load', () => {
  const savedState = localStorage.getItem("videoToggleState") === "true"; // Get saved state from localStorage
  toggle.checked = savedState; // Set the toggle switch accordingly
  statusMessage.textContent = savedState ? "hidden" : "visible"; // Update the status message

  // Ensure the video visibility is updated based on saved state
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab && (tab.url.includes("youtube.com") || tab.url.includes("music.youtube.com"))) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleVideo,
        args: [savedState] // Apply the saved state to the video visibility
      });
    }
  });
});

// Event listener for toggle change
toggle.addEventListener("change", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab && (tab.url.includes("youtube.com") || tab.url.includes("music.youtube.com"))) {
    const isChecked = toggle.checked;

    // Save the current toggle state to localStorage
    localStorage.setItem("videoToggleState", isChecked);

    // Execute the toggleVideo function to hide or show the video
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleVideo,
      args: [isChecked]
    });

    // Update the status message accordingly
    statusMessage.textContent = isChecked ? "hidden" : "visible";
  } else {
    alert("This extension only works on YouTube and YouTube Music.");
    toggle.checked = false; // Reset toggle if not on YouTube
    localStorage.setItem("videoToggleState", "false"); // Ensure state is reset
  }
});

// Function to toggle the video visibility
function toggleVideo(hide) {
  const overlayText = "‎🔘🌐Built with love ❤️ by Supratim";
  const videoElements = document.querySelectorAll("video");

  videoElements.forEach((video) => {
    // Hide or show the video based on the state
    video.style.visibility = hide ? "hidden" : "visible";

    let overlay = video.parentElement.querySelector(".custom-overlay");
    if (hide) {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "custom-overlay";
        overlay.textContent = overlayText;
        video.parentElement.appendChild(overlay);
      }
      overlay.style.display = "flex"; // Show overlay when video is hidden
    } else if (overlay) {
      overlay.style.display = "none"; // Hide overlay when video is visible
    }
  });
}
