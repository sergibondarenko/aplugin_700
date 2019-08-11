export default function (server) {

  server.route({
    path: '/api/aplugin700/example',
    method: 'GET',
    handler() {
      return { time: (new Date()).toISOString() };
    }
  });

}
