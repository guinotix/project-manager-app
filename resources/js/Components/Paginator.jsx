import { Link } from '@inertiajs/react'

export default function Paginator({ links }) {
    return (
        <nav className="text-center mt-4">
            {
                links.map((link) => (
                    <Link href={link.url || ""} key={link.label} preserveScroll
                        className={
                            "inline-block px-3 py-2 rounded-lg text-gray-500 dark:text-gray-200 text-xs " +
                            (link.active ? "text-slate-50 bg-gray-500 dark:bg-gray-900 " : "") +
                            (!link.url ? "!text-gray-500 cursor-not-allowed " : "hover:text-slate-50 hover:bg-gray-900")
                        } dangerouslySetInnerHTML={{__html: link.label}}></Link>
                ))
            }
        </nav>
    );
}