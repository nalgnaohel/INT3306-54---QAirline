import React, { useRef } from "react";
import bold from "../../assets/images/TextEditor/bold.png"
import italic from "../../assets/images/TextEditor/italic-font.png"
import underline from "../../assets/images/TextEditor/underline.png"
import left from "../../assets/images/TextEditor/align-left.png"
import right from "../../assets/images/TextEditor/align-right.png"
import center from "../../assets/images/TextEditor/format.png"
import justify from "../../assets/images/TextEditor/justify.png"
import sizeup from "../../assets/images/TextEditor/sizeup.png"
import sizedown from "../../assets/images/TextEditor/sizedown.png"
import subscript from "../../assets/images/TextEditor/subscript.png"
import superscript from "../../assets/images/TextEditor/superscript.png"
import bullets from "../../assets/images/TextEditor/bullets.png"
import numbering from "../../assets/images/TextEditor/list.png"
import h1 from "../../assets/images/TextEditor/h1.png"
import h2 from "../../assets/images/TextEditor/h2.png"
import h3 from "../../assets/images/TextEditor/h3.png"
import p from "../../assets/images/TextEditor/p.png"
import "./TextEditor.css"

const TextEditor = () => {
  const editorRef = useRef(null);

  // Hàm để thực hiện lệnh chỉnh sửa
  const handleCommand = (command: string) => {
    document.execCommand(command, false, undefined);
  };

  // Hàm để thực hiện lệnh có giá trị (ví dụ: fontSize, color)
  const handleCommandWithValue = (command: string, value: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div>
      {/* Thanh công cụ */}
        <div className="toolbar">
            <button onClick={() => handleCommand("bold")}>
                <img src={bold}/>
            </button>
            <button onClick={() => handleCommand("italic")}>
                <img src={italic}/>
            </button>
            <button onClick={() => handleCommand("underline")}>
                <img src={underline}/>
            </button>
            <button onClick={() => handleCommand("justifyLeft")}>
                <img src={left}/>
            </button>
            <button onClick={() => handleCommand("justifyCenter")}>
                <img src={center}/>
            </button>
            <button onClick={() => handleCommand("justifyRight")}>
                <img src={right}/>
            </button>
            <button onClick={() => handleCommand("justifyFull")}>
                <img src={justify}/>
            </button>
            {/* <button onClick={() => handleCommandWithValue("foreColor", "red")}>
                <img src={bold}/>
            </button> */}
            <button onClick={() => handleCommandWithValue("fontSize", "5")}>
                <img src={sizeup}/>
            </button>
            <button onClick={() => handleCommandWithValue("fontSize", "3")}>
                <img src={sizedown}/>
            </button>
            <button onClick={() => handleCommand("subscript")}>
                <img src={subscript}/>
            </button>
            <button onClick={() => handleCommand("superscript")}>
                <img src={superscript}/>
            </button>
            <button onClick={() => handleCommand("insertUnorderedList")}>
                <img src={bullets}/>
            </button>
            <button onClick={() => handleCommand("insertOrderedList")}>
                <img src={numbering}/>
            </button>
            {/* Heading Buttons */}
            <button onClick={() => handleCommandWithValue("formatBlock", "H1")}>
                <img src={h1}/>
            </button>
            <button onClick={() => handleCommandWithValue("formatBlock", "H2")}>
                <img src={h2}/>   
            </button>
            <button onClick={() => handleCommandWithValue("formatBlock", "H3")}>
                <img src={h3}/>
            </button>
            <button onClick={() => handleCommandWithValue("formatBlock", "P")}>
                <img src={p}/>
            </button>
        </div>

        {/* Khu vực chỉnh sửa văn bản */}
        <div
            ref={editorRef}
            contentEditable="true"
            className="editor"
            style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "200px",
            marginTop: "10px",
            }}
        ></div>
    </div>
  );
};


export default TextEditor;
