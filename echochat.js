// Cloud Run の API URL（自分の環境に合わせて変更）
const API_BASE_URL =
  "https://echo-api-986862757498.europe-west1.run.app";

// 今回はルート（/）で受けている
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,   // ← API 側と一致
      }),
    });

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    // ★ JSON ではなく「文字列」として受け取る
    const resultText = await response.text();
    responseArea.textContent = resultText;

  } catch (error) {
    responseArea.textContent =
      "エラーが発生しました\n" + error.message;
  }
}

