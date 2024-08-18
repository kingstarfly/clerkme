import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { z } from "zod"

export const caseRecordRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                patientIdentifier: z.string(),
                presentingComplaint: z.string(),
                historyPresentingComplaint: z.string(),
                pastMedicalHistory: z.string(),
                drugHistory: z.string(),
                familyHistory: z.string(),
                socialHistory: z.string(),
                systemicEnquiry: z.string(),
                examinationFindings: z.string(),
                impressionPlan: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.caseRecord.create({
                data: {
                    ...input,
                    clerkUserId: ctx.auth.userId,
                },
            })
        }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.caseRecord.findMany({
            where: { clerkUserId: ctx.auth.userId },
            orderBy: { createdAt: "desc" },
        })
    }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.caseRecord.findFirst({
                where: {
                    id: input.id,
                    clerkUserId: ctx.auth.userId,
                },
            })
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                presentingComplaint: z.string().optional(),
                historyPresentingComplaint: z.string().optional(),
                pastMedicalHistory: z.string().optional(),
                drugHistory: z.string().optional(),
                familyHistory: z.string().optional(),
                socialHistory: z.string().optional(),
                systemicEnquiry: z.string().optional(),
                examinationFindings: z.string().optional(),
                impressionPlan: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...updateData } = input
            return ctx.db.caseRecord.update({
                where: {
                    id,
                    clerkUserId: ctx.auth.userId,
                },
                data: updateData,
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.caseRecord.delete({
                where: {
                    id: input.id,
                    clerkUserId: ctx.auth.userId,
                },
            })
        }),

    getByPatientIdentifier: protectedProcedure
        .input(z.object({ patientIdentifier: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.caseRecord.findMany({
                where: {
                    patientIdentifier: input.patientIdentifier,
                    clerkUserId: ctx.auth.userId,
                },
                orderBy: { createdAt: "desc" },
            })
        }),
})
