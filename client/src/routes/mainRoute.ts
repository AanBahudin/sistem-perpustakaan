import { RouteObject } from "react-router-dom";
import landingRoute from "./landingRoute";
import penggunaRoute from "./penggunaRoute";
import pustakawanRoute from "./pustakawanRoute";
import prodiRoute from "./prodiRoute";

const routes: RouteObject[] = [
    ...landingRoute,
    ...penggunaRoute,
    ...pustakawanRoute,
    ...prodiRoute
]

export default routes