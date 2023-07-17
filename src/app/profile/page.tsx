"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log("success", response.data);
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error("Logout failed");
        }
    }

    const getUserDetail = async () => {
        const res = await axios.get("/api/users/user")
        console.log(res.data);
        setData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="mockup-code">
                <pre><code>Profile</code></pre>
                <pre><code>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
                </code></pre>
                <pre><code>
                    <button
                    onClick={logout}
                        className="btn btn-accent mt-3"
                    >
                        Logout
                    </button>
                </code></pre>

                <pre><code>
                    <button
                    onClick={getUserDetail}
                        className="btn btn-primary mt-3"
                    >
                        Get User Details
                    </button>
                </code></pre>
            </div>
        </div>
    )
}