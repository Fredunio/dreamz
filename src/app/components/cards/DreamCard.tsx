import * as React from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Divider from '@mui/joy/Divider'
import Typography from '@mui/joy/Typography'
import Image from 'next/image'
import { defaultDreamImage } from '../../lib/variables'
import { TDreamWithImageUrl } from '../../types/types'
import { Skeleton } from '@mui/joy'

type TDreamCardProps = {
    dream: TDreamWithImageUrl
}

const DreamCard = React.forwardRef<HTMLDivElement, TDreamCardProps>(
    (props, ref) => {
        const { dream } = props
        return (
            <React.Suspense fallback={<Skeleton />}>
                <Card ref={ref} component={'div'} variant="outlined">
                    <CardOverflow component={'a'} href={`/dreams/${dream.id}`}>
                        <AspectRatio ratio="2">
                            <Image
                                loading="lazy"
                                alt={`${dream.name}'s image`}
                                src={dream.imageUrl || defaultDreamImage}
                                className="object-cover"
                                width={320}
                                height={180}
                                // TODO: change values below
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                // objectFit="cover"
                            />
                        </AspectRatio>
                    </CardOverflow>
                    <CardContent>
                        <Typography level="title-md">{dream.name}</Typography>
                        {/* <Typography level="body-sm">California</Typography> */}
                    </CardContent>
                    <CardOverflow
                        variant="soft"
                        sx={{ bgcolor: 'background.level1' }}
                    >
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                            <Typography
                                level="body-xs"
                                fontWeight="md"
                                textColor="text.secondary"
                            >
                                6.3k views
                            </Typography>
                            <Divider orientation="vertical" />
                            <Typography
                                level="body-xs"
                                fontWeight="md"
                                textColor="text.secondary"
                            >
                                1 hour ago
                            </Typography>
                        </CardContent>
                    </CardOverflow>
                </Card>
            </React.Suspense>
        )
    }
)

DreamCard.displayName = 'DreamCard'
export default DreamCard
