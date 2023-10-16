'use clinet'

import {
    EditorContent,
    type EditorEvents,
    type EditorOptions,
    useEditor,
} from '@tiptap/react'
import { Loader2 } from 'lucide-react'

import '@/public/styles/editor.css'
import { cn } from '@/lib/utils'

import { extensions } from './extensions'
import Toolbar from './toolbar'
type EditorPros = {
    options?: Partial<EditorOptions>
    onChange?: (editor: EditorEvents['update']['editor']) => void
}

const Editor: React.FC<EditorPros> = ({ options, onChange }) => {
    const editor = useEditor({
        extensions,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none mx-auto focus:outline-none',
            },
        },
        onUpdate: ({ editor: e }) => {
            onChange && onChange(e)
        },
        ...options,
    })

    if (!editor)
        return (
            <Loader2
                size={36}
                className='mx-auto animate-spin'
            />
        )

    return (
        <div className='flex w-full flex-col'>
            {editor.isEditable && <Toolbar editor={editor} />}
            <EditorContent
                editor={editor}
                className={cn(
                    'max-h-[350px] bg-background px-2 py-6',
                    editor.isEditable && 'rounded-b border',
                )}
            />
        </div>
    )
}

export default Editor
