import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { Youtube } from '@tiptap/extension-youtube'
import type { AnyExtension } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'

export const extensions: AnyExtension[] = [
    StarterKit.configure({
        codeBlock: {
            HTMLAttributes: {
                class: 'p-3',
            },
        },
    }),
    Highlight,
    TaskList,
    TaskItem.configure({
        nested: true,
    }),
    Placeholder.configure({
        placeholder: 'Type something...',
    }),
    Markdown,
    Image,
    Link.configure({
        openOnClick: false,
    }).extend({
        inclusive: false,
        priority: 100,
    }),
    Youtube.configure({
        width: 480,
        height: 320,
        nocookie: true,
        allowFullscreen: false,
        ccLanguage: 'en',
        modestBranding: true,
    }),
]
