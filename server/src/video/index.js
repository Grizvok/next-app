const create = require("./create");
const deleteVideo = require("./delete");
const get = require("./get");
const update = require("./update");

module.exports = server => {
  server.use("/api/create-video", create);
  server.use("/api/delete-video", deleteVideo);
  server.use("/api/get-video", get);
  server.use("/api/update-video", update);
};