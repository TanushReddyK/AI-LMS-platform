import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_LoZY0IxQr9ez@ep-fancy-math-a43wpts0-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require'
  }
});
