let fs = require('fs');
let path = require('path');
let addon = require('../native');
let getStream = require('get-stream');

async function routes(fastify, options) {
  fastify.route({
    url: '/custom',
    method: 'POST',
    handler: async (request, reply) => {
      getStream.buffer(request.body)
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
