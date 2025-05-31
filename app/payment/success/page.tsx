const page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-primary/20 max-w-md w-full animate-fade-in">
                <div className="mb-6">
                    <svg className="w-20 h-20 text-green-500 mb-4 animate-bounce-slow" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" fill="#22c55e22" />
                        <path stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2.5 2.5L16 9" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-primary mb-2 text-center">Payment Successful!</h1>
                <p className="text-primary/80 text-lg mb-6 text-center">Thank you for upgrading. Your payment was processed successfully and your account has been upgraded.</p>
                <a href="/dashboard" className="inline-block px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 text-lg tracking-wide border-2 border-transparent hover:border-primary/60 mt-2">
                    Go to Dashboard
                </a>
            </div>
        </div>
    )
}

export default page
