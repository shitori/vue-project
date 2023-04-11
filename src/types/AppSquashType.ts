import CountStatusSquashType from "./CountStatusSquashType"
import TestSuitesSquashType from "./TestSuitesSquashType"

type AppSquashType = CountStatusSquashType & {
    name: string
    test_suites: Array<TestSuitesSquashType>
}

export default AppSquashType
