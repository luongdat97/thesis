import * as express from "express";
import { HttpError, HttpStatusCodes, HttpParamValidators } from "../lib/http";
import { UserAuthNS } from "../auth/auth";
const cloudinary = require('cloudinary/lib/cloudinary').v2
cloudinary.config({
  cloud_name: 'project0407',
  api_key: '633598575654214',
  api_secret: 'tHmYXqaupzKmS1-CqIWiRFb28ms'
});

export function NewCloudAPI() {
  const app = express();
  app.get("/create-signature", async (req, res) => {
    var timestamp = Math.round((new Date).getTime() / 1000);

    var signature = await cloudinary.utils.api_sign_request({
        timestamp: timestamp,
    }, "tHmYXqaupzKmS1-CqIWiRFb28ms");

    res.json({ signature, timestamp });
  });

  app.post("/destroy", async (req, res) => {
    let message = await cloudinary.uploader.destroy(req.body.public_id)
    res.json(message);
  });

  return app;
}
