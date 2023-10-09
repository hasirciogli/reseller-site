import { useState } from "react"
import toast from 'react-hot-toast';
import baimless1png from "./../../assets/baimless1.png";
import { LoginToAccount } from "../../api/AuthApi";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logging, setLogging] = useState(false);

    const makeLogin = () => {
        return new Promise(async (accept, reject) => {
            const xreponse = await LoginToAccount(username, password);

            if (xreponse.status) accept();
            else reject(xreponse.err);

            if(xreponse.status){
                localStorage.setItem("accountToken", xreponse.token ?? "-1");
            }
        });
    }


    const handleLogin = () => {
        if (logging)
            return;

        setLogging(true);

        const loginresponse = makeLogin();

        toast.promise(
            loginresponse,
            {
                loading: () => <>Logging in, Please wait</>,
                success: (res) => <>Logged in, Wait a second!</>,
                error: (res) => <>{res}</>
            },
            {
                className: "bg-zinc-800 text-noxy-primary"
            }
        );

        loginresponse.finally(() => {
            setLogging(false);
        });

    }

    return (
        <>
            <div className="container flex flex-col items-center justify-center w-full h-screen mx-auto px-4 sm:px-20 lg:px-10">

                <div className="flex z-[1] flex-col justify-center rounded-md w-10/12 md:w-[25rem] h-[20rem] --shadow-lg --bg-zinc-800 p-5 gap-4 anim-noxy-come-top">

                    <h1 className="text-3xl text-center ffonts-gabarito text-noxy-primary font-bold">Welcome Back</h1>

                    <input value={username} onChange={e => setUsername(e.currentTarget.value)} type="text" placeholder="Username" autoComplete="username" name="username" className="w-full bg-zinc-800 rounded p-3 text-noxy-primary focus:text-white ffonts-nunito outline-0 ring-0 border-0 text-sm" />
                    <input value={password} onChange={e => setPassword(e.currentTarget.value)} type="password" placeholder="Password" autoComplete="password" name="password" className="w-full bg-zinc-800 rounded p-3 text-noxy-primary ffonts-nunito outline-0 ring-0 border-0 text-sm" />
                    <button onClick={handleLogin} className="w-full rounded bg-zinc-800 hover:bg-blue-600 ffonts-nunito font-semibold text-md p-3 text-noxy-primary uppercase duration-300">
                        {logging ?
                            <div className="w-full flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full">

                                </div>
                            </div> :
                            <>
                                Login
                            </>
                        }
                    </button>
                    <a href="/register" className="text-sm text-start w-fit text-zinc-400 hover:text-white hover:underline duration-300">Doesnt have an account? register here</a>
                </div>
            </div>

            <div className="flex w-full h-full absolute top-0 left-0 z-[0]">
                <div className="flex w-full mt-10 px-4 sm:px-20 lg:px-10">
                    <svg viewBox="0 0 800 600" fill="#151617" strokeWidth={0} strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M 0 400 L 400 600 L 400 500 L 0 300 Z" />
                        <path d="M 700 250 L 400 600 L 400 500 L 600 250 Z" />
                        <path d="M 700 0 L 700 250 L 600 305 L 600 0 Z" />
                    </svg>
                </div>
            </div>
        </>
    );


    return (
        <>
            <div className="container relative mx-auto mt-10 px-4 sm:px-20 lg:px-10">
                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-row items-center gap-4 py-4">
                        <span className="anim-noxy-come-left capitalize rounded p-2 bg-noxy-red text-noxy-red">
                            premium reseller
                        </span>
                        <span className="anim-noxy-come-right text-noxy-primary capitalize">Dont waste your money</span>
                    </div>
                    <div className="flex flex-row items-center py-4">
                        <a href="/dashboard" className="capitalize text-xl hover:cursor-pointer hover:bg-emerald-600 p-2 px-4 rounded duration-300">Get Started</a>
                    </div>
                </div>

                <div className="flex relative flex-row mt-10 md:mt-0">
                    <div className="flex w-full items-center justify-start z-[10]">
                        <div className="flex flex-col items-start justify-start">
                            <span
                                className="capitalize float-left text-left text-noxy-primary font-bold ffonts-nunito anim-noxy-come-top">fast,
                                secure,
                                easy</span>
                            <h1 className="text-5xl capitalize float-left text-left font-black ffonts-gabarito anim-noxy-come-left">
                                buy from wherever you
                                want</h1>
                            <div
                                className="anim-noxy-come-bottom float-left text-left mt-2 text-noxy-primary text-sm drop-shadow-md">
                                You can receive the services we offer safely from anywhere you want. While some products are
                                automatically added to your account, for others you will have to enter the key manually. The
                                process is complete, the product is yours!
                            </div>

                            <div className="flex flex-wrap gap-4 mt-10 h-fit anim-noxy-come-right">
                                <button className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded h-fit">
                                    Game<span className="text-[#95b806]">Sense</span>
                                </button>
                                <button className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded h-[2.5rem]">
                                    <img src="https://primordial.dev/logo.svg" className="w-full h-full" alt="" />
                                </button>

                                <button
                                    className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded h-[2.5rem] font-extrabold">
                                    NEVERLOSE<span className="text-[#0095b9]">.CC</span>
                                </button>

                                <button
                                    className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded h-[2.5rem] font-extrabold anim-noxy-fatality">
                                    FATALITY
                                </button>

                                <button className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded w-auto h-[2.5rem]">
                                    <img src="/storage/cheat-logos/baimless1.png" className="w-full h-full" alt="" />
                                </button>

                                <button
                                    className="bg-[rgba(40,40,40,.6)] drop-shadow-md p-2 px-3 rounded w-auto h-[2.5rem] flex flex-row gap-2 items-center justify-center">
                                    <img src="https://onetap.com/img/onetap.svg" className="w-full h-14" alt="" /> ONETAP
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute md:relative flex right-0 -top-16 md:top-0 w-full h-full justify-end z-[5]">
                        <img src="https://skycoach.gg/storage/uploads/products/counter-strike-2-wins-boost1693910222_picture_item.png"
                            className="flex anim-noxy-come-right w-fit md:w-full" alt="" />
                    </div>
                </div>

                <div className="flex w-full h-full absolute top-0 left-0 -z-[10]">
                    <div className="flex w-full mt-10 px-4 sm:px-20 lg:px-10">
                        <svg viewBox="0 0 800 600" fill="#151617" strokeWidth="0" strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="M 0 400 L 400 600 L 400 500 L 0 300 Z" />
                            <path d="M 700 250 L 400 600 L 400 500 L 600 250 Z" />
                            <path d="M 700 0 L 700 250 L 600 305 L 600 0 Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}