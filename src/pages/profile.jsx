import React from "react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const Profile = ({ user }) => {
  //   console.log(user);
  return (
    <div>
      <h1 className="text-6xl font-bold w-fit mx-auto mt-10">
        Hello,{" "}
        <span className="text-primary">{user.user_metadata.username}</span>
      </h1>
    </div>
  );
};

export default Profile;

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx); // Create server client
  const {
    data: { session },
  } = await supabase.auth.getSession(); // Get user session

  if (!session)
    // Redirect if user is logged in
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };

  return {
    props: {
      //   initialSession: session,
      user: session.user,
    },
  };
}
