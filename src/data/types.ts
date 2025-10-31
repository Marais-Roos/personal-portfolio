export interface Service {
    slug: string;
    title: string;
    index: number;
    shortDescription: string;
    longDescription: string;
    iconInactive?: string;
    iconActive?: string;
    sectionLink?: string;
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    categorySlug: string;
    date: string;
    mainImage: string;
    altText?: string;
    galleryImages?: {
        url: string;
        alt: string;
    }[];
}