import Image from 'next/image'
import * as React from 'react'
import { IconButton } from '@mui/joy'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ImagePreview({
    src,
    alt,
    onRemove,
    containerClassName,
}: {
    src?: string
    alt?: string
    onRemove?: () => void
    containerClassName?: string
}) {
    const imageSrc = React.useMemo(() => {
        if (!src) {
            return null
        }

        return src
    }, [src])

    if (!imageSrc) {
        return null
    }

    return (
        <div
            className={`h-[18rem] overflow-hidden w-full group rounded-lg  relative ${containerClassName}`}
        >
            <Image
                src={imageSrc}
                alt={alt || 'Preview'}
                className="object-cover"
                fill={true}
            />
            {onRemove && (
                <IconButton
                    onClick={onRemove}
                    sx={{
                        position: 'absolute',
                    }}
                    className="transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100"
                    title="Remove"
                    type="button"
                    color={'danger'}
                    variant={'solid'}
                >
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    )
}
