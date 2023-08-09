import Content from "@/components/content";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Home | Notetaker</title>
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
          {sessionData?.user ? <Content /> : <Hero />}
        </main>
        <Footer />
      </div>
    </>
  );
}
