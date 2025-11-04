interface DateBlockProps {
    date: string;
}

export default function DateBlock({date}:DateBlockProps) {
    return (
        <div className="fflex p-6 items-center relative col-span-1 md:col-span-2">
            <div className="h-4 md:h-6 w-4 md:w-6 rounded-full border-accent bg-background-primary border-2 absolute left-[-8] md:left-[-12]"></div>
            <h3 className="text-3xl md:text-5xl font-bold text-dominant items-left flex gap-4 w-full text-left">{date}</h3>
        </div>
    );
}