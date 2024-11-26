import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css"; // Reset styles if needed

const contentStyle: React.CSSProperties = {
  height: "650px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative", // To position the overlay
  color: "#fff",
  fontSize: "24px",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black overlay
  borderRadius: "8px",
};

const HomeSection = () => (
  <div className="container m-auto">
    <Carousel effect="fade" autoplay arrows>
    <div>
      <div style={{ ...contentStyle, background: "none", padding: "0" }}>
        <img
          src="https://images.pexels.com/photos/27739576/pexels-photo-27739576/free-photo-of-a-beach-with-rocks-and-water-at-sunset.jpeg"
          alt="Beach Sunset"
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
            color: "#fff",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
            fontSize: "36px",
          }}
        >
          <h1>Experience Nature</h1>
          <p>Discover the beauty of the world with us.</p>
        </div>
      </div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: "none", padding: "0" }}>
        <img
          src="https://images.pexels.com/photos/29293191/pexels-photo-29293191/free-photo-of-charming-rural-farmhouse-with-autumn-foliage.jpeg"
          alt="Beach Sunset"
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
            color: "#fff",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
            fontSize: "36px",
          }}
        >
          <h1>Experience Nature</h1>
          <p>Discover the beauty of the world with us.</p>
        </div>
      </div>
    </div>
  </Carousel>
  </div>
);

export default HomeSection;
