import jobcard from "@/components/jobcard";
import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getApplyJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobcard.resume);

  if (storageError) {
    console.error("Error uploading resumes!", storageError);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  if (error) {
    console.error("Submitting Applicaton Error", error);
    return null;
  }

  return data;
}
