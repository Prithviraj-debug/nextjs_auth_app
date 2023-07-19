"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("nothing");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const [data, setData] = useState("nothing");
    const [loading, setLoading] = useState(false);

    const verifyEmail = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            console.log("success", response.data);
        } catch (error: any) {
            setError(true);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "nothing");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="mockup-code">
                <pre><code>Verify Email - {token === "nothing" ? "no token" : `${token}`}</code></pre>
                <pre><code>{loading ? "Loading..." : "Done"}
                </code></pre>
                <pre><code>
                    <Link href="/login">
                        <button
                            className="btn btn-accent mt-3"
                        >
                            Login
                        </button>
                    </Link>
                </code></pre>
            </div>
        </div>
    )
}