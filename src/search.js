import http from './http';

export default async function search(source, query) {
  let res = await http.get(`/${source}/${query}`);
  res = res.data;
  return res;
}