import { PythonShell } from 'python-shell';

const openFunction = `import pathlib
import io
                
def open(source_file):
    if(source_file == "public/sources/quenya.txt"):
        file = pathlib.Path("public/sources/quenya_v2.txt")
        txt = file.read_text()
        return io.StringIO(txt)
    elif(source_file == "public/sources/terkep.txt"):
        file = pathlib.Path("public/sources/terkep_v2.txt")
        txt = file.read_text()
        return io.StringIO(txt)
    elif(source_file == "public/sources/fozetek.txt"):
        file = pathlib.Path("public/sources/fozetek_v2.txt")
        txt = file.read_text()
        return io.StringIO(txt)
    elif(source_file == "public/sources/orkok.txt"):
        file = pathlib.Path("public/sources/orkok_v2.txt")
        txt = file.read_text()
        return io.StringIO(txt)

`

export default async function handler(req, res) {

    switch (req.method) {
        case 'POST': {
            const result = {};
            try {
                result.value = await PythonShell.runString(req.body.code, null);
                const solution = await PythonShell.runString(req.body.solution, null);
                //result.state = (result.value.toString() === solution.toString()) ? 'completed' : 'failed';

                const code_v2 = await PythonShell.runString(openFunction + req.body.code, null);
                const solution_v2 = await PythonShell.runString(openFunction + req.body.solution, null);

                result.state = (result.value.toString() === solution.toString() && code_v2.toString() === solution_v2.toString()) ? 'completed' : 'failed';
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

const resultValidator = (value) => {
    if (value[0].includes('File ')) {
        const start = value[0].indexOf('File');
        const end = value[0].indexOf('.py",');
        return value[0].substring(0, start).trim() + value[0].substring(end + 5);
    }
    return value[0];
}