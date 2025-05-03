import axios from "axios";

export async function getStudentsAPI(page, size, classId, studentStatus) {
  let params = {
    page: page,
    size: size,
    classId: classId,
    studentStatus: studentStatus,
  };

  let url = "http://localhost:8080/students";
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page);
  queryParams.append("size", params.size);

  if (params.classId && params.studentStatus !== "") {
    url += "/filter";
    queryParams.append("classId", params.classId);
    queryParams.append("studentStatus", params.studentStatus);
  }

  const finalUrl = `${url}?${queryParams.toString()}`;
  const response = await axios.get(finalUrl);

  return response || {};
}
