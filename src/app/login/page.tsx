"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Alert from "../../components/alert";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const resetFields = () => {
        setUser({
            email: "",
            password: "",
        })
    }

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("success", response.data);
            toast.success("Login successful");
            resetFields();
            setTimeout(() => {
                router.push("/profile");
            }, 3000);
        } catch (error: any) {
            console.log(error.message);
            setIsAlertOpen(true);
            resetFields();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        if (isAlertOpen) {
            setTimeout(() => {
                setIsAlertOpen(false);
            }, 4000);
        }
    }, [isAlertOpen])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
            <div className="mockup-code w-fit shadow-2xl m-3">
                <pre data-prefix="$"><code>{loading ? "Processing..." : "Login"}</code></pre> 
                <pre data-prefix=">" className="text-warning"><code>
                    <input 
                        id="email"
                        type="email"
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Email"
                        className="input w-fit max-w-xs bg-transparent p-0"
                    />
                    </code></pre> 
                <pre data-prefix=">" className="text-success"><code>
                    <input 
                        id="password"
                        type="password"
                        value={user.password} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Password"
                        className="input w-fit max-w-xs bg-transparent p-0"
                    />      
                </code></pre>
                <pre data-prefix="#" className="text-accent"><code>
                    <button
                        onClick={onLogin}
                        className={`mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Login</button>
                </code></pre>

                <pre data-prefix="~" className="bg-warning text-warning-content mt-5 text-sm"><code>Don't have an account? <Link href="/signup" className="cursor-pointer">Sign Up</Link></code></pre>
            </div>
            {
                isAlertOpen && (
                    <Alert />
                )
            }
        </div>
    )
}