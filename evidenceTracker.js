import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from "@supabase/supabase-js"

const supabase = createClient('https://eugkwexbdibdyazlxxfz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2t3ZXhiZGliZHlhemx4eGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAyMDM2MzIsImV4cCI6MTk4NTc3OTYzMn0.zYgF-kvwVFR529mf2z6Ss0wZCUM59tJ99NPc-_OVaq8')

//get list of posts to edit
async function loadCases() {
  
  const { data: { user } } = await supabase.auth.getUser()
  if(user == null) {
    // alert("please log in acces the case creator")
    window.location.href = "./signup.html";
    return;
  }
  const postBody = document.getElementById("cases");
  let { data: case_editors, error } = await supabase
    .from('case_editors')
    .select("*")
    .eq('email', user.email)
  
  console.log(case_editors)

  case_editors.forEach((case_unit, index) => {
    const item = document.createElement("li");
    item.innerText = case_unit.title
    item.classList = "caseItem"
    
    // item.uuid = case_editors.uuid
    postBody.appendChild(item);

  });

  if(case_editors.length == 0){
    document.getElementById("currentCase").style.display = "none"
    document.getElementById("makeAFirstCase").style.display = "block"
    return
  }
  document.getElementById("makeAFirstCase").style.display = "none"
  document.getElementById("currentCase").style.display = "block"
  const replyForms = document.getElementsByClassName("caseItem");
    
  for (let i = 0; i < replyForms.length; i++){
    // console.log(replyForms[i])
    replyForms[i].addEventListener('click', function () { openCase(case_editors[i]); })
  }

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value= {"case_uuid": params.uuid}; // "some_value
  
  if ( value.case_uuid == null){
    openCase(case_editors[0])
  }else{
    openCase(value)
  }
  

}
function reopenCase() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value= {"case_uuid": params.uuid}; // "some_value
  
  if ( value.case_uuid == null){
    window.location.reload();
  }else{
    openCase(value)
  }
}
function viewTest(index){
  console.log(document.getElementsByClassName("caseEditorsImagesItem"))

  Array.from(document.getElementsByClassName("caseEditorsImagesItem")).forEach((el, inde) => {
    console.log(inde,index)
    if(inde ==index){
      el.classList = "caseEditorsImagesItem caseEditorsImagesItemActive"
    }else{
      el.classList = "caseEditorsImagesItem"
    }
  })
  Array.from(document.getElementsByClassName("testimonialCarouselItem")).forEach((el, inde) => {
    console.log(inde,index)
    if(inde ==index){
      el.classList = "testimonialCarouselItem testimonialCarouselItemActive"
    }else{
      el.classList = "testimonialCarouselItem"
    }
  })
  console.log()
}
// render posts
let currentCase;
let simplemde;
async function openCase(caseToOpen) {
  if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search)
      searchParams.set("uuid", caseToOpen.case_uuid);
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.pushState(null, '', newRelativePathQuery);
  }
  
  const colors = ["#7A7AE0","#CA65E3","#D78557","#A8D978","#ECDF6B"]
  const { data: { user } } = await supabase.auth.getUser()
  console.log(caseToOpen)
  currentCase = caseToOpen.case_uuid
  let { data: cases2, error } = await supabase
    .from('cases2')
    .select("*")
  
    // Filters
    .eq('uuid', caseToOpen.case_uuid)

  const replyForms = document.getElementsByClassName("caseItem");
  Array.from(replyForms).forEach((el, inde) => {
    if(el.innerText == cases2[0].title){
      el.classList = "caseItem caseActive"
    }else{
      el.classList = "caseItem"
    }
  })
  console.log(cases2)
  document.getElementById("caseTitle").innerText = cases2[0].title
  if(cases2[0].data.date == null){
    document.getElementById("caseDate").innerText  = "Enter Date"
  }else {
    document.getElementById("caseDate").innerText  = DOMPurify.sanitize(cases2[0].data.date)
  }

  if(cases2[0].data.location == null){
    document.getElementById("caseLocation").innerText = "Enter Location"
  }else {
    document.getElementById("caseLocation").innerText  = DOMPurify.sanitize(cases2[0].data.location)
  }
  
  document.getElementById("caseEditors").innerHTML = ""
  document.getElementById("caseEditorsImages").innerHTML = ""
  
  let index = 0;
  for (let testimonialWriter of Object.keys(cases2[0].data.testimonial)) {
    const item = document.createElement("li");
    item.innerText = testimonialWriter
    item.classList = "caseEditorsItem"
    item.style.background = colors[index%5]
    // item.uuid = case_editors.uuid
    document.getElementById("caseEditors").appendChild(item);
    
    const item2 = document.createElement("li");
    item2.classList = "caseEditorsImagesItem"
    if(testimonialWriter == user.email){
      item2.classList += " caseEditorsImagesItemActive"
    }
    let e = index
    item2.addEventListener('click', function() {viewTest(e)});
    item2.style.background = colors[index%5]
    // item.uuid = case_editors.uuid
    document.getElementById("caseEditorsImages").appendChild(item2);
    
    index++;
  }
  document.getElementById("caseEditorsTestimonial").innerHTML = ""
  console.log(cases2[0].data.testimonial)
  for (let testimonialWriter of Object.keys(cases2[0].data.testimonial)) {
    if(testimonialWriter == user.email){
      const item = document.createElement("textarea");
      // item.innerText = cases2[0].data.testimonial[testimonialWriter]
      
      // item.uuid = case_editors.uuid
      let container = document.createElement("div")
      container.classList = "testimonialCarouselItem testimonialCarouselItemActive"
      item.setAttribute("id", "testimonialWithEditor");
      container.appendChild(item);
      document.getElementById("caseEditorsTestimonial").appendChild(container)
      simplemde = new SimpleMDE({ element: document.getElementById("testimonialWithEditor") });
      simplemde.value(cases2[0].data.testimonial[testimonialWriter]);
    }else{
      const item = document.createElement("div");
      item.innerHTML = testimonialWriter + ":</br>"+DOMPurify.sanitize(marked.parse(cases2[0].data.testimonial[testimonialWriter]))
      
      item.classList = "testimonialCarouselItem"

      // item.uuid = case_editors.uuid
      document.getElementById("caseEditorsTestimonial").appendChild(item);
      
    }

    document.getElementById("mediaCarousel").innerHTML = ""
    cases2[0].data.media.forEach(storageUrl => {
      
      const item = document.createElement("img");
      const { storageUrls } = supabase
        .storage
        .from('ev-2')
        .getPublicUrl(storageUrl)
      console.log(storageUrl)
      console.log(storageUrls)
      item.src = "https://eugkwexbdibdyazlxxfz.supabase.co/storage/v1/object/public/ev-2/"+ encodeURIComponent(storageUrl);
      item.classList = "caseMediaItem"

        // item.uuid = case_editors.uuid
      document.getElementById("mediaCarousel").appendChild(item);
    });

  }
}

async function createCase() {
  
  const { data: { user } } = await supabase.auth.getUser()
  if(user == null) {
    // alert("please log in to create a case")
    return;
  }
  let person = prompt("Enter the case title", "title");
  if (person == null || person == "") {
    return;
  }
  let title = person
  console.log({ email: user.email, title: title,data:{},media:{}})
  
  const { data, error } = await supabase
    .from('cases2')
    .insert([
        { email: user.email, title: title, data:{
          media:[],
          testimonial:{[user.email]:""},
          date:null,
          location:null,
          pfpLink:null,
        }
        },
    ])
    .select("*")
    
    .eq('email', user.email)

  console.log(data[0].uuid)
  const { dataEd, errorEd } = await supabase
    .from('case_editors')
    .insert([
      { email: user.email, case_uuid: data[0].uuid, title: title},
    ])

  console.log()
  window.location.reload();
}

async function uploadMedia() {
  let file = document.getElementById("caseMediaUploadInput").files[0]
  console.log(file)

     
  let { data: cases2, error } = await supabase
    .from('cases2')
    .select("*")
  
    // Filters
    .eq('uuid', currentCase)

  console.log(cases2[0].data)
  // cases2.data.media
  const { data2, error2 } = await supabase
    .storage
    .from('ev-2')
    .upload(currentCase+"/"+file.name, file, {
      cacheControl: '3600',
      upsert: false
    })
  if(error != null){
    alert("error with file upload, try again with different file name " +error)
    return;
  }
  let dataToSend = cases2[0].data
  dataToSend.media.push(currentCase+"/"+file.name)
  console.log(dataToSend)
  const { error3 } = await supabase
    .from('cases2')
    .update({ data: dataToSend})
    .eq('uuid', currentCase)
  console.log(error3)
  reopenCase()
}

async function testimonialUpdate() {
  const { data: { user } } = await supabase.auth.getUser()
  let { data: cases2, error } = await supabase
    .from('cases2')
    .select("*")
  
    // Filters
    .eq('uuid', currentCase)

  console.log(cases2[0].data)
  let dataToSend = cases2[0].data
  dataToSend.testimonial[user.email] = simplemde.value()
  console.log(dataToSend)
  const { error3 } = await supabase
    .from('cases2')
    .update({ data: dataToSend})
    .eq('uuid', currentCase)
  console.log(error3)
  reopenCase()
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
async function addEditor() {
  let person = prompt("Please enter the new editor's email", "email");
  if (person == null || person == "") {
    return;
  }
  if(!validateEmail(person)){
    return;
  }
  const { data: { user } } = await supabase.auth.getUser()
  let { data: cases2, error } = await supabase
    .from('cases2')
    .select("*")
  
    // Filters
    .eq('uuid', currentCase)

  console.log(cases2[0].data)
  let dataToSend = cases2[0].data
  dataToSend.testimonial[person] = ""
  console.log(dataToSend)
  const { error3 } = await supabase
    .from('cases2')
    .update({ data: dataToSend})
    .eq('uuid', currentCase)

  
  console.log(error3)
  const { dataEd, errorEd } = await supabase
    .from('case_editors')
    .insert([
      { email: person, case_uuid: cases2[0].uuid, title: cases2[0].title},
    ])
  reopenCase()
}
async function changeDate(thingToChange) {
  let person = prompt("Please enter the new "+thingToChange);
  if (person == null || person == "") {
    return;
  }
  const { data: { user } } = await supabase.auth.getUser()
  let { data: cases2, error } = await supabase
    .from('cases2')
    .select("*")
  
    // Filters
    .eq('uuid', currentCase)

  console.log(cases2[0].data)
  let dataToSend = cases2[0].data
  dataToSend[thingToChange] = person
  console.log(dataToSend)
  const { error3 } = await supabase
    .from('cases2')
    .update({ data: dataToSend})
    .eq('uuid', currentCase)

  
  console.log(error3)

  reopenCase()
}
// let simplemde = new SimpleMDE({ element: document.getElementById("MyID") });

// document.getElementById("refreshPosts").addEventListener('click', loadPosts);
document.getElementById("createCase").addEventListener('click', createCase);
document.getElementById("makeAFirstCase").addEventListener('click', createCase);


document.getElementById("caseMediaUpload").addEventListener('click', uploadMedia);
document.getElementById("testimonialUpdate").addEventListener('click', testimonialUpdate);
document.getElementById("addEditors").addEventListener('click', addEditor);
// document.getElementById("postButton").addEventListener('click', post);
document.getElementById("dateDivToClick").addEventListener('click', function() {changeDate("date")});
document.getElementById("locDivToClick").addEventListener('click', function() {changeDate("location")});

loadCases()