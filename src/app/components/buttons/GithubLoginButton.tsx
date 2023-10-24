import { appTheme } from '@/app/theme/themes'
import Image from 'next/image'
import React from 'react'

export default function GithubLoginButton({
    onClick,
}: {
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            title="Login with Github"
            type="button"
            className={`flex border-1 border-white transition-all items-center relative w-full gap-4 px-3 hover:bg-[#1d2125]
            active:bg-[#131721] justify-center py-3 bg-[#24292E]`}
            style={{
                borderRadius: appTheme.radius.md,
                boxShadow: appTheme.shadow.md,
            }}
        >
            <Image
                alt="facebook logo"
                src="/assets/icons/github_logo.png"
                width={20}
                height={20}
                className=""
            />
        </button>
    )
}
