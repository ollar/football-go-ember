/* eslint-env node */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here

    // ssh2: {
    //   host: '188.166.36.35',
    //   username: 'root',
    //   privateKeyPath: '~/.ssh/digitalocean',
    //   port: 22,
    //   applicationFiles: function(context) {
    //     console.log(context.distFiles);
    //     return context.distFiles;
    //   },
    //   root: '/root/football-go-ember'
    // },
    rsync: {
      type: 'rsync',
      dest: '/root/football-go-ember',
      host: 'root@188.166.36.35',
      privateKey: '/Users/bss/.ssh/digitalocean',
      port: 22,
      ssh: true,
      recursive: true,
      delete: true,
      args: ['--verbose', '-ztl']
    },
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
