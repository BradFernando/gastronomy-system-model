"use client";

import React from "react";
import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser();

    const onClick = async () => {
        logout();
    };

    return (
        <div className="bg-white p-10 rounded-xl">
            <button onClick={onClick} type="submit">
                Sign Out
            </button>
        </div>
    );
}

export default SettingsPage;