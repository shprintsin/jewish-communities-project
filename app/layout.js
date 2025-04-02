import {Footer, Layout, Navbar} from 'nextra-theme-docs'

import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../app/globals.css'
import Link from "next/link";

export const metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navbar = (
    <Navbar
        logo={<h1 className="text-xl font-bold text-right font-heebo tracking-tight">פרויקט הקהילות</h1>}
        // ... Your additional navbar options
    />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Huji.</Footer>

export default async function RootLayout({children}) {
    return (
        <html
            // Not required, but good for SEO
            lang="he"
            // Required to be set
            dir="rtl"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
        <Head
            // ... Your additional head options
        >

            {/* <link rel="shortcut icon" href="/images/general/icon.svg"/> */}
            {/* Your additional tags should be passed as `children` of `<Head>` element */}
        </Head>
        <body>
        <Layout
            navbar={navbar}
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
            footer={footer}
            // ... Your additional layout options
        >
            {children}
        </Layout>
        </body>
        </html>
    )
}