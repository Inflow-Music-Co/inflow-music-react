module.exports = function override(config, env) {
    config.module.rules.push({
        include: /node_modules/,
        test: /\.mjs$/,
        type: 'javascript/auto'
        });
    
    return config;
  }