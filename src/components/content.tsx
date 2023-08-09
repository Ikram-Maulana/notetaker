import Notes from "@/components/notes";
import { api, type RouterOutputs } from "@/utils/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useState, type FC } from "react";

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: FC = () => {
  const { data: sessionData } = useSession();
  const [topic, setTopic] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const {
    data: topics,
    isLoading: loadingTopics,
    isError: errorTopics,
    refetch: refetchTopics,
  } = api.topic.getAll.useQuery(undefined, {
    enabled: !!sessionData?.user,
    onSuccess: (data) => {
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  if (loadingTopics) {
    return (
      <p className="mx-auto mt-5 h-screen w-full max-w-5xl px-8 lg:px-24">
        <span className="animate-pulse">Loading</span> topics and notes...
      </p>
    );
  }

  if (errorTopics) {
    return (
      <p className="mx-auto mt-5 h-screen w-full max-w-5xl px-8 lg:px-24">
        Error to load topics and notes.
      </p>
    );
  }

  return (
    <div className="mx-auto mt-5 flex w-full max-w-5xl flex-col gap-8 px-8 lg:flex-row lg:gap-4 lg:px-24">
      <div className="flex h-auto w-full flex-col lg:w-3/12">
        <h1 className="mb-4 inline-flex w-full items-center justify-between border-b border-zinc-50 text-lg font-bold">
          Topics List
        </h1>
        <ul className="menu rounded-box w-full bg-base-100 p-0">
          {!loadingTopics && !errorTopics && topics.length === 0 && (
            <div className="alert">
              <p>No topics found.</p>
            </div>
          )}
          {!loadingTopics &&
            !errorTopics &&
            topics.length > 0 &&
            topics?.map((topic) => (
              <li key={topic.id}>
                <a
                  className={
                    selectedTopic?.id === topic.id
                      ? "rounded-none border-l-4 border-blue-500"
                      : "rounded-none border-l-4 border-zinc-50"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedTopic(topic);
                  }}
                >
                  {topic.title}
                </a>
              </li>
            ))}
        </ul>

        <h1 className="my-4 inline-flex w-full items-center justify-between border-b border-zinc-50 text-lg font-bold">
          Add Topic
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTopic.mutate({
              title: topic,
            });
            setTopic("");
          }}
        >
          <input
            type="text"
            placeholder="New topic"
            className="input input-bordered input-sm w-full"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm mt-3 w-full capitalize"
            disabled={createTopic.isLoading}
          >
            {createTopic.isLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {createTopic.isLoading ? "Creating" : "Create"}
          </button>
        </form>
      </div>
      <div className="flex min-h-screen w-full flex-col gap-4 border-l border-zinc-100 lg:w-9/12 lg:pl-8">
        <div> Add new note here </div>
        <Notes topicId={selectedTopic?.id ?? ""} />
      </div>
    </div>
  );
};

export default Content;
