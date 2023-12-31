import { Editor } from '@tiptap/react'
import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    LayoutList,
    Link,
    List,
    ListOrdered,
    Minus,
    Pilcrow,
    RemoveFormatting,
    RotateCcw,
    RotateCw,
    Strikethrough,
    TerminalSquare,
    TextQuote,
} from 'lucide-react'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

type ToolbarProps = {
    editor: Editor
}

const Divider = () => <div className='mx-3 h-5 w-[2px] bg-muted' />

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl as string)

        if (url === null) return

        if (url === '')
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
    }, [editor])

    return (
        <div
            className={cn(
                'sticky top-[60px] z-10 flex flex-wrap items-center rounded-t border bg-background p-1',
                '[&>button:hover]:bg-muted [&>button]:mr-1 [&>button]:h-7 [&>button]:w-7 [&>button]:rounded [&>button]:p-1',
                '[&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-50',
            )}
        >
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn(editor.isActive('bold') ? 'bg-muted' : '')}
                aria-label='Bold'
            >
                <Bold size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={cn(editor.isActive('italic') ? 'bg-muted' : '')}
                aria-label='Italic'
            >
                <Italic size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn(editor.isActive('strike') ? 'bg-muted' : '')}
                aria-label='Strikethrough'
            >
                <Strikethrough size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={cn(editor.isActive('code') ? 'bg-muted' : '')}
                aria-label='Code'
            >
                <Code size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                disabled={!editor.can().chain().focus().toggleHighlight().run()}
                className={cn(editor.isActive('highlight') ? 'bg-muted' : '')}
                aria-label='Highlight'
            >
                <Highlighter size={20} />
            </button>
            <Divider />
            <button
                type='button'
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                    editor.isActive('heading', { level: 1 }) ? 'bg-muted' : '',
                )}
                aria-label='Heading 1'
            >
                <Heading1 size={20} />
            </button>
            <button
                type='button'
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                    editor.isActive('heading', { level: 2 }) ? 'bg-muted' : '',
                )}
                aria-label='Heading 2'
            >
                <Heading2 size={20} />
            </button>
            <button
                type='button'
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                    editor.isActive('heading', { level: 3 }) ? 'bg-muted' : '',
                )}
                aria-label='Heading 3'
            >
                <Heading3 size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={cn(editor.isActive('paragraph') ? 'bg-muted' : '')}
                aria-label='Paragraph'
            >
                <Pilcrow size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive('bulletList') ? 'bg-muted' : '')}
                aria-label='Bullet List'
            >
                <List size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive('orderedList') ? 'bg-muted' : '')}
                aria-label='Ordered List'
            >
                <ListOrdered size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={cn(editor.isActive('taskList') ? 'bg-muted' : '')}
                aria-label='Task List'
            >
                <LayoutList size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={cn(editor.isActive('codeBlock') ? 'bg-muted' : '')}
                aria-label='Code Block'
            >
                <TerminalSquare size={20} />
            </button>
            <Divider />
            <button
                type='button'
                onClick={() => setLink()}
                className={cn(editor.isActive('link') && 'bg-muted')}
                aria-label='Link'
            >
                <Link size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(editor.isActive('blockquote') ? 'bg-muted' : '')}
                aria-label='Blockquote'
            >
                <TextQuote size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                aria-label='Horizontal Rule'
            >
                <Minus size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                aria-label='Clear Formatting'
            >
                <RemoveFormatting size={20} />
            </button>
            <Divider />
            <button
                type='button'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                aria-label='Undo'
            >
                <RotateCcw size={20} />
            </button>
            <button
                type='button'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                aria-label='Redo'
            >
                <RotateCw size={20} />
            </button>
        </div>
    )
}

export default Toolbar
