import { endpoint } from "../config/api.json";
import ActionWorker from "./ActionWorker";

export const CreatePaparaPayment = async (price) => {

    const requestUri = endpoint + "/payment?method=papara-transfer&price="+price+"&token="+localStorage.getItem("accountToken") ?? "-1";

    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
    };

    const response = await fetch(encodeURI(requestUri), requestOptions);

    const tjson = await response.json();

    ActionWorker(tjson);

    return tjson;
}

export const GetPaymentStatus = async (id) => {

    const requestUri = endpoint + "/payment/status?pid="+id+"&token="+localStorage.getItem("accountToken") ?? "-1";

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    const response = await fetch(encodeURI(requestUri), requestOptions);

    const tjson = await response.json();

    ActionWorker(tjson);

    return tjson;
}