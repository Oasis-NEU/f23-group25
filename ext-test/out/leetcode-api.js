"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leetcode_api_ts_1 = require("leetcode-api-ts");
const problem_1 = require("leetcode-api-ts/dist/lib/problem");
const interfaces_1 = require("leetcode-api-ts/dist/utils/interfaces");
async function fetchLeetcode() {
    // Login
    const leetcode = await leetcode_api_ts_1.default.build("oasisfall2023", "Password1.", interfaces_1.EndPoint.US // or EndPoint.CN
    );
    // Get a special problem
    const problem = new problem_1.default("two-sum");
    // Fetch more properties of this problem
    await problem.detail();
    // Show problem content, test case, code snippet etc
    const content = problem.content || "";
    const testcase = problem.sampleTestCase || "";
    const codeSnippets = problem.codeSnippets || [];
    // submit your answer
    problem.submit("your code language", "your code here");
    // Get All problems' base infomation
    const problems = await leetcode.getAllProblems();
    // Filter problems by status, difficulty, etc
    const acceptedProblems = problems.filter((p) => {
        return p.status === interfaces_1.ProblemStatus.Accept;
    });
}
exports.default = fetchLeetcode;
//# sourceMappingURL=leetcode-api.js.map