import Link from "next/link";
import Image from "next/image";
import logo from "../app/favicon.ico";

import { getCookie, deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

import { useState, useEffect } from "react";

const Navbar = () => {
    const [isClient, setIsClient] = useState(false);

    // Check if the component is mounted
    useEffect(() => {
        setIsClient(true);

        console.log(userType);
        console.log(getCookie("userData"));
    }, [isClient]);

    const userType = getCookie("userType");
    //  change to API call
    var navigation;
    if (userType === "doctor") {
        navigation = ["Homepage", "My Slots", "History"];
    } else if (userType === "nurse") {
        navigation = ["Homepage", "Inventory"];
    } else {
        navigation = ["Homepage", "Make Appointment", "History"];
    }

    function logoutAction() {
        // remove cookie
        deleteCookie("userType");
        deleteCookie("userData");

        // redirect to login page
        window.location.href = "/";
    }

    function spinalCase(str) {
        return str
            .split(" ")
            .map((c) => c.toLowerCase())
            .join("-");
    }

    return (
        <div className="w-full">
            <nav className="relative flex flex-wrap items-center justify-between p-6 mx-auto container-fluid lg:justify-between xl:px-8 bg-blue-950">
                {/* Logo  */}
                <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                    <Link href="/">
                        <span className="flex items-center space-x-2 text-2xl font-medium text-white dark:text-gray-100">
                            <span>
                                <Image
                                    src={logo}
                                    width="32"
                                    height="32"
                                    className="w-8"
                                    alt="YATA"
                                />
                            </span>
                            <span>YATA</span>
                        </span>
                    </Link>
                </div>

                {/* menu  */}
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                        {isClient &&
                            navigation.map((menu, index) => (
                                <li className="mr-3 nav__item" key={index}>
                                    <Link
                                        href={spinalCase(menu)}
                                        className="inline-block px-4 py-2 text-lg font-normal text-white no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 hover:bg-indigo-100 hover:outline-none dark:hover:bg-gray-800"
                                    >
                                        {menu}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                    <button
                        onClick={logoutAction}
                        className="px-6 py-2 bg-white text-blue-950 rounded-3xl md:ml-5"
                    >
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
