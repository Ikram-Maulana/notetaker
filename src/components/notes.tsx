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

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
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
            />
          </div>
        ))}
      </div>
      <NoteEditor
        onSave={({ title, content }) => {
          createNote.mutate({
            topicId,
            title,
            content,
          });
        }}
      />
    </>
  );
};

export default Notes;
