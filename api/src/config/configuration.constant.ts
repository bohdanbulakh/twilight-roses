export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  security: {
    sessions: parseInt(process.env.SESSIONS) || 1,
    access: {
      ttl: process.env.ACCESS_TTL ?? '1d',
      secret: process.env.ACCESS_SECRET ?? 'venom',
    },
    refresh: {
      ttl: process.env.REFRESH_TTL ?? '1d',
      secret: process.env.REFRESH_SECRET ?? 'venom',
    },
  },
});
