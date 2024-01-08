'use client'

import {
    Autocomplete,
    AutocompleteOption,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    IconButton,
    Input,
    ListItemContent,
    Option,
    Select,
    Sheet,
    Skeleton,
} from '@mui/joy'
import React, { useCallback, useEffect, useRef } from 'react'
import { parseDatabaseName } from '../../utils/helpers'
import { Close, Search, Tag } from '@mui/icons-material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SortIcon from '@mui/icons-material/Sort'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import {
    dreamSortByDirOptions,
    dreamSortByOptions,
    layoutPaddingX,
} from '../../lib/config'
import MovingIcon from '@mui/icons-material/Moving'
import useDebounceDreamQuery from '../../hooks/useDebounceDreamQuery'
import { getDreamCategories } from '../../lib/fetchers/dreams/getDreamCategories'
import { getEmotions } from '../../lib/fetchers/getEmotions'
import { getDreamTags } from '../../lib/fetchers/dreams/getDreamTags'
import { useQuery } from '@tanstack/react-query'
import { truthyFilter } from '../../lib/truthyFilter'

const sortByOptions = dreamSortByOptions
const sortByDirOptions = dreamSortByDirOptions

const getStickyFiltersWidth = () => {
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    return `calc(100vw - ${scrollbarW}px)`
}

export default function DreamsPageFilters() {
    const pathname = usePathname()
    const router = useRouter()
    const [showFilters, setShowFilters] = React.useState(false)
    const [stickFiltersTop, setStickFiltersTop] = React.useState(false)
    const observerFilterRef = useRef(null)

    const searchParams = useSearchParams()
    const search = searchParams.get('search') || undefined
    const category = searchParams.get('category') || undefined
    const emotions = searchParams.getAll('emotion') || []
    const tags = searchParams.getAll('tag') || []
    const sortBy = searchParams.get('sortBy') || undefined
    const sortByDir = searchParams.get('sortByDir') || sortByDirOptions.desc
    const [searchTerm, setSearchTerm] = React.useState(search)

    const { data: categoryOptions, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['categories'],
        queryFn: getDreamCategories,
    })

    const { data: emotionOptions, isLoading: isLoadingEmotions } = useQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    })

    const { data: tagOptions, isLoading: isLoadingTags } = useQuery({
        queryKey: ['tags'],
        queryFn: getDreamTags,
    })

    const observerFunction = useCallback(
        (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
            const [entry] = entries
            if (entry.intersectionRatio === 0) {
                setStickFiltersTop(true)
            }

            if (entry.intersectionRatio === 1) {
                setStickFiltersTop(false)
            }
        },
        []
    )

    const routeQueryUrl = useCallback(
        (name: string, value: string | string[] | undefined) => {
            const params = new URLSearchParams(searchParams)

            if (value === undefined) {
                params.delete(name)
            } else if (Array.isArray(value)) {
                params.delete(name)
                value.forEach((val) => params.append(name, val))
            } else {
                params.set(name, value)
            }

            if (params.toString() === '') {
                router.replace(pathname, {
                    scroll: false,
                })
                return
            }

            router.replace(pathname + '?' + params.toString(), {
                scroll: false,
            })
        },
        [searchParams, pathname, router]
    )

    useDebounceDreamQuery(searchTerm, 'search', routeQueryUrl, 400)

    const filterPaddingY = '1rem'

    useEffect(() => {
        const headerHeight = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--header-height')
        const rootFontSize = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        )

        let marginBot = headerHeight
        let filterPaddingYNum = Number(filterPaddingY.replace('rem', ''))

        if (marginBot.endsWith('rem')) {
            marginBot = `${
                Number(headerHeight.replace('rem', '')) * rootFontSize
                // + (filterPaddingYNum / 2) * rootFontSize
            }px`
        }

        const observer = new IntersectionObserver(observerFunction, {
            root: null,
            // rootMargin: `0px 0px ${marginBot} 0px`,
            rootMargin: `-${marginBot}`,
            threshold: [0, 1],
        })

        const observerTargetRef = observerFilterRef

        if (observerTargetRef.current) {
            observer.observe(observerTargetRef.current)
        }

        return () => {
            if (observerTargetRef.current) {
                observer.unobserve(observerTargetRef.current)
            }
        }
    }, [observerFunction])

    return (
        <>
            <Box
                sx={{
                    // Like gap in layout file - should find better solution
                    marginBottom: -6,
                }}
                className="w-full h-[0px]"
                ref={observerFilterRef}
                id="filters-top-observer"
            ></Box>
            <Sheet
                // ref={observerFilterRef}

                color="neutral"
                variant="plain"
                component="form"
                sx={{
                    backgroundColor:
                        'rgba(var(--joy-palette-common-black, #000)/0.55)',
                    width: stickFiltersTop ? getStickyFiltersWidth() : '100%',

                    px: stickFiltersTop ? layoutPaddingX : 0,
                    // py: stickFiltersTop ? filterPaddingY : 0,
                    py: filterPaddingY,

                    borderBottom: stickFiltersTop ? 1 : 0,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    // position: stickFiltersTop ? 'sticky' : 'static',
                    position: 'sticky',
                    top: 'var(--header-height)',
                    flexWrap: 'wrap',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2,
                }}
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <Box
                    sx={{
                        // flexGrow: 1,
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: 4,
                    }}
                >
                    <FormControl
                        size="lg"
                        sx={{
                            // flexGrow: 3,
                            width: '100%',
                        }}
                    >
                        <Input
                            value={searchTerm}
                            onChange={(e) => {
                                if (e.target.value === '') {
                                    setSearchTerm(undefined)
                                }
                                setSearchTerm(e.target.value)
                            }}
                            color="primary"
                            endDecorator={<Search />}
                            name="search"
                            placeholder="Search"
                            sx={{
                                width: '100%',
                            }}
                        />
                    </FormControl>

                    <FormControl
                        disabled={!categoryOptions}
                        size="lg"
                        sx={{
                            minWidth: '25%',
                        }}
                    >
                        <Select
                            disabled={!categoryOptions}
                            value={
                                categoryOptions?.categories.find(
                                    (categoryEl) =>
                                        categoryEl.id === Number(category)
                                )?.id
                            }
                            color="primary"
                            name="category"
                            placeholder="Category"
                            onChange={(e, value) => {
                                if (!value) {
                                    return
                                }
                                routeQueryUrl('category', value.toString())
                            }}
                            sx={
                                {
                                    // width: '100%',
                                    // flexGrow: 1,
                                    // flexShrink: 1,
                                }
                            }
                        >
                            {categoryOptions?.categories.map((category) => (
                                <Option
                                    key={Number(category.id)}
                                    value={category.id}
                                    label={parseDatabaseName(category.name)}
                                >
                                    {parseDatabaseName(category.name)}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                    <IconButton
                        size="lg"
                        sx={{
                            display: 'flex',
                        }}
                        variant="solid"
                        color="primary"
                        onClick={() => {
                            setShowFilters((prev) => !prev)
                        }}
                    >
                        <SortIcon />
                    </IconButton>
                </Box>
                <Divider
                    orientation="horizontal"
                    sx={{
                        display: showFilters ? 'initial' : 'none',
                        mx: 2,
                    }}
                />
                <Box
                    sx={{
                        display: showFilters ? 'flex' : 'none',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        width: '100%',
                        '& > *': {
                            flexGrow: 1,
                        },
                    }}
                >
                    <FormControl
                        size="lg"
                        sx={{
                            flexDirection: 'row',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <Select
                            value={
                                sortByOptions.find(
                                    (sortOpt) => sortOpt.value === sortBy
                                )?.value
                            }
                            onChange={(e, value) => {
                                if (!value) {
                                    return
                                }
                                routeQueryUrl('sortBy', value)
                            }}
                            indicator={null}
                            name="sortBy"
                            color="primary"
                            placeholder="Sort By"
                            sx={{
                                borderRight: 'none',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                // flexShrink: 1,
                                width: '100%',
                            }}
                        >
                            {sortByOptions?.map((option) => (
                                // <Link key={option.value} href={'/test'}>
                                //     {parseDatabaseName(option.label)}
                                // </Link>
                                <Option
                                    key={option.value}
                                    value={option.value}
                                    // TODO: Change it to typography component so Sort by is faded
                                    label={
                                        'Sort by: ' +
                                        parseDatabaseName(option.label)
                                    }
                                >
                                    {parseDatabaseName(option.label)}
                                </Option>
                            ))}
                        </Select>
                        <Button
                            size="lg"
                            onClick={() => {
                                if (sortByDir === sortByDirOptions.desc) {
                                    routeQueryUrl(
                                        'sortByDir',
                                        sortByDirOptions.asc
                                    )
                                } else if (sortByDir === sortByDirOptions.asc) {
                                    routeQueryUrl(
                                        'sortByDir',
                                        sortByDirOptions.desc
                                    )
                                }
                            }}
                            variant="outlined"
                            color="primary"
                            sx={{
                                borderLeft: 'none',
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                // px: '0rem',
                            }}
                        >
                            <MovingIcon
                                sx={{
                                    // padding: '0',
                                    // TODO: implement changing it according to sortByDir
                                    // transform: 'rotate(90deg)',
                                    // width: '2rem',
                                    // height: '2rem',
                                    // transform: `rotate(${
                                    //     sortByDir === sortByDirOptions.asc
                                    //         ? 180
                                    //         : 0
                                    // }deg)`,
                                    transform: `scaleY(${
                                        sortByDir === sortByDirOptions.asc
                                            ? 1
                                            : -1
                                    })`,

                                    transition: 'transform 0.15s ease-in-out',
                                    // width: '100%',
                                    // height: '100%',
                                }}
                            />
                        </Button>
                    </FormControl>

                    <FormControl
                        sx={{
                            flexGrow: 1,
                            flexShrink: 1,
                        }}
                        size="lg"
                    >
                        <Autocomplete
                            value={emotions
                                .map((emotion) => {
                                    return emotionOptions?.emotions.find(
                                        (emotionOption) =>
                                            emotionOption.id === Number(emotion)
                                    )
                                })
                                .filter(truthyFilter)}
                            startDecorator={<EmojiEmotionsIcon />}
                            onChange={(e, value) => {
                                if (!value) {
                                    return
                                }
                                routeQueryUrl(
                                    'emotion',
                                    value.map((val) => val.id.toString())
                                )
                            }}
                            limitTags={2}
                            color="primary"
                            variant="outlined"
                            multiple
                            id="emotionOptions"
                            placeholder="Emotions"
                            options={emotionOptions?.emotions || []}
                            getOptionLabel={(option) =>
                                parseDatabaseName(
                                    `${parseDatabaseName(option.name)} ${
                                        option.emoji
                                    }`
                                )
                            }
                            renderOption={(props, option) => {
                                return (
                                    <AutocompleteOption
                                        {...props}
                                        key={option.id}
                                    >
                                        <ListItemContent key={option.id}>
                                            {parseDatabaseName(
                                                `${parseDatabaseName(
                                                    option.name
                                                )} ${option.emoji}`
                                            )}
                                        </ListItemContent>
                                    </AutocompleteOption>
                                )
                            }}
                            renderTags={(tags, getTagProps) =>
                                tags.map((item, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <Chip
                                        variant="solid"
                                        color="primary"
                                        startDecorator={item.emoji}
                                        endDecorator={
                                            <Close fontSize="large" />
                                        }
                                        // key={Number(item.id)}
                                        {...getTagProps({ index })}
                                    >
                                        {parseDatabaseName(item.name)}
                                    </Chip>
                                ))
                            }
                        />
                    </FormControl>

                    <FormControl size="lg">
                        <Autocomplete
                            startDecorator={<Tag />}
                            limitTags={2}
                            value={tags}
                            onChange={(e, newValue) => {
                                if (!newValue) {
                                    return
                                }
                                routeQueryUrl('tag', newValue)
                            }}
                            color="primary"
                            variant="outlined"
                            multiple
                            id="tags"
                            placeholder="Tags"
                            options={
                                tagOptions?.tags.map((tag) => tag.name) || []
                            }
                            getOptionLabel={(option) =>
                                parseDatabaseName(`#${option}`)
                            }
                            renderOption={(props, option) => {
                                return (
                                    <AutocompleteOption {...props} key={option}>
                                        {/* <ListItemDecorator>#</ListItemDecorator> */}
                                        <ListItemContent key={option}>
                                            {option}
                                        </ListItemContent>
                                    </AutocompleteOption>
                                )
                            }}
                            renderTags={(tags, getTagProps) =>
                                tags.map((item, index) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <Chip
                                        // key={item}
                                        variant="solid"
                                        color="primary"
                                        startDecorator={'#'}
                                        endDecorator={
                                            <Close fontSize="large" />
                                        }
                                        // key={Number(item.id)}
                                        {...getTagProps({ index })}
                                    >
                                        {item}
                                    </Chip>
                                ))
                            }
                        />
                    </FormControl>
                </Box>
            </Sheet>
        </>
    )
}
