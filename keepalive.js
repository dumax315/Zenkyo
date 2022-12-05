import { createClient } from "@supabase/supabase-js"
const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')


const { data: { user } } = await supabase.auth.getUser()
console.log(user)
if(user != null){
  document.getElementById("email").innerText = user.email
}


supabase.auth.onAuthStateChange((event, session) => {
  console.log("event")
  console.log(event,session)
  if(session != null){
    document.getElementById("email").innerText = session.user.email
  }else{
    document.getElementById("email").innerText = "null"
  }
});

const { data, error } = await supabase.auth.signInWithPassword({
  email: "bco11564@cdfaq.com",
  password: "testtest"
});
