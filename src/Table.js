import React from "react";
import logo from "./logo.svg";
import "./Table.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import { width } from "@mui/system";
import { toast } from "react-toastify";

const Table = () => {
  const [print, setPrint] = useState([]);
  const [URL, setURL] = useState("");
  const [image, setImage] = useState([]);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [imgUpload, setImgUpload] = useState("");
  const [getId, setGetID] = useState("");

  // CALL API
  useEffect(() => {
    axios
      .get(
        "https://buzzy.codderlab.com/banner/all?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ"
      )
      .then((response) => {
        console.log(response.data.banner);
        setPrint(response.data.banner);
      });
  }, []);
  console.log(print);
  //END CALL API

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
    setURL("");
    setError("");
    setImage("");
    setImageUrl("");
  };
  //END Open dialog

  // CLose diaolog
  const handleClose = () => {
    setOpen(false);
  };
  //END  CLose diaolog

  // Validation
  const validation = () => {
    let error = {};
    if (URL === "" && image === "") {
      if (!URL) error.URL = "invalid Email ! ";
      if (!image) error.image = "select image !";
      const imageUrl = require(image);
      return setError({ ...error });
    } else {
      handleClose();
    }
  };
  //END  Validation

  // URL image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  // END URL image

  //DELETE
  const deleteRow = (createdAt) => {
    setPrint(print.filter((item) => item.createdAt !== createdAt));
  };
  // END DELETE

  // EDIT
  const handleEdit = (index) => {
    setEditIndex(index);
  };
  // END EDIT

  //Update edit
  const handleUpdate = async (event) => {
    event.preventDefault();
    const { image, URL, createdAt, updatedAt } = event.target.elements;

    const newPrint = [...print];
    newPrint[editIndex] = {
      image: image.value,
      URL: URL.value,
      createdAt: createdAt.value,
      updatedAt: updatedAt.value,
    };
    setPrint(newPrint);
    setEditIndex(null);

    await axios.put(
      "https://buzzy.codderlab.com/banner/all?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ",
      newPrint[editIndex]
    );
  };
  // END Update edit

  // POST api
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("URL", URL);
    console.log(URL);
    console.log(image);

    axios
      .post(
        "https://buzzy.codderlab.com/banner?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ",
        formData
      )
      .then((response) => {
        console.log(response.data);
        const updateData = print.unshift(response.data.banner);
        setURL(updateData.image);
        setImgUpload(updateData.URL);
        // console.log(response.data.banner);
      })
      .catch((error) => {
        console.log("error", error);
      });
    toast.success("Upload Successfully", {
      position: "top-left",
    });
    handleClose();
  };
  //END POST api

  return (
    <>
      <div>
        <h1>Key API</h1>
      </div>
      <div className="add">
        {/* <Link to="/Dialog"> */}
        <button onClick={handleClickOpen}>
          <h4>
            <i className="fa-solid fa-plus icon"></i>
            <span>Add</span>
          </h4>
        </button>
        {/* </Link> */}
      </div>
      <div className="main_table">
        <table border={1} cellSpacing={10} className="table-bordered ">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>URL</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {print?.map((item, index) => {
            // console.log(print.image)
            return (
              <tbody>
                <tr className="all_raw">
                  <td>{index + 1}</td>

                  <td className="image" name="image">
                    <img src={`https://buzzy.codderlab.com/${item?.image}`} />
                  </td>
                  <td align="center">{item?.URL}</td>
                  <td name="">{item?.createdAt}</td>
                  <td>{item?.updatedAt}</td>
                  <td className="edit">
                    <button onClick={() => handleEdit(index)}>
                      <i className="fa-regular fa-pen-to-square"></i>
                      <span>Edit</span>
                    </button>
                  </td>
                  <td className="delete">
                    <button onClick={() => deleteRow(item.createdAt)}>
                      <i className="fa-solid fa-trash-can"></i>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div>
        <Dialog className="main" open={open} onSubmit={validation}>
          <DialogTitle className="dialog">Banner</DialogTitle>
          <DialogContent className="dialog">
            <div className="all_input">
              <label>URL</label>
              <input
                autoFocus
                margin="dense"
                name="URL"
                id="name"
                placeholder=""
                type="email"
                fullWidth
                variant="standard"
                value={URL}
                onChange={(e) => {
                  setURL(e.target.value);
                  if (!e.target.value) {
                    setError({ ...error, URL: "invaliod URL" });
                  } else {
                    setError({ ...error, URL: "" });
                  }
                }}
              />
              <div>
                {" "}
                <span className="error">{error.URL}</span>
              </div>

              <label className="banner_image">Banner image</label>
              <p>
                <input
                  type="file"
                  id="myfile"
                  name="image"
                  value={image}
                  onChange={handleImageChange}
                  // onChange={(e) => {
                  //   setImage(e.target.value);
                  //   if (!e.target.value) {
                  //     setError({ ...error, image: "invaliod image" });
                  //   } else {
                  //     setError({ ...error, image: "" });
                  //   }
                  // }}
                />
                {imageUrl && (
                  <img
                    className="selected_img"
                    src={imageUrl}
                    alt="Selected Image"
                  />
                )}

                <div>
                  <span className="error">{error.image}</span>
                </div>
              </p>
            </div>
          </DialogContent>
          <DialogActions className="dialog">
            <button className="cancle" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit"
              // onSubmit={validation}
              onClick={submitHandler}
            >
              submit
            </button>
          </DialogActions>
        </Dialog>
      </div>
      {editIndex !== null && (
        <div>
          <form className="edit_data" onSubmit={handleUpdate}>
            <div className="edit_title">
              <h2>Edit</h2>
            </div>
            <input
              type="text "
              name="image"
              defaultValue={print[editIndex].image}
            />
            <input type="text" name="URL" defaultValue={print[editIndex].URL} />
            <input
              type="text"
              name="createdAt"
              defaultValue={print[editIndex].createdAt}
            />
            <input type="text" name="updatedAt" defaultValue={Date()} />
            <button type="submit" className="update">
              Update
            </button>
            <button onClick={handleClose}>Cancle</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Table;
