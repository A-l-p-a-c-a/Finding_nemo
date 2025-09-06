document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");

  form.addEventListener("submit", async () => {
    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Display user message
    const userBubble = document.createElement("div");
    userBubble.textContent = `You: ${userMessage}`;
    messages.appendChild(userBubble);

    input.value = "";

    try {
      const res = await fetch("/api/back", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const botBubble = document.createElement("div");
      botBubble.textContent = `Bot: ${data.reply}`;
      messages.appendChild(botBubble);
    } catch (err) {
      const errorBubble = document.createElement("div");
      errorBubble.textContent = "Bot: Something glitched in the ritual.";
      messages.appendChild(errorBubble);
    }
  });
});
