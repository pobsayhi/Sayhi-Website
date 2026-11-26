// คำถามที่พบบ่อย — แหล่งเดียวของ section FAQ หน้า Contact (/contact)
// หน้าเว็บ map จาก array นี้ทั้งหมด (ห้าม hardcode คำถาม/คำตอบใน JSX)

const faqs = [
  {
    id: 'faq-work',
    question: 'What kind of work do you guys do?',
    answer:
      "A bit of everything digital! We build websites, design graphics, shoot photos, and create 3D art. Basically, if it goes on a screen, we're into it.",
  },
  {
    id: 'faq-start',
    question: 'How do we start a project together?',
    answer:
      "Just drop us a message through the Contact page and tell us what you have in mind. We'll chat about the details, figure out the vibe, and get started.",
  },
  {
    id: 'faq-duration',
    question: 'How long does a project usually take?',
    answer:
      'It really depends on how big the idea is. Simple graphics or photo shoots might take a few days, while coding a full website or rendering 3D work can take a few weeks.',
  },
  {
    id: 'faq-changes',
    question: 'Can I ask for changes along the way?',
    answer:
      "Definitely. We'll share our progress as we go so you can give feedback and we can tweak things until you're happy with the final result.",
  },
];

export default faqs;
