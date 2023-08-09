import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            <h1 className="mb-6 scroll-m-20 text-8xl font-extrabold tracking-tight text-emerald-500 dark:text-emerald-400 lg:text-9xl">
              404
            </h1>
            <h2 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Page Not Found
            </h2>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
                The page you&apos;re looking for does not exist.
              </p>
            </div>
            <Link href="/">
              <button className="btn btn-ghost capitalize">
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Back to home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
