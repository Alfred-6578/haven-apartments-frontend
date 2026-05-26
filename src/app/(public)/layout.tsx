import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"


export default function PublicLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="bg-none">
            <header className="fixed inset-x-0 top-0 z-50">
                <Navbar/>
            </header>
            <div className="">
                {children}
            </div>
            <Footer />
        </div>
    )
}