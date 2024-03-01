'use client';
import React from 'react';

import { Boxes } from '@/components/aceternity/background-boxes';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import axios from 'axios';

export default function Home() {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	if (code) {
		console.log(code);

		axios
			.post('/api/singpass/getPersonData', {
				authCode: code,
				codeVerifier: localStorage.getItem('codeVerifier'),
			})
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});

		console.log(2);

		console.log(3);
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
		// Change back after Singpass works
		// let code_challenge = await axios
		//     .get("/api/singpass/generateCodeChallenge")
		//     .then((res) => {
		//         console.log(res);
		//         return res.data;
		//     })
		//     .catch((error) => {
		//         console.log(error);
		//         return false;
		//     });

		// if (code_challenge) {
		//     localStorage.setItem("codeVerifier", code_challenge[1]);
		//     const authApiUrl =
		//         "https://test.api.myinfo.gov.sg/com/v4/authorize";
		//     // For full scope:
		//     // https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/S9812381D
		//     const queryComponents = {
		//         client_id: "STG2-MYINFO-SELF-TEST",
		//         scope: "uinfin name sex race nationality dob email mobileno regadd housingtype hdbtype marital edulevel noa-basic ownerprivate cpfcontributions cpfbalances",
		//         purpose_id: "demonstration",
		//         code_challenge: code_challenge[0],
		//         code_challenge_method: "S256",
		//         redirect_uri: "http://localhost:3001/callback",
		//     };
		//     const authorizeUrl =
		//         authApiUrl +
		//         "?" +
		//         Object.entries(queryComponents)
		//             .map(([k, v]) => `${k}=${v}`)
		//             .join("&");

		//     // Example output:
		//     // "https://test.api.myinfo.gov.sg/com/v4/authorize?client_id=STG2-MYINFO-SELF-TEST&scope=uinfin name sex race nationality dob email mobileno regadd housingtype hdbtype marital edulevel noa-basic ownerprivate cpfcontributions cpfbalances&purpose_id=demonstration&code_challenge=MITPE6RARV4Xg0RGxJMsObnY5TGagjwg7-FF92h4UYM&code_challenge_method=S256&redirect_uri=http://localhost:3001/callback";
		//     window.location = authorizeUrl;
		//     // console.log(authorizeUrl);
		// }
	}

	return (
		<div className="h-dvh relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
			<div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

			<Boxes />

			<div className="z-20 select-none">
				<h1
					className={cn(
						'lg:text-6xl md:text-4xl text-2xl text-white'
					)}
				>
					Welcome to YATA!
				</h1>

				<p className="lg:text-xl text-center mt-2 text-neutral-300">
					We are not just a telemedicine app,
					<br />
					We are YATA: 'Yet Another Telemedicine App'
				</p>

				<Button
					onClick={callAuthorizeApi}
					className="mt-5 mx-auto flex"
					variant="outline"
				>
					Start Now
				</Button>
			</div>
		</div>
	);
}
