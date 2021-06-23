import * as React from "react";
import { render } from "react-dom";
import "assets/css/index.css";
import "assets/css/reset.css";

import RootRouter from "routers/root";

render(<RootRouter />, document.getElementById("__root"));
