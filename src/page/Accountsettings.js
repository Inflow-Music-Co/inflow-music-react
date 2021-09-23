/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import { assetsImages } from "../constants/images";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateActivePage } from "../store/reducers/appSlice";
import { Magic } from "magic-sdk";

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
  "United States",
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
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const userdata = useSelector((state) => state.auth.data);
  const uid = useSelector((state) => state.auth.data._id);
  const isArtist = useSelector((state) => state.auth.isArtist);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setPhone] = useState("");
  const [artistSocial, setArtistSocial] = useState([]);
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [pincode, setpincode] = useState("");
  const [address, setaddress] = useState("");
  const [loading, setloading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [profileimg, setprofileimg] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [uprofileimage, setuprofileimage] = useState();
  const [ubannerimage, setubannerimage] = useState();
  const [resetpasswordemailsent, setresetpasswordemailsent] = useState(false);
  const [convertProfile, setConvertProfile] = useState(false);

  const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
    network: "rinkeby",
  });

  useEffect(async () => {

    const isLoggedIn = await magic.user.isLoggedIn();
    console.log('isLoggedIn', isLoggedIn)
   
    if(isLoggedIn) {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } 
    
    getdata();
  }, []);

  useEffect(() => {
    dispatch(updateActivePage("account"));
  });

  useEffect(() => {
    resetpasswordemailsent &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Reset Password</p>,
        html: (
          <p style={{ color: "white" }}>Check your email for password reset</p>
        ),
        icon: "success",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setresetpasswordemailsent(
          (resetpasswordemailsent) => !resetpasswordemailsent
        );
      });
  }, [resetpasswordemailsent]);

  const getdata = async () => {
    try {
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
    } catch (e) {
      setloading(false);
      alert("Something wrong!");
    }
  };

  const savechanges = async () => {
    try {
      setloading(true);
      const data = new FormData();
      data.append("uid", uid);
      data.append("first_name", firstname ? firstname : "");
      data.append("last_name", lastname ? lastname : "");
      data.append("city", city ? city : "");
      data.append("country", country ? country : "");
      data.append("pin_code", pincode ? pincode : "");
      data.append("address", address ? address : "");
      data.append("social_token_name", tokenName? tokenName : "");
      data.append("social_token_symbol", tokenSymbol? tokenSymbol : "");
      data.append("wallet_id", walletAddress? walletAddress : "");
      
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
      // window.location.href = "/accountsettings";
    } catch (e) {
      console.log("when saveChanges", e);
    }
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

  const handleApplyArtist = async () => {
    // Required fields validation, uncomment image fields
    if (
      //   !profileimg ||
      //   !ubannerimage ||
      !phone ||
      !artistSocial["socialOne"]
    ) {
      alert("Please check missing information.");
      return;
    }

    try {
      setloading(true);
      const data = new FormData();

      const socialLinks = [
        artistSocial["socialOne"],
        artistSocial["socialTwo"],
        artistSocial["socialThree"],
      ];
      console.log("socialLinks:", socialLinks);
      data.append("email", userdata.email);
      data.append("first_name", firstname ? firstname : "");
      data.append("last_name", lastname ? lastname : "");
      data.append("city", city ? city : "");
      data.append("phone", phone ? phone : "");
      data.append("country", country ? country : "");
      data.append("pin_code", pincode ? pincode : "");
      data.append("address", address ? address : "");
      data.append("socialLinks", socialLinks);

      if (uprofileimage) {
        data.append("profile", uprofileimage);
      }
      if (ubannerimage) {
        data.append("banner", ubannerimage);
      }

      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/onboarding`,
        data
      );
      // await getdata();
      setloading(false);
      // const { artist } = submitArtistProfile;
      // if (artist) {
      //   // TO DO: Review below setter functions and data extraction
      //   setfirstname(artist.first_name ? artist.first_name : artist.name);
      //   setcountry(artist.country ? artist.country : "");
      //   setprofileimage(artist.profile_image);
      //   setubannerimage(artist.banner_image);
      //   setPhone(artist.phone);
      //   setEmail(artist.email);
      //   setArtistName(artist.artist_name);
      //   setArtistSocial(artist.artistSocial["socialOne"]);
      //   // REVIEW: Do we need this? Or will it be automatic
      //   setIsArtist(true);
      // }
    } catch (e) {
      setloading(false);
      alert(e.response.data.message);
      console.log("when apply as artist", e);
    }
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
              <div className="d-flex flex-wrap w-100 justify-content-center align-items-center col-12">
                <div className="d-flex justify-content-center col-12 col-md-4 offset-md-4">
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
                <div className="d-flex justify-content-around col-12 col-md-4 pt-2">
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
                          create artist account
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
                <div
                  className={`comman-grids ${
                    convertProfile && !uprofileimage && "required"
                  }`}
                >
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
                      className={`comman-grids ${
                        convertProfile && !ubannerimage && "required"
                      }`}
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
                        placeholder="Phone"
                        className="required"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="comman-grids">
                      <input
                        placeholder="Social Link 1"
                        className="required"
                        value={artistSocial ? artistSocial[1] : null}
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
                        placeholder="Social Link 2"
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
                        placeholder="Social Link 3"
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
                    <div className="comman-grids">
                      <input
                        placeholder="Token Name"
                        value={
                          tokenName ? tokenName["tokenName"] : null
                        }
                        onChange={(e) =>
                          setTokenName((tokenName) => {
                            return {
                              ...tokenName,
                              tokenName: e.target.value,
                            };
                          })
                        }
                      />
                    </div>
                    <div className="comman-grids">
                      <input
                        placeholder="Token Name"
                        value={
                          tokenSymbol ? tokenSymbol["tokenSymbol"] : null
                        }
                        onChange={(e) =>
                          setTokenSymbol((tokenSymbol) => {
                            return {
                              ...tokenSymbol,
                              tokenSymbol: e.target.value,
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
                  <button onClick={handleApplyArtist}>Apply</button>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Accountsettings;
