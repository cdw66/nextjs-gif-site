import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";
// import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

const UploadWidget = () => {
  const supabase = useSupabaseClient();
  // const fileInputRef = useRef(null);
  // const router = useRouter();
  const user = useUser();

  const [postData, setPostData] = useState({
    title: "",
    fileName: "",
    fileExt: "",
    file: null,
  });

  // Handle when user edits the form
  const handleChange = (e) => {
    const { name, value } = e.target;

    // When user selects a file
    if (name === "file-input") {
      // Update postData
      const fileInput = document.getElementById("file-input");
      const fileData = value.replace("C:\\fakepath\\", "").split("."); // Parse to get the filename
      setPostData({
        ...postData,
        fileName: fileData[0],
        fileExt: fileData[1],
        file: fileInput.files[0], // Add the file from file input element
      });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  // Handle when user submits upload form
  const handleUpload = async (e) => {
    e.preventDefault();
    const { fileName, fileExt, file } = postData;

    // Uplaod the image to bucket storage
    // TODO:  loading state
    try {
      // Upload image to bucket store
      await supabase.storage
        .from("images")
        .upload(`public/${fileName}.${fileExt}`, file, {
          cacheControl: "3600",
          upsert: false,
        })
        // Get public image url from storage
        .then(() => {
          const { data } = supabase.storage
            .from("images")
            .getPublicUrl(`public/${fileName}.${fileExt}`);
          return data.publicUrl;
        })
        // Insert post into the database
        .then(async (publicUrl) => {
          await supabase.from("posts").insert({
            user_id: user.id,
            title: postData.title,
            filename: fileName,
            file_ext: fileExt,
            source_url: publicUrl,
            num_likes: 0,
            // created_at: // These default to the current date & time in Supabase
            // updated_at:
          });
        });

      // Redirect to home page - TODO: Redirect to post OR allow user to upload another image
      // router.push("/");
    } catch (error) {
      //TODO: Better error handling
      console.log(error);
      alert("There was an error during upload :(");
    }
  };

  return (
    <div>
      <form className="rounded-lg max-w-lg flex flex-col bg-neutral shadow-lg p-12 mt-12 mx-auto">
        <h1 className="border-b-4 border-secondary text-4xl font-bold mb-10 uppercase tracking-wide">
          Create a new post
        </h1>
        <div className="mb-8">
          <label className="text-lg mb-4 block" htmlFor="title">
            Add a title for your post
          </label>
          <input
            className="input input-bordered input-primary w-full"
            name="title"
            type="text"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <div className="mb-12">
          <label className="text-lg mb-4 block" htmlFor="file-input">
            Upload your gif
          </label>
          <input
            id="file-input"
            className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
            name="file-input"
            type="file"
            accept=".gif"
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        <button
          type="submit"
          onClick={(e) => handleUpload(e)}
          className="btn btn-primary btn-lg"
        >
          <FaPlus />
          Post
        </button>
      </form>
    </div>
  );
};

export default UploadWidget;

// Protected route: use getserversideprops for redirect, pass user in props
