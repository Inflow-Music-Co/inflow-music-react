import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MintUSDC = () => {
  const MySwal = withReactContent(Swal);
  // const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [successadmin, setsuccessadmin] = useState(false);
  const [failureadmin, setfailureadmin] = useState(false);
  useEffect(() => {
    successadmin &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Admin Added Successfully</p>,
        icon: "success",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setsuccessadmin((successadmin) => !successadmin);
      });
  }, [successadmin]);

  useEffect(() => {
    failureadmin &&
      MySwal.fire({
        title: <p style={{ color: "white" }}>Error Adding Admin</p>,
        html: <p style={{ color: "white" }}>Please try again</p>,
        icon: "error",
        customClass: {
          confirmButton: "btn-gradiant",
        },
        buttonsStyling: false,
        background: "#303030",
      }).then(() => {
        setfailureadmin((failureadmin) => !failureadmin);
      });
  }, [failureadmin]);

  const addAdmin = async () => {
    // try {
    // 	const funtions = firebase.functions();
    // 	const addAdminRole = funtions.httpsCallable('addAdminRole');
    // 	setLoading(true)
    // 	await addAdminRole({ email });
    // 	setLoading(false);
    // 	setsuccessadmin(successadmin => !successadmin)
    // } catch (error) {
    // 	setLoading(false)
    // 	setfailureadmin(failureadmin => !failureadmin)
    // 	// console.log(error);
    // }
  };

  // if (loading) {
  // 	return <Loader />;
  // }

  return (
    <div>
      <div className="dashboard-wrapper-main vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="heading">ADD ADMIN ACCOUNT</div>
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
                Add admin account
              </a>
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
                <div className="grids-main-inputs">
                  <div className="comman-grids w-100">
                    <input
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="ADMIN EMAIL"
                    />
                  </div>
                </div>
                <div className="save-changes-main">
                  <Button variant="primary" size="lg" onClick={addAdmin}>
                    ADD ADMIN
                  </Button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintUSDC;
