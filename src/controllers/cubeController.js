const router = require("express").Router();
const cubeService = require("../services/cubeServices");
const accessoryServices = require(".././services/accessoryServices");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/cube/create");
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  let currentCube = await cubeService.getCurrentCube(cubeId);
  if (!currentCube) {
    res.redirect("/404");
    return;
  }
  let cubeAccessories = await accessoryServices.getCubeAccessories(currentCube);
  console.log(cubeAccessories);
  res.render("details", { currentCube, cubeAccessories });
});
module.exports = router;

// res.render("details", { ...currentCube });
// In template we can use only {{name}}. If we don't use ...currentCube ,then we have to use currentCube.name in the template.
