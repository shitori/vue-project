import CountStatusSquashType from "./CountStatusSquashType"
import TestPlanSquashType from "./TestPlanSquashType"

type TestSuitesSquashType = CountStatusSquashType & {
    name: string
    test_plan: Array<TestPlanSquashType>
}

export default TestSuitesSquashType
