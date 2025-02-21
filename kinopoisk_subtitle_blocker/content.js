function removeForcedSubtitles() {
    document.querySelectorAll("div[data-tid='Subtitles'], div[data-tid='SubtitlesPortalRoot']").forEach(sub => {
        sub.style.display = "none";
        sub.style.visibility = "hidden";
        sub.remove();
    });
}

// Отключаем подгрузку субтитров через fetch
(function() {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        if (args[0].includes("/subtitles/")) {
            console.log("Blocked subtitles request:", args[0]);
            return new Promise((resolve) => resolve(new Response(null, { status: 403 })));
        }
        return originalFetch.apply(this, args);
    };
})();

// Запускаем удаление и наблюдатель за изменениями DOM
const observer = new MutationObserver(() => {
    removeForcedSubtitles();
});

observer.observe(document.body, { childList: true, subtree: true });
setInterval(removeForcedSubtitles, 500);
