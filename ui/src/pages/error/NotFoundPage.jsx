import { Link } from "react-router-dom";
import "./NotFound.css";


export const NotFoundPage = () => {
    return (
        <div className="z-[10] flex w-full h-screen items-center justify-center">

            <div class="text-center text-noxy-primary z-[10]">
                <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
                <p class="mb-4 text-lg text-noxy-primary">Oops! Looks like you're lost.</p>
                <div class="animate-bounce">
                    <svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                </div>
                <Link to="/" class="mt-4 text-noxy-primary">Let's get you back <span class="text-green-600">home</span>.</Link>
            </div>


            <div className="flex w-full h-full absolute top-0 left-0 z-[0]">
                <div className="flex w-full">
                    <svg viewBox="0 0 800 600" fill="#151617" strokeWidth={0} strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M 0 400 L 400 600 L 400 500 L 0 300 Z" />
                        <path d="M 700 250 L 400 600 L 400 500 L 600 250 Z" />
                        <path d="M 700 0 L 700 250 L 600 305 L 600 0 Z" />
                    </svg>
                </div>
            </div>
        </div >
    )
}