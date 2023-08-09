import NoteEditor from "@/components/note-editor";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import NoteCard from "./note-card";

interface NotesProps {
  topicId: string;
}

const Notes: FC<NotesProps> = ({ topicId }) => {
  const { data: sessionData } = useSession();

  const {
    data: notes,
    isLoading: loadingNotes,
    isError: errorNotes,
    refetch: refetchNotes,
  } = api.note.getAll.useQuery(
    {
      topicId,
    },
    {
      enabled: !!sessionData?.user && !!topicId,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <>
      <NoteEditor
        onSave={({ title, content }) => {
          createNote.mutate({
            topicId,
            title,
            content,
          });
        }}
        isLoading={createNote.isLoading}
      />

      {loadingNotes && (
        <p className="mt-5">
          <span className="animate-pulse">Loading</span> notes...
        </p>
      )}

      {!loadingNotes && !errorNotes && notes.length === 0 && (
        <div className="alert mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-info"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No notes yet.</span>
        </div>
      )}

      {errorNotes && (
        <div className="alert alert-error mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Notes data failed to load.</span>
        </div>
      )}

      {!loadingNotes && !errorNotes && notes.length > 0 && (
        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() =>
                  deleteNote.mutate({
                    id: note.id,
                  })
                }
                isLoading={deleteNote.isLoading}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Notes;
