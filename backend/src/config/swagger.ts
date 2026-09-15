import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Job Board API",
      version: "1.0.0",
      description: "AI Powered Job Board REST API"
    },
servers: [
  {
    url: "http://localhost:5000",
    description: "Local development server",
  },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/modules/**/*.routes.ts"],
}

export const swaggerSpec = swaggerJsdoc(options)