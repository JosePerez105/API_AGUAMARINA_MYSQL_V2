import app from "./src/src/app.js";
import { PORT } from "./src/src/config.js";


app.listen(PORT, () => {
    console.log("---Listening on port:", PORT)
})