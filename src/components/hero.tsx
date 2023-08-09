import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

const Hero: FC = () => {
  return (
    <section id="hero" className="container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Simple Note Taking app using Next.js, NextAuth, TRPC, and
              TailwindCSS
            </h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
                Notetaker is an example of a simple note taking app built using
                Next.js, NextAuth, TRPC, and TailwindCSS. This project uses the
                template from{" "}
                <Link
                  href="https://create.t3.gg/"
                  className="underline decoration-emerald-500 decoration-dotted underline-offset-2 dark:decoration-emerald-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  T3 Stack
                </Link>
                . Please sign in to use this app.
              </p>
            </div>
          </div>
          <div className="relative m-auto max-w-5xl">
            <Image
              src="https://images.unsplash.com/photo-1634078111133-a1e12d6131b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80"
              alt="Kelly Sikkema"
              className="mx-auto h-auto w-full rounded-xl bg-gray-400 dark:bg-slate-700"
              unoptimized
              priority
              sizes="(max-width: 64rem) 100vw, 1024px"
              loader={({ src }) => src}
              width={930}
              height={620}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
