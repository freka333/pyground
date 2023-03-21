import { PythonShell } from 'python-shell';

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET': {
            const pyCode = await PythonShell.runString("x=1+1;print(x)", null);
            //const pyCode = await PythonShell.run("pythonApp.py", null)
            //const pyCode = await PythonShell.runString(req.body, null);
            res.status(200).json(pyCode);
            break
        }
        case 'POST': {
            let pyCode;
            try {
                pyCode = await PythonShell.runString(req.body.code, null);
            }
            catch (error) {
                pyCode = [error.toString()];
            }
            res.status(200).json(pyCode);
            break
        }
        default:
            res.status(405).send({ message: 'Only GET requests allowed' })
            break
    }
}