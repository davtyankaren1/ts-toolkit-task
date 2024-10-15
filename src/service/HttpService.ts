import axios from 'axios';

const axiosExport = {
  getallfoods: axios.get,
  postfood: axios.post,
  deletefood: axios.delete,
  putfood: axios.put,
};

export default {
  axiosExport,
};
