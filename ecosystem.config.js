module.exports = {
  apps: [
    {
      name: "klog",
      script: "./node_modules/.bin/ts-node src/main.ts",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      env_test: {
        NODE_ENV: "test",
      },
    },
  ],
};
