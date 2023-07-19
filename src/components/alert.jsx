import { useState, useEffect } from "react";

const Alert = () => {
    const [timer, setTimer] = useState(3);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="flex justify-center p-8 absolute top-3">
            <div className="flex w-64 items-center rounded-lg shadow-lg mb-4 bg-red-500 p-4 text-white">  
                <div className="w-64">    
                <h4 className="mb-2 font-bold">Try Again..</h4>    
                <p>User Not Found :(</p>
            </div>  
            <div className="w-12">    
                <div className="text-l text-center p-2 bg-red-600 rounded-full">    
                    {timer}
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Alert;