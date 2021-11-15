import nodeHtmlToImage from "node-html-to-image";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const __DEV__ = process.env.NODE_ENV !== "production";

// import font2base64 from "node-font2base64";

// const _data = font2base64.encodeToDataUrlSync("../../../fonts/Lato/Lato-Light.ttf");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  nodeHtmlToImage({
    html: `<html>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&display=swap" rel="stylesheet">
        <style>        
          body {
            font-family: 'Lato', sans-serif;        
            width: 350px;
            height: 248px;
          }
        </style>
      </head>
      <body style="width:50%;margin:auto;">Hello world!🎉</body>
    </html>
    `,
  })
    .then((image) => {
      __DEV__ && console.log("The image was created successfully!");
      res.status(200);
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(image, "binary");
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ name: "Failed" });
    });

  // res.status(200).json({ name: "Failed" });
}
