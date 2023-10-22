import Leetcode from "leetcode-api-ts";
import { EndPoint, ProblemStatus } from "leetcode-api-ts/dist/utils/interfaces";
import Problem from "leetcode-api-ts/dist/lib/problem";

(async (): Promise<void> => {


    // Login 
    const leetcode: Leetcode = await Leetcode.build(
        "your username",
        "yout password",
        EndPoint.US     // or EndPoint.CN
    );

    // Get a special problem
    const problem: Problem = new Problem("two-sum");

    // Fetch more properties of this problem
    await problem.detail();

    // Show problem content, test case, code snippet etc
    const content: string = problem.content;
    const testcase: string = problem.simpleTestCase;
    const codeSnippets: Array<any> = problem.codeSnippets;

    // Get All problems' base infomation
    const problems: Array<Problem> = await leetcode.getAllProblems();

    // Filter problems by status, difficulty, etc
    const acceptedProblems: Array<Problem> = problems.filter((p: Problem) => {
        return p.status === ProblemStatus.Accept;
    });
})();