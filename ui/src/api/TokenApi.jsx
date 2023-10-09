import { endpoint } from "../config/api.json";
import ActionWorker from "./ActionWorker";

export const ValidateToken = async (token) => {

    const requestUri = endpoint + "/token/validate?token="+token;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    const response = await fetch(requestUri, requestOptions);

    const tjson = await response.json();

    ActionWorker(tjson);

    return tjson;
}