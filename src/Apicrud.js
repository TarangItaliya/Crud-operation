import React, { useEffect, useState } from "react";
import axios from "axios";
// import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./App.css";
import { toast } from "react-toastify";
// import swal from "sweetalert";
import TablePagination from "@mui/material/TablePagination";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ApiCrude() {
  const [myData, setMyData] = useState([]);
  const [open, setOpen] = useState(false); // open and close for modal
  const [url, setUrl] = useState(""); // api all data call on modal
  const [imgUpload, setImgUpload] = useState(""); // upload images from gallery
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [getId, setGetID] = useState("");

  useEffect(() => {
    get();
  }, []);

  const get = () => {
    axios
      .get(
        "https://buzzy.codderlab.com/banner/all?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ"
      )
      .then((response) => {
        setMyData(response.data.banner);
        console.log("response gettttttttttt", response.data.banner);
      });
  };

  const handleOpen = (data) => {
    setUrl(data.URL);
    setGetID(data._id);
    setImgUpload("https://buzzy.codderlab.com/" + data.image);

    setOpen(true);
    // setUrl(e);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    if (!url || image.length === 0) {
      let error = {};
      if (!url) {
        error.url = "Url Is Required";
      }
      // console.log("::::::::::>", image);

      if (image.length === 0 && image == "") {
        error.image = "image is required";
      }

      return setError({ ...error });
    } else {
      if (!getId) {
        const formData = new FormData();
        formData.append("URL", url);
        formData.append("image", image);

        axios
          .post(
            "https://buzzy.codderlab.com/banner?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ",
            formData
          )
          .then((response) => {
            const updateData = myData.unshift(response.data.banner);
            setUrl(updateData);
            setImgUpload(updateData);
          })
          .catch((error) => {
            console.log("error", error);
          });
        toast.success("Upload Successfully", {
          position: "top-left",
        });
      } else {
        const formData = new FormData();
        formData.append("URL", url);
        formData.append("image", image);

        axios
          .patch(
            `https://buzzy.codderlab.com/banner/${getId}?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ`,
            formData
          )
          .then((response) => {
            console.log("response", response.data.banner);
            get();
          })
          .catch((error) => {
            console.log("error", error);
          });
        toast.success("Update Successfully", {
          position: "top-right",
        });
      }
    }

    handleClose();
  };
//   const deleteApiData = (id, data) => {
//     swal({
//       title: "Deleted!",
//       text: "Once deleted, you will not be able to recover this file!",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         swal("!Your file has been deleted!", 
//         {
//           icon: "success",
//         });
//         axios

//           .delete(
//             `https://buzzy.codderlab.com/banner/${id}?key=dH2PxQSNvJN1KGJkTQYrzTPeSLShBRLJ`
//           )
//           .then((response) => {
//             console.log("delete data", response.data.banner);
//             console.log("id::::::", id);

//             get();
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         toast.success("Delete Successfully", {
//           position: "top-right",
//         });
//       } else {
//         // swal("Your file is safe!");
//       }
//     });
//   };
  const editBtn = (data, id) => {
    handleOpen(data);

    console.log("Edit data", data);

    // console.log("id", id);
  };

  const   upload = (e) => {
    if (e.target.files[0] == 0) {
      setError({
        ...error,
        image: "image is required",
      });
    } else {
      setError({
        ...error,
        image: "",
      });
    }
    setImage(e.target.files[0]);
    setImgUpload(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <h3>Product Details</h3>
        <Button
          className="mt-3"
          variant="contained"
          color="success"
          style={{ display: "flex", margin: "auto" }}
          onClick={handleOpen}
        >
          Add Product +
        </Button>

        <div className="container mt-2 " style={{ width: "69%" }}>
          <table striped bordered hover>
            <thead>
              <tr>
                <th>INDEX</th>
                <th>IMAGES</th>
                <th>URL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {myData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`https://buzzy.codderlab.com/${data.image}`}
                      height="100px"
                      width="100px"
                    />
                  </td>
                  <td>{data.URL}</td>
                  <td>
                    <div className="d-flex justify-content-evenly">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => editBtn(data)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => (data._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />

          <hr />
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h3> Product Details</h3>
            </div>

            <label>URL:</label>
            <div>
              <input
                className="form-control mb-2"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (!e.target.value) {
                    setError({
                      ...error,
                      url: "URL is required",
                    });
                  } else {
                    setError({
                      ...error,
                      url: "",
                    });
                  }
                }}
              />
              {error.url && <p style={{ color: "red" }}>{error.url}</p>}
            </div>
            <label>Banner Images:</label>
            <div>
              <input
                type="file"
                onChange={upload}
                className="form-control mb-3"
              />
              {error.image && <p style={{ color: "red" }}>{error.image}</p>}

              {imgUpload ? (
                <img
                  src={imgUpload}
                  style={{
                    width: "100px",
                    height: "69.33px",
                    border: "2px solid black",
                  }}
                />
              ) : (
                <img
                  src={imgUpload}
                  style={{
                    width: "100px",
                    height: "69.33px",
                    border: "2px solid black",
                  }}
                />
              )}
            </div>
            {/*
            <div>
              <img
                height="100px"
                width="100px"
                style={{ border: "2px solid black" }}
                src={`https://buzzy.codderlab.com/${url.image}`}
              />
              </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={handleSubmit}
                style={{ marginRight: "5px" }}
              >
                Submit
              </Button>
              {/*{imgUpload ? (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleSubmit}
                  style={{ marginRight: "5px" }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handleSubmit()}
                  style={{ marginRight: "5px" }}
                >
                  Submit
                </Button>
              )}*/}
              <Button onClick={handleClose} variant="outlined" color="error">
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default ApiCrude;
