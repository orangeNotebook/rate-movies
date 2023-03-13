import React from "react";

function Footer() {
  let today = new Date();
  return (
    <div>
      <p>MK © {today.getFullYear()}</p>
    </div>
  );
}

export default Footer;
