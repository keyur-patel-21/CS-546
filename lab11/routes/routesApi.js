// Set-Up Routes

import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("static/webpage", { partial: "static_script" });
});

export default router;
