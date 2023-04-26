// import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import SignInForm from "@/components/auth/SignInForm";
import { useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";

const SignIn = () => {
  //   const session = useSession();
  //   const supabase = useSupabaseClient();
  //   const user = useUser();

  //   useEffect(() => {
  //     if (user) router.push("/profile");
  //   }, []);

  return <SignInForm />;
};

export default SignIn;

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
