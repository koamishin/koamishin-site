import React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, Info, AlertTriangle, Lightbulb, AlertCircle } from "lucide-react";

// Custom heading component with anchor links
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const HeadingComponent = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
        const id = typeof children === "string"
            ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
            : undefined;

        const Tag = `h${level}` as React.ElementType;

        const styles = {
            1: "scroll-m-20 text-4xl font-bold tracking-tight font-serif text-foreground lg:text-5xl mb-6 mt-2",
            2: "scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight font-serif text-foreground mt-10 mb-4",
            3: "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mt-8 mb-3",
            4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground mt-6 mb-2",
            5: "scroll-m-20 text-lg font-semibold tracking-tight text-foreground mt-4 mb-2",
            6: "scroll-m-20 text-base font-semibold tracking-tight text-foreground mt-4 mb-2",
        };

        return (
            <Tag id={id} className={styles[level]} {...props}>
                {children}
                {id && (
                    <a
                        href={`#${id}`}
                        className="ml-2 opacity-0 hover:opacity-100 text-muted-foreground transition-opacity"
                        aria-label={`Link to ${children}`}
                    >
                        #
                    </a>
                )}
            </Tag>
        );
    };

    HeadingComponent.displayName = `Heading${level}`;
    return HeadingComponent;
}

import { motion } from "framer-motion";

// ... existing imports ...

// Code block with copy button
function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = React.useState(false);
    const preRef = React.useRef<HTMLPreElement>(null);

    const copyToClipboard = async () => {
        const code = preRef.current?.textContent || "";

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    return (
        <motion.div
            className="relative group my-6"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
        >
            <pre
                ref={preRef}
                className={cn(
                    "overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm",
                    "dark:bg-card/50",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
            <button
                onClick={copyToClipboard}
                className="absolute right-3 top-3 p-2 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="h-4 w-4 text-primary" />
                ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                )}
            </button>
        </motion.div>
    );
}

// Inline code
function InlineCode({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <code
            className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm text-primary"
            {...props}
        >
            {children}
        </code>
    );
}

// Callout component for tips, warnings, notes
interface CalloutProps {
    type?: "note" | "tip" | "warning" | "caution";
    title?: string;
    children: React.ReactNode;
}

export function Callout({ type = "note", title, children }: CalloutProps) {
    const styles = {
        note: {
            container: "border-primary/30 bg-primary/5",
            icon: <Info className="h-5 w-5 text-primary" />,
            title: title || "Note",
        },
        tip: {
            container: "border-green-500/30 bg-green-500/5",
            icon: <Lightbulb className="h-5 w-5 text-green-500" />,
            title: title || "Tip",
        },
        warning: {
            container: "border-yellow-500/30 bg-yellow-500/5",
            icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
            title: title || "Warning",
        },
        caution: {
            container: "border-destructive/30 bg-destructive/5",
            icon: <AlertCircle className="h-5 w-5 text-destructive" />,
            title: title || "Caution",
        },
    };

    const style = styles[type];

    return (
        <motion.div
            className={cn("my-6 rounded-lg border p-4", style.container)}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center gap-2 mb-2">
                {style.icon}
                <span className="font-semibold text-foreground">{style.title}</span>
            </div>
            <div className="text-foreground/80 [&>p]:mt-0">{children}</div>
        </motion.div>
    );
}

// Table components
function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
    return (
        <motion.div
            className="my-6 w-full overflow-x-auto rounded-lg border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <table className="w-full text-sm" {...props}>
                {children}
            </table>
        </motion.div>
    );
}

function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <thead className="bg-muted/50 border-b border-border" {...props}>
            {children}
        </thead>
    );
}

function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr className="border-b border-border last:border-0" {...props}>
            {children}
        </tr>
    );
}

function TableCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
    return (
        <td className="px-4 py-3 text-foreground/80" {...props}>
            {children}
        </td>
    );
}

function TableHeaderCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
    return (
        <th className="px-4 py-3 text-left font-semibold text-foreground" {...props}>
            {children}
        </th>
    );
}

// Paragraph
function Paragraph({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className="leading-7 text-foreground/80 [&:not(:first-child)]:mt-4" {...props}>
            {children}
        </p>
    );
}

// Links
function Anchor({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    const isExternal = href?.startsWith("http");
    return (
        <a
            href={href}
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            {...props}
        >
            {children}
        </a>
    );
}

// Lists
function UnorderedList({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className="my-4 ml-6 list-disc text-foreground/80 [&>li]:mt-2" {...props}>
            {children}
        </ul>
    );
}

function OrderedList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
    return (
        <ol className="my-4 ml-6 list-decimal text-foreground/80 [&>li]:mt-2" {...props}>
            {children}
        </ol>
    );
}

// Blockquote
function Blockquote({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote
            className="my-6 border-l-4 border-primary/30 pl-6 italic text-muted-foreground"
            {...props}
        >
            {children}
        </blockquote>
    );
}

// Horizontal rule
function HorizontalRule(props: React.HTMLAttributes<HTMLHRElement>) {
    return <hr className="my-8 border-border" {...props} />;
}

// Image
function Image({ alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <figure className="my-6">
            <img
                alt={alt}
                loading="lazy"
                decoding="async"
                className={cn(
                    "w-full max-w-2xl mx-auto rounded-lg border border-border",
                    className
                )}
                {...props}
            />
            {alt && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

// Export MDX components
export const mdxComponents = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: Paragraph,
    a: Anchor,
    pre: CodeBlock,
    code: InlineCode,
    ul: UnorderedList,
    ol: OrderedList,
    blockquote: Blockquote,
    hr: HorizontalRule,
    img: Image,
    table: Table,
    thead: TableHead,
    tr: TableRow,
    td: TableCell,
    th: TableHeaderCell,
    // Custom components
    Callout,
};
