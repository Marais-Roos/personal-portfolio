import { Project, Service } from "./types";

export const services: Service[] = [
    {
        slug: "web-design-development",
        title: "Web Design & Development",
        index: 1,
        shortDescription: "I build clean, functional websites that look good and actually work.",
        longDescription: "I build websites that don’t just look sharp — they actually work, feel smooth, and don’t make users want to scream. Clean design meets practical code, with a little personality sprinkled in.",
        iconInactive: "https://framerusercontent.com/images/mhXSFAobpgNBF1nnbiU6cWPs8.png",
        iconActive: "https://framerusercontent.com/images/9QehiRUen4eLvCTa0AgXRe23rcg.png",
        sectionLink: "",
    },
    {
        slug: "graphic-design",
        title: "Graphic Design",
        index: 2,
        shortDescription: "I create scroll-stopping visuals that don’t just look pretty — they say something.",
        longDescription: "I design visuals that pop — whether it’s for the screen or the printer — with a sharp eye for detail and a touch of “hey, that’s cool.” ",
        iconInactive: "https://framerusercontent.com/images/iutwntvTC9C6lb2pRqHPNDKcIU.png", 
        iconActive: "https://framerusercontent.com/images/uoI4wBaGQxLXnsu8hixLIeqAPl4.png",
        sectionLink: "",
    },
    {
        slug: "brand-design",
        title: "Brand Design",
        index: 3, 
        shortDescription: "I help turn your vibe into visuals people actually remember.",
        longDescription: "I help businesses find their look and voice — the kind of vibe that makes people remember you, not forget you by lunchtime.",
        iconInactive: "https://framerusercontent.com/images/UJVEjOZlLfaaeAGAJoOmO8j3RPA.svg",
        iconActive: "https://framerusercontent.com/images/8NdEDPefBMxbNiaK3viAW9q3A.svg",
        sectionLink: "",
    },
    {
        slug: "back-end-automization",
        title: "Back-end Automization",
        index: 4,
        shortDescription: "I make the boring stuff run in the background so you don't have to.",
        longDescription: "I set up smart systems to handle the boring, repetitive tasks nobody wants to do so you can spend your time on the fun stuff (or take a coffee break).",
        iconInactive: "https://framerusercontent.com/images/U2vyD5Soe4gxUoK2CSiIMzuFQt8.svg",
        iconActive: "https://framerusercontent.com/images/qRpcNRe0p1vGHbeYEyMd4enrijQ.svg",
        sectionLink: "",
    },
    {
        slug: "digital-marketing",
        title: "Digital Marketing",
        index: 5,
        shortDescription: "I get your brand in front of the right people without selling my soul (or yours).",
        longDescription: "I make sure your marketing materials don't sound like a robot wrote them. Clear, simple, and with just enough charm to catch attention without feeling like a sales pitch.",
        iconInactive: "https://framerusercontent.com/images/4b3nLfbrPtYQUUmnlbYyZZXxQlg.svg",
        iconActive: "https://framerusercontent.com/images/O317vZpI5KRo9qsIQb9V3Kh4FPM.svg",
        sectionLink: "",
    },
]

export const projects: Project[] = [
    {
        slug: "michael-scott-s-movie-idea",
        title: "Michael Scott's Movie Idea",
        description: "He had no arms, or legs. He couldn't hear or speak. This is how he led a nation... [cite: 32]",
        serviceSlugs: ["graphic-design"],
        date: "2025-05-23T00:00:00.000Z",
        mainImage: "https://framerusercontent.com/images/4lvO1600WcDnMqu4trq1xeVZqo.png",
        altText: "",
        galleryImages: [
        {
            url: "https://framerusercontent.com/images/project-msmi-detail-1.png",
            alt: "Close-up of the movie poster typography and tagline.",
        },
        {
            url: "https://framerusercontent.com/images/project-msmi-mockup.jpg",
            alt: "Mockup of the movie poster displayed on a billboard.",
        },
    ],
    },
    {
        slug: "somehow-i-manage-michael-scott",
        title: "Somehow I Manage - Michael Scott",
        description: "What if Michael Scott actually published the book he aimed to write, \"Somehow I Manage\"? [cite: 33]",
        serviceSlugs: ["graphic-design"], 
        date: "2025-05-22T00:00:00.000Z", 
        mainImage: "https://framerusercontent.com/images/awfzMcZ6HeaK7s2uMtTgLOKIy5Q.png",
        altText: "",
    },
];

export const portfolioData = {
    services,
    projects
}