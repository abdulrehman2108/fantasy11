'use client'

export default function SupportPage() {
  const faqs = [
    {
      question: 'How do I create a team?',
      answer: 'Select a match, click on "Create Team", and choose 11 players within the budget.',
    },
    {
      question: 'How are points calculated?',
      answer: 'Points are awarded based on player performance in the match. Check the scoring system in the app.',
    },
    {
      question: 'When do I receive my winnings?',
      answer: 'Winnings are credited to your wallet within 24 hours after the match ends.',
    },
    {
      question: 'How can I withdraw money?',
      answer: 'Go to Profile > Payment Methods and add your bank account. You can withdraw from your wallet.',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Support</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="space-y-3">
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">support@fantasy11.com</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">+91 1800-XXX-XXXX</p>
          </div>
          <div>
            <p className="text-gray-600">Available</p>
            <p className="font-semibold">24/7</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

