import {
    AspectRatio,
    Card,
    CardActions,
    CardContent,
    CardOverflow,
    Divider,
    IconButton,
    Skeleton,
    Typography,
} from '@mui/joy'
import Image from 'next/image'
import React from 'react'
import { TDreamWithImageUrl } from '../../types/types'
import { defaultDreamImage } from '../../lib/variables'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function DashboardDreamCard({
    dream,
    onEdit,
    onDelete,
}: {
    dream: TDreamWithImageUrl
    onEdit: (id: string) => void | Promise<void> | Promise<any> | any
    onDelete: (id: string) => void | Promise<void> | Promise<any> | any
}) {
    return (
        <React.Suspense fallback={<Skeleton />}>
            <Card component={'div'} color="primary" variant="outlined">
                <CardOverflow>
                    <AspectRatio ratio="1">
                        <Image
                            loading="lazy"
                            alt={`${dream.name}'s image`}
                            src={dream.imageUrl || defaultDreamImage}
                            className="object-cover"
                            width={320}
                            height={250}
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
                <CardActions
                    buttonFlex="0 1 120px"
                    sx={{
                        flexDirection: 'row',

                        justifyContent: 'space-between',
                    }}
                >
                    <IconButton
                        onClick={() => {
                            onEdit(dream.id)
                        }}
                        variant="outlined"
                        color="success"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            onDelete(dream.id)
                        }}
                        variant="outlined"
                        color="danger"
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </React.Suspense>
    )
}
