module.exports = {
  apps : [{
    name: "tracking-cat",
    script: "./main.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    max_memory_restart: "1G",
    error_file: "logs/pm2-err.log",
    out_file: "logs/pm2-out.log",
    log_file: "logs/pm2-combined.log"
  }]
}
