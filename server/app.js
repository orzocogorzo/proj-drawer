const app = require("express")();
const path = require("path");
const clientPath = path.resolve(__dirname,"..","app");

app.get("/", function(req,res) {
    let mime = getMimeType("index.html");
    res.set("Content-Type", mime);
    res.sendFile(path.resolve(__dirname,"..","index.html"));
});

app.get("*", function(req,res) {
    let mime = getMimeType(req.url);
    res.set("Content-Type",mime);
    res.sendFile(path.resolve(__dirname,"..",req.url.slice(1)));
});

function getMimeType(url) {
    let ext = path.extname(url).slice(1);
    return MIMEDictionary[ext];
}

const MIMEDictionary = {
    "js": "application/javascript",
    "html": "text/html",
    "css": "text/css",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "svg": "image/svg+xml",
    "json": "text/json",
    "xml": "application/xml"
}

app.listen(8080);
console.log("express listening on port 8080");