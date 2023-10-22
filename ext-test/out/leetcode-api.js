"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leetcode_api_ts_1 = require("leetcode-api-ts");
const interfaces_1 = require("leetcode-api-ts/dist/utils/interfaces");
const problem_1 = require("leetcode-api-ts/dist/lib/problem");
(async () => {
    // Login 
    const leetcode = await leetcode_api_ts_1.default.build("your username", "yout password", interfaces_1.EndPoint.US // or EndPoint.CN
    );
    // Get a special problem
    const problem = new problem_1.default("two-sum");
    // Fetch more properties of this problem
    await problem.detail();
    // Show problem content, test case, code snippet etc
    const content = problem.content;
    const testcase = problem.simpleTestCase;
    const codeSnippets = problem.codeSnippets;
    // Get All problems' base infomation
    const problems = await leetcode.getAllProblems();
    // Filter problems by status, difficulty, etc
    const acceptedProblems = problems.filter((p) => {
        return p.status === interfaces_1.ProblemStatus.Accept;
    });
})();
//# sourceMappingURL=leetcode-api.js.map