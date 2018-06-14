const functions = require("firebase-functions");
var admin = require("firebase-admin");
const gcs = require("@google-cloud/storage");
var os = require("os");
const path = require("path");

var cors = require("cors")({ origin: true });
const Busboy = require("busboy");

exports.onFileUpload = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "not allowed!"
      });
    }
    const busboy = new Busboy({ headers: res.headers });
    let uploadData = null;
    busboy.on("file", (fieldname, file, filename, encoding, mimeType) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimeType };
    });
    busboy.on("finish", () => {
      const bucket = gcs.bucket("events-meraki-f3671.appspot.com");
      bucket.upload(uploadData.file, {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: uploadData.type
          }
        }
      });
    });
    res.status(200).json({
      message: "it worked!"
    });
  });
});
