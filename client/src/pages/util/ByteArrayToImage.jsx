import React from "react";

export const Base64Image = ({ base64String, css }) => {
  if (base64String != null) {
    const byteArray = new Uint8Array(
      atob(base64String)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const isPng =
      byteArray[0] === 137 &&
      byteArray[1] === 80 &&
      byteArray[2] === 78 &&
      byteArray[3] === 71 &&
      byteArray[4] === 13 &&
      byteArray[5] === 10 &&
      byteArray[6] === 26 &&
      byteArray[7] === 10;
    const blob = new Blob([byteArray], {
      type: isPng ? "image/png" : "image/jpeg",
    });
    const imageUrl = URL.createObjectURL(blob);
    return <img src={imageUrl} style={css} alt="Hình ảnh" />;
  }
};
