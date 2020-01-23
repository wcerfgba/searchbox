import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import http from './http';
import { JSDOM } from 'jsdom';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const source = ({ url, titleSelector, linkSelector, descriptionSelector }) => async (req, res) => {
	try {
		let data = await http.get(url(req.params.query), {
			headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
		}});
		data = data.data;
		data = (new JSDOM(data)).window.document;
		let _results = {
			titles: Array.prototype.map.call(data.querySelectorAll(titleSelector), el => el.textContent),
			links: Array.prototype.map.call(data.querySelectorAll(linkSelector), el => el.href),
			descriptions: Array.prototype.map.call(data.querySelectorAll(descriptionSelector), el => el.textContent)
		};
		let results = _results.titles.map((title, i) => ({
			title,
			link: _results.links[i],
			description: _results.descriptions[i]
		}));
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify(results));
	} catch (e) {
		console.error(e);
		res.writeHead(500);
		res.end();
	}
}

const SOURCES = {
	jstor: {
		url: (q) => `https://www.jstor.org/action/doBasicSearch?Query=${q}&acc=off&wc=on&fc=off&group=none`,
		titleSelector: 'div.title h3.medium-heading a',
		linkSelector: 'div.title h3.medium-heading a',
		descriptionSelector: 'div.title h3.medium-heading a',
	},
	sciencedirect: {
		url: (q) => `https://www.sciencedirect.com/search/advanced?qs=${q}`,
		titleSelector: 'div.result-item-container a.result-list-title-link',
		linkSelector: 'div.result-item-container a.result-list-title-link',
		descriptionSelector: 'div.result-item-container ol.SubType',
	}
}

polka() // You can also use Express
	.get('/:source/:query', (req, res) => source(SOURCES[req.params.source])(req, res))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
