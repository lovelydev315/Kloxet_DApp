const quizData = [
  {
    question: "Which Of These is Your <span>Body Shape?</span>",
    multiSelect: false,
    index: 0,
    options: [
      {
        image: "https://kloxet.com/assets/img/women-rectangle-body-type.jpg",
        value: "Rectangle",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/women-fitness-body-type.jpg",
        value: "Fitness",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/women-triangle-body-type.jpg",
        value: "Triangle",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/women-hourglass-body-type.jpg",
        value: "Hourglass",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/women-round-body-type.jpg",
        value: "Round",
        option_id: "5"
      }
    ]
  },
  {
    question: "How Do You <span>Describe Yourself</span>?",
    multiSelect: true,
    index: 1,
    options: [
      {
        image: "https://kloxet.com/assets/img/funky-self-180x252.jpg",
        value: "Funky",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/conservative-self-180x238.jpg",
        value: "Conservative",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/wild-self-180x240.jpg",
        value: "Wild",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/spontaneous-self-180x237.jpg",
        value: "Spontaneous",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/sociable-self-180x237.jpg",
        value: "Sociable",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/shy-self-180x240.jpg",
        value: "Shy",
        option_id: "6"
      },
      {
        image: "https://kloxet.com/assets/img/happy-self180x240.jpg",
        value: "Happy",
        option_id: "7"
      },
      {
        image: "https://kloxet.com/assets/img/moody-self-180x233.jpg",
        value: "Moody",
        option_id: "8"
      }
    ]
  },
  {
    question: "What Color Clothing <span>Do You Tend To Wear</span>?",
    multiSelect: true,
    index: 2,
    options: [
      {
        image: "https://kloxet.com/assets/img/all-white-look-180x256.jpg",
        value: "Mostly White",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/all-blue-look-180x239.jpg",
        value: "Lots Of Navy Blue",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/bright-colors-look-180x238.jpg",
        value: "Bright Colors",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/all-black-look-180x248.jpg",
        value: "Mostly Black",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/neutral-color-look-180x252.jpg",
        value: "Neutral Colors",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/all-colors-look-180x258.jpg",
        value: "All Colors",
        option_id: "6"
      }
    ]
  },
  {
    question: "<span>Which Necklace Styles</span> Would You Try On?",
    multiSelect: true,
    index: 3,
    options: [
      {
        image: "https://kloxet.com/assets/img/chocker-necklace-180x240.jpg",
        value: "Choker",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/chain-necklace-180x232.jpg",
        value: "Chain",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/statement-necklace-180x228.jpg",
        value: "Statements",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/pearl-necklace-180x232.jpg",
        value: "Pearls",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/long-necklace-180x236.jpg",
        value: "Long",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/rhinestones-necklace-180x237.jpg",
        value: "Rhinestones",
        option_id: "6"
      },
      {
        image: "https://kloxet.com/assets/img/vintage-necklace-180x246.jpg",
        value: "Vintage",
        option_id: "7"
      },
      {
        image: "https://kloxet.com/assets/img/gothic-necklace-180x250.jpg",
        value: "Gothic",
        option_id: "8"
      },
      {
        image: "https://kloxet.com/assets/img/crystal-necklace-180x233.jpg",
        value: "Crystal",
        option_id: "9"
      },
      {
        image: "https://kloxet.com/assets/img/pendant-necklace-180x229.jpg",
        value: "Pendant",
        option_id: "10"
      },
      {
        image: "https://kloxet.com/assets/img/faux-stones-necklace-180x230.jpg",
        value: "Faux long",
        option_id: "11"
      },
      {
        image: "https://kloxet.com/assets/img/bohemian-necklace-180x231.jpg",
        value: "Bohemian",
        option_id: "12"
      }
    ]
  },
  {
    question: "<span>Which Bracelet Styles</span> Would You Try On?",
    multiSelect: true,
    index: 4,
    options: [
      {
        image: "https://kloxet.com/assets/img/stretch-bracelet-180x243.jpg",
        value: "Stretch",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/bangle-bracelet-180x246.jpg",
        value: "Bangles",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/chain-bracelete-180x235.jpg",
        value: "Chains",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/cuff-bracelete-180x238.jpg",
        value: "Cuff",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/wired-bracelete-180x236.jpg",
        value: "Wire",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/charm-bracelet-180x236.jpg",
        value: "Charm",
        option_id: "6"
      },
      {
        image:
          "https://kloxet.com/assets/img/faux-stones-bracelete-180x230.jpg",
        value: "Stones",
        option_id: "7"
      },
      {
        image: "https://kloxet.com/assets/img/beads-bracelet-180x238.jpg",
        value: "Beads",
        option_id: "8"
      },
      {
        image: "https://kloxet.com/assets/img/beads-bracelet-180x225.jpg",
        value: "Crystal",
        option_id: "9"
      },
      {
        image: "https://kloxet.com/assets/img/bohemian-bracelet-180x239.jpg",
        value: "Bohemian",
        option_id: "10"
      },
      {
        image: "https://kloxet.com/assets/img/infinity-bracelete-180x229.jpg",
        value: "Infinity",
        option_id: "11"
      },
      {
        image: "https://kloxet.com/assets/img/rhinestones-bracelet-180x234.jpg",
        value: "Rhinestones",
        option_id: "12"
      }
    ]
  },
  {
    question: "<span>Which Earring Styles</span> Would You Try On?",
    multiSelect: true,
    index: 5,
    options: [
      {
        image: "https://kloxet.com/assets/img/drops-earrings-180x235.jpg",
        value: "Drops",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/studs-earrings-180x233.jpg",
        value: "Studs",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/hoops-earrings-180x225.jpg",
        value: "Hoops",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/cuffs-earrings-180x240.jpg",
        value: "Ear Cuff",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/dangle-earrings-180x238.jpg",
        value: "Dangles",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/huggy-earrings-180x235.jpg",
        value: "Huggy",
        option_id: "6"
      },
      {
        image: "https://kloxet.com/assets/img/bohemian-earrings-180x221.jpg",
        value: "Bohemian",
        option_id: "7"
      },
      {
        image: "https://kloxet.com/assets/img/tassel-earrings-180x228.jpg",
        value: "Tassel",
        option_id: "8"
      },
      {
        image: "https://kloxet.com/assets/img/crystal-earrings-180x231.jpg",
        value: "Crystal",
        option_id: "9"
      },
      {
        image: "https://kloxet.com/assets/img/multi-set-earrings-180x226px.jpg",
        value: "Multi-Sets",
        option_id: "10"
      },
      {
        image: "https://kloxet.com/assets/img/punk-earrings-180x226.jpg",
        value: "Punk",
        option_id: "11"
      },
      {
        image: "https://kloxet.com/assets/img/oversized-hoops-180x244.jpg",
        value: "Oversized Hoops",
        option_id: "12"
      }
    ]
  },
  {
    question: "<span>Which Hair Accessories</span> Would You Try On?",
    multiSelect: true,
    index: 6,
    options: [
      {
        image: "https://kloxet.com/assets/img/hair-clips-180x244.jpg",
        value: "Clips",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/headband-accessories-180x230.jpg",
        value: "Bandana",
        option_id: "2"
      },
      {
        image:
          "https://kloxet.com/assets/img/hair-comb-accessories-180x232.jpg",
        value: "Hair Comb",
        option_id: "3"
      },
      {
        image:
          "https://kloxet.com/assets/img/hair-pins-accessories-180x237.jpg",
        value: "Hair Pins",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/elastic-hair-band-180x249.jpg",
        value: "Elastic Band",
        option_id: "5"
      },
      {
        image:
          "https://kloxet.com/assets/img/barrette-hair-accessories-180x243.jpg",
        value: "Barrettes",
        option_id: "6"
      },
      {
        image:
          "https://kloxet.com/assets/img/flowers-hair-accessories-180x230.jpg",
        value: "Flowers",
        option_id: "7"
      },
      {
        image:
          "https://kloxet.com/assets/img/turban-hair-accessories180x229.jpg",
        value: "Turban",
        option_id: "8"
      },
      {
        image:
          "https://kloxet.com/assets/img/special-occassion-hair-comb-180x231.jpg",
        value: "Special Occasions",
        option_id: "9"
      },
      {
        image: "https://kloxet.com/assets/img/headband-accessories-180x232.jpg",
        value: "HeadBand",
        option_id: "10"
      },
      {
        image:
          "https://kloxet.com/assets/img/hair-chain-accessories180x233.jpg",
        value: "Hair Chain",
        option_id: "11"
      },
      {
        image:
          "https://kloxet.com/assets/img/hair-bows-accessories-180x244.jpg",
        value: "Hair Bows",
        option_id: "12"
      }
    ]
  },
  {
    question: "How Comfortable are you with <span>Colorful Accessories</span>?",
    multiSelect: true,
    index: 7,
    options: [
      {
        image: "https://kloxet.com/assets/img/very-comfortable-180x249.jpg",
        value: "Very Comfortable",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/somewhat-comfortable-180x238.jpg",
        value: "Somewhat Comfortable",
        option_id: "2"
      },
      {
        image:
          "https://kloxet.com/assets/img/like-neutral-accessories-180x227.jpg",
        value: "Preferably Neutral",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/donot-like-180x228.jpg",
        value: "Very Uncomfortable",
        option_id: "4"
      }
    ]
  },
  {
    question: "Pick Your Favorites <span>Jewelry Material & Stones</span>?",
    multiSelect: true,
    index: 8,
    options: [
      {
        image:
          "https://kloxet.com/assets/img/gold-material-jewelry-180x228.jpg",
        value: "Gold",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/silver-stones-180x237.jpg",
        value: "Silver",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/diamond-stones-180x245.jpg",
        value: "Diamond",
        option_id: "3"
      },
      {
        image:
          "https://kloxet.com/assets/img/rhinestones-jewelry-stones-180x255.jpg",
        value: "Rhinestones",
        option_id: "4"
      }
    ]
  },
  {
    question: "What Occasion Do You Want To Be <span>Styled For</span>?",
    multiSelect: true,
    index: 9,
    options: [
      {
        image: "https://kloxet.com/assets/img/daytime-look-180x231.jpg",
        value: "Daytime",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/office-look-styled-180x229.jpg",
        value: "The Office",
        option_id: "2"
      },
      {
        image:
          "https://kloxet.com/assets/img/special-occasion-styled-180x227.jpg",
        value: "Special Occasion",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/nighttime-look-180x242.jpg",
        value: "Night Out",
        option_id: "4"
      }
    ]
  },
  {
    question: "Which Of These <span>Styles Best Defines You</span>?",
    multiSelect: true,
    index: 10,
    options: [
      {
        image: "https://kloxet.com/assets/img/formal-style-180x246.jpg",
        value: "Formal",
        option_id: "1"
      },
      {
        image: "https://kloxet.com/assets/img/sporty-look-180x247.jpg",
        value: "Sporty",
        option_id: "2"
      },
      {
        image: "https://kloxet.com/assets/img/retro-look-180x269.jpg",
        value: "Retro",
        option_id: "3"
      },
      {
        image: "https://kloxet.com/assets/img/clubgoer-look-180x235.jpg",
        value: "Club-Goer",
        option_id: "4"
      },
      {
        image: "https://kloxet.com/assets/img/elegant-look-180x258.jpg",
        value: "Elegant",
        option_id: "5"
      },
      {
        image: "https://kloxet.com/assets/img/urban-look-180x250.jpg",
        value: "Urban",
        option_id: "6"
      },
      {
        image: "https://kloxet.com/assets/img/casual-look-180x229.jpg",
        value: "Casual",
        option_id: "7"
      },
      {
        image: "https://kloxet.com/assets/img/professional-look-180x235.jpg",
        value: "Professional",
        option_id: "8"
      }
    ]
  }
];

export function getQuizData() {
  return quizData;
}
