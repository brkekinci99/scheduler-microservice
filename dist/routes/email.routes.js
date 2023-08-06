"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const emails = require("../controllers/email.controller");
const router = require("express").Router();
module.exports = (app) => {
    // Create a new email
    router.post("/", emails.create);
    // Create a recurring email
    router.post("/recurring", emails.recurring);
    // Create a scheduled email
    router.post("/schedule", emails.schedule);
    // Create a weekly email
    router.post("/weekly", emails.weekly);
    // Retrieve all emails
    router.get("/", emails.findAll);
    // Retrieve a single email with id
    router.get("/:id", emails.findOne);
    // Update a email with id
    router.put("/:id", emails.update);
    // Delete a email with id
    router.delete("/:id", emails.delete);
    // Delete all emails
    router.delete("/", emails.deleteAll);
    app.use("/api/emails", auth_1.verifyToken, router);
};
//# sourceMappingURL=email.routes.js.map