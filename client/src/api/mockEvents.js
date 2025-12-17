export const mockEvents = [
    {
        _id: 'mock-1',
        title: "Neon Cyberpunk Gala",
        description: "An immersive night of synthwave, neon art, and retro-futuristic vibes. Dress code: High-Tech Low-Life.",
        date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        location: "Sector 7 Underground",
        capacity: 500,
        filledSpots: 420,
        imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80",
        organizer: { name: "AI Curator" },
        attendees: [],
        category: "Social"
    },
    {
        _id: 'mock-2',
        title: "AI Neural Workshop",
        description: "Hands-on deep learning session with top industry experts. Build your own agent in 2 hours.",
        date: new Date(Date.now() + 86400000 * 7).toISOString(),
        location: "Virtual Grid",
        capacity: 100,
        filledSpots: 95,
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        organizer: { name: "AI Curator" },
        attendees: [],
        category: "Tech"
    },
    {
        _id: 'mock-3',
        title: "Midnight Coding Jam",
        description: "Caffeine, code, and lofi beats. Collaboration event for night owls.",
        date: new Date(Date.now() + 86400000 * 10).toISOString(),
        location: "The Hub",
        capacity: 50,
        filledSpots: 12,
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        organizer: { name: "AI Curator" },
        attendees: [],
        category: "Workshop"
    }
];

export const communityEvents = [
    {
        _id: 'mock-4',
        title: "Sunset Yoga Flow",
        description: "Unwind with nature. A gentle flow session at the park during golden hour.",
        date: new Date(Date.now() + 86400000 * 12).toISOString(),
        location: "Central Park",
        capacity: 30,
        filledSpots: 25,
        imageUrl: "https://images.unsplash.com/photo-1544367563-1215555ff474?w=800&q=80",
        organizer: { name: "Yoga Collective" },
        attendees: [],
        category: "Wellness"
    },
    {
        _id: 'mock-5',
        title: "Indie Game Showcase",
        description: "Play upcoming indie titles and meet the developers in a casual setting.",
        date: new Date(Date.now() + 86400000 * 15).toISOString(),
        location: "Arcade Bar",
        capacity: 150,
        filledSpots: 45,
        imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
        organizer: { name: "Game Devs" },
        attendees: [],
        category: "Gaming"
    },
    {
        _id: 'mock-6',
        title: "Digital Art Gallery",
        description: "VR experience featuring local artists. Headsets provided.",
        date: new Date(Date.now() + 86400000 * 20).toISOString(),
        location: "Tech Hub",
        capacity: 60,
        filledSpots: 10,
        imageUrl: "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=800&q=80",
        organizer: { name: "Art Tech" },
        attendees: [],
        category: "Art"
    }
];
