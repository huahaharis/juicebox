"use client";

import React from "react";
import { useRouter } from "next/navigation";

type HeaderProps = {
    title: string;
    showBack?: boolean;
    onBack?: () => void;
    onRefresh?: () => void;
    className?: string;
};


export default function Header({ title = "juicebox", showBack, onRefresh, onBack }: HeaderProps) {
    const router = useRouter();
    const [spin, setSpin] = React.useState(false);

    const handleRefresh = () => {
        if (onRefresh) {
            setSpin(true);
            onRefresh();
            setTimeout(() => setSpin(false), 600);
        }
    };

    return (
        <header className="w-full max-w-[420px] flex items-center justify-center py-4 relative text-white z-50 pointer-events-auto">
            {/* Back button */}
            {showBack && (
                <button
                    onClick={onBack}
                    aria-label="Go back"
                    className="absolute left-4 p-2 rounded-full hover:bg-white/10 transition"
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            )}

            {/* Title */}
            <h1 className="text-[28px] font-extrabold tracking-tight">{title}</h1>

            {/* Refresh button */}
            {onRefresh && (
                <button
                    onClick={handleRefresh}
                    aria-label="Reload animation"
                    className={`absolute right-4 p-2 rounded-full hover:bg-white/10 transition ${spin ? "animate-spin-slow" : ""
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="23 4 23 10 17 10" />
                        <polyline points="1 20 1 14 7 14" />
                        <path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15" />
                    </svg>
                </button>
            )}

            <style jsx>{`
        .animate-spin-slow {
          animation: spin 0.6s linear;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </header>
    );
}
