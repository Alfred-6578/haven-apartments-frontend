import Link from 'next/link'

export default function NotFound() {
    return (
        <main className='min-h-screen bg-cream-50 flex items-center justify-center px-5 py-16'>
            <div className='max-w-md mx-auto text-center'>
                <span
                    className='inline-block w-10 h-0.5 bg-emerald-700 mb-8'
                    aria-hidden
                />

                <p
                    className='font-heading font-semibold text-ink-900 leading-none'
                    style={{ fontSize: 'clamp(72px, 12vw, 120px)' }}
                >
                    404
                </p>

                <h1 className='font-heading text-[28px] text-ink-900 leading-tight mt-4'>
                    This page is checked out.
                </h1>

                <p className='text-ink-700 max-w-sm mx-auto mt-3'>
                    The page you&apos;re looking for doesn&apos;t exist, or has moved. Let&apos;s get
                    you back to a stay.
                </p>

                <div className='flex flex-wrap items-center justify-center gap-3 mt-8'>
                    <Link
                        href='/stays'
                        className='inline-flex items-center bg-emerald-700 hover:bg-emerald-900 text-cream-50 font-medium px-6 py-3 rounded-full transition-colors'
                    >
                        Browse all stays
                    </Link>
                    <Link
                        href='/'
                        className='inline-flex items-center border border-ink-300 text-ink-900 hover:bg-cream-100 font-medium px-6 py-3 rounded-full transition-colors'
                    >
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    )
}
