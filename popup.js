document.getElementById("removeBg").onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const imgs = [...document.images];

      if (!imgs.length) {
        alert("No images found");
        return;
      }

      const best = imgs.reduce((a, b) =>
        a.naturalWidth * a.naturalHeight > b.naturalWidth * b.naturalHeight ? a : b
      );

      window.location.href =
        "https://bg-me-server-production.up.railway.app/?u=" +
        encodeURIComponent(best.src);
    }
  });
};
