In Nuxt projects need to add this code at nuxt.config build:
  extend(config, { isServer }) {
    if (!isServer) {
      // Exclude fs in the client-side build
      config.node = {
        fs: 'empty'
      };
    }
  }
