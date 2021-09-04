import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import Loader from "../component/Loader";
import { assetsImages } from "../constants/images";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AllArtists = () => {
  const MySwal = withReactContent(Swal);
  const [artists, setartists] = useState([]);
  const [loading, setloading] = useState(false);
  const [mid, setmid] = useState("");
  const [mfirstname, setmfirstname] = useState("");
  const [mlastname, setmlastname] = useState("");
  const [maddress, setmaddress] = useState("");
  const [mcity, setmcity] = useState("");
  const [mcountry, setmcountry] = useState("");
  const [memail, setmemail] = useState("");
  const [mphone, setmphone] = useState("");
  const [mpincode, setmpincode] = useState("");
  const [msocialtokenaddress, setmsocialtokenaddress] = useState("");
  const [mwalletaddress, setmwalletaddress] = useState("");
  const [mtokensymbol, setmtokensymbol] = useState("");
  const [modal, setmodal] = useState(false);
  const [artistupdate, setartistupdate] = useState(false);
  const [mprofileimage, setmprofileimage] = useState();
  const [mbannerimage, setmbannerimage] = useState();

  useEffect(() => {
    getArtists();
  }, []);
  useEffect(() => {
    artistupdate &&
      MySwal.fire({
        title: (
          <p style={{ color: "white" }}>Artist Data Updated Succesfully</p>
        ),
        icon: "success",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setartistupdate((artistupdate) => !artistupdate);
      });
  }, [artistupdate]);

  const getArtists = async () => {
    try {
      setloading(true);
      const { data } = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/getall`,
        { params: { status: "pending" } }
      );
      setartists(data.artists);
      setloading(false);
    } catch (e) {}
  };

  const handleApprove = async (e) => {
    try {
      await Axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/activate`,
        { id: e.target.id }
      );
    } catch (e) {}
  };

  const displayArtists = () => {
    return artists.map((artist, i) => {
      return (
        <tr key={i}>
          <td>
            <img
              style={{ borderRadius: "50%", height: "80px", width: "80px" }}
              src={
                artist.profile_image !== ""
                  ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                  : assetsImages.person
              }
              alt={artist.first_name ? artist.first_name : ""}
            />
          </td>
          <td>{`${artist.first_name ? artist.first_name : ""} ${
            artist.last_name ? artist.last_name : ""
          }`}</td>
          <td>
            <Button variant="primary" id={artist._id} onClick={handleApprove}>
              Approve
            </Button>
          </td>
        </tr>
      );
    });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      className="dashboard-wrapper-main vw-100"
      style={{ minHeight: "100vh" }}
    >
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayArtists()}</tbody>
      </Table>
    </div>
  );
};

export default AllArtists;
