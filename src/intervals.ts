type Interval = [number, number]

type IntervalFrequency = {interval: Interval, frequency: number}

function intervalsDoOverlap(interval1: Interval, interval2: Interval): boolean {
    return interval1[0] < interval2[1] && interval2[0] < interval1[1]
}

function findMostOverlappingIntervals(intervals:Interval[]): IntervalFrequency[] {
    const intervalFrequencies: IntervalFrequency[] = []

    for (const i in intervals) {
        let overlapCount = 0;
        for (const j in intervals) {
            if (i === j) continue;
            if (intervalsDoOverlap(intervals[i], intervals[j])) {
                overlapCount++;
            }
        }
        intervalFrequencies.push({
            interval: intervals[i],
            frequency: overlapCount
        })
    }

    const maxFrequency = Math.max(...intervalFrequencies.map(interval => interval.frequency))
    return intervalFrequencies.filter(interval => interval.frequency === maxFrequency)
}

export { findMostOverlappingIntervals, intervalsDoOverlap }
export type { Interval, IntervalFrequency }