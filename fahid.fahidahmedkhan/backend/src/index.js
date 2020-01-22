const Koa = require("koa");
const Router = require("koa-router");
const { Pool } = require("pg");
const koaBody = require("koa-bodyparser")();
const cors = require("kcors");

// db pool
const pool = new Pool({
  user: "weather",
  host: "db",
  database: "weather_db",
  password: "weather"
});

// The port that this server will run on, defaults to 9000
const port = process.env.PORT || 9000;
// Instantiate a Koa server
const app = new Koa();
app.use(cors());

// Instantiate routers
const weather = new Router();

// Define API path
const apiPath = "/v1";
const weatherPath = `${apiPath}/weather`;

console.log("path:", weatherPath);

// async/await - check out a client
weather.get(apiPath, async ctx => {
  const client = await pool.connect();
  try {
    const data = await client.query("SELECT NOW() as now");
    client.release();
    // Tell the HTTP response that it contains JSON data encoded in UTF-8
    ctx.type = "application/json; charset=utf-8";
    console.log(data.rows);
    ctx.body = data.rows;
  } catch (error) {
    console.error("Error occurred:", error);
    ctx.throw(500, error);
  }
});
// insert new data
weather.get(weatherPath, async ctx => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT id, device_id, date_time, data from weather ORDER BY id DESC LIMIT 500"
    );
    ctx.type = "application/json; charset=utf-8";
    ctx.body = data.rows;
  } catch (error) {
    console.error("Error occurred:", error);
    ctx.throw(500, error);
  } finally {
    client.release(); // release client back to pool
  }
});

weather.post(weatherPath, koaBody, async ctx => {
  const { device_id } = ctx.request.body;
  const data = ctx.request.body.data;

  const sql = "INSERT INTO weather(device_id, data) VALUES($1, $2)";
  const values = [device_id, data];

  const client = await pool.connect();
  try {
    await client.query(sql, values);
    ctx.type = "application/json; charset=utf-8";
    ctx.status = 201;
  } catch (error) {
    console.error("Error occurred:", error);
    ctx.throw(500, error);
  } finally {
    client.release(); // release client back to pool
  }
});

// get 500

app.use(weather.routes());
app.use(weather.allowedMethods());

// Start the server and keep listening on port until stopped
app.listen(port);

console.log(`App listening on port ${port}`);
