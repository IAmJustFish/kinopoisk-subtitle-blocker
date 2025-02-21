document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Popup script загружен!");

    const button = document.getElementById("toggleSubtitles");

    if (!button) {
        console.error("❌ Ошибка: Кнопка toggleSubtitles не найдена в popup.html!");
        return;
    }

    button.addEventListener("click", () => {
        console.log("🔄 Кнопка нажата, скрываем субтитры...");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("❌ Ошибка: Не найден активный таб!");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    console.log("📌 Скрываем субтитры...");
                    document.querySelectorAll("div[data-tid='Subtitles'], div[data-tid='SubtitlesPortalRoot']")
                        .forEach(sub => sub.style.display = sub.style.display === "none" ? "block" : "none");
                },
            }).catch(err => console.error("❌ Ошибка executeScript:", err));
        });
    });
});
