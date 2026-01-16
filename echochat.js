// Cloud Run の API URL（自分の環境に合わせて変更）
const API_URL = "https://echo-api-986862757498.europe-west1.run.app/search";

const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const responseArea = document.getElementById("responseArea");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = inputEl.value.trim();

  if (text === "") {
    return;
  }

  responseArea.textContent = "送信中...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: text
      })
    });

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();

    // 返却形式に合わせて調整
    responseArea.textContent = JSON.stringify(data, null, 2);

  } catch (error) {
    responseArea.textContent = "エラーが発生しました\n" + error.message;
  }
}
