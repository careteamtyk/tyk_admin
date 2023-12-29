import { cleanO} from "../../utils/util"

const processData = (rows)=>{
    let ra = []
    rows.map((r, i)=>{
        //c, t, q, a, b, c, d, e, f, a
        //0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        let category = cleanO(r[0])
        let topic = cleanO(r[1])
        let qn = cleanO(r[2])
        let oa = cleanO(r[3])
        let ob = cleanO(r[4])
        let oc = cleanO(r[5])
        let od = cleanO(r[6])
        let oe = cleanO(r[7])
        let of = cleanO(r[8])
        let answer = cleanO(r[9])
        let ops = []
        ops.push({option: oa, isCorrect: answer === 'A'})
        ops.push({option: ob, isCorrect: answer === 'B'})
        if(oc !== "")
            ops.push({option: oc, isCorrect: answer === 'C'})
        if(od !== "")
            ops.push({option: od, isCorrect: answer === 'D'})
        if(oe !== "")
            ops.push({option: oe, isCorrect: answer === 'E'})
        if(of !== "")
            ops.push({option: of, isCorrect: answer === 'F'})               
        let qq = {
            category: r[0], topic: r[1], question: qn,  options: ops,
            formatCorrect: formatChecker(category, topic, qn, oa, ob, answer, ops),
            status: "Active",
            createdOn: new Date(),
            updatedOn: new Date()
        }
        ra.push(qq)
    })
    return ra
}
const formatChecker = (category, topic, qns, oa, ob, ans, oar)=>{
    let ops = ['A', 'B', 'C', 'D', 'E', 'F']
    let ocnd = ops.indexOf(ans.toUpperCase())
    let cond1 = qns !== null && oa !== null & ob !== null && ans !== null
    let cond2 = qns !== "" && oa !== "" & ob !== "" && ans !== ""
    let cond3 = ocnd>=0 && ocnd <=5 && ocnd < oar.length
    return topic !== "" && category !=="" && cond1 && cond2 && cond3
}
const excelAnswer = (ar)=>{
    let ops = ['A', 'B', 'C', 'D', 'E', 'F']
    let ans = ""
    ar.map((a, i)=>{
        if(!!a.isCorrect){
            ans = ops[i]
        }
    })
    return ans
}
export {processData, formatChecker, excelAnswer}