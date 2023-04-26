import { useState } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const RegisterForm = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="rounded-lg max-w-md flex flex-col bg-neutral shadow-lg p-12 mt-12 mx-auto">
      <h1 className="border-b-4 border-secondary text-4xl font-bold mb-10">
        Sign Up!
      </h1>
      <div className="mb-4">
        <label className="block" htmlFor="username">
          Username
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block" htmlFor="email">
          Email
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="mb-8">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input
          className="input input-bordered input-primary w-full"
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          required
        />
      </div>

      <button
        className="btn btn-wide btn-primary my-0 mx-auto capitalize"
        onClick={async () => {
          console.log(userData);
          const { username, email, password } = userData;
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                username,
              },
            },
          });
          if (error) alert(error.message);
          router.push("/");
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
