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
      
