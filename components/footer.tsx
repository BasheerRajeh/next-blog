import { Facebook, Github, Linkedin } from 'lucide-react'
import { ReactNode } from 'react'

type Link = {
    href: string
    icon: ReactNode
}

const links: Link[] = [
    {
        href: 'https://github.com/BasheerRaeh',
        icon: <Github size={20} />,
    },
    {
        href: 'https://www.linkedin.com/in/muhammad-basheer-rajeh/',
        icon: <Linkedin size={20} />,
    },
    {
        href: 'https://www.facebook.com/MuhammadBasheerRajeh/',
        icon: <Facebook size={20} />,
    },
]

const Footer = () => {
    return (
        <footer className='mx-auto max-w-4xl px-6 py-4'>
            <div className='flex items-center justify-between'>
                <p className='mb-4 text-sm'>
                    © {new Date().getFullYear()} Rajeh
                </p>

                <div className='flex items-center gap-4'>
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
