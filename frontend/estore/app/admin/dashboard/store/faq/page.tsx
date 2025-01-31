"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ViewFAQ from "@/src/component/AdminComponents/faq/ViewFaq"
import AddFAQ from "@/src/component/AdminComponents/faq/AddFaq"
import { useGetFAQsQuery, useDeleteFAQMutation, useAddFAQMutation } from "@/src/store/rtkQuery"
import { toast } from "react-toastify"

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQManager() {
  const { data: faqs, isLoading, isError, refetch } = useGetFAQsQuery({})
  const [deleteFAQ] = useDeleteFAQMutation()
  const [addFAQ] = useAddFAQMutation()
  const [activeTab, setActiveTab] = useState("view")

  const handleDelete = async (id: string) => {
    try {
      await deleteFAQ(id).unwrap()
      toast.success("FAQ deleted successfully!")
      refetch()
    } catch (error) {
      toast.error("Failed to delete FAQ. Please try again.")
    }
  }

  const handleAddFaq = async (newFaq: Omit<FAQ, "id">) => {
    try {
      await addFAQ(newFaq).unwrap()
    //   toast.success("FAQ added successfully!")
      refetch()
      setActiveTab("view") // Change tab to "view" after adding FAQ
    } catch (error) {
      toast.error("Failed to add FAQ. Please try again.")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">FAQ Manager</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="view" className="text-lg font-semibold">
            View FAQs
          </TabsTrigger>
          <TabsTrigger value="add" className="text-lg font-semibold">
            Add FAQ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          {isLoading ? (
            <p>Loading FAQs...</p>
          ) : isError ? (
            <p>Error loading FAQs. Please try again.</p>
          ) : (
            <ViewFAQ handleDelete={handleDelete} faqs={faqs || []} />
          )}
        </TabsContent>
        <TabsContent value="add">
          <AddFAQ addFaq={handleAddFaq} setActiveTab={setActiveTab} />
        </TabsContent>
      </Tabs>
    </div>
  )
}