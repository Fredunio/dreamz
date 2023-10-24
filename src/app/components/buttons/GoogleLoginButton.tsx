import { appTheme } from '@/app/theme/themes'
import Image from 'next/image'
import React from 'react'

export default function GoogleLoginButton({
    onClick,
}: {
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            title="Login with Google"
            type="button"
            className={`
            transition-all hover:bg-gray-200 active:bg-gray-300
            flex items-center justify-center relative w-full gap-4 px-3 py-3 bg-white`}
            style={{
                borderRadius: appTheme.radius.md,
                boxShadow: appTheme.shadow.md,
            }}
        >
            <Image
                alt="google logo"
                src="/assets/icons/google_logo.png"
                width={20}
                height={20}
                className=""
            />
            {/* <span
                style={{
                    fontSize: appTheme.fontSize.md,
                    fontWeight: appTheme.fontWeight.lg,
                }}
                className="absolute font-bold text-black transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap left-1/2 top-1/2 "
            >
                {buttonText}
            </span> */}
        </button>
    )
}
