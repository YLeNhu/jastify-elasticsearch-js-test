require('dotenv').config();
const cors = require('@fastify/cors')
const fastify = require('fastify')({  logger: {
  transport: {
    target: "pino-pretty",
  },
}, });
const port = process.env.NODE_PORT;

fastify.register(cors, { 
 
})

async function dbConnector(fastify, options) {
  fastify.log.info("Connected to database", options);
}

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: process.env.ELASTICSEARCH_URL, 
})


fastify.register(dbConnector);

async function userRoutes(fastify) {

  fastify.addSchema({
    $id: "createBookSchema",
    type: "object",
    required: ["title", "author", "publishedDate", "description", "price"],
    properties: {
      title: {type: "string"},
      author: {type: "string"},
      publishedDate: {type: "string"},
      description: {type: "string"},
      price: {type: "number"}
    },
  });
  
  const schema = {
    body: { $ref: "createBookSchema#" },
    response:{
      400: {
        type: "string",
        properties: {
          message: { type: "string" },
        },
      }
    }

  }

  const searchOpts = {
    schema: {
      params: {
        type: 'object',
        properties: {
          ids: {
            type: 'number',
          },
        },
      },
      response:{
        400: {
          type: "string",
          properties: {
            message: { type: "string" },
          },
        }
      }
    }
  }

  fastify.addHook("onRequest", async () => {
    fastify.log.info("Got a request");
  });

  fastify.addHook("onResponse", async (request, reply) => {
    fastify.log.info(`Responding: ${reply.getResponseTime()}`);
  });

  fastify.get('/books/:id',
  searchOpts,
  async function (req, reply) {
    const data = await client.search({
      index: 'bookstore',
      query: {
        "term": {
          "id": req.query.id
        }
      }
    })
    const result = data.hits.hits.map((each)=>(each._source))
    return result[0]
  })

  fastify.get('/books', async function (req, reply) {
    const data = await client.search({
      index: 'bookstore',
      query: {
        "match_all": {}
      }
    })
    const result = data.hits.hits.map((each)=>(each._source))
    return result
  })

  fastify.post('/books', 
  { schema }
  , 
  async (req, rep) => {
    await client.index({
      index: "bookstore",
      document: {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        price: req.body.price
      },
    });
    return rep.code(200).send(req.body);
  });

  fastify.put('/books/:id', searchOpts, async (req, rep) => {
    var data = await client.updateByQuery({
      index: "bookstore",
      body: { 
        "script": {
          "source": "ctx._source.title = params.title; ctx._source.author = params.author; ctx._source.description = params.description; ctx._source.price = params.price; ctx._source.publishedDate = params.publishedDate",
          "lang": "painless",
          "params": {
            "title": req.body.title,
            "author": req.body.author,
            "description": req.body.description,
            "price": req.body.price,
            "publishedDate": req.body.publishedDate
          }
        },
        "query": {
          "term": {
              "id":{
                "value": req.query.id
              }
            }
        }
      }
    });

    return req.body;
  });

  fastify.log.info("User routes registered");
}

fastify.register(userRoutes);

async function main() {
  await fastify.listen({ port, host: '0.0.0.0' }, (error) => {
    if (error) {
      console.error(error);
      throw error;
    }

  });
}

[("SIGINT", "SIGTERM")].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();


