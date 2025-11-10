import { useState, useEffect } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";

export default function ResizeTest() {
  const [buttons, setButtons] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${API_BASE}/resize-tests`)
      .then((response) => {
        console.log("Fetched data:", response.data);
        setButtons(response.data.data);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  const updateButton = (id, updates) => {
    // Update local state first
    const updatedButtons = buttons.map((b) =>
      b.documentId === id ? { ...b, ...updates } : b
    );
    setButtons(updatedButtons);

    // Update in Strapi
    axios
      .put(`${API_BASE}/resize-tests/${id}`, {
        data: updates,
      })
      .then(() => console.log(`Updated button ${id}`))
      .catch((err) => console.error("Failed to update:", err));
  };

  return (
    <div>
      {buttons.map((button) => (
        <Rnd
          key={button.id}
          default={{
            x: button.x || 0,
            y: button.y || 0,
            width: button.width || 100,
            height: button.height || 50,
          }}
          onDragStop={(e, d) => 
            updateButton(button.documentId, {x: d.x, y: d.y})
        }
            onResizeStop={(e, direction, ref, delta, position) => {
                const width = parseInt(ref.style.width);
                const height = parseInt(ref.style.height);
                const {x,y} = position;
                updateButton(button.documentId, {width, height, x, y});
            }}
        >
          <button
            style={{
              backgroundColor: button.color || "#000",
              color: button.textColor || "#fff",
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              
            }}
            onClick={() => {
              if (button.url) window.open(button.url, "_blank");
            }}
          >
            {button.label || "Untitled"}
          </button>
        </Rnd>
      ))}
    </div>
  );
}
