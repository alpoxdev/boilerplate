import React from 'react';
import Link from 'next/link';

export default function IndexPage({ pageProps }) {
    return (
        <div className="IndexPage">
            <Link href="/posts">PostList</Link>
        </div>
    );
}
