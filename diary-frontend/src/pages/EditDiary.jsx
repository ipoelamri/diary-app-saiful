import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const EditDiary = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/diaries/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const diary = response.data.diary;
        setDate(diary.date);
        setTitle(diary.title);
        setDetail(diary.detail);
        setExistingImage(diary.image);
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };

    fetchDiary();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", date);
    formData.append("title", title);
    formData.append("detail", detail);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/diaries/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Diary updated:", response.data);
      history.push("/diaries");
    } catch (error) {
      console.error("Error updating diary:", error);
    }
  };

  return (
    <div>
      <h2>Edit Diary</h2>
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
        {existingImage && (
          <img
            src={existingImage}
            alt="Existing Diary"
            style={{ width: "100px" }}
          />
        )}
        <br />
        <button type="submit">Update Diary</button>
      </form>
    </div>
  );
};

export default EditDiary;
