export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  security: {
    access: {
      ttl: process.env.JWT_TTL ?? '1d',
      secret: process.env.SECRET ?? 'venom',
    },
  },
});
