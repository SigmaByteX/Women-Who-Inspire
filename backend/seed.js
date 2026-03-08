const mongoose = require('mongoose');
const Woman = require('./models/Woman');
require('dotenv').config();

const seedData = [
  {
    name: 'Kalpana Chawla',
    field: 'Science',
    nationality: 'Indian-American',
    birthYear: 1962,
    deathYear: 2003,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Kalpana_Chawla%2C_NASA_photo_portrait_in_orange_suit.jpg',
    shortDescription:
      'First woman of Indian origin in space, an aerospace engineer and astronaut who inspired millions to reach for the stars.',
    biography:
      'Kalpana Chawla was born on March 17, 1962, in Karnal, India. She earned her Bachelor of Engineering degree in aeronautical engineering from Punjab Engineering College in 1982. She then moved to the United States and earned her Master of Science degree in Aerospace Engineering from the University of Texas at Arlington in 1984. She received a second Master of Science degree in 1986, and a Doctorate of Philosophy in Aerospace Engineering in 1988, both from the University of Colorado Boulder.\n\nIn 1994, Chawla was selected by NASA and reported to the Johnson Space Center in March 1995 to begin a year of training and evaluation. She became an astronaut in February 1996 and was assigned to the astronaut office EVA/Robotics and Computer Branches.\n\nChawla's first space mission began on November 19, 1997, as part of the six-astronaut crew of Space Shuttle Columbia mission STS-87. With this mission she became the first woman of Indian origin to go to space. During STS-87, Chawla was responsible for deploying the Spartan satellite, which malfunctioned, necessitating a spacewalk by Winston Scott and Takao Doi to retrieve the satellite.\n\nShe died on February 1, 2003, when the Space Shuttle Columbia disintegrated during re-entry into Earth\'s atmosphere, killing all seven crew members.',
    achievements: [
      'First woman of Indian origin in space (1997)',
      'Logged 376 hours in space across two missions',
      'Received the Congressional Space Medal of Honor posthumously',
      'Named NASA\'s flight engineer for STS-107 mission',
      'Recipient of the NASA Space Flight Medal',
      'Several institutions and streets named in her honor across India and the US',
    ],
    quote:
      'The path from dreams to success does exist. May you have the vision to find it, the courage to get onto it, and the perseverance to follow it.',
    isFeatured: true,
    tags: ['astronaut', 'aerospace', 'pioneer', 'space', 'India'],
    likes: 245,
  },
  {
    name: 'Marie Curie',
    field: 'Science',
    nationality: 'Polish-French',
    birthYear: 1867,
    deathYear: 1934,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/800px-Marie_Curie_c1920.jpg',
    shortDescription:
      'Pioneering physicist and chemist, the first woman to win a Nobel Prize — and the only person to win Nobel Prizes in two different sciences.',
    biography:
      'Marie Skłodowska Curie was born on November 7, 1867, in Warsaw, Poland. From childhood, she was remarkable for her prodigious memory and her enthusiasm for learning. She shared a mutual passion for learning with her father, a teacher of mathematics and physics.\n\nIn 1891, Curie followed her sister to Paris, where she studied physics and mathematics at the University of Paris. She met Pierre Curie, a professor of the School of Physics, and in 1895 they were married. Marie and Pierre Curie worked together, conducting research on radioactivity, a term coined by Marie herself.\n\nIn 1898, the Curies announced the discovery of a new element which they named polonium, after Marie\'s native country Poland, and also radium. Marie Curie was awarded the Nobel Prize in Physics in 1903, along with Pierre Curie and Henri Becquerel, for their work on radioactivity. In 1911, she received a second Nobel Prize, this time in chemistry, for the isolation of pure radium.\n\nDuring World War I, Curie developed mobile X-ray units which could be used to diagnose injuries near the front lines. These units became known as "petites Curies." She died on July 4, 1934, from aplastic anemia believed to be caused by prolonged exposure to radiation.',
    achievements: [
      'First woman to win a Nobel Prize (Physics, 1903)',
      'Only person to win Nobel Prizes in two different sciences (Physics & Chemistry)',
      'Discovered two elements: polonium and radium',
      'Coined the term "radioactivity"',
      'Developed mobile X-ray units used in WWI',
      'First woman to earn a PhD in Physics in France',
      'First female professor at the University of Paris',
    ],
    quote:
      'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    tags: ['physics', 'chemistry', 'Nobel Prize', 'radioactivity', 'pioneer'],
    likes: 312,
  },
  {
    name: 'Indra Nooyi',
    field: 'Business',
    nationality: 'Indian-American',
    birthYear: 1955,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Indra_Nooyi_2.jpg/800px-Indra_Nooyi_2.jpg',
    shortDescription:
      'Visionary CEO of PepsiCo for 12 years, ranked among the world\'s 100 most powerful women, transforming one of the world\'s largest food and beverage companies.',
    biography:
      'Indra Krishnamurthy Nooyi was born on October 28, 1955, in Chennai, India. She completed her undergraduate degree in physics, chemistry, and mathematics at Madras Christian College before receiving her MBA from the Indian Institute of Management Calcutta.\n\nNooyi moved to the United States in 1978 to study at the Yale School of Management, where she earned a Master of Public and Private Management degree. She worked at companies including Johnson & Johnson, Mettur Beardsell, Boston Consulting Group, Motorola, and ABB before joining PepsiCo in 1994.\n\nAt PepsiCo, Nooyi rose through the ranks to become Chief Financial Officer in 2001. In 2006, she was appointed CEO of PepsiCo, becoming one of the few women and minority executives to lead a Fortune 500 company. During her 12-year tenure as CEO, she transformed the company with her "Performance with Purpose" strategy, focusing on healthier products while delivering strong financial returns.\n\nUnder her leadership, PepsiCo\'s revenue grew from $35 billion to $63.5 billion. She stepped down as CEO in 2018 and as chairman in 2019. She has since joined the Amazon board of directors and written a memoir.',
    achievements: [
      'CEO of PepsiCo for 12 years (2006–2018)',
      'Grew PepsiCo\'s revenue from $35B to $63.5B',
      'Ranked #1 on Fortune\'s Most Powerful Women list multiple times',
      'Named one of Time magazine\'s 100 Most Influential People',
      'Championed healthier product lines and sustainability',
      'Member of Amazon\'s Board of Directors',
      'Author of "My Life in Full: Work, Family, and Our Future"',
    ],
    quote:
      'Just because you are CEO, don\'t think you have landed. You must continually increase your learning, the way you think, and the way you approach the organization.',
    tags: ['CEO', 'leadership', 'PepsiCo', 'business', 'Fortune 500'],
    likes: 178,
  },
  {
    name: 'Malala Yousafzai',
    field: 'Activism',
    nationality: 'Pakistani',
    birthYear: 1997,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Malala_Yousafzai_2021.jpg/800px-Malala_Yousafzai_2021.jpg',
    shortDescription:
      'Youngest Nobel Peace Prize laureate and fearless advocate for girls\' education, who survived an assassination attempt by the Taliban to amplify her voice worldwide.',
    biography:
      'Malala Yousafzai was born on July 12, 1997, in Mingora, Pakistan. From an early age, she became an advocate for girls\' education, which was under threat by local Taliban groups in the Swat Valley region of Pakistan.\n\nAt age 11-12, Malala wrote a blog under a pseudonym for the BBC Urdu service, detailing her life under Taliban rule and her views on promoting education for girls. A 2009 New York Times documentary about her life brought her increased attention.\n\nOn October 9, 2012, at the age of 15, Malala was shot in the head by a Taliban gunman while riding a school bus in the Swat district. She survived this assassination attempt and was airlifted to Queen Elizabeth Hospital in Birmingham, UK, for treatment.\n\nAfter her recovery, Malala continued to advocate for girls\' education worldwide. In 2013, she addressed the United Nations and co-authored a book "I Am Malala." On July 12, 2014, her 17th birthday, she opened the Malala Fund\'s School in Lebanon for Syrian refugee girls.\n\nIn October 2014, at age 17, Malala was awarded the Nobel Peace Prize — becoming the youngest Nobel laureate in history. She graduated from Oxford University in 2020 with a degree in Philosophy, Politics, and Economics.',
    achievements: [
      'Youngest Nobel Peace Prize laureate (2014, age 17)',
      'Survived Taliban assassination attempt in 2012',
      'Co-founded the Malala Fund for girls\' education',
      'Addressed the United Nations at age 16',
      'Author of "I Am Malala" (2013) — New York Times bestseller',
      'Graduated from Oxford University (2020)',
      'Over 130,000 girls supported by Malala Fund annually',
    ],
    quote:
      'One child, one teacher, one book, one pen can change the world.',
    tags: ['education', 'girls rights', 'Nobel Peace Prize', 'activism', 'Pakistan'],
    likes: 289,
  },
  {
    name: 'Serena Williams',
    field: 'Sports',
    nationality: 'American',
    birthYear: 1981,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Serena_Williams_at_the_2013_US_Open.jpg/800px-Serena_Williams_at_the_2013_US_Open.jpg',
    shortDescription:
      'Widely considered the greatest tennis player of all time, with 23 Grand Slam singles titles and a revolutionary impact on sport and culture.',
    biography:
      'Serena Jameka Williams was born on September 26, 1981, in Saginaw, Michigan. Raised in Compton, California, she was trained by her father Richard Williams, alongside her sister Venus. She turned professional at age 14 in 1995.\n\nSerena Williams dominated professional tennis for over two decades, winning 23 Grand Slam singles titles — the most by any player in the Open Era. She held the No. 1 spot in women\'s singles for 319 weeks total. Her powerful playing style revolutionized the women\'s game.\n\nBeyond tennis, Williams has been a vocal advocate for pay equity, racial justice, and maternal health. In 2017, she nearly died from pulmonary embolism following the birth of her daughter, an experience she shared publicly to raise awareness about maternal mortality rates among Black women in the US.\n\nWilliams retired from professional tennis in September 2022, calling it an "evolution." She is also a fashion designer, entrepreneur, and venture capitalist, having founded Serena Ventures which has invested in over 60 companies.',
    achievements: [
      '23 Grand Slam singles titles (most in Open Era)',
      '4 Olympic Gold Medals',
      'Held World No. 1 ranking for 319 total weeks',
      'Won the Australian Open while 8 weeks pregnant (2017)',
      'Founded Serena Ventures, investing in 60+ companies',
      'Fashion designer with her own clothing line',
      'Sports Illustrated\'s Sportsperson of the Year (2015)',
    ],
    quote:
      'I really think a champion is defined not by their wins, but by how they can recover when they fall.',
    tags: ['tennis', 'sports', 'champion', 'entrepreneurship', 'advocacy'],
    likes: 201,
  },
  {
    name: 'Ada Lovelace',
    field: 'Technology',
    nationality: 'British',
    birthYear: 1815,
    deathYear: 1852,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg',
    shortDescription:
      'The world\'s first computer programmer, who wrote the first algorithm intended for a machine over a century before modern computers existed.',
    biography:
      'Augusta Ada King, Countess of Lovelace, was born on December 10, 1815, the only legitimate child of the poet Lord Byron and his wife Lady Byron. Her mother had her tutored in mathematics and science, unusual pursuits for women at the time.\n\nAt age 17, Ada met Charles Babbage, the inventor of the proposed Analytical Engine — a mechanical general-purpose computer. Ada became fascinated with Babbage\'s design and began a correspondence that would span decades.\n\nIn 1843, Ada translated an article about the Analytical Engine written by Italian mathematician Luigi Menabrea. Her translation was accompanied by a set of notes that were three times longer than the original article. These notes included what is recognized as the first published algorithm intended to be carried out by such a machine — making her the world\'s first computer programmer.\n\nLovelace also foresaw that the machine could go beyond mere calculation, writing that it could compose music or handle any content that could be expressed in symbols. This insight presaged modern computing by over a century. She died of cancer on November 27, 1852, at age 36.',
    achievements: [
      'Wrote the world\'s first computer algorithm (1843)',
      'Foresaw potential of computers beyond calculation',
      'Translated and vastly expanded Menabrea\'s article on Analytical Engine',
      'Honored by the programming language "Ada" named after her',
      'Celebrated on Ada Lovelace Day (second Tuesday of October)',
      'Inducted into the National Women\'s Hall of Fame',
    ],
    quote:
      'The more I study, the more insatiable do I feel my genius for it to be.',
    tags: ['computing', 'mathematics', 'algorithm', 'pioneer', 'Victorian era'],
    likes: 167,
  },
];

async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/women-who-inspire';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Woman.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    const inserted = await Woman.insertMany(seedData);
    console.log(`🌱 Seeded ${inserted.length} inspiring women`);

    console.log('\nSeeded women:');
    inserted.forEach((w) => console.log(`  ✨ ${w.name} — ${w.field}`));

    await mongoose.disconnect();
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
