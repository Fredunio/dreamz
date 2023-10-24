import { appTheme } from '@/app/theme/themes'
import Image from 'next/image'
import React from 'react'

export default function FacebookLoginButton({
    onClick,
}: {
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            title="Login with Facebook"
            type="button"
            className={`flex transition-all items-center relative w-full gap-4 px-3 hover:bg-[#2e4885]
            active:bg-[#263c71] justify-center py-3 bg-[#3b5998]`}
            style={{
                borderRadius: appTheme.radius.md,
                boxShadow: appTheme.shadow.md,
            }}
        >
            <Image
                alt="facebook logo"
                src="/assets/icons/facebook_logo.png"
                width={20}
                height={20}
                className=""
            />
            {/* <span
                style={{
                    fontSize: appTheme.fontSize.md,
                    fontWeight: appTheme.fontWeight.lg,
                }}
                className="absolute font-bold text-white transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap left-1/2 top-1/2 "
            >
                {buttonText}
            </span> */}
        </button>
    )
}
