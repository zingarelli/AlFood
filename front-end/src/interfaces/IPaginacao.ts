// tipagem da resposta retornada pela API
export interface IPaginacao<T> {
    count: number
    next: string
    previous: string
    results: T[]
}