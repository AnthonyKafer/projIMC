const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];
// Vars
const tableContainer = document.querySelector("#tableContainer")
const calculatorContainer = document.querySelector(".calculatorContainer")
const resultContainer = document.querySelector(".resultContainer")
const spanImc = document.querySelector("#imc")
const spanInfo = document.querySelector("#info")
const firstLabel = document.querySelector("#label1")
const secondLabel = document.querySelector("#label2")

const heigthInput = document.querySelector("#heigthInput")
const weigthInput = document.querySelector("#weigthInput")

const calcBtn = document.querySelector("#submitButton")
const cleanBtn = document.querySelector("#cleanButton")
const backBtn = document.querySelector("#backButton")


// Funcs

function createTable (data){
    data.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("tableResult")

        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p")
        info.innerText = item.info

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        tableContainer.appendChild(div)
    });
}
createTable(data)

function showWarning(label, message, timeout){
    const warning = document.createElement("p")
    warning.classList.add("warning")
    warning.innerText = message
    label.appendChild(warning)
    setTimeout(()=>{
      label.removeChild(warning)
    },timeout)
}

function calcImc(height, weight){
    const imc = (weight / (height * height)).toFixed(1)
    return imc
}

function clearInputs(){
  heigthInput.value = ""
  weigthInput.value = ""
  imc.className = ""
  spanInfo.className = ""
}

function toggleVisualization(){
    calculatorContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

function validNumbers(text){
  return text.replace(/[^0-9,]/g, "")
}


// Behavior
[heigthInput,weigthInput].forEach((el)=>{
  el.addEventListener("input", (e)=>{
    const updatNumber = validNumbers(e.target.value)
    e.target.value = updatNumber
  })
  el.addEventListener("input",(e)=>{
    if(heigthInput.value || weigthInput.value){
      cleanBtn.removeAttribute("disabled")
    }else{
      cleanBtn.setAttribute("disabled", true)
    }
  })
})


calcBtn.addEventListener("click", (event)=>{
  event.preventDefault()

  const height = heigthInput.value.replace(",", ".")
  const weight = weigthInput.value.replace(",", ".")

  if(!height || !weight) return
  const imc = calcImc(height, weight)

  let info
  data.forEach((item)=>{
    if(imc>=item.min && imc<=item.max){
      info = item.info
    }
  })

  if(!info){
    const message = "Valores inválidos"
    const timeout = 1000
    showWarning(firstLabel, message, timeout)
    showWarning(secondLabel, message, timeout)
    return}

    spanImc.innerText = imc
    spanInfo.innerText = info

  switch(info){
    case "Magreza":
    spanImc.classList.add("low")
    spanInfo.classList.add("low")
    break
    case "Normal":
    spanImc.classList.add("normal")
    spanInfo.classList.add("normal")
    break
    case "Sobrepeso":
    spanImc.classList.add("low")
    spanInfo.classList.add("low")
    break
    case "Obesidade":
    spanImc.classList.add("medium")
    spanInfo.classList.add("medium")
    break
    case "Obesidade grave":
    spanImc.classList.add("high")
    spanInfo.classList.add("high")
    break
  }

  toggleVisualization()
})

cleanBtn.addEventListener("click", (e)=>{
  e.preventDefault()  
  clearInputs()
  cleanBtn.setAttribute("disabled", true) 
})

backBtn.addEventListener("click", ()=>{
  toggleVisualization()
  clearInputs()
})