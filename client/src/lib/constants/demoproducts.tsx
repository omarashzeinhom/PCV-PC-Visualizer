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

// Demo components with initial positions, links, and specs, using placeholder images
export const demoComponents: Component[] = [
    {
        id: '1',
        type: 'case',
        x: 50,
        y: 50,
        width: 500, // Example width in pixels for the case
        height: 500, // Example height in pixels for the case
        imageSrc: 'https://via.placeholder.com/500x500?text=Case+Image',
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
        imageSrc: 'https://via.placeholder.com/400x300?text=Motherboard+Image',
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
        imageSrc: 'https://via.placeholder.com/60x60?text=CPU+Image',
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
        imageSrc: 'https://via.placeholder.com/20x70?text=RAM+Image',
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
        imageSrc: 'https://via.placeholder.com/400x250?text=GPU+Image',
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
        imageSrc: 'https://via.placeholder.com/70x70?text=CPU+Cooler+Image',
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
        imageSrc: 'https://via.placeholder.com/150x150?text=PSU+Image',
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
        imageSrc: 'https://via.placeholder.com/150x150?text=Case+Fan+Image',
        specs: '120mm LIAN LI UNI Fan',
        link: 'https://example.com/psu' // Add the actual link here
    },
];
