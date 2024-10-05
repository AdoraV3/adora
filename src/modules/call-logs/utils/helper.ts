export function formatConversation(text = ""): string {
  const lines = text.split("\n");
  let formattedText = "";
  let currentSpeaker = "";

  lines.forEach(line => {
    // eslint-disable-next-line no-param-reassign
    line = line.trim();
    if (line.startsWith("AI:") || line.startsWith("User:")) {
      if (currentSpeaker && currentSpeaker !== line.slice(0, 4)) {
        formattedText += "\n";
      }
      currentSpeaker = line.slice(0, 4);
      formattedText += `${line}\n`;
    } else if (line) {
      formattedText += (formattedText.endsWith("\n") ? "" : " ") + line;
    }
  });
  return formattedText.trim();
}
