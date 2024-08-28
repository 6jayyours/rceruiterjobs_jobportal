import React, { useState } from 'react'
import LanguageSelector from '../../components/user/Code/LanguageSelector';
import { Editor } from '@monaco-editor/react';
import Output from '../../components/user/Code/Output';
import { CODE_SNIPPETS } from '../../constants/Language';

const Ide = () => {
    const [language, setLanguage] = useState("javascript");
    const [editorValue, setEditorValue] = useState(CODE_SNIPPETS["javascript"]);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSelectLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage.language);
        setEditorValue(CODE_SNIPPETS[selectedLanguage.language] || '');
    }

    const onEditorChange = (value) => {
        setEditorValue(value);
    }

    const runCode = async () => {
        const sourceCode = editorValue;
        if(!sourceCode) return;
        try {
            setIsLoading(true);
            const {run:result} = await executeCode(language,sourceCode)
            setOutput(result.output.split("\n"))
            result.stderr ? setError(true) : setError(false);
        } catch (error) {}
        finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='h-auto bg-white px-6 py-4  flex flex-row gap-2 mt-20'>
            <div className='w-1/2'>
                <LanguageSelector language={language} onSelect={onSelectLanguage} />
                <Editor
                    height="75vh"
                    theme='vs-dark'
                    language={language}
                    defaultValue={CODE_SNIPPETS[language]}
                    value={editorValue}
                    onChange={onEditorChange}
                />
            </div>
            <Output runCode={runCode} output={output} isLoading={isLoading} error={error}/>
        </div>
  )
}

export default Ide