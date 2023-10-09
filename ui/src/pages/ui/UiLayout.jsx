import { useEffect, useState } from "react";
import { Collapse, Dropdown, initTE } from "tw-elements";

import { BiDollarCircle, BiHomeAlt, BiShoppingBag, BiSolidRightArrowSquare } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import ResellerSiteLogo from "./../../assets/reseller-site-logo.png";


import { HomePage } from "../dashboard/HomePage";
import { EarnPage } from "../dashboard/EarnPage";
import { GetBalance } from "../../api/AccountApi";
import { DepositPage } from "../dashboard/DepositPage";


function Navbar() {
    const [accountBalance, setAccountBalance] = useState(-1);
    const navigate = useNavigate();
    useEffect(() => {
        initTE({ Collapse, Dropdown });

        const loadBalancer = async () => {
            const loadAccountBalance = await GetBalance();

            if (loadAccountBalance.status) {
                setAccountBalance(loadAccountBalance.balance);
            }
        }

        loadBalancer();
    }, []);

    return (
        <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-noxy-primary py-2 shadow-xl shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <button
                    className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="[&>svg]:w-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </button>
                <div
                    className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                    id="navbarSupportedContent1"
                    data-te-collapse-item
                >
                    <Link to={"/"}
                        className="text-2xl ffonts-gabarito font-bold items-center h-full md:mr-4">
                        Reseller
                    </Link>
                    <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
                        <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                            <Link
                                className="flex text-zinc-400 hover:text-white gap-3 items-center flex-nowrap transition duration-200hover:ease-in-out motion-reduce:transition-none lg:px-2"
                                to="/"
                                data-te-nav-link-ref
                            >
                                <BiHomeAlt size={18} />
                                Home
                            </Link>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                            <Link
                                className="flex items-center text-zinc-400 hover:text-white gap-3 items-center flex-nowrap transition duration-200hover:ease-in-out motion-reduce:transition-none lg:px-2"
                                to="/deposit"
                                data-te-nav-link-ref
                            >
                                <GiMoneyStack size={18} />
                                Depoist money
                            </Link>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                            <Link
                                className="flex text-zinc-400 hover:text-white gap-3 items-center flex-nowrap transition duration-200hover:ease-in-out motion-reduce:transition-none lg:px-2"
                                to="/earn"
                                data-te-nav-link-ref
                            >
                                <BiDollarCircle size={18} />
                                Earn
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="relative flex items-center">
                    <div className="relative" data-te-dropdown-ref data-te-dropdown-alignment="end">
                        <a
                            className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                            href="#"
                            id="dropdownMenuButton1"
                            role="button"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                        >
                            <span className="[&>svg]:w-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                                0
                            </span>
                        </a>
                        <ul
                            className="min-w-[17rem] absolute z-[1000] float-left m-0 hidden list-none overflow-hidden rounded-lg bg-noxy-primary border border-zinc-800 bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                            aria-labelledby="dropdownMenuButton1"
                            data-te-dropdown-menu-ref
                        >
                            <div className="w-fit h-fit p-4 text-noxy-primary text-xs">
                                You dont have any problems
                            </div>
                        </ul>
                    </div>
                    <div
                        className="relative"
                        data-te-dropdown-ref
                        data-te-dropdown-alignment="end"
                    >
                        <a
                            className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                            href="#"
                            id="dropdownMenuButton2"
                            role="button"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                        >
                            <img
                                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                className="rounded-full"
                                style={{ height: '25px', width: '25px' }}
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="absolute z-[1000] float-left m-0 hidden min-w-[12rem] list-none overflow-hidden rounded-lg border border-zinc-800 bg-noxy-primary bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                            aria-labelledby="dropdownMenuButton2"
                            data-te-dropdown-menu-ref
                        >
                            <li>
                                <Link
                                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-400 hover:bg-zinc-800 active:text-neutral-200 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    to="/deposit"
                                    data-te-dropdown-item-ref
                                >
                                    Balance: {accountBalance} ₺
                                </Link>
                            </li>
                            <li>
                                <span
                                    onClick={() => { localStorage.clear(); window.location.reload(); }}
                                    className="block w-full whitespace-nowrap bg-transparent hover:cursor-pointer px-4 py-2 text-sm font-normal text-neutral-400 hover:bg-zinc-800 active:text-neutral-200 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                                    data-te-dropdown-item-ref
                                >
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}


function ContentPages(props) {

    switch (props.page) {
        case "/":
            return <HomePage {...props} />;
        case "/earn":
            return <EarnPage {...props} />;
        case "/deposit":
            return <DepositPage {...props} />;

        default:
            return <HomePage  {...props} />;
    }
}

export const UiLayout = (props) => {
    return (
        <>
            <div className="flex md:container mx-auto px-5 md:px-10 z-[1] border-b border-dashed border-b-zinc-700 pb-10">
                <div className="flex flex-col w-full h-fit mt-5 md:mt-10 z-[1]">


                    <div className="flex flex-row w-full">
                        {Navbar()}
                    </div>


                    <div className="w-full h-fit min-h-[10rem] mt-10">

                        <ContentPages {...props} />

                    </div>

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
}