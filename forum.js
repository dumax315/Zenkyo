import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from "@supabase/supabase-js"
const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')


async function reply(id) {
  const { data: { user } } = await supabase.auth.getUser()
  if(user == null) {
    alert("please log in to post")
    return;
  }
  let postid = document.getElementsByClassName("replyInput")[id].getAttribute("postid")
  let start = parseInt(document.getElementById("start").value);
  let { data: forum, error } = await supabase
    .from('forum')
    .select('replys')
    .eq('id', parseInt(postid))
  console.log(forum[0].replys.comments)
  let toSend = {
    comments: forum[0].replys.comments.concat([{
      body:document.getElementsByClassName("replyInput")[id].value,
      email:user.email}]),
              
  }
  console.log(toSend)
  const { data1, error1 } = await supabase
    .from('forum')
    .update({ replys:  toSend})
    .eq('id', parseInt(postid))
  window.location.reload();
}
// render posts
async function loadPosts() {
  
  const postBody = document.getElementById("posts");
  let start = document.getElementById("start").value;
  console.log(start)
  postBody.innerHTML = "";
  let { data: forum, error } = await supabase
    .from('forum')
    .select('*')
    .order('created_at', { ascending: false })
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

    let comments = document.createElement("div")
    let numOfComments = document.createElement("p")
    numOfComments.innerText = element.replys.comments.length + " comments"
    comments.appendChild(numOfComments)

    let commentList = document.createElement("ul")
    // i < 3 && 
    for (let i = 0;i < element.replys.comments.length; i++){
      commentList.innerHTML += "<li>" + DOMPurify.sanitize(element.replys.comments[i].body) + "<span class='commentPoster'> sent by: "+element.replys.comments[i].email+"</span></li>"
    }

    
    comments.appendChild(commentList)
    comments.innerHTML += "<input class='replyInput' type='text' postid='"+element.id+"'></input><button type='submit' class='replySubmitButtons' postid='"+element.id+"'>add comment</button"
    
    containerDiv.appendChild(comments)
    
    postBody.appendChild(containerDiv);

    
    
  });
  const replyForms = document.getElementsByClassName("replySubmitButtons");
    
  for (let i = 0; i < replyForms.length; i++){
    // console.log(replyForms[i])
    replyForms[i].addEventListener('click', function () { reply(i); })
  }

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
      { email: user.email, title: title,body:body, replys: {comments:[] }},
    ])
  window.location.reload();
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
