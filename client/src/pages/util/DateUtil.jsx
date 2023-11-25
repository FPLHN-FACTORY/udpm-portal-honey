// Hàm chuyển đổi ngày thành định dạng dd/mm/yyyy
export const formatDate = (date) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}/${month}/${year}`;
};

export const convertLongToDate = (long) => {
  const date = new Date(long);

  const formattedStartTime = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return formattedStartTime;
};
