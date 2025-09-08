const express = require("express")
const path = require("path")
const multer = require("multer")
const db = require("./db")

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use("/client", express.static(path.join(__dirname, "client"))) // /Users/edwar.figueroa/Documents/Icesi/ECO-2025-2/app1
app.use("/rider", express.static(path.join(__dirname, "rider")))
app.use("/store", express.static(path.join(__dirname, "store")))

app.get("/users", (req, res) => {
  const users = db.load("users")
  res.status(200).send(users)
})

app.post("/users", (req, res) => {
  const newUser = req.body
  db.add("users", newUser)
  res.status(201).send(newUser)
})

app.get("/products", (req, res) => {
  const products = db.load("products")
  res.status(200).send(products)
})

app.post("/products", upload.single("image"), (req, res) => {
  const newProduct = {
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  }
  db.add("products", newProduct)
  res.status(201).send(newProduct)
})

app.listen(5080, () => {
  console.log("Server is running on http://localhost:5080")
})
