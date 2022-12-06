import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from "@supabase/supabase-js"
const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')



// render posts
async function loadPosts() {
  
  const postBody = document.getElementById("posts");
  let start = document.getElementById("start").value;
  console.log(start)
  postBody.innerHTML = "";
  let { data: forum, error } = await supabase
    .from('forum')
    .select('*')
    .range(start-1, start+9)

  console.log(forum)
  forum.forEach(element => {
    const containerDiv = document.createElement("div");
    containerDiv.className += "post"
    let title = document.createElement("p")
    title.innerText = element.title
    containerDiv.appendChild(title);
    
    let poster = document.createElement("p")
    poster.innerText = element.email
    containerDiv.appendChild(poster);

    let body = document.createElement("p")
    body.innerHTML = DOMPurify.sanitize(marked.parse(element.body))
    containerDiv.appendChild(body)
    
    postBody.appendChild(containerDiv);
  });

}

async function post() {
  const { data: { user } } = await supabase.auth.getUser()
  if(user == null) {
    alert("please log in to post")
    return;
  }
  let title = document.getElementById("postTitle").value
  let body = document.getElementById("postBox").value
  console.log({ email: user.email, title: title,body:body, replys: {comments:{}} })
  const { data, error } = await supabase
    .from('forum')
    .insert([
      { email: user.email, title: title,body:body, replys: {comments:{}} },
    ])
}

function toglePostBox() {
  if(document.getElementById("postCreator").style.display == "none"){
    document.getElementById("postCreator").style.display = "block";
  }else{
    document.getElementById("postCreator").style.display = "none";
  }
  
}

function updateStart10() {
  let start = parseInt(document.getElementById("start").value);
  document.getElementById("start10").innerText = start+9
}

document.getElementById("postButton").addEventListener('click', post);
document.getElementById("refreshPosts").addEventListener('click', loadPosts);
document.getElementById("createPost").addEventListener('click', toglePostBox);
document.getElementById("closePost").addEventListener('click', toglePostBox);

document.getElementById("start").addEventListener('change', updateStart10);
updateStart10()
loadPosts()
