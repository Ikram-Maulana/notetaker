import { type RouterOutputs } from "@/utils/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, type FC } from "react";
import ReactMarkdown from "react-markdown";

type Note = RouterOutputs["note"]["getAll"][0];

interface NoteCardProps {
  note: Note;
  onDelete: () => void;
  isLoading: boolean;
}

const NoteCard: FC<NoteCardProps> = ({ note, onDelete, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-md">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-lg">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button
            className="btn btn-warning btn-sm px-5 capitalize"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
