import { createClient } from "@supabase/supabase-js"
const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')


const { data: { user } } = await supabase.auth.getUser()
console.log(user)
if(user != null){
  // Simulate an HTTP redirect:
  window.location.replace("./");
  document.getElementById("email").innerText = user.email
}


supabase.auth.onAuthStateChange((event, session) => {
  console.log("event")
  console.log(event,session)
  if(session != null){
    window.location.replace("./");
    document.getElementById("email").innerText = session.user.email
  }else{
    document.getElementById("email").innerText = "null"
  }
});


async function handleSignUp() {
  let email = document.getElementById('uname').value;
  let pass = document.getElementById('psw').value;
  if(email == "" || pass.length < 6){
    document.getElementById("error").innerText = "password needs to be 6 characters or more"
    return
  }
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: pass
  });

  if (error == null){
    location.href='/checkEmail.html'
  }
}

async function handleLogIn() {
  let email = document.getElementById('uname').value;
  let pass = document.getElementById('psw').value;
  if(email == "" || pass.length < 6){
    document.getElementById("error").innerText = "password needs to be 6 characters or more"
    return
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: pass
  });
}

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
}

async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
}

try {
  document.getElementById("signUpButton").addEventListener('click', handleSignUp);
} catch (TypeError) {
  console.log("not a signup page: " + TypeError)
}
try {
  document.getElementById("logInWithGoogle").addEventListener('click', signInWithGoogle);
  document.getElementById("logInWithGithub").addEventListener('click', signInWithGitHub);
  document.getElementById("logInButton").addEventListener('click', handleLogIn);
} catch (TypeError) {
  console.log("not a log in page: " + TypeError)
}
