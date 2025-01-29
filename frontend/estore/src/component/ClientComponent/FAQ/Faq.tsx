import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Sample FAQ data
const faqs = [
  { question: "Is it accessible?", answer: "Yes. It adheres to the WAI-ARIA design pattern." },
  { question: "How do I track my order?", answer: "You can track your order using the tracking number provided in your confirmation email." },
  { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to many countries." },
  { question: "What payment methods do you accept?", answer: "We accept Visa, MasterCard, American Express, and PayPal." },
  { question: "How can I contact customer support?", answer: "You can contact customer support via email at support@example.com or call us at 123-456-7890." },
];

export default function Faq() {
  return (
    <div className=" px-4 my-8 py-16 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <div className='max-w-3xl mx-auto'>
        <h2 className="text-3xl font-bold text-center mb-8 sm:text-xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-200 dark:border-gray-700">
              <AccordionTrigger className="text-lg sm:text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base sm:text-md">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}