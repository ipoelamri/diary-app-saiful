import React, { useState } from "react";
import axios from "axios";

const AddDiary = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("detail", detail);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/diaries",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Diary added:", response.data);
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };

  return (
    <div>
      <h2>Add Diary</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <label>Detail:</label>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
        />
        <br />
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button type="submit">Add Diary</button>
      </form>
    </div>
  );
};

export default AddDiary;
