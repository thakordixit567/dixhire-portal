import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url),saved: saved_jobss(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs!:", error);
    return null;
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteerror } = await supabase
      .from("saved_jobss")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteerror) {
      console.error("Error Deleteting Saved Jobs Jobs!:", deleteerror);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobss")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error fetching jobs!:", insertError);
      return null;
    }
    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*,  company:companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}
