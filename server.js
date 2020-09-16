// let addon = require('./native');
// console.log(addon.hello());

require('make-promises-safe');

let path = require('path');
let fastify = require('fastify')({ logger: true });

let port = process.argv.length >= 3 ? Number(process.argv[2]) : 3000;

fastify.addContentTypeParser('application/octet-stream', function(request, payload, done) {
  done(null, payload);
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'assets'),
  prefix: '/assets/'
});

fastify.register(require('./routes/standard'));
fastify.register(require('./routes/custom'));

fastify.get('/', function(request, reply) {
  return reply.sendFile('index.html', path.join(__dirname, 'assets', 'html'));
});

(async () => {
  try {
    let address = await fastify.listen(port);
    fastify.log.info(`server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
