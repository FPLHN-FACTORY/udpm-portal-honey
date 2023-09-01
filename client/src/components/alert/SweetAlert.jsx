import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { withSwal } from "react-sweetalert2";

const SweetAlert = ({ swal }) => {
  const showDeleteConfirmation = () => {
    swal
      .fire({
        title: "Bạn chắc chắn muốn đổi quà?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "Không, tôi đổi ý!",
        confirmButtonText: "Đúng, tôi muốn đổi!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire(
            "Đổi thành công!!!",
            "Điểm thưởng của bạn đã được đổi.",
            "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire("Đã hủy", "Điểm của bạn chưa được đổi :)", "error");
        }
      });
  };

  return (
    <Button onClick={showDeleteConfirmation}>
      <SyncOutlined className="icon" />
      Đổi
    </Button>
  );
};

export default withSwal(SweetAlert);
