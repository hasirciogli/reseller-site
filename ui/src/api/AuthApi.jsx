import { endpoint } from "../config/api.json";
import ActionWorker from "./ActionWorker";

export const LoginToAccount = async (username, password) => {
    var param = new URLSearchParams();
    param.append("username", username);
    param.append("password", password);

    const requestUri = endpoint + "/account/login";

    const response = await fetch(requestUri, {
        method: "POST",
        body: param,
        redirect: "follow",
    });

    const tjson = await response.json();

    ActionWorker(tjson);

    return tjson;
}