import type React from "react"
import { Button } from "@/components/ui/button"

interface FAQ {
  _id: string
  question: string
  answer: string
}

interface ViewFAQProps {
  faqs: FAQ[]
  handleDelete: (id: string) => void
}

const ViewFAQ: React.FC<ViewFAQProps> = ({ faqs, handleDelete  }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq._id} className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-indigo-600 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
                <Button onClick={() => handleDelete(faq._id)} variant="destructive" size="sm" className="ml-4">
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No FAQs available.</p>
        )}
      </div>
    </div>
  )
}

export default ViewFAQ

