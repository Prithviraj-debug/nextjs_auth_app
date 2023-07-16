"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 w-full">
            <div className="mockup-code w-fit shadow-2xl">
                <pre data-prefix="$"><code>Login</code></pre> 
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
                        className="mt-2"
                    >Login</button>
                </code></pre>

                <pre data-prefix="~" className="bg-warning text-warning-content mt-5"><code>Don't have an account? <Link href="/signup" className="cursor-pointer">Sign Up</Link></code></pre>
            </div>

        </div>
    )
}