export interface FloorPlan {
  name: string;
  image: string;
  size: string;
  beds: number;
  baths: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  status: ("featured" | "ongoing" | "upcoming" | "completed")[];
  category: "Residential" | "Commercial" | "Mixed Use";
  date: string; // ISO format date string for sorting

  // Extended Details
  overview?: string;
  features?: string[];
  amenities?: { name: string; icon: string }[];
  apartmentTypes?: string[];
  floorPlans?: FloorPlan[];
  gallery?: string[];
  videoTourUrl?: string;
  locationMapUrl?: string;
  constructionProgress?: {
    startDate: string;
    endDate: string;
    percentage: number;
  };
  brochureUrl?: string;
}

const defaultExtendedData = {
  overview:
    "Discover a lifestyle of unparalleled luxury and comfort. Our meticulously designed spaces offer a seamless blend of modern architecture and natural beauty, ensuring an extraordinary living experience for you and your family.",
  features: [
    "Earthquake Resistant Design",
    "24/7 Central Security System",
    "Smart Home Automation Ready",
    "High-Speed Elevators",
    "Rooftop Helipad",
    "Dedicated Substation & Generator",
  ],
  amenities: [
    { name: "Swimming Pool", icon: "Waves" },
    { name: "Gymnasium", icon: "Dumbbell" },
    { name: "Community Hall", icon: "Users" },
    { name: "Kids Play Area", icon: "Baby" },
    { name: "Green Landscape", icon: "TreePine" },
    { name: "Prayer Room", icon: "Book" },
  ],
  apartmentTypes: ["3 BHK", "4 BHK", "Penthouse"],
  floorPlans: [
    {
      name: "Type A - 3 BHK",
      image:
        "https://images.unsplash.com/photo-1594904578869-c011783103c7?q=80&w=800&auto=format&fit=crop",
      size: "2100 sft",
      beds: 3,
      baths: 3,
    },
    {
      name: "Type B - 4 BHK",
      image:
        "https://images.unsplash.com/photo-1594904578869-c011783103c7?q=80&w=800&auto=format&fit=crop",
      size: "2800 sft",
      beds: 4,
      baths: 4,
    },
    {
      name: "Penthouse",
      image:
        "https://images.unsplash.com/photo-1594904578869-c011783103c7?q=80&w=800&auto=format&fit=crop",
      size: "4500 sft",
      beds: 5,
      baths: 5,
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  ],
  videoTourUrl: "https://www.youtube.com/embed/l6EzZafb1Pk?rel=0",
  locationMapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700312046467!2d90.4158487!3d23.7856637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7000c0f993f%3A0x8e8334812df934f8!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
  constructionProgress: {
    startDate: "Jan 2024",
    endDate: "Dec 2026",
    percentage: 45,
  },
  brochureUrl: "#",
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "edison-portia",
    title: "EDISON PORTIA",
    location: "Bashundhara R/A",
    description:
      "Experience the pinnacle of luxury living in the heart of Bashundhara. Edison Portia offers unmatched elegance and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1568295123886-8d09a5986b4e?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["featured", "completed"],
    category: "Residential",
    date: "2024-05-10",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jan 2021",
      endDate: "May 2024",
      percentage: 100,
    },
  },
  {
    id: 2,
    slug: "edison-verona",
    title: "EDISON VERONA",
    location: "Uttara",
    description:
      "Edison Verona stands as a beacon of refined living, where the romance of design and the innovation of modern architecture come together.",
    image:
      "https://images.unsplash.com/photo-1516069429726-51d80d545cbf?q=80&w=901&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["featured", "completed"],
    category: "Residential",
    date: "2023-11-20",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Mar 2020",
      endDate: "Nov 2023",
      percentage: 100,
    },
  },
  {
    id: 3,
    slug: "edison-desdemona",
    title: "EDISON DESDEMONA",
    location: "Bashundhara R/A",
    description:
      "A sanctuary of peace and contemporary design, offering a unique blend of comfort and style in an exclusive neighborhood.",
    image:
      "https://images.unsplash.com/photo-1633591691478-b238b428223f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["featured", "ongoing"],
    category: "Residential",
    date: "2025-02-15",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jun 2023",
      endDate: "Feb 2025",
      percentage: 70,
    },
  },
  {
    id: 4,
    slug: "edison-marigold",
    title: "EDISON MARIGOLD",
    location: "Gulshan",
    description:
      "Edison Marigold redefines premium living with state-of-the-art facilities and breathtaking views of the city skyline.",
    image:
      "https://images.unsplash.com/photo-1709913492535-56fb1ac85092?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["featured", "ongoing"],
    category: "Commercial",
    date: "2025-08-01",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jan 2024",
      endDate: "Aug 2025",
      percentage: 40,
    },
  },
  {
    id: 5,
    slug: "edison-viviana",
    title: "EDISON VIVIANA",
    location: "Banani",
    description:
      "A testament to architectural brilliance, Edison Viviana offers an elite living experience tailored for the modern family.",
    image:
      "https://images.unsplash.com/photo-1595040398700-85ddd233d6f6?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["ongoing"],
    category: "Residential",
    date: "2024-12-05",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "May 2022",
      endDate: "Dec 2024",
      percentage: 85,
    },
  },
  {
    id: 6,
    slug: "edison-oak",
    title: "EDISON OAK",
    location: "Dhanmondi",
    description:
      "Nestled in the lush greenery of Dhanmondi, Edison Oak provides a perfect escape from the hustle and bustle of the city.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    status: ["ongoing"],
    category: "Mixed Use",
    date: "2026-01-20",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jan 2024",
      endDate: "Jan 2026",
      percentage: 25,
    },
  },
  {
    id: 7,
    slug: "edison-pine",
    title: "EDISON PINE",
    location: "Mirpur",
    description:
      "An affordable yet luxurious living space, Edison Pine is designed to cater to all your modern lifestyle needs with convenience.",
    image:
      "https://images.unsplash.com/photo-1621645541495-9bbe8b167a43?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["ongoing"],
    category: "Residential",
    date: "2025-11-11",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Sep 2023",
      endDate: "Nov 2025",
      percentage: 50,
    },
  },
  {
    id: 8,
    slug: "edison-maple",
    title: "EDISON MAPLE",
    location: "Baridhara",
    description:
      "Exclusivity meets tranquility. Edison Maple is the ultimate address for those who appreciate the finer things in life.",
    image:
      "https://images.unsplash.com/photo-1692210212021-c7e887fc7076?q=80&w=348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["upcoming"],
    category: "Residential",
    date: "2027-04-10",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jan 2025",
      endDate: "Apr 2027",
      percentage: 0,
    },
  },
  {
    id: 9,
    slug: "edison-willow",
    title: "EDISON WILLOW",
    location: "Mohakhali",
    description:
      "Strategically located to keep you connected, Edison Willow is the epitome of smart and accessible urban living.",
    image:
      "https://images.unsplash.com/photo-1615651885088-3ff35a7e0b5a?q=80&w=420&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["upcoming"],
    category: "Commercial",
    date: "2027-09-01",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Mar 2025",
      endDate: "Sep 2027",
      percentage: 0,
    },
  },
  {
    id: 10,
    slug: "edison-cedar",
    title: "EDISON CEDAR",
    location: "Badda",
    description:
      "Discover a new standard of community living. Edison Cedar brings people together with thoughtfully designed shared spaces.",
    image:
      "https://images.unsplash.com/photo-1667238324671-c2fe726f6084?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: ["upcoming"],
    category: "Mixed Use",
    date: "2028-01-15",
    ...defaultExtendedData,
    constructionProgress: {
      startDate: "Jun 2025",
      endDate: "Jan 2028",
      percentage: 0,
    },
  },
];
