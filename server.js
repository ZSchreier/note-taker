

const express = require("express")
const app = express()

const PORT = process.env.PORT || 3001;
const {noteRoutes,apiRoutes} = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


app.use("/notes", noteRoutes)
app.use("/api", apiRoutes)



app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));