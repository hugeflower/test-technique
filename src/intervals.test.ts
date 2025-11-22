import { describe, it, expect } from 'vitest'
import {findMostOverlappingIntervals, Interval, intervalsDoOverlap} from './intervals'

describe('when using intervalsDoOverlap', () => {
    it('returns true for valid intervals', () => {
        const firstInterval: Interval = [1,3]
        const secondInterval: Interval = [2,4]

        const result = intervalsDoOverlap(firstInterval, secondInterval)

        expect(result).toBeTruthy()
    })

    it('returns true for valid unordered intervals', () => {
        const firstInterval: Interval = [2,4]
        const secondInterval: Interval = [1,3]

        const result = intervalsDoOverlap(firstInterval, secondInterval)

        expect(result).toBeTruthy()
    })

    it('returns false for adjacent intervals', () => {
        const firstInterval: Interval = [1,3]
        const secondInterval: Interval = [3,5]

        const result = intervalsDoOverlap(firstInterval, secondInterval)

        expect(result).toBeFalsy()
    })

    it('returns false for non adjacent intervals', () => {
        const firstInterval: Interval = [1,3]
        const secondInterval: Interval = [4,6]

        const result = intervalsDoOverlap(firstInterval, secondInterval)

        expect(result).toBeFalsy()
    })
})

describe('findMostOverlappingIntervals', () => {
    describe('when using an empty array', () => {
        it('should return an empty array', () => {
            const emptyArray: Interval[] = []
            const result = findMostOverlappingIntervals(emptyArray)

            expect(result.length).toEqual(0)
        })
    })

    describe('when using an array with only one Interval', () => {
        it('should return the same interval with 0 frequency', () => {
            const singleInterval: Interval[] = [[2,4]]
            const result = findMostOverlappingIntervals(singleInterval)

            expect(result.length).toEqual(1)
            expect(result[0].interval).toEqual([2, 4])
            expect(result[0].frequency).toBe(0)
        })
    })

    describe('when using an Interval group with one most overlapping interval', () => {
        it('should only find the right interval', () => {
            const intervals: Interval[] = [[1, 3], [2, 4], [3, 5], [6, 8]]
            const result = findMostOverlappingIntervals(intervals)

            expect(result.length).toEqual(1)
            expect(result[0].interval).toEqual([2, 4])
            expect(result[0].frequency).toBe(2)
        })
    })

    describe('when using an Interval group with multiple most overlapping intervals that are duplicated', () => {
        it('should find multiple intervals and they overlap', () => {
            const intervals: Interval[] = [[1, 3], [2, 4], [2, 4], [3, 5], [6, 8]]
            const result = findMostOverlappingIntervals(intervals)

            expect(result.length).toEqual(2)
            expect(result[0].interval).toEqual([2, 4])
            expect(result[0].frequency).toBe(3)
        })
    })

    describe('when using an Interval group with multiple most overlapping intervals', () => {
        it('should find multiple intervals', () => {
            const intervals: Interval[] = [[1, 3], [2, 4], [3, 5], [4, 8]]
            const result = findMostOverlappingIntervals(intervals)

            expect(result.length).toEqual(2)
        })
    })
})