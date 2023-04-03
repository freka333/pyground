import { PythonShell } from 'python-shell';

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST': {

            const result = {};
            try {
                if (checkOpenWithParameter(req.body.code)) {
                    throw new Error('Az open fuggvenyt csak parameter nelkul tudod hasznalni ebben a szerkesztoben!')
                }
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
                            if (answer.value === 'number') {
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
                result.state = result.completed === req.body.correctAnswer.length ? 'completed' : 'failed';

            }
            catch (error) {
                result.value = [error.toString()];
                result.value[0] = resultValidator(result.value);
            }
            res.status(200).json(result);
            break
        }
        default:
            res.status(405).send({ message: 'Only POST requests allowed' })
            break
    }
}

const checkOpenWithParameter = (code) => {
    const trimmedCode = code.replace(/\s/g, '');
    const start = trimmedCode.indexOf('open(');
    if (start >= 0) {
        const mark = trimmedCode[start + 5];
        const end = trimmedCode.indexOf(mark, start + 6);
        if (trimmedCode[end + 1] !== ')') {
            return true;
        }
    }
    return false;
}

const resultValidator = (value) => {
    if (value[0].includes('File ')) {
        const start = value[0].indexOf('File');
        const end = value[0].indexOf('.py",');
        return value[0].substring(0, start).trim() + value[0].substring(end + 5);
    }
    return value[0];
}