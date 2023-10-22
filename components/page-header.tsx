type PageHeaderProps = {
    title: string
    description?: string
} & React.ComponentPropsWithoutRef<'div'>

const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    ...rest
}) => {
    return (
        <div {...rest}>
            <h1 className='text-2xl font-semibold'>{title}</h1>
            {description && (
                <p className='text-muted-foreground'>{description}</p>
            )}
        </div>
    )
}

export default PageHeader
