export type Task = {
    id: number
    title: string
    scheduledDate: Date
    consultWeather: boolean
    done: boolean
}

export type Block = {
    id: number
    title: string
    description: string
    notifications: boolean
    color: string
    tasks: number[]
    countTasksDone: number
}
