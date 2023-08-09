import Content from "@/components/content";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function Home() {
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

      <Navbar />

      <main className="container mx-auto">
        <Content />
      </main>
    </>
  );
}
