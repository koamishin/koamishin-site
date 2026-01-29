import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }))
            .filter((elem) => elem.id); // Only include items with IDs

        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        elements.forEach((elem) => {
            const el = document.getElementById(elem.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground mb-4">On this page</h4>
            <div className="flex flex-col space-y-2">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "text-sm transition-colors decoration-0 block py-1",
                            heading.level === 3 && "pl-4",
                            activeId === heading.id
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({
                                behavior: "smooth",
                            });
                            setActiveId(heading.id);
                            // Update URL hash without scroll
                            history.pushState(null, "", `#${heading.id}`);
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </div>
        </div>
    );
}
