import React from "react";
import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
// import { CgProfile } from "react-icons/fa";
import {
  FaUser,
  FaSignOutAlt,
  FaList,
  FaSignInAlt,
  FaUpload,
} from "react-icons/fa";

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
            <Link href="/upload">
              <button className="btn btn-secondary gap-2 ml-2 capitalize">
                <FaUpload />
                Upload
              </button>
            </Link>
            {/* {console.log(user)} */}
            {/* <p>Signed in as {user.user_metadata.username}!</p> */}
            <Link href="/profile" className="underline cursor-pointer">
              <button className="btn btn-primary gap-2 ml-2 capitalize">
                <FaUser />
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
              <FaSignOutAlt />
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/register" className="ml-2 underline cursor-pointer">
              <button className="btn btn-secondary gap-2 capitalize">
                <FaList />
                Register
              </button>
            </Link>
            <Link href="/signin" className="ml-2 underline cursor-pointer">
              <button className="btn btn-primary gap-2 ml-2 capitalize">
                <FaSignInAlt />
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
