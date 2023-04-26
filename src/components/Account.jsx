// import { useState, useEffect } from "react";
// import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

// import React from "react";

// const Account = ({ session }) => {
//   const supabase = useSupabaseClient();
//   const user = useUser();

//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(null);
//   // Add more hooks here to add website, avatar url, etc.

//   useEffect(() => {
//     getProfile();
//   }, [session]);

//   const getProfile = async () => {
//     try {
//       setLoading(true);

//       let { data, error, status } = await supabase
//         .from("users")
//         .select(`username`)
//         .eq("id", user.id)
//         .single();

//       if (error && status !== 406) {
//         throw error;
//       }

//       if (data) {
//         setUsername(data.username);
//       }
//     } catch (err) {
//       alert("Error loading user details!");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async ({ username }) => {
//     // add more attributes like website, avatar url, etc.
//     try {
//       setLoading(true);

//       const updates = {
//         id: user.id,
//         username,
//         updated_at: new Date().toISOString(), // Capture current timestamp, TODO change to last_modified
//       };

//       let { error } = await supabase.from("users").upsert(updates);
//       if (error) throw error;
//       alert("Profile updated!");
//     } catch (err) {
//       alert("error updating profile!");
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           type="text"
//           name="email"
//           id="email"
//           value={session.user.email}
//           disabled
//         />
//       </div>
//       <div>
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           name="username"
//           id="username"
//           value={username || ""}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>

//       <div>
//         <button onClick={() => updateProfile({ username })} disabled={loading}>
//           {loading ? "Loading..." : "Update"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Account;
