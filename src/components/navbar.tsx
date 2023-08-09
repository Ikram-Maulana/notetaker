import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const Navbar: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="container navbar mx-auto py-4">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost px-2">
          <Image
            src="/logoipsum.webp"
            alt="Logo Ipsum"
            width={150}
            height={50}
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          {sessionData?.user ? (
            <>
              <label
                tabIndex={0}
                className="avatar btn btn-ghost flex items-center"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={sessionData?.user?.image ?? ""}
                    alt={sessionData?.user?.name ?? ""}
                    unoptimized
                    width={40}
                    height={40}
                    loader={({ src }) => src}
                  />
                </div>
                <p className="hidden text-sm md:block">
                  {sessionData?.user?.name ?? ""}
                </p>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a onClick={() => void signOut()}>Logout</a>
                </li>
              </ul>
            </>
          ) : (
            <button
              className="btn btn-ghost rounded-btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
