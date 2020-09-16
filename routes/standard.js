let fs = require('fs');
let path = require('path');
let addon = require('../native');

const STANDARD_MEME_TEMPLATES = ['kermit', 'grumpy', 'bizcat'];

async function routes(fastify, options) {
  fastify.get('/standard', async (request, reply) => {
    let { id, top = "", bottom = "" } = request.query;

    if (STANDARD_MEME_TEMPLATES.indexOf(id) < 0) {
        reply
          .code(404)
          .send({ error: 'meme template not found' });
        return;
    }

    let data = fs.readFileSync(path.join(__dirname, '..', 'assets', 'img', `${id}.jpg`));
    let result = addon.addMemeText(data.buffer, String(top), String(bottom));
    reply
      .code(200)
      .header('Content-Type', 'image/jpeg')
      .send(Buffer.from(result));
  });
}

module.exports = routes;
