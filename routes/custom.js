let fs = require('fs');
let path = require('path');
let addon = require('../native');

function onDataAll(stream) {
  let fulfill, reject;
  let p = new Promise((f, r) => { fulfill = f; reject = r; });
  let chunks = [];

  stream.on('data', data => {
    chunks.push(data);
  });

  stream.on('end', () => {
    try {
      fulfill(Buffer.concat(chunks));
    } catch (err) {
      reject(err);
    }
  });

  stream.on('error', err => {
    reject(err);
  });

  return p;
}

async function routes(fastify, options) {
  fastify.route({
    url: '/custom',
    method: 'POST',
    handler: async (request, reply) => {
      onDataAll(request.body)
        .then(buffer => {
          let top = request.headers['x-meme-top-text'];
          let bottom = request.headers['x-meme-bottom-text'];
          let result = addon.buildMeme(buffer.buffer, top, bottom);
          reply
            .code(200)
            .header('Content-Type', 'image/jpeg')
            .send(Buffer.from(result));
        });
    }
  });
}

module.exports = routes;
