import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json";
app.use(express.static("public")); //to make the public folder static
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
      res.render("index.ejs");
    });
app.post("/get-makeup", async (req, res) => {
  try {
              let response; 
          if (!req.body.product_type && !req.body.brand) {
            response = await axios.get(API_URL);
          }else if (req.body.product_type && !req.body.brand) {
            response = await axios.get(API_URL ,  {
              params: {
                product_type: req.body.product_type
              }
            });
          }else if (!req.body.product_type && req.body.brand) {
            response = await axios.get(API_URL ,  {
              params: {
                brand: req.body.brand
              }
            });
          }else {
            response = await axios.get(API_URL ,  {
              params: {
                product_type: req.body.product_type,
                brand: req.body.brand
              }
            });
          }
        const result = response.data;
        res.render("index.ejs", { content: JSON.stringify(result) });
      } catch (error) {
        console.error("Failed to make request:", error.message);
          res.render("index.ejs", {
            error: error.message,
          });
      }
   });
app.get("/about", (req, res) => {
      res.render("about.ejs");
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  