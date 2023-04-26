import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

// const input = document.querySelector("input");
// console.log(input);

const UploadWidget = () => {
  const supabase = useSupabaseClient();
  //   const fileInput = document.getElementById("file-input");

  const [postData, setPostData] = useState({
    title: "",
    fileName: "",
    fileExt: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "file-input") {
      // Update postData
      const fileInput = document.getElementById("file-input");
      const fileData = value.replace("C:\\fakepath\\", "").split(".");
      setPostData({
        ...postData,
        fileName: fileData[0],
        fileExt: fileData[1],
        file: fileInput.files[0],
      });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };
  // First upload image to bucket storage

  // Then update the database with image url

  const handleUpload = async (e) => {
    console.log(postData);
    e.preventDefault();
    console.log(e);
    const { fileName, fileExt, file } = postData;
    // Get image from upload form
    // const userImage = e.target.files[0];
    // console.log(userImage);

    // Uplaod the image to bucket storage
    // Add try/catch for error handling & loading state
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${fileName}.${fileExt}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(data);

    if (error) {
      console.log(error);
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
          Post
        </button>
      </form>
    </div>
  );
};

export default UploadWidget;

// Protected route: use getserversideprops for redirect, pass user in props
