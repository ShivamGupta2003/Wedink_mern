const marriageCards = [
  {
    shop: "69d2b1d6e4bb697045f26427",
    cardName: "Wedding Anniversary Card",
    description:
      "Elegant anniversary card with silver foil detailing and romantic design",
    image: {
      url: "https://img.freepik.com/free-vector/red-ornamental-invitation-card_98292-4371.jpg?t=st=1739351524~exp=1739355124~hmac=a9747ed3c3bd39f501bd6e755ad67edf0646788485eab90c60e33264c86ea3b9&w=740",
      filename: "anniversary-card-001.jpg",
    },
    price: 899.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26427",
    cardName: "Birthday Celebration Card",
    description:
      "Vibrant birthday card with colorful patterns and festive design",
    image: {
      url: "https://img.freepik.com/free-vector/realistic-wedding-invitation-template-chinese-style_52683-32046.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 599.5,
    theme: "Modern",
    material: "Paper",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26427",
    cardName: "Engagement Announcement Card",
    description:
      "Sophisticated engagement announcement with floral embellishments",
    image: {
      url: "https://img.freepik.com/premium-photo/elegant-mughal-garden-wedding-card-design-with-intricate-jali-patterns-lotus-motifs-royal-color-palette_1305425-13848.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 799.99,
    theme: "Royal",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26428",
    cardName: "Baby Shower Card",
    description: "Adorable baby shower invitation with gentle pastel colors",
    image: {
      url: "https://img.freepik.com/premium-vector/beautiful-wedding-invitation-with-decorative-mandala_1302-1877.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 699.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26428",
    cardName: "Graduation Ceremony Card",
    description:
      "Professional graduation announcement card with academic motifs",
    image: {
      url: "https://img.freepik.com/premium-photo/elegantgreenweddinginvitationcards_1279821-40112.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 549.99,
    theme: "Modern",
    material: "Paper",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26429",
    cardName: "House Warming Card",
    description:
      "Warm and welcoming house warming invitation with modern design",
    image: {
      url: "https://img.freepik.com/premium-photo/floral-wedding-card-with-copy-space-center_1278346-34289.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 499.99,
    theme: "Modern",
    material: "Digital",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26429",
    cardName: "Retirement Party Card",
    description: "Elegant retirement celebration card with golden accents",
    image: {
      url: "https://img.freepik.com/free-vector/red-gold-decorative-background_1048-2047.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 649.99,
    theme: "Traditional",
    material: "Paper",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26429",
    cardName: "New Year Party Card",
    description: "Festive new year celebration card with sparkle effects",
    image: {
      url: "https://img.freepik.com/premium-vector/vector-modern-thank-you-card-minimalist-background_1115050-165.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 449.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642a",
    cardName: "Business Launch Card",
    description:
      "Professional business opening announcement with corporate design",
    image: {
      url: "https://img.freepik.com/premium-vector/thank-you-card-label-design_1114681-400.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 849.99,
    theme: "Modern",
    material: "Paper",
    size: "(9*17)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642a",
    cardName: "Festival Celebration Card",
    description: "Traditional festival greeting card with cultural motifs",
    image: {
      url: "https://img.freepik.com/free-vector/hand-drawn-raksha-bandhan-greeting-card_23-2148577530.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
      filename: "festival-card-010.jpg",
    },
    price: 599.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(8*16)cm",
    createdAt: "2025-02-12T11:20:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642a",
    cardName: "Wedding Anniversary Card",
    description:
      "Elegant anniversary card with silver foil detailing and romantic design",
    image: {
      url: "https://img.freepik.com/free-vector/red-ornamental-invitation-card_98292-4371.jpg?t=st=1739351524~exp=1739355124~hmac=a9747ed3c3bd39f501bd6e755ad67edf0646788485eab90c60e33264c86ea3b9&w=740",
      filename: "anniversary-card-001.jpg",
    },
    price: 899.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642b",
    cardName: "Birthday Celebration Card",
    description:
      "Vibrant birthday card with colorful patterns and festive design",
    image: {
      url: "https://img.freepik.com/free-vector/realistic-wedding-invitation-template-chinese-style_52683-32046.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 599.5,
    theme: "Modern",
    material: "Paper",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642b",
    cardName: "Engagement Announcement Card",
    description:
      "Sophisticated engagement announcement with floral embellishments",
    image: {
      url: "https://img.freepik.com/premium-photo/elegant-mughal-garden-wedding-card-design-with-intricate-jali-patterns-lotus-motifs-royal-color-palette_1305425-13848.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 799.99,
    theme: "Royal",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642b",
    cardName: "Baby Shower Card",
    description: "Adorable baby shower invitation with gentle pastel colors",
    image: {
      url: "https://img.freepik.com/premium-vector/beautiful-wedding-invitation-with-decorative-mandala_1302-1877.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 699.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  }, {
    shop: "69d2b1d6e4bb697045f26427",
    cardName: "Wedding Anniversary Card",
    description:
      "Elegant anniversary card with silver foil detailing and romantic design",
    image: {
      url: "https://img.freepik.com/free-vector/red-ornamental-invitation-card_98292-4371.jpg?t=st=1739351524~exp=1739355124~hmac=a9747ed3c3bd39f501bd6e755ad67edf0646788485eab90c60e33264c86ea3b9&w=740",
      filename: "anniversary-card-001.jpg",
    },
    price: 899.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642c",
    cardName: "Birthday Celebration Card",
    description:
      "Vibrant birthday card with colorful patterns and festive design",
    image: {
      url: "https://img.freepik.com/free-vector/realistic-wedding-invitation-template-chinese-style_52683-32046.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 599.5,
    theme: "Modern",
    material: "Paper",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642c",
    cardName: "Engagement Announcement Card",
    description:
      "Sophisticated engagement announcement with floral embellishments",
    image: {
      url: "https://img.freepik.com/premium-photo/elegant-mughal-garden-wedding-card-design-with-intricate-jali-patterns-lotus-motifs-royal-color-palette_1305425-13848.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 799.99,
    theme: "Royal",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642d",
    cardName: "Baby Shower Card",
    description: "Adorable baby shower invitation with gentle pastel colors",
    image: {
      url: "https://img.freepik.com/premium-vector/beautiful-wedding-invitation-with-decorative-mandala_1302-1877.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 699.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642d",
    cardName: "Graduation Ceremony Card",
    description:
      "Professional graduation announcement card with academic motifs",
    image: {
      url: "https://img.freepik.com/premium-photo/elegantgreenweddinginvitationcards_1279821-40112.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 549.99,
    theme: "Modern",
    material: "Paper",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642e",
    cardName: "House Warming Card",
    description:
      "Warm and welcoming house warming invitation with modern design",
    image: {
      url: "https://img.freepik.com/premium-photo/floral-wedding-card-with-copy-space-center_1278346-34289.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 499.99,
    theme: "Modern",
    material: "Digital",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642e",
    cardName: "Retirement Party Card",
    description: "Elegant retirement celebration card with golden accents",
    image: {
      url: "https://img.freepik.com/free-vector/red-gold-decorative-background_1048-2047.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 649.99,
    theme: "Traditional",
    material: "Paper",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642e",
    cardName: "New Year Party Card",
    description: "Festive new year celebration card with sparkle effects",
    image: {
      url: "https://img.freepik.com/premium-vector/vector-modern-thank-you-card-minimalist-background_1115050-165.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 449.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642f",
    cardName: "Business Launch Card",
    description:
      "Professional business opening announcement with corporate design",
    image: {
      url: "https://img.freepik.com/premium-vector/thank-you-card-label-design_1114681-400.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 849.99,
    theme: "Modern",
    material: "Paper",
    size: "(9*17)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642f",
    cardName: "Festival Celebration Card",
    description: "Traditional festival greeting card with cultural motifs",
    image: {
      url: "https://img.freepik.com/free-vector/hand-drawn-raksha-bandhan-greeting-card_23-2148577530.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
      filename: "festival-card-010.jpg",
    },
    price: 599.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(8*16)cm",
    createdAt: "2025-02-12T11:20:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f2642f",
    cardName: "Wedding Anniversary Card",
    description:
      "Elegant anniversary card with silver foil detailing and romantic design",
    image: {
      url: "https://img.freepik.com/free-vector/red-ornamental-invitation-card_98292-4371.jpg?t=st=1739351524~exp=1739355124~hmac=a9747ed3c3bd39f501bd6e755ad67edf0646788485eab90c60e33264c86ea3b9&w=740",
      filename: "anniversary-card-001.jpg",
    },
    price: 899.99,
    theme: "Traditional",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26430",
    cardName: "Birthday Celebration Card",
    description:
      "Vibrant birthday card with colorful patterns and festive design",
    image: {
      url: "https://img.freepik.com/free-vector/realistic-wedding-invitation-template-chinese-style_52683-32046.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 599.5,
    theme: "Modern",
    material: "Paper",
    size: "(8*16)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26430",
    cardName: "Engagement Announcement Card",
    description:
      "Sophisticated engagement announcement with floral embellishments",
    image: {
      url: "https://img.freepik.com/premium-photo/elegant-mughal-garden-wedding-card-design-with-intricate-jali-patterns-lotus-motifs-royal-color-palette_1305425-13848.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 799.99,
    theme: "Royal",
    material: "Handmade",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
  {
    shop: "69d2b1d6e4bb697045f26430",
    cardName: "Baby Shower Card",
    description: "Adorable baby shower invitation with gentle pastel colors",
    image: {
      url: "https://img.freepik.com/premium-vector/beautiful-wedding-invitation-with-decorative-mandala_1302-1877.jpg?ga=GA1.1.1812009594.1730035210&semt=ais_hybrid",
    },
    price: 699.99,
    theme: "Modern",
    material: "Digital",
    size: "(7*15)cm",
    createdAt: "2025-02-15T10:30:00.000Z",
  },
];

module.exports = { data: marriageCards };
