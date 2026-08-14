const img = (file: string) =>
  `https://o360.com/wp-content/uploads/${file}`;

export const site = {
  name: "O360®",
  phone: "833-433-8338",
  phoneTel: "tel:833-433-8338",
  fax: "833-233-8338",
  address: "1910 E. Warner Ave., #2E Santa Ana, CA 92705",
  regions: "California · Texas · New York",
  logo: "/brand/logo.svg",
  logoLight: "/brand/logo-light.svg",
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const headerNav: NavItem[] = [
  {
    label: "Web Design",
    href: "/web-design",
    children: [
      { label: "Dental Websites", href: "/websites/dental" },
      { label: "Medical Websites", href: "/websites/medical" },
      { label: "Pediatric Dentistry", href: "/websites/pediatric-dentistry" },
      { label: "Optometry Websites", href: "/websites/optometry" },
      { label: "Mental Health Websites", href: "/websites/mental-health" },
      { label: "Medical Spa Websites", href: "/websites/medical-spa" },
      { label: "Veterinary Websites", href: "/websites/veterinary" },
      { label: "Podiatry Websites", href: "/websites/podiatry" },
      { label: "Other Specialties", href: "/websites" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Marketing",
    href: "/marketing",
    children: [
      { label: "Dental Marketing", href: "/marketing/dental" },
      { label: "Medical Marketing", href: "/marketing/medical" },
      { label: "Medical Spa Marketing", href: "/marketing/medical-spa" },
      { label: "Orthodontic Marketing", href: "/marketing/orthodontic" },
      { label: "Mental Health Marketing", href: "/marketing/mental-health" },
      { label: "Chiropractic Marketing", href: "/marketing/chiropractic" },
      { label: "Optometry Marketing", href: "/marketing/optometry" },
      { label: "Veterinary Marketing", href: "/marketing/veterinary" },
      { label: "Other Specialties", href: "/marketing" },
    ],
  },
  {
    label: "SEO/PPC",
    href: "/marketing/seo",
    children: [
      { label: "Dental SEO", href: "/marketing/dental-seo" },
      { label: "Medical SEO", href: "/marketing/medical-seo" },
      { label: "PPC & Google Ads", href: "/marketing/ppc" },
      { label: "Social Media", href: "/marketing/social" },
      { label: "AI Optimization", href: "/marketing/ai-optimization" },
      { label: "Content Marketing", href: "/marketing/content" },
      { label: "Reputation Management", href: "/marketing/reputation" },
    ],
  },
  { label: "HIPAA", href: "/products/hipaa" },
  {
    label: "About O360",
    href: "/about-us",
    children: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Support", href: "/support" },
    ],
  },
];

export const footerLinks = [
  { label: "Web Design", href: "/web-design" },
  { label: "Marketing", href: "/marketing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blogs" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact-us" },
];

export const home = {
  seo: {
    title: "Website Design + SEO for Dental and Medical Practices | O360®",
    description:
      "Custom website design and marketing for dental and medical practices since 2003. 3,100+ sites launched.",
  },
  mobileHero: {
    heading: "Website Design + SEO for Dental and Medical Practices Since 2003",
    background: img("2026/03/mobile-collage-optimized-99.avif"),
    primary: { label: "Websites", href: "/web-design" },
    secondary: { label: "Marketing", href: "/marketing" },
  },
  desktopHero: {
    heading: "Website Design & Marketing For Dental & Medical Practices",
    background: img("2020/05/honeycomb-pattern-2.webp"),
    primary: { label: "Websites", href: "/web-design" },
    secondary: { label: "Marketing", href: "/marketing" },
    screenshots: [
      img("2025/10/veterinary-website-petcute.png"),
      img("2025/10/beyondthesmiledental-3.jpg"),
      img("2025/10/vidarevival-3.png"),
      img("2025/10/MalamaPainSpine-3.png"),
      img("2025/10/FloridaInjuryRegenerative4.png"),
      img("2025/10/maygrant.png"),
      img("2025/10/DublinRanchDentalx3.png"),
      img("2025/10/hex-dental-lab-3.jpeg"),
      img("2025/10/skinsolutiosny-3.png"),
      img("2025/10/364-Bariatrics-3.png"),
      img("2025/10/NicholsonDental.png"),
      img("2025/10/Reverence-Behaviour-Health-3.png"),
      img("2025/10/wirxpharmacy-3.jpg"),
      img("2025/10/fpmx3.png"),
      img("2025/10/1015x3.png"),
      img("2025/10/florida-surgical-specialists-1.png"),
      img("2025/10/SweetViewOptical-1.png"),
      img("2025/10/new-path-vision-4.webp"),
      img("2025/10/drharryintsiful-1.webp"),
    ],
    features: [
      {
        icon: "design",
        text: "Design a branded website that give you full control over the user experience.",
      },
      {
        icon: "check",
        text: "Built only for you and everything is yours to take, wherever you may need to go.",
      },
      {
        icon: "devices",
        text: "Dynamic sizing on across all device sizes with pixel-perfect images and graphics.",
      },
      {
        icon: "search",
        text: "Custom websites that are optimized to maximize your online search rankings.",
      },
    ],
  },
  intro: {
    heading: "Grow Your Practice, Quickly",
    body: "Partner with O360® to build a stunning custom website that enables you to stand out in your area, be found on Google, expand your reach on social media, and convert more visitors into patients.",
  },
  split: {
    design: {
      pretitle: "Website Design",
      title: "For Doctors",
      body: "Compete and stand out among your toughest competitors with a stunning, exclusive, and, impressive website.",
      items: [
        "100% Custom from Scratch",
        "Exclusivity and Ownership",
        "Mobile Responsive",
        "HIPAA Compliant Website + Email",
        "Custom Content",
        "Educational Videos + Animations",
      ],
      primary: { label: "Select Specialty", href: "#website-specialty" },
      secondary: { label: "Gallery", href: "/portfolio" },
    },
    marketing: {
      pretitle: "Marketing",
      title: "Organic & Paid",
      body: "Spend less, and get more while having access to a 100% transparent reporting system, and advanced tools.",
      items: [
        "Pay-Per-Click Ads",
        "Local SEO",
        "Social Media",
        "Content Marketing",
        "Reputation Management",
        "Display Ads",
      ],
      primary: { label: "Marketing Services", href: "/marketing" },
    },
  },
  founder: {
    heading: "Led by Doctors Who Understand Your Practice",
    body: "O360® was founded in 2003 by Dr. Sean Fahimi — a dentist. He graduated from the University of Pennsylvania School of Dental Medicine, practiced, and then built the company doctors actually want to work with. The people who design your site and answer your calls are in the United States, and they already know your specialty.",
    ratings: [
      { value: "4.9/5", label: "Rating On Google" },
      { value: "4.8/5", label: "Rating on Glassdoor" },
      { value: "#1", label: "Ranked on DentalCountry" },
    ],
    flips: [
      { front: "434+", backTitle: "Why are our ratings so high?", back: "5-Star Reviews on Google" },
      { front: "20+", backTitle: "How do we stay on top?", back: "Years in Healthcare Marketing" },
      { front: "94%", backTitle: "Why is our retention rate so high?", back: "Client Retention Rate" },
    ],
  },
  gallery: {
    heading: "Specialized in Dental & Medical Practices",
    body: "Our gallery features our team’s best work, each design uniquely tailored to the practice and the doctor behind it. We design for more than 40 specialties.",
    cta: { label: "View Portfolio", href: "/portfolio" },
    thumbs: [
      { src: img("2025/10/good-medicine-3.png"), href: "/portfolio" },
      { src: img("2025/10/elitespinespecialists3.png"), href: "/portfolio" },
      { src: img("2025/10/skinsolutiosny-3.png"), href: "/portfolio" },
      { src: img("2025/10/annapolis-counseling-center3.png"), href: "/portfolio" },
    ],
    specialties: ["Dentistry", "Medical", "Cosmetics", "Mental Health", "Medical Spa", "See the Full List"],
  },
  stats: {
    heading: "The Numbers Behind Our Work",
    items: [
      { value: "3.1k+", label: "Websites Launched" },
      { value: "434+", label: "5-Star Reviews" },
      { value: "860k", label: "Patient Visits Generated" },
      { value: "94K", label: "Appointments Generated" },
    ],
  },
  marketing: {
    heading: "Result Driven Marketing",
    body: "Solutions that cover all digital marketing channels for your practice. See why thousands of other doctors choose O360!",
    background: img("2020/06/bg-clouds-top-3.webp"),
    cards: [
      {
        image: img("2020/07/Asset-23.webp"),
        title: "Organic Search",
        body: "Rank your website for the top keywords. Ensure your website shows well on all local searches and even other locations.",
        cta: { label: "About SEO", href: "/marketing" },
      },
      {
        image: img("2020/07/ppc-partners2.png"),
        title: "Paid Advertising",
        body: "Get your practice in front of interested patients. We can help you lower ad costs and increase your conversion rates.",
        cta: { label: "PPC Ads", href: "/marketing" },
      },
      {
        image: img("2020/07/social-icons.png"),
        title: "Social Media",
        body: "Grow brand awareness, increase patient engagement, and improve patient satisfaction with social media marketing.",
        cta: { label: "Social Media", href: "/marketing" },
      },
    ],
  },
  specialties: {
    heading: "Website Design for Your Specialty",
    body: "We design for 41 healthcare specialties, and the differences matter. Choose yours to see designs, examples, and answers specific to your field.",
    groups: [
      {
        title: "Dental",
        href: "/websites/dental",
        items: [
          "Dentists",
          "Dental Lab",
          "Endodontic",
          "Oral Surgery",
          "Orthodontic",
          "Pediatric Dentistry",
          "Periodontic",
          "Prosthodontic",
        ],
      },
      {
        title: "Health",
        href: "/websites",
        items: [
          "Chiropractic",
          "Funeral Homes",
          "Holistic Medicine",
          "Mental Health",
          "Home Care",
          "Hospital",
          "Optometry",
          "Pharmacy",
          "Podiatry",
          "Veterinary",
          "Physical Therapy",
          "Radiology",
        ],
      },
      {
        title: "Medical",
        href: "/websites/medical",
        items: [
          "Physicians",
          "Dermatology",
          "Medical Spa",
          "Psychiatry",
          "Neurology",
          "OBGYN",
          "Allergy & Immunology",
          "Anesthesiology",
          "Anti-Aging",
          "Bariatrics",
          "Cardiology",
          "ENT",
          "Family Physician",
          "Gastroenterology",
          "Orthopedic",
          "Pain Management",
          "Plastic Surgery",
          "Urgent Care",
          "Urology",
          "General Surgery",
          "Internal Medicine",
          "Oncology",
          "Pediatrics",
          "Pulmonology",
          "Rheumatology",
          "Sports Medicine",
          "Telemedicine",
        ],
      },
    ],
  },
  faq: {
    heading: "Questions Doctors Ask Us",
    items: [
      {
        q: "Who is O360?",
        a: "O360® is a website design and marketing company built for private practices. We were founded in 2003 by Dr. Sean Fahimi, a dentist, and we design, build, host, and market websites for dental and medical practices across the United States — more than 3,100 of them so far.",
      },
      {
        q: "Do you only work with dental and medical practices?",
        a: "Yes. Practices are all we do, across more than 40 specialties — from general dentistry and primary care to endodontics, dermatology, cardiology, and oncology. We do not take work outside that world, which is why nobody here needs your specialty explained to them.",
      },
      {
        q: "How long have you been in business?",
        a: "Since 2003 — more than twenty years, with over 3,100 custom websites launched and 434+ five-star reviews.",
      },
      {
        q: "Is your team in the United States?",
        a: "Yes. Our designers and our support team are US-based, in California — never an overseas call center. The person who answers your call is the person who works on your site.",
      },
      {
        q: "Do you design for my specialty?",
        a: "Almost certainly. Find your specialty in the list above to see designs, examples, and answers written specifically for it.",
      },
      {
        q: "What does a custom website cost?",
        a: "Less than most doctors expect, and structured to be easy on cash flow: one design fee and a low monthly for hosting and support, with no long-term contract. Tell us about your practice and we will send an exact, no-pressure number.",
      },
      {
        q: "Do I own my website and domain?",
        a: "Yes — outright. The design, the site, and the domain are yours, and your design stays exclusive to your area so a competitor cannot copy it. If you ever leave, we hand everything over at no cost.",
      },
      {
        q: "Do you handle marketing as well as design?",
        a: "We do — SEO, paid advertising, and social media, run by the same healthcare-native team, with no markup on your ad spend and no contracts. Design and marketing can be bought together or separately.",
      },
    ],
  },
  close: {
    heading: "Join Thousands of Successful Doctors",
    primary: { label: "View Portfolio", href: "/portfolio" },
    secondary: { label: "Get Pricing", href: "/pricing" },
  },
};
