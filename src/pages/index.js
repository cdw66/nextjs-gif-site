// import Image from "next/image";
// import { Inter } from "next/font/google";
// import { Main } from "next/document";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import PostGallery from "@/components/PostGallery";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ posts }) {
  console.log("posts", posts);
  return <PostGallery posts={posts} />;
}

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx); // Create server client

  //   try {
  const { data: posts, error } = await supabase.from("posts").select();
  // console.log(posts);

  if (error) {
    console.log(error);
  }

  return {
    props: {
      posts,
      //   initialSession: session,
      //   user: session.user,
      //   Pass data to the component here
    },
  };
}
