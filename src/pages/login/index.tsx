import GithubAuthButton from "@/components/github-auth-button";
import { getServerAuthSession } from "@/server/auth";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { type FC } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const Login: FC = () => {
  return (
    <>
      <Head>
        <title>Login | Notetaker</title>
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

      <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <Link href="/">
              <button className="btn btn-ghost btn-sm capitalize">
                <ChevronLeftIcon className="mr-2 h-4 w-4" />
                Back to home
              </button>
            </Link>
            <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
              <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome Back
              </h1>
              <div className="mx-auto max-w-3xl">
                <p className="mb-6 text-xl text-gray-600 dark:text-zinc-400">
                  Please sign in using your github account to continue.
                </p>
              </div>

              <GithubAuthButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
