export function diffInSecs(date: Date): number {
    
    const today = new Date();

    const diffTime = date.getTime() - today.getTime();
    const diffSecs = diffTime / 1000;
    return diffSecs;

}

export function diffInDays(date: Date): number {
    
    const today = new Date();

    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

export function formatTime(date: Date): string {
    
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

export function formatDate(date: Date): string {
    
    const days = String(date.getDate()).padStart(2, "0");
    const months = String(date.getMonth() + 1).padStart(2, "0");
    const years = String(date.getFullYear());

    return `${days}/${months}/${years}`;
}
