export default function Chat({ params }: {
    params: {
        slug: string
    }
}) {
    return <div>
        {params.slug}
        Chat page
    </div>
}