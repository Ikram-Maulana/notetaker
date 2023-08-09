import Content from "@/components/content";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Notetaker</title>
        <meta
          name="description"
          content="A simple note taking app built with Next.js, NextAuth, TRPC, and TailwindCSS."
        />
        <meta name="application-name" content="Notetaker" />
        <meta
          name="keywords"
          content="nextjs,notetaker,t3-stack,nextauth,trpc,tailwindcss"
        />
        <meta name="theme-color" content="#F9F5EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="creator" content="Ikram Maulana" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <Navbar />

        <main className="container mx-auto">
          {sessionData?.user ? (
            <Content />
          ) : (
            <section
              id="hero"
              className="container max-w-7xl py-28 md:py-36 lg:py-60 xl:py-48"
            >
              <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
                <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Welcome to Notetaker
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
                    Notetaker is a simple note taking app built with Next.js,
                    NextAuth, TRPC, and TailwindCSS that uses template from{" "}
                    <Link
                      href="https://create.t3.gg/"
                      className="underline decoration-emerald-500 decoration-dotted underline-offset-2 dark:decoration-emerald-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      T3 Stack
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
