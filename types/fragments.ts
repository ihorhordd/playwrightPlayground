
export type TestCaseDashboardRow = 'norun' | 'passed' | 'failed' | 'total'

export interface ITestCase {
    id: number,
    summary: string,
    description: string,
    author: string,
    status: string,
    lastExecutor: string
}