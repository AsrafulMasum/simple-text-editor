import React, { useState, useRef, useEffect } from "react";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setUndoStack([...undoStack, { text, fontSize, fontStyle, fontColor }]);
    setText(newText);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
      setRedoStack([...redoStack, { text, fontSize, fontStyle, fontColor }]);
      setText(previousState.text);
      setFontSize(previousState.fontSize);
      setFontStyle(previousState.fontStyle);
      setFontColor(previousState.fontColor);
      setUndoStack(undoStack.slice(0));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setUndoStack([...undoStack, { text, fontSize, fontStyle, fontColor }]);
      setText(nextState.text);
      setFontSize(nextState.fontSize);
      setFontStyle(nextState.fontStyle);
      setFontColor(nextState.fontColor);
      setRedoStack(redoStack.slice(0));
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
    setUndoStack([
      ...undoStack,
      { text, fontSize: newSize, fontStyle, fontColor },
    ]);
    setRedoStack([]);
  };

  const handleFontStyleChange = (e) => {
    const newFontStyle = e.target.value;
    setFontStyle(newFontStyle);
    setUndoStack([
      ...undoStack,
      { text, fontSize, fontStyle: newFontStyle, fontColor },
    ]);
    setRedoStack([]);
  };

  const handleFontColorChange = (e) => {
    const newFontColor = e.target.value;
    setFontColor(newFontColor);
    setUndoStack([
      ...undoStack,
      { text, fontSize, fontStyle, fontColor: newFontColor },
    ]);
    setRedoStack([]);
  };

  return (
    <div>
      <h1>Text Editor</h1>
      <div style={{
        marginBottom: "20px"
      }}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>
      <div style={{
        display: "flex",
        gap: "20px"
      }}>
        <div style={{
          height: "300px",
          width: "500px"
        }}>
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleInputChange}
          placeholder="Type something here..."
          rows={10}
          cols={50}
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontStyle,
            color: fontColor,
            height: "100%",
            width: "100%"
          }}
        />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <label>
            Font Size:
            <input
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
            />
          </label>
          <label>
            Font Style:
            <select value={fontStyle} onChange={handleFontStyleChange}>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
          </label>
          <label>
            Font Color:
            <input
              type="color"
              value={fontColor}
              onChange={handleFontColorChange}
            />
          </label>
        </div>
      </div>
      <div>
        <h2>Preview:</h2>
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontStyle,
            color: fontColor,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
