export interface Component {
    id: string;
    type: string;
    x: number;
    y: number;
    width: number; // Added width for resizing
    height: number; // Added height for resizing
    imageSrc?: string;
    link?: string; // Optional link for product
    specs?: string; // Optional specs for product
}

// Demo components with initial positions, links, and specs

export const demoComponents: Component[] = [
    {
        id: '1',
        type: 'case',
        x: 50,
        y: 50,
        width: 500, // Example width in pixels for the case
        height: 500, // Example height in pixels for the case
        imageSrc: 'https://dlcdnwebimgs.asus.com/gain/6E502B0B-FDBD-4147-A431-A98ACE2A32EE/w1000/h732',
        specs: 'Mid Tower Case, ATX Compatible',
        link: 'https://example.com/case' // Add the actual link here
    },
    {
        id: '2',
        type: 'motherboard',
        x: 60,
        y: 130,
        width: 400, // Width in pixels for the motherboard
        height: 300, // Height in pixels for the motherboard
        imageSrc: 'https://dlcdnwebimgs.asus.com/gain/18EA4132-C4D3-4317-8C5C-49E2E717E19D/w1000/h732',
        specs: 'ASUS X870 Motherboard, ATX',
        link: 'https://example.com/motherboard' // Add the actual link here
    },
    {
        id: '3',
        type: 'cpu',
        x: 170,
        y: 70,
        width: 60, // Width in pixels for the CPU
        height: 60, // Height in pixels for the CPU
        imageSrc: 'https://res.cloudinary.com/dmbzzkneb/image/upload/v1730738410/PCV-Demo-Products/CPU-7900X-removebg-preview_dyojog.png',
        specs: 'AMD Ryzen 9 7900X, 12 Cores, 24 Threads',
        link: 'https://example.com/cpu' // Add the actual link here

    },
    {
        id: '4',
        type: 'ram',
        x: 260,
        y: 100,
        width: 20, // Width in pixels for the RAM
        height: 70, // Height in pixels for the RAM
        imageSrc: 'https://res.cloudinary.com/dmbzzkneb/image/upload/f_auto,q_auto/v1/PCV-Demo-Products/detailed_zjnkz5',
        specs: '16GB DDR5 RAM',
        link: 'https://example.com/ram' // Add the actual link here
    },
    {
        id: '5',
        type: 'gpu',
        x: 170,
        y: 200,
        width: 400, // Width in pixels for the GPU
        height: 250, // Height in pixels for the GPU
        imageSrc: 'https://dlcdnwebimgs.asus.com/gain/c276d87e-1bf3-4428-8c3c-68f29325debe/w800/fwebp',
        specs: 'Asus X Noctua NVIDIA GeForce RTX 4080, 16GB GDDR6X',
        link: 'https://example.com/gpu' // Add the actual link here
    },
    {
        id: '6',
        type: 'cpuCooler',
        x: 200,
        y: 50,
        width: 70, // Width in pixels for the CPU cooler
        height: 70, // Height in pixels for the CPU cooler
        imageSrc: 'https://a.storyblok.com/f/281110/1500x1500/b7e4b15986/hyper-622-halo-white-01-gallery-03.png/m/960x0/smart',
        specs: 'Hyper 622 Halo White',
        link: 'https://www.coolermaster.com/en-global/products/hyper-622-halo-white/' // Add the actual link here
    },
    {
        id: '7',
        type: 'psu',
        x: 80,
        y: 250,
        width: 150, // Width in pixels for the PSU
        height: 150, // Height in pixels for the PSU
        imageSrc: 'https://dlcdnwebimgs.asus.com/gain/D97D3CD2-5BAE-4B84-A7AD-C5DDD23AF015/w1000/h732',
        specs: '1000W Aura ROG Strix White PSU',
        link: 'https://example.com/psu' // Add the actual link here
    },
    {
        id: '8',
        type: 'casefans',
        x: 80,
        y: 250,
        width: 150, // Width in pixels for the PSU
        height: 150, // Height in pixels for the PSU
        imageSrc: 'https://res.cloudinary.com/dmbzzkneb/image/upload/v1730738950/PCV-Demo-Products/UNI-FAN-white-rgbx1-front-removebg-preview_rz4sup.png',
        specs: '120mm LIAN LI UNI Fan',
        link: 'https://example.com/psu' // Add the actual link here
    },
];
