export const scrollTo = (elementId: string) => document
    ?.getElementById(elementId)
    ?.scrollIntoView({behavior: 'smooth'})