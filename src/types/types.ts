export type PhotosType = {
    small: string | null
    large: string | null
}

export type userType ={
    id: number
    name: string
    status: string
    photos: PhotosType
}