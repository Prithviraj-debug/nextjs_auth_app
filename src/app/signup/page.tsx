"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SigupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("succss", response.data);
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="mockup-code w-fit shadow-2xl">
            <pre data-prefix="$"><code>{loading ? "Processing..." : "Signup"}</code></pre> 
                <pre data-prefix=">" className="text-warning"><code>
                    <input 
                        id="username"
                        type="text"
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Username"
                        className="input p-0 w-fit max-w-xs bg-transparent"
                    />
                </code></pre>

                <pre data-prefix=">" className="text-success"><code>
                    <input 
                        id="email"
                        type="text"
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        placeholder="Email"
                        className="input p-0 w-fit max-w-xs bg-transparent"
                    />
                </code></pre>

                <pre data-prefix=">" className="text-error"><code>
                    <input 
                        id="password"
                        type="password"
                        value={user.password} 
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Password"
                        className="input p-0 w-fit max-w-xs bg-transparent"
                    />  
                </code></pre>

                <pre data-prefix="#" className="text-accent"><code>
                    <button
                        onClick={onSignup}
                        className={`mt-2 ${buttonDisabled ? "btn-disabled" : ""}`}
                    >Signup</button>
                </code></pre>

                <pre data-prefix="~" className="bg-warning text-warning-content mt-5"><code>Already have an account? <Link href="/login" className="cursor-pointer">Login</Link></code></pre>
                </div>
        </div>
    )
}