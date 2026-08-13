interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex flex-1 items-center justify-center bg-zinc-50 p-6 font-sans">
            <div className="w-full max-w-md p-10 bg-white border border-zinc-200 rounded-4xl shadow-sm">
                <header className="text-center mb-8">
                    <div className="w-12 h-12 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <div className="w-5 h-5 border-4 border-white rounded-full"></div>
                    </div>

                    <h2 className="text-2xl font-black tracking-tighter text-black">
                        Welcome back!
                    </h2>
                    <p className="text-zinc-400 text-sm mt-2 font-medium">
                        Enter your details to continue
                    </p>
                </header>

                <div className="text-black">{children}</div>

                <footer className="mt-8 text-center text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                    Auth...
                </footer>
            </div>
        </div>
    );
}
