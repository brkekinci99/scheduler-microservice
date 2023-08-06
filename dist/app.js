const path = require("path");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bodyParser = require("body-parser");
dotenv.config();
const DB = require("./configs/db");
global.root_dir = __dirname;
// Initialize express
const app = express();
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to Database
DB();
//Initialize Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json({
    extended: false,
}));
// Define routes
require("./routes/index.routes")(app);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Email Scheduling application." });
});
// Listen on PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
//# sourceMappingURL=app.js.map