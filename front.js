document.getElementById("chatForm").onsubmit = async function(e) {
  e.preventDefault();
  const message = document.getElementById("chatInput").value;
  // show "Sending..." to user?

  const response = await fetch("/api/back", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    // Show error to user.
    alert(error.error);
  } else {
    const data = await response.json();
    // Show reply to user.
    document.getElementById("chatBox").innerText += "\nBot: " + data.reply;
  }
};
      const raw = await res.text();

        let data;
        try {
          data = JSON.parse(raw); // Try to parse as JSON
        } catch (e) {
          appendMessage("ERROR", "API did not return JSON: " + raw.slice(0, 100));
          return;
        }

        appendMessage("NEMO", data.reply || "(no response)");
      } catch (err) {
        appendMessage("ERROR", "API call failed: " + err.message);
      }
    });

