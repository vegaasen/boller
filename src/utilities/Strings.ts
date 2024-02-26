const cappedStringLength = 100
export const capThatString = (s: string): string => s && s.length > cappedStringLength ? `${s.substring(0, cappedStringLength)}...` : s

export const hashThatString = (s: string): number => s ?
    s
        .split('')
        .reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0) :
    -1
