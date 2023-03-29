import { PythonShell } from 'python-shell';

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST': {
            const result = {};
            try {
                result.value = await PythonShell.runString(req.body.code, null);
                result.stringValue = result.value.toString();
                result.completed = 0;

                for (const answer of req.body.correctAnswer) {
                    switch (answer.type) {
                        case 'exact-match':
                            if (result.stringValue === answer.value) {
                                result.completed++;
                            }
                            break;
                        case 'n-output':
                            if (result.value.length === Number(answer.value)) {
                                result.completed++;
                            }
                            break;
                        case 'output-type':
                            if (answer.value === "number") {
                                if (!isNaN(Number(result.value[0]))) {
                                    result.completed++;
                                }
                            }
                            break;
                        case 'different-code':
                            if (req.body.code !== req.body.defaultCode) {
                                result.completed++;
                            }
                            break;
                        default:
                            break;
                    }
                }
                result.state = result.completed === req.body.correctAnswer.length ? "completed" : "failed";

            }
            catch (error) {
                result.value = [error.toString()];
            }
            res.status(200).json(result);
            break
        }
        default:
            res.status(405).send({ message: 'Only POST requests allowed' })
            break
    }
}