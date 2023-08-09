import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { ReloadIcon } from "@radix-ui/react-icons";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState, type FC } from "react";

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
  isLoading: boolean;
}

const NoteEditor: FC<NoteEditorProps> = ({ onSave, isLoading }) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <input
        type="text"
        placeholder="Note Title"
        className="input input-primary input-md w-full font-bold"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
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
        className="rounded-xl border border-gray-300"
      />
      <div className="flex justify-end">
        <button
          className="btn btn-primary"
          onClick={() => {
            onSave({ title, content: code });
            setCode("");
            setTitle("");
          }}
          disabled={
            title.trim().length === 0 || code.trim().length === 0 || isLoading
          }
        >
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Saving" : "Save"}
        </button>
      </div>
    </>
  );
};

export default NoteEditor;
