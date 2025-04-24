import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { courseOutlineAIModel, generateNotesAiModel, GenerateQuizAiModel, GenerateStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "Hello, World!" };
    },
);

export const CreateNewUser = inngest.createFunction(
    { id: 'create-user',retries:1 },
    { event: 'user.create' },
    async ({ event, step }) => {
        const {user}=event.data;
        // Get Event Data
        const result = await step.run('Check User and create New if Not in DB', async () => {
            // Check Is User Already Exist
            const result = await db.select().from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress))

            if (result?.length == 0) {
                //If Not, Then add to DB
                const userResp = await db.insert(USER_TABLE).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress
                }).returning({ USER_TABLE })
                return userResp;
            }

            return result;
        })

        return 'Success';
    }

    // Step is to Send Welecome Email notification

    // Step to Send Email notification After 3 Days Once user join it
)

export const GenerateNotes=inngest.createFunction(
    {id:'generate-course',retries:1},
    {event:'notes.generate'},
    async({event,step})=>{
        const {course}=event.data; // All Record Info

        // Generate Notes for Each Chapter with AI
        const notesResult=await step.run('Generate Chapter Notes',async()=>{
            const Chapters=course?.courseLayout?.chapters;
            let index=0;
            // Chapters.forEach(async(chapter)=>{
                for (const chapter of Chapters) {// Used for loop to make async Call and wait to complete execution
                const PROMPT='Generate '+course?.courseType+' material detail content for each chapter , Make sure to give notes for each topics from chapters, Code example if applicable in <precode> tag also markHeight the key points and add style for each tags and give the response in HTML format (Do not Add HTML , Head, Body, title tag), The chapter content is :'+ JSON.stringify(chapter)+" ";
                const result=await generateNotesAiModel.sendMessage(PROMPT);
                const aiResp=result.response.text();
                    console.log(PROMPT)
                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId:index,
                    courseId:course?.courseId,
                    notes:aiResp
                })
                index=index+1;

            // })
                }
            return Chapters;
        })

        // Update Status to 'Ready'
        const updateCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
            const result=await db.update(STUDY_MATERIAL_TABLE).set({
                status:'Ready'
            }) .where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
            return 'Success';
        });

    }
)


// Used to generate Flashcard, Quiz, Question Answer
export const GenerateStudyTypeContent=inngest.createFunction(
    {id:'Generate Study Type Content',retries:1},
    {event:'studyType.content'},

    async({event,step})=>{
        const {studyType,prompt,courseId,recordId}=event.data;

        const AiResult= await step.run('Generating Flashcard using AI',async()=>{
            const result= 
            studyType=='Flashcard'?
            await GenerateStudyTypeContentAiModel.sendMessage(prompt):
            await GenerateQuizAiModel.sendMessage(prompt);
            const AIResult= JSON.parse(result.response.text());
            return AIResult
        })

        // Save the Result

        const DbResult=await step.run('Save Result to DB',async()=>{
            const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
            .set({
                content:AiResult,
                status:'Ready'
            }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
            

            return 'Data Instered'
        })
    }

)


