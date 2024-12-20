import React from "react";
import LoginImages from "../static/images/login_image.png";

export default function LoginImage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Chiều rộng của container
        height: "100%", // Chiều cao của container
        overflow: "hidden", // Ẩn phần ảnh thừa nếu có
        backgroundColor: "#FFFFFF", // Tùy chỉnh màu nền nếu cần
      }}
    >
      <img
        src={LoginImages}
        alt="Login Image"
        style={{
          objectFit: "contain", // Đảm bảo ảnh giữ nguyên tỷ lệ
          maxWidth: "90%", // Giới hạn chiều rộng tối đa của ảnh
          maxHeight: "90%", // Giới hạn chiều cao tối đa của ảnh
        }}
      />
    </div>
  );
}
