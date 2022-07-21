'use strict';

const cors = require('@fastify/cors')
const healthRoutes = require('./routes/healthRoutes');
const investmentsRoutes = require('./routes/investmentRoutes');

const fastify = require('fastify')({
    logger: true
});

fastify.register(cors);
fastify.register(healthRoutes);
fastify.register(investmentsRoutes);

fastify.listen({ port: 4000 }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1);
    }
});
