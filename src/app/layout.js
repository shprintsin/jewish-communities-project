import {Footer,Layout, Navbar,LastUpdated} from 'nextra-theme-docs'


import {Search,Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../app/globals.css'
import Link from "next/link";

export const metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}
const search = <Search emptyResult="לא נמצאו תוצאות" placeholder="חיפוש..." loading="טוען" errorText="שגיאה בטעינת החיפוש"/>
const lastUpdated = <LastUpdated date={new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
})}> עודכן לאחרונה</LastUpdated>
const navbar = (
    <Navbar
    className=''

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
            color={{
                hue: { dark: 204, light: 212 },
                saturation: 100,
                lightness: { dark: 55, light: 45 }
            }}
            backgroundColor={{
                dark: "rgb(17,17,17)",
                light: "rgb(250,250,250)"
            }}
            faviconGlyph="📚"
        >
            {/* <link rel="shortcut icon" href="/images/general/icon.svg"/> */}
            {/* Your additional tags should be passed as `children` of `<Head>` element */}
        </Head>
        <body>
         
        <Layout
        editLink={null}
        feedback={{ content: null }}
        lastUpdated={lastUpdated}
        toc={{ title: "תוכן העניינים" ,backToTop:'חזרה למקום ההתחלתי'}}
            navbar={navbar}
            search={search}
            
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