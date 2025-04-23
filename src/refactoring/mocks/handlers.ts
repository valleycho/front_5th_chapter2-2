import { http, HttpResponse } from "msw";
import { Grade } from "../../types";

export const mockMember = {
    id: "1",
    name: "John Smith",
    gradeId: null,
}

export const mockMemberGrade = [
    {
        id: "1",
        name: "일반",
        discountRate: 3,
    },
    {
        id: "2",
        name: "실버",
        discountRate: 5,
    },
      
]

export const handlers = [
    http.get("/api/member", () => {
      return HttpResponse.json(mockMember)
    }),
    http.get("/api/member/grade", () => {
      return HttpResponse.json(mockMemberGrade)
    }),
    http.post("/api/member/grade", async ({ request }) => {
      const newGrade = await request.json() as Grade;

      const gradeToAdd = {
        ...newGrade,
        id: [mockMemberGrade.length + 1].toString(),
      }

      mockMemberGrade.push(gradeToAdd);


      return HttpResponse.json(gradeToAdd, { status: 201 })
    }),
];