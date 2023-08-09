import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState, type FC } from "react";

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
}

const NoteEditor: FC<NoteEditorProps> = ({ onSave }) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note Title"
            className="input input-primary w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <ReactCodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          width="100%"
          height="30vh"
          minWidth="100%"
          minHeight="100%"
          extensions={[
            markdown({
              base: markdownLanguage,
              codeLanguages: languages,
            }),
          ]}
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn btn-primary m-8 mt-0"
          onClick={() => {
            onSave({ title, content: code });
            setCode("");
            setTitle("");
          }}
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
