import express from "express";
import youtubedl from "youtube-dl-exec";
const app = express.Router();

app.get("/ydlink",(req,res) => {
    try {
      const {url} = req.headers;
      if (url !== undefined) {
          youtubedl(url || 'https://www.youtube.com/watch?v=6xKWiCMKKJg', {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
          }).then(output => {
            res.send(output);
          })
      } else {
        res.send("url is not provided")
      }
    } catch (err) {
      console.log(err)
      res.send().json({
        err : JSON.stringify(err)
      })
    }
  })

  export default app;