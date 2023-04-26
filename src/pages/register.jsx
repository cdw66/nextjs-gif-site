import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

const Register = (props) => {
  return <RegisterForm />;
};

export default Register;

// Check if the user has a session serverside before rendering page
// This prevents the "flash" that occurs before router.push()
export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx); // Create server client
  const {
    data: { session },
  } = await supabase.auth.getSession(); // Get user session

  if (session)
    // Redirect if user is logged in
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };

  return {
    props: {
      //   initialSession: session,
      //   user: session.user,
      //   Pass data to the component here
    },
  };
}
