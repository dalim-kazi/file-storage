"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./utils/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.default)();
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.send("file storage server is running?");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
