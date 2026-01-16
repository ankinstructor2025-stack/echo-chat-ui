// Cloud Run の URL（自分の環境に合わせて変更）
// 例: "https://echo-api-986862757498.europe-west1.run.app"
const API_BASE_URL = "https://echo-api-986862757498.europe-west1.run.app";

// 関数は / で受けている前提（必要なら "/echo" などに変更）
const API_URL = API_BASE_URL;

const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const responseArea = document.getElementById("responseArea");

sendBtn.addEventListener("click", sendMessage);
inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = inputEl.value.trim();
  if (text === "") return;

  responseArea.textContent = "送信中...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const resultText = await response.text();
    responseArea.textContent = resultText;
  } catch (error) {
    responseArea.textContent = "エラーが発生しました\n" + error.message;
  }
}
