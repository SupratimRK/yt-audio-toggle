(() => {
    const overlayText = "Built with love ❤️ by Supratim";
    const videoElements = document.querySelectorAll("video");
  
    // Get the saved state of the toggle from localStorage
    const isVideoHidden = localStorage.getItem("videoToggleState") === "true"; // "true" if hidden, else "false"
  
    if (videoElements.length) {
      videoElements.forEach((video) => {
        // Set the visibility based on the saved state
        video.style.visibility = isVideoHidden ? "hidden" : "visible";
  
        // Find or create the overlay
        let overlay = video.parentElement.querySelector(".custom-overlay");
  
        if (isVideoHidden) {
          if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "custom-overlay";
            overlay.textContent = overlayText;
            video.parentElement.appendChild(overlay);
          }
          overlay.style.display = "flex"; // Show the overlay when video is hidden
        } else if (overlay) {
          overlay.style.display = "none"; // Hide the overlay when video is visible
        }
      });
    } else {
      alert("No video element found!");
    }
  })();
  