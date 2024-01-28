import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./ChatBox.css";

interface Message {
  text: string;
  sender: "you" | "other";
  clue: boolean;
  misleadingClue: boolean;
}

interface ChatBoxProps {
  mysteryId: string;
  locationIndex: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ mysteryId, locationIndex }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  if (mysteryId === undefined) {
    throw new Error("mysteryId must be provided.");
  }
  if (locationIndex === undefined) {
    throw new Error("locationIndex must be provided.");
  }

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        { text: message, sender: "you", clue: false, misleadingClue: false },
      ]);
      setMessage(""); // Clear    the message input
      const response = await getChatResponse(message.trim());
      setMessages([
        ...messages,
        { text: message, sender: "you", clue: false, misleadingClue: false },
        {
          text: response.response,
          sender: "other",
          clue: response.clue,
          misleadingClue: response.misleadingClue,
        },
      ]);
      console.log("Response: ", response);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // Function to handle drag and resize
  const handleDrag = (e: React.MouseEvent) => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      const startY = e.clientY;
      const startHeight = chatBox.getBoundingClientRect().height;

      const doDrag = (e: MouseEvent) => {
        const newHeight = startHeight - e.clientY + startY;
        chatBox.style.height = `${Math.max(25, newHeight)}%`; // Limit minimum height to 25%
      };

      const stopDrag = () => {
        document.documentElement.removeEventListener(
          "mousemove",
          doDrag,
          false,
        );
        document.documentElement.removeEventListener(
          "mouseup",
          stopDrag,
          false,
        );
      };

      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
  };

  const getChatResponse = async (message: string) => {
    const response = await fetch(
      `/api/chat/mysteries/${mysteryId}/locations/${locationIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      },
    );

    if (response.status != 200) {
      throw new Error("Unexpected response.");
    }
    return await response.json();
  };

  return (
    <Box ref={chatBoxRef} className="chat-box">
      <Box className="chat-log" sx={{ overflowY: "auto" }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <Typography
                color={msg.sender === "you" ? "primary" : "secondary"}
                sx={
                  msg.clue || msg.misleadingClue
                    ? { backgroundColor: "#aaf" }
                    : {}
                }
              >
                {msg.sender === "you" ? "You: " : "Other: "}
                {msg.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="drag-handle" onMouseDown={handleDrag}></Box>
      <Box sx={{ display: "flex", padding: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          sx={{ marginRight: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
