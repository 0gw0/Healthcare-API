"use client";
import React from "react";

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

import { Boxes } from "@/components/aceternity/background-boxes";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import axios from "axios";

export default function Home() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    // User login - START
    if (code) {
        // Set user type as patient
        setCookie("userType", "patient");

        // Get user data from user_microservice
        axios.get("http://127.0.0.1:5001/user/get/patients/1").then((res) => {
            // console.log(res.data.data);
            setCookie("userData", res.data.data);
        });

        // Redirect to homepage
        redirect("/homepage");

        // Retrieve data from MyInfo
        // Note: It is not working as the API is not available
        // axios
        //     .post("/api/singpass/getPersonData", {
        //         authCode: code,
        //         codeVerifier: localStorage.getItem("codeVerifier"),
        //     })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }
    // $.ajax({
    //     url: "/getPersonData",
    //     data: {
    //         authCode: authCode,
    //         codeVerifier: window.sessionStorage.getItem("codeVerifier"),
    //     },
    //     type: "POST", // post to server side
    //     success: function (result) {
    //         // console.log("result",result);
    //         prefillForm(result);
    //     },
    //     error: function (result) {
    //         alert("ERROR:" + JSON.stringify(result.responseJSON.error));
    //     },
    // });

    async function callAuthorizeApi() {
        let code_challenge = await axios
            .get("/api/singpass/generateCodeChallenge")
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        if (code_challenge) {
            localStorage.setItem("codeVerifier", code_challenge[1]);
            const authApiUrl =
                "https://test.api.myinfo.gov.sg/com/v4/authorize";
            // For full scope:
            // https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/S9812381D
            const queryComponents = {
                client_id: "STG2-MYINFO-SELF-TEST",
                scope: "uinfin name sex race nationality dob email mobileno regadd housingtype hdbtype marital edulevel noa-basic ownerprivate cpfcontributions cpfbalances",
                purpose_id: "demonstration",
                code_challenge: code_challenge[0],
                code_challenge_method: "S256",
                redirect_uri: "http://localhost:3001/callback",
            };
            const authorizeUrl =
                authApiUrl +
                "?" +
                Object.entries(queryComponents)
                    .map(([k, v]) => `${k}=${v}`)
                    .join("&");
            // Example output:
            // "https://test.api.myinfo.gov.sg/com/v4/authorize?client_id=STG2-MYINFO-SELF-TEST&scope=uinfin name sex race nationality dob email mobileno regadd housingtype hdbtype marital edulevel noa-basic ownerprivate cpfcontributions cpfbalances&purpose_id=demonstration&code_challenge=MITPE6RARV4Xg0RGxJMsObnY5TGagjwg7-FF92h4UYM&code_challenge_method=S256&redirect_uri=http://localhost:3001/callback";
            window.location = authorizeUrl;
            // console.log(authorizeUrl);
        }
    }
    // User login - END

    // Admin login - START
    function doctorLogin() {
        // Set user type
        setCookie("userType", "doctor");

        // Get user data from user_microservice
        axios.get("http://127.0.0.1:5001/user/get/doctors/1").then((res) => {
            // console.log(res.data.data);
            setCookie("userData", res.data.data);
        });

        // console.log(getCookie("userData"));
        // deleteCookie("userData");
        // Redirect to homepage
        window.location.href = "/homepage";
    }
    function nurseLogin() {
        // Set user type
        setCookie("userType", "nurse");

        // Get user data from user_microservice
        axios.get("http://127.0.0.1:5001/user/get/nurses/1").then((res) => {
            // console.log(res.data.data);
            setCookie("userData", res.data.data);
        });

        // Redirect to homepage
        window.location.href = "/homepage";
    }
    // Admin login - END

    // Database control - START
    function emptyDatabase() {
        axios.post("http://127.0.0.1:5109/reset_empty").then((res) => {
            console.log(res);
            alert("Database has been reset to empty!");
        });
    }
    function useDataset1() {
        axios.post("http://127.0.0.1:5109/reset_dataset1").then((res) => {
            console.log(res);
            alert("Database has been is now using Dataset_1!");
        });
    }
    // Database control - END

    return (
        <div className="relative flex flex-col items-center justify-center w-full overflow-hidden h-dvh bg-slate-900">
            <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            <Boxes />

            <h1
                className={cn(
                    "lg:text-6xl md:text-4xl text-2xl text-white z-20 select-none"
                )}
            >
                Welcome to YATA!
            </h1>

            <p className="z-20 mt-2 text-center select-none lg:text-xl text-neutral-300">
                We are not just a telemedicine app,
                <br />
                We are YATA: 'Yet Another Telemedicine App'
            </p>

            <Button
                onClick={callAuthorizeApi}
                className="z-20 flex mx-auto mt-5 select-none"
                variant="outline"
            >
                Start Now
            </Button>

            {/* Admin login */}
            <div className="absolute z-20 select-none left-10 bottom-10">
                <Button
                    onClick={doctorLogin}
                    className="z-20 flex mx-auto mt-5 select-none w-28"
                    variant="outline"
                >
                    Doctor login
                </Button>
                <Button
                    onClick={nurseLogin}
                    className="z-20 flex mx-auto mt-5 select-none w-28"
                    variant="outline"
                >
                    Nurse login
                </Button>
            </div>

            {/* Database control */}
            <div className="absolute z-20 select-none right-10 bottom-10">
                <Button
                    onClick={emptyDatabase}
                    className="z-20 flex mx-auto mt-5 select-none w-36"
                    variant="outline"
                >
                    Empty Database
                </Button>
                <Button
                    onClick={useDataset1}
                    className="z-20 flex mx-auto mt-5 select-none w-36"
                    variant="outline"
                >
                    Use Dataset 1
                </Button>
            </div>

            <br />
        </div>
    );
}
