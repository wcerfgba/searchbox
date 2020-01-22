import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import axios from 'axios';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const proxy = async (url, res) => {
	try {
		const fetchReq = await axios.get(url, {
			headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
		}});
		res.end(fetchReq.data);
	} catch (e) {
		console.error(e);
		res.end();
	}
}

polka() // You can also use Express
	.get('/jstor/:query', (req, res) => proxy(`https://www.jstor.org/action/doBasicSearch?Query=${req.params.query}&acc=off&wc=on&fc=off&group=none`, res))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
