import { endpoint } from "../config/api.json";
import ActionWorker from "./ActionWorker";

export const GetBalance = async () => {

    const requestUri = endpoint + "/account/balance?token="+localStorage.getItem("accountToken") ?? "-1";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    const response = await fetch(requestUri, requestOptions);

    const tjson = await response.json();

    ActionWorker(tjson);

    return tjson;
}