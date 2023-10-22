import Leetcode from "leetcode-api-ts";
import Problem from "leetcode-api-ts/dist/lib/problem";
import { EndPoint, ProblemStatus } from "leetcode-api-ts/dist/utils/interfaces";

async function fetchLeetcode(): Promise<void> {
	// Login
	const leetcode: Leetcode = await Leetcode.build(
		"oasisfall2023",
		"Password1.",
		EndPoint.US // or EndPoint.CN
	);

	// Get a special problem
	const problem: Problem = new Problem("two-sum");

	// Fetch more properties of this problem
	await problem.detail();

	// Show problem content, test case, code snippet etc
	const content: string = problem.content || "";
	const testcase: string = problem.sampleTestCase || "";
	const codeSnippets: Array<any> = problem.codeSnippets || [];

	// submit your answer
	problem.submit("your code language", "your code here");

	// Get All problems' base infomation
	const problems: Array<Problem> = await leetcode.getAllProblems();

	// Filter problems by status, difficulty, etc
	const acceptedProblems: Array<Problem> = problems.filter((p: Problem) => {
		return p.status === ProblemStatus.Accept;
	});
}

export default fetchLeetcode;