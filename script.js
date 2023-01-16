    let category;
    let level;
    let mydata;
    let a;
    
    function changeCategory(e) {
        // console.log(e.target.name)
        category=e.target.name;
        
        document.getElementById("choice-box").classList.add("choice-box")
        document.getElementById("level-box").classList.remove("level-box");
        console.log(category)


    }
    function homechange(){
        document.getElementById("home1").style.visibility ="hidden";
        var a=document.getElementById("entername").value
        console.log(a)
        document.getElementById("q").innerText=`Choose Your Category ${a}`

        document.getElementById("choice-box").classList.remove("choice-box")

        


        
    }
    function changeLevel(e) {
        
        level=e.target.name;
        document.getElementById("home1").style.visibility ="hidden"
       

        document.getElementById("level-box").classList.add("level-box")
        document.getElementById("choice-box").classList.add("choice-box")
        document.getElementById("quiz_start").style.visibility ="visible"
    
        console.log(level)
        getapi();
        

    }


    //on submit 
    document.getElementById("submitforname").addEventListener("click",homechange)
    //this is for home page
    document.getElementById("quiz-game").addEventListener("click",homechange)
    //this is for category page
    document.getElementById("linux").addEventListener("click",changeCategory)
    document.getElementById("devops").addEventListener("click",changeCategory)
    document.getElementById("code").addEventListener("click",changeCategory)
    document.getElementById("bash").addEventListener("click",changeCategory)
    document.getElementById("cloud").addEventListener("click",changeCategory)
    document.getElementById("docker").addEventListener("click",changeCategory)
    document.getElementById("cms").addEventListener("click",changeCategory)
    //this is for level page
    document.getElementById("easy").addEventListener("click",changeLevel)
    document.getElementById("medium").addEventListener("click",changeLevel)
    document.getElementById("hard").addEventListener("click",changeLevel)

async function getapi() {
    
    
    
    
const api_url =`https://quizapi.io/api/v1/questions?apiKey=EWHQj2uzSqBLde7QYYK9U6CSVjEBUxqhGv1XCPfn&category=${category}&difficulty=${level}&limit=7`;
    

// Storing response
const response = await fetch(api_url);

// Storing data in form of JSON
const mydata = await response.json();
console.log(mydata)


  


let questionCount=0;
let score=0    

const question=document.querySelector('.question');
const option1=document.querySelector('#option1');
const option2=document.querySelector('#option2');
const option3=document.querySelector('#option3');
const option4=document.querySelector('#option4');
const submit=document.querySelector('#submit');
const answers=document.querySelectorAll('.answer'); 
const total_score=document.querySelector('#showScore') 


const loadQuestion=()=>{
console.log(mydata)



question.innerText="("+(questionCount+1)+")"+mydata[questionCount].question;

option1.innerText=mydata[questionCount].answers["answer_a"]; 
option2.innerText=mydata[questionCount].answers["answer_b"];
option3.innerText=mydata[questionCount].answers["answer_c"];
option4.innerText=mydata[questionCount].answers["answer_d"];



}
loadQuestion()
function getCheckAnswer(){
let answer;
answers.forEach((curAnsElem)=>{
   if (curAnsElem.checked){
       answer=curAnsElem.id
   }
});
return answer;

};
const deselectAll = ()=>{
answers.forEach((curAnsElem) => curAnsElem.checked=false);
}

submit.addEventListener('click',()=>{
const checkedAnswer=getCheckAnswer()
console.log(checkedAnswer)
let a=checkedAnswer+"_correct"
console.log(a)
for (let k in Object.keys(mydata[questionCount].correct_answers)){
    if (Object.values(mydata[questionCount].correct_answers)[k] =="true" ){
        if (Object.keys(mydata[questionCount].correct_answers)[k]==a){
            score++
            console.log(score)
        }
        
    }   
}


questionCount++
deselectAll();
if (questionCount<mydata.length){
    loadQuestion(questionCount)
}
else{
        total_score.innerHTML=`<h3>${score}/${mydata.length}</h3>   
                 <button class="btn" onclick="location.reload()">Play again</button>`;
        total_score.classList.remove('scoreArea');
    }


})



}
