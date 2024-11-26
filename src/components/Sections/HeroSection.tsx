import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import { NavLink } from "react-router-dom";

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: "8px",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#00B6FF",
  color: "white",
  padding: "12px 24px",
  fontSize: "18px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px",
};

const HeroSection = () => (
  <div style={{ marginTop: "120px" }} className="container m-auto p-10">
    <Carousel effect="fade" autoplay dots speed={100}>
      <div>
        <div style={{ background: "none", padding: "0" }}>
          <img
            src="https://res.cloudinary.com/ddoacwzvp/image/upload/v1732616959/backgroundColor_rgb_0_182_255_18_3_vg5iuq.png"
            alt="Nature Background"
            style={{
              width: "100%",
              height: "650px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div style={overlayStyle}></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div style={{ flex: 1 }}>
              <h1 className="text-5xl font-semibold">Seamless Room Booking</h1>
              <p>Empowering smart scheduling for productive teams.</p>
              <div>
                <NavLink to={"/meeting-rooms"}>
                  <button style={buttonStyle}>Get Started</button>
                </NavLink>
              </div>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ background: "none", padding: "0" }}>
          <img
            src="https://res.cloudinary.com/ddoacwzvp/image/upload/v1732616199/backgroundColor_rgb_0_182_255_18_2_tduaxe.png"
            alt="AI Workflow"
            style={{
              width: "100%",
              height: "650px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
          <div style={overlayStyle}></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <div style={{ flex: 1 }}>
              <h1 className="text-5xl font-semibold">Streamline Meetings</h1>
              <p>Manage spaces with efficiency and ease.</p>
              <div>
                <NavLink to={"/meeting-rooms"}>
                  <button style={buttonStyle}>Get Started</button>
                </NavLink>
              </div>
            </div>
            <div style={{ flex: 1 }}></div>
          </div>
        </div>
      </div>
    </Carousel>
  </div>
);

export default HeroSection;
