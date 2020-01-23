import axios from 'axios';
import cacher from 'axios-cache-plugin';

const http = cacher(axios, {
  maxCacheSize: 1000,
  ttl: 1000*60*60*24*7,
  excludeHeaders: true,
});

export default http;