import { useEffect } from 'react'

const SITE_NAME = 'Slagvast'

type PageMeta = {
    title: string
    description?: string
}

export function usePageMeta({ title, description }: PageMeta) {
    useEffect(() => {
        // Onthoud de oude waarden, zodat we ze bij het verlaten van de pagina terugzetten
        const previousTitle = document.title
        const metaTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
        const previousDescription = metaTag?.content

        document.title = `${title} | ${SITE_NAME}`
        if (description && metaTag) {
            metaTag.content = description
        }

        // Cleanup: draait bij unmount of als title/description veranderen
        return () => {
            document.title = previousTitle
            if (metaTag && previousDescription !== undefined) {
                metaTag.content = previousDescription
            }
        }
    }, [title, description])
}