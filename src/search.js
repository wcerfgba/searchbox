import axios from 'axios';

export default async function search(source, query) {
  let res = await axios.get(`/${source}/${query}`);
  res = res.data;
  return res;
}