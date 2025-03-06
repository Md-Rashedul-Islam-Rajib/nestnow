export const uploadImage = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pzk6cmri"); //preset_name
      formData.append("cloud_name", "dbe3ewhey"); //cloud_name

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbe3ewhey/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    };