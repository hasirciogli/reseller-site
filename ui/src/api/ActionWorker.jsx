const workerConfig = {
    "logout": (...lparams) => workerLogout(...lparams),
    "refresh": (...lparams) => workRefresh(...lparams),
    "login_success_reload": (...lparams) => workWaitRefresh(...lparams),
}


const workerResetStorage = () => {
    localStorage.clear();
}

const workerLogout = () => {
    localStorage.clear();
}

const workRefresh = () => {
    window.location.reload();
}

const workWaitRefresh = () => {
    setTimeout(() => {
        window.location.reload();
    }, 2500);
}



const ActionWorker = (workerJson) => {
    const workerFunctions = (workerJson.make_action ?? null);

    if (!workerFunctions) {
        return;
    }

    //workerFunctions = workerFunctions.split(",");

    if(workerConfig[workerFunctions]){
        workerConfig[workerFunctions]();
    }
}


export default ActionWorker;