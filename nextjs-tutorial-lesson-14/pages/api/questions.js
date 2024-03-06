// pages/api/questions.js

const questions = [
  {
    id: 1,
    question: 'What is a crucial aspect of consent in a relationship?',
    options: ['Verbal communication', 'Ignoring signals', 'Assuming consent', 'Peer pressure'],
    correctAnswer: 0,
    information: 'Consent in a relationship is crucially based on clear and verbal communication to ensure understanding and agreement.',
  },
  {
    id: 2,
    question: 'How can one effectively communicate boundaries in a relationship?',
    options: ['Open and honest communication', 'Keeping silent', 'Assuming the other person knows', 'Using body language only'],
    correctAnswer: 0,
    information: 'Effective communication of boundaries involves open and honest dialogue to express personal limits and expectations',
    
  },
  {
    id: 3,
    question: 'Why is it important to debunk myths surrounding sexuality?',
    options:  ['Respecting personal space and limits',  'Ignoring others feelings', 'Always sharing everything', 'Copying others without permission'],
    correctAnswer: 0,
    information: 'Personal boundaries involve respecting personal space and limits, allowing individuals to maintain their autonomy',
  },
  {
    id: 4,
    question: ' How can you respond if someone makes you uncomfortable?',
    options: [
       'Speak up and express your feelings','Keep it to yourself', 'Pretend nothing happened', 
       'Blame yourself'],
    correctAnswer: 0,
    information: 'When uncomfortable, its important to speak up and express your feelings, promoting open communication and resolution.',
  },
  
  // Add more questions
];

export default function handler(req, res) {
  const { id } = req.query;
  if (id) {
    const question = questions.find((q) => q.id === parseInt(id));
    res.status(200).json(question);
  } else {
    res.status(200).json(questions);
  }
}
