import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ReactMarkdown from "react-markdown";
import { getTaggedMarkdownData, getPageLevelInfo, getProductPaths } from '../../lib/getMarkdownData';
import { Tags } from '../../interfaces/tags'
import { MarkdownAsset, MarkdownMeta } from '../../interfaces/markdownAsset';
import { useRouter } from 'next/dist/client/router';
import { UrlParams } from '../../interfaces/UrlParams';
import Link from 'next/link'
import StackExchangeFeed from '../../components/stackExchangeFeed';
import YouTubeFeed from '../../components/youtubeFeed';
import TwitterFeed from '../../components/twitterFeed';

export async function getStaticPaths() {
    const productPaths = await getProductPaths();
    return {
        paths: productPaths,
        fallback: false
    };
}

export async function getStaticProps(context: any) {
    const slug: UrlParams = context.params;

    let tags: Tags = {
        solution: slug.solution,
        products: [slug.product]
    }

    const pageInfo = await getPageLevelInfo(tags)
    const files = await getTaggedMarkdownData(tags);

    return {
        props: {
            slug,
            files,
            pageInfo
        },
    };
}

export default function productPage({ slug, files, pageInfo }: { slug: any, files: MarkdownAsset[], pageInfo: MarkdownMeta }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{pageInfo.prettyName}</title>
                <meta name="description" content={pageInfo.description} />
                <link rel="icon" href="https://sitecorecdn.azureedge.net/-/media/sitecoresite/images/global/logo/favicon.png" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {pageInfo.prettyName}
                </h1>
                <h3>
                    {pageInfo.description}
                </h3>
                <Link href={`../${slug.solution}`}>
                    <a>back up to {slug.solution}...</a>
                </Link>
                <div className={styles.grid}>
                    {files.map(file => (
                        <div key={file.id} id={file.id} className={styles.socialsCard}>
                            <ReactMarkdown>{file.markdown}</ReactMarkdown>
                        </div>
                    ))}
                    
                    <StackExchangeFeed pageInfo={pageInfo} />
                    <YouTubeFeed pageInfo={pageInfo} />
                    <TwitterFeed pageInfo={pageInfo} />
                </div>
                
            </main>
        </div>)
}

