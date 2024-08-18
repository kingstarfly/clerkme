"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { FormInput } from "./FormInput";
import { FormTextArea } from "./FormTextArea";

// Define the schema for form validation
const caseRecordSchema = z.object({
  patientIdentifier: z.string().min(1, "Patient Identifier is required"),
  presentingComplaint: z.string().min(1, "Presenting complaint is required"),
  historyPresentingComplaint: z
    .string()
    .min(1, "History of presenting complaint is required"),
  pastMedicalHistory: z.string().min(1, "Past medical history is required"),
  drugHistory: z.string().min(1, "Drug history is required"),
  familyHistory: z.string().min(1, "Family history is required"),
  socialHistory: z.string().min(1, "Social history is required"),
  systemicEnquiry: z.string().min(1, "Systemic enquiry is required"),
  examinationFindings: z.string().min(1, "Examination findings are required"),
  impressionPlan: z.string().min(1, "Impression/Plan is required"),
});

type CaseRecordFormData = z.infer<typeof caseRecordSchema>;

function NewCaseRecordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CaseRecordFormData>({
    resolver: zodResolver(caseRecordSchema),
  });

  const utils = api.useUtils();

  const createCaseRecord = api.caseRecord.create.useMutation({
    onSuccess: () => {
      toast.success("Case record created successfully");
      utils.caseRecord.invalidate().catch(() => undefined);
      reset(); // Reset form after successful submission
    },
    onError: (error) => {
      toast.error(`Error creating case record: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<CaseRecordFormData> = (data) => {
    createCaseRecord.mutate(data);
  };

  const textAreaFields = [
    { id: "presentingComplaint", label: "Presenting Complaint" },
    {
      id: "historyPresentingComplaint",
      label: "History of Presenting Complaint",
    },
    { id: "pastMedicalHistory", label: "Past Medical History" },
    { id: "drugHistory", label: "Drug History" },
    { id: "familyHistory", label: "Family History" },
    { id: "socialHistory", label: "Social History" },
    { id: "systemicEnquiry", label: "Systemic Enquiry" },
    { id: "examinationFindings", label: "Examination Findings" },
    { id: "impressionPlan", label: "Impression/Plan" },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        id="patientIdentifier"
        label="Patient Identifier"
        error={errors.patientIdentifier}
        register={register}
      />

      {textAreaFields.map((field) => (
        <FormTextArea
          key={field.id}
          id={field.id}
          label={field.label}
          error={errors[field.id]}
          register={register}
        />
      ))}

      <button
        type="submit"
        disabled={createCaseRecord.isPending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {createCaseRecord.isPending ? "Creating ..." : "Submit Case Record"}
      </button>
    </form>
  );
}

export default NewCaseRecordForm;
