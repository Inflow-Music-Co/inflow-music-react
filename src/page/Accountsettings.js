/* eslint-disable */
import React, { useState, useEffect } from "react";
// import Tabs from 'react-bootstrap/Tabs'
// import Dropdown from 'react-bootstrap/Dropdown';
// import TabContainer from 'react-bootstrap/TabContainer'
import axios from "axios";
import Loader from "../component/Loader";
import { useSelector } from "react-redux";
import { assetsImages } from "../constants/images";
import SweetAlert from "react-bootstrap-sweetalert";
import Axios from "axios";
import { Modal } from "react-bootstrap";

let country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Accountsettings = () => {
  const userdata = useSelector((state) => state.auth.data);
  const uid = useSelector((state) => state.auth.data._id);
  const isArtist = useSelector((state) => state.auth.isArtist);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistSocial, setArtistSocial] = useState({});
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [loading, setloading] = useState(false);
  const [profileimg, setprofileimg] = useState("");
  const [uprofileimage, setuprofileimage] = useState();
  const [ubannerimage, setubannerimage] = useState();
  const [resetpasswordemailsent, setresetpasswordemailsent] = useState(false);
  const [convertProfile, setConvertProfile] = useState(false);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    setloading(true);
    let user;
    if (isArtist) {
      const res = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`,
        { id: uid }
      );
      user = res.data.artist;
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/profile/get`,
        { uid }
      );
      user = res.data.user;
    }

    if (user) {
      setfirstname(user.first_name ? user.first_name : user.name);
      setlastname(user.last_name);
      setcity(user.city);
      setcountry(user.country);
      setpincode(user.pin_code ? user.pin_code : "");
      setaddress(user.address ? user.address : "");
      setprofileimg(user.profile_image);
    }
    setloading(false);
  };

  const savechanges = async () => {
    setloading(true);
    const data = new FormData();
    data.append("uid", uid);
    data.append("first_name", firstname ? firstname : "");
    data.append("last_name", lastname ? lastname : "");
    data.append("city", city ? city : "");
    data.append("country", country ? country : "");
    data.append("pin_code", pincode ? pincode : "");
    data.append("address", address ? address : "");
    if (uprofileimage) {
      data.append("profile", uprofileimage);
    }
    if (ubannerimage) {
      data.append("banner", ubannerimage);
    }
    await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/v1/user/profile/update`,
      data
    );
    await getdata();
    setloading(false);
    window.location.href = "/accountsettings";
  };

  const forgotPassword = async () => {
    try {
      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/resetpassword`,
        { email: userdata.email }
      );
      setresetpasswordemailsent(true);
    } catch (e) {
      console.error(e);
    }

    // auth
    //   .sendPasswordResetEmail(userdata.email)
    //   .then((result) => {
    //       setresetpasswordemailsent(true);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleConvertProfile = async () => {
    // profileimg &&
    // ubannerimage &&
    // TODO: Uncomment for profile & banner image requirement

    email && phone && artistName && artistSocial["socialOne"]
      ? alert("submitted")
      : alert("please submit required info");

    // TODO: Build Functionality
    // Send Axios post request to DB
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-wrapper-main">
      <div className="heading">Account settings</div>
      <div className="tab-settings-main">
        <nav>
          <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <a
              className="nav-item nav-link active"
              id="nav-home-tab"
              data-toggle="tab"
              href="#nav-home"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              General Settings
            </a>
            {/* <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Accounts</a>
                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Socials</a>
                <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Activites</a>
                <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Personalization</a>
                <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Other</a> */}
          </div>
        </nav>
        <div className="tab-content pt-3" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="account-setting-form">
              <div className="d-flex w-100 justify-content-center align-items-center col-12">
                <div className="col-4"></div>
                <div className="col-4 d-flex justify-content-center">
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "200px",
                      width: "200px",
                    }}
                    src={
                      profileimg !== ""
                        ? `${process.env.REACT_APP_SERVER_URL}/${profileimg}`
                        : assetsImages.person
                    }
                    alt=""
                  />
                </div>
                <div className="col-4 d-flex justify-content-around">
                  {!isArtist && (
                    <div>
                      {convertProfile && (
                        <button
                          className="btn-gradiant"
                          style={{ background: "white", color: "black" }}
                          onClick={() =>
                            setConvertProfile(
                              (convertProfile) => !convertProfile
                            )
                          }
                        >
                          Cancel
                        </button>
                      )}
                      {!convertProfile && (
                        <button
                          className="btn-gradiant"
                          onClick={() => {
                            setConvertProfile(
                              (convertProfile) => !convertProfile
                            );
                          }}
                        >
                          Apply as Artist
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grids-main-inputs pb-0">
                <div className="comman-grids">
                  <input
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setfirstname(e.target.value)}
                  />
                </div>
                <div className="comman-grids">
                  <input
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setlastname(e.target.value)}
                  />
                </div>

                <div className="comman-grids Address-main">
                  <input
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="grids-main-inputs three-inputs pb-0">
                <div className="comman-grids">
                  <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  />
                </div>
                <div className="comman-grids">
                  <input
                    placeholder="Postcode/ZIP"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                  />
                </div>
                <div className="comman-grids">
                  <select
                    name="countries"
                    id="countries"
                    form="carform"
                    className="common-grids-select"
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                  >
                    <option value="Country" active>
                      Country
                    </option>
                    {country_list.map((country, i) => (
                      <option key={i} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grids-main-inputs pb-0">
                <div className={`comman-grids ${convertProfile && "required"}`}>
                  Profile Image:
                  <input
                    onChange={(e) => setuprofileimage(e.target.files[0])}
                    placeholder="Profile Image"
                    id="profileimage"
                    type="file"
                  />
                </div>

                {isArtist ||
                  (convertProfile && (
                    <div
                      className={`comman-grids ${convertProfile && "required"}`}
                    >
                      Banner Image:
                      <input
                        onChange={(e) => setubannerimage(e.target.files[0])}
                        placeholder="Banner Image"
                        id="bannerimage"
                        type="file"
                      />
                    </div>
                  ))}
              </div>

              <div className="grids-main-inputs">
                {convertProfile && (
                  <>
                    <div className="comman-grids">
                      <input
                        placeholder="Email"
                        className="required"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="comman-grids">
                      <input
                        placeholder="Phone"
                        className="required"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="comman-grids">
                      <input
                        placeholder="Artist Name"
                        className="required"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                      />
                    </div>
                    <div className="comman-grids">
                      <input
                        placeholder="Artist Social 1"
                        className="required"
                        value={artistSocial ? artistSocial["socialOne"] : null}
                        onChange={(e) =>
                          setArtistSocial((artistSocial) => {
                            return {
                              ...artistSocial,
                              socialOne: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                    <div className="comman-grids">
                      <input
                        placeholder="Artist Social 1"
                        className="required"
                        value={artistSocial ? artistSocial["socialTwo"] : null}
                        onChange={(e) =>
                          setArtistSocial((artistSocial) => {
                            return {
                              ...artistSocial,
                              socialTwo: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                    <div className="comman-grids">
                      <input
                        placeholder="Artist Social 1"
                        className="required"
                        value={
                          artistSocial ? artistSocial["socialThree"] : null
                        }
                        onChange={(e) =>
                          setArtistSocial((artistSocial) => {
                            return {
                              ...artistSocial,
                              socialThree: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="save-changes-main row d-flex justify-content-around">
                {!convertProfile && (
                  <>
                    <button
                      style={{ background: "white", color: "black" }}
                      onClick={forgotPassword}
                    >
                      Reset Password
                    </button>
                    <button onClick={savechanges}>Save Changes</button>
                  </>
                )}

                {convertProfile && (
                  <button onClick={handleConvertProfile}>Apply</button>
                )}
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            Et et consectetur ipsum labore excepteur est proident excepteur ad
            velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
            anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit
            non irure adipisicing aliqua ullamco irure incididunt irure non esse
            consectetur nostrud minim non minim occaecat. Amet duis do nisi duis
            veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui
            sit. Exercitation mollit sit culpa nisi culpa non adipisicing
            reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad
            duis occaecat ex.
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            Et et consectetur ipsum labore excepteur est proident excepteur ad
            velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
            anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit
            non irure adipisicing aliqua ullamco irure incididunt irure non esse
            consectetur nostrud minim non minim occaecat. Amet duis do nisi duis
            veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui
            sit. Exercitation mollit sit culpa nisi culpa non adipisicing
            reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad
            duis occaecat ex.
          </div>
          <div
            className="tab-pane fade"
            id="nav-about"
            role="tabpanel"
            aria-labelledby="nav-about-tab"
          >
            Et et consectetur ipsum labore excepteur est proident excepteur ad
            velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
            anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit
            non irure adipisicing aliqua ullamco irure incididunt irure non esse
            consectetur nostrud minim non minim occaecat. Amet duis do nisi duis
            veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui
            sit. Exercitation mollit sit culpa nisi culpa non adipisicing
            reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad
            duis occaecat ex.
          </div>
        </div>
      </div>
      <SweetAlert
        info
        show={resetpasswordemailsent}
        title="Check your email for changing password"
        style={{ color: "#000" }}
        onConfirm={() => {
          setresetpasswordemailsent(
            (resetpasswordemailsent) => !resetpasswordemailsent
          );
        }}
        onCancel={() => {
          setresetpasswordemailsent(
            (resetpasswordemailsent) => !resetpasswordemailsent
          );
        }}
      ></SweetAlert>

      <Modal
        // show={convertProfile}
        className="edit-profile-modal"
        onHide={() => {
          setConvertProfile((convertProfile) => !convertProfile);
        }}
        dialogClassName="convertProfileModal"
      >
        {/* <Modal.Header>
          <div className="d-flex flex-row justify-content-around col-12">
            <h4 className="login-type">Artist Application</h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="account-setting-form">
            <div className="d-flex w-100 justify-content-center align-items-center">
              <img
                style={{
                  borderRadius: "50%",
                  height: "200px",
                  width: "200px",
                }}
                src={
                  profileimg !== ""
                    ? `${process.env.REACT_APP_SERVER_URL}/${profileimg}`
                    : assetsImages.person
                }
                alt=""
              />
            </div>
            <div className="grids-main-inputs">
              <div className="comman-grids">
                <input
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </div>
              <div className="comman-grids">
                <input
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                />
              </div>
              <div className="comman-grids Address-main">
                <input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
            </div>

            <div className="grids-main-inputs three-inputs pt-0 pb-0">
              <div className="comman-grids">
                <input
                  placeholder="City"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />
              </div>
              <div className="comman-grids">
                <input
                  placeholder="Postcode/ZIP"
                  value={pincode}
                  onChange={(e) => setpincode(e.target.value)}
                />
              </div>
              <div className="comman-grids">
                <select
                  name="countries"
                  id="countries"
                  form="carform"
                  className="common-grids-select"
                  value={country}
                  onChange={(e) => setcountry(e.target.value)}
                >
                  <option value="Country" active>
                    Country
                  </option>
                  {country_list.map((country, i) => (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grids-main-inputs">
              <div className="comman-grids">
                Profile Image:
                <input
                  onChange={(e) => setuprofileimage(e.target.files[0])}
                  placeholder="Profile Image"
                  id="profileimage"
                  type="file"
                />
              </div>

              {!isArtist && (
                <div className="comman-grids">
                  Banner Image:
                  <input
                    onChange={(e) => setubannerimage(e.target.files[0])}
                    placeholder="Banner Image"
                    id="bannerimage"
                    type="file"
                  />
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-column flex-wrap justify-content-center align-items-center col-12">
            <button className="btn-gradiant" onClick={handleConvertProfile}>
              Apply
            </button>
          </div>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default Accountsettings;
