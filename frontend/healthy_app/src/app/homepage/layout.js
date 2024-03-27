import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export default function Layout({ doctor, user, nurse }) {
    const role = getCookie("userType", { cookies });
    // Nurse UI
    if (role === "nurse") {
        return nurse;
    }

    // Doctor UI
    else if (role === "doctor") {
        return doctor;
    }

    // Patient UI
    else {
        return user;
    }
}
