"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-customLightBlue via-customBeige to-customBlue p-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-customDarkBlue text-center mb-8">
          Mock Interview Session
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Question Section */}
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />

          {/* Video/Audio Recording Section */}
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>

        <div className="flex justify-between items-center mt-8">
          {activeQuestionIndex > 0 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
              className="bg-customDarkBlue text-white hover:scale-105 px-4 py-2 rounded-lg shadow"
            >
              Previous Question
            </Button>
          )}
          {activeQuestionIndex < mockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
              className="bg-customDarkBlue text-white hover:scale-105 px-4 py-2 rounded-lg shadow"
            >
              Next Question
            </Button>
          )}
          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
            <Link
              href={`/dashboard/interview/${interviewData?.mockId}/feedback`}
            >
              <Button className="bg-customDarkBlue text-white hover:scale-105 px-4 py-2 rounded-lg shadow">
                End Interview
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
