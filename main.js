import { createClient } from "@supabase/supabase-js"
const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')





supabase.auth.onAuthStateChange((event, session) => {
  console.log("event")
  console.log(event,session)
  if(session != null){
    setUser(session.user)
  }else{
    setUser(null)
  }
  
});

function setUser(user) {
  // configers the ui based on the loged in user
  if(user == null){
    // document.getElementById("signedinPoints").style.display = "none"
    // document.getElementById("notSignedinPoints").style.display = "inline"
    document.getElementById("signedin").style.display = "none"
    document.getElementById("notSignedin").style.display = "inline"
    document.getElementById("email").innerText = "null"
  }else{
    document.getElementById("email").innerText = user.email
    document.getElementById("signedin").style.display = "inline"
    document.getElementById("notSignedin").style.display = "none"
    // document.getElementById("signedinPoints").style.display = "inline"
    // document.getElementById("notSignedinPoints").style.display = "none"
  }
}


async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  // window.location.reload();
}

document.getElementById("signOutButton").addEventListener('click', handleSignOut);