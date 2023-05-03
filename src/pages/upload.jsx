import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import UploadWidget from "@/components/UploadWidget";

const Upload = () => {
  return (
    <div>
      <UploadWidget />
    </div>
  );
};

export default Upload;

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
