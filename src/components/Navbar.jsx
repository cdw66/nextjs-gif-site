import React from "react";
import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const Navbar = () => {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  // const { user, error } = await supabase.auth.getSession();
  // console.log("user", user);

  return (
    // <div >
    <nav className="bg-neutral p-6 flex justify-between">
      <Link href="/">GifCrab</Link>
      <div>
        {user ? (
          <>
            {/* {console.log(user)} */}
            {/* <p>Signed in as {user.user_metadata.username}!</p> */}
            <Link href="/profile" className="underline cursor-pointer">
              <button className="btn btn-primary gap-2 ml-2 capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Profile
              </button>
            </Link>
            <button
              className="btn btn-outline gap-2 ml-2 capitalize"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) alert(error.message);
                router.push("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="ml-2 underline cursor-pointer">
              <button className="btn btn-secondary gap-2 capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Register
              </button>
            </Link>
            <Link href="/signin" className="ml-2 underline cursor-pointer">
              <button className="btn btn-primary gap-2 ml-2 capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Sign In
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
