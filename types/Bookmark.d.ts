export type BookmarkType = {
    id:number
    title:string
    url:string
    category:string
}

export type BookmarkTypeGroup = {
    category:string,
    items:BookmarkType[]
}