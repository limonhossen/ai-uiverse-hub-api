let getDateData = [];
const loadData = async(isTrue,dataLimit) =>{
    const url=(`https://openapi.programming-hero.com/api/ai/tools`);
    if(isTrue){
        try {
            const res = await fetch(url);
            const data = await res.json();
            getDateData = data.data;
           // console.log('hi');
           // console.log(getDateData);
            //console.log(dataLimit);
            console.log(data.data);
            //displayCardDetails(data.data.tools,dataLimit);
            
            sortedByDate1(data.data);

            
        } catch (error) {
            console.log(error);
        }
    }
        
    
    else{
        try {
            
            const res = await fetch(url);
            const data = await res.json();
            getDateData = data.data;
           // console.log(getDateData);
            //console.log(dataLimit);
            displayCardDetails(data.data.tools,dataLimit);
            
        } catch (error) {
            console.log(error);
        }
    }

}



const displayCardDetails = (hubs,dataLimit) =>{
  
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    
   
    //hubs = hubs.slice(0,3);
    //console.log(hubs.tools);
  
    


     const showAll = document.getElementById('show-all');
    if(dataLimit > 6 && hubs.length > 6){
        
        //  hubs.tools= hubs.slice(0,6);
        //  hubs=hubs.tools;
        //  showAll.classList.remove('d-none');
        showAll.classList.add('d-none');
         
    }
    else{
        //showAll.classList.add('d-none');
         hubs.tools= hubs.slice(0,6);
         hubs=hubs.tools;
         showAll.classList.remove('d-none');
   
    }
    //getFeatureData = hubs.tools;
    //featureElements(getFeatureData);
    hubs.forEach(hub => {

        
        const {image,name,features,published_in,id} = hub;
        

        //console.log(features);
        cardContainer.innerHTML += ` 
            <div class="col">
                <div class="card h-100 w-full h-96">
                <img src=${image} class="card-img-top h-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <p class="card-text">1. ${features[0]?features[0]:"No Data Found"}.</p>
                    <p class="card-text">2. ${features[1]?features[1]:"No Data Found"}.</p>
                    <p class="card-text">3. ${features[2]?features[2]:"No Data Found"}.</p>
                    <p class="card-text">4. ${features[3]?features[3]:"No Data Found"}.</p>
                 
                </div>
                
                <div class="card-footer bg-white border-0 ">
                    <hr class="bg-black shadow-lg">
                    <div class="d-flex justify-content-between">
                        <div>  
                            <h5 class="card-title">${name}</h5>
                            <small class="text-muted">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                            ${published_in}</small>
                         </div>
                        <div class="">
                            <button type="button" onclick="loadItemDetails('${id}')" class="btn btn-outline-danger rounded-circle">
                            <i class="fas fa-arrow-right pt-2 pl-5"  data-bs-toggle="modal"
                            data-bs-target="#itemDetailModal"></i> </button>
                        </div>
                    </div>
                   
                    
                  
                </div>
                </div>
            </div>`
    });

    //stop loader
    toggleSpinner(false);
   
    
}





//toggle
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// 



// btn show 
document.getElementById('btn-show-all').addEventListener('click',function(){
    toggleSpinner(true);
    //sortedByDate(true);
    if(sortedByDate()===false){
        loadData(false);
    }
    loadData(true);
})

//loadItemDetails
const loadItemDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayItemDetails(data.data)   
    } catch (error) {
        console.log(error);
    }
  
}

// displayItemDetails
const displayItemDetails = hub =>{
    //console.log('hi');
    console.log(hub.accuracy);
    // const modalTitle = document.getElementById('itemDetailModalLabel');
    // modalTitle.innerText = hubs.tool_name;
    const modalBody = document.getElementById('item-details');
    const {image_link,description,pricing,features,integrations,input_output_examples,accuracy} = hub;
    //console.log(Object.keys(features));
    //console.log(Object.values(features)[0].feature_name);
    const acc = accuracy.score;
    console.log(acc);
    let percent;
    percent = (acc*100);
    console.log(percent);
    // if(acc== null)
    // {
      
      
    // }
    // else{
    //      percent = (acc*100);
    // }
    
    
    
    //console.log(per);
    modalBody.innerHTML = `
    <div class="card border-0 d-flex flex-md-row gap-2" style="max-width: 740px; ">
    
      
            <div class="card-body shadow-lg border border-danger rounded col-md-6" style="background-color:#fad1d0">
                <h5 class="card-title">${description.slice(0,20)}...</h5>
                <div class="card border-0 d-flex flex-md-row gap-2">
                    <div class="col-md-3 shadow-lg rounded">
                    <p class="text-center mt-2" style="color:green;font-size:12px;">${pricing[0].price !=0?pricing[0].price.slice(0,4):'Free of Cost/'}<br>${pricing[0].price?pricing[0].price.slice(4,10):''}<br><span>${pricing[0].plan?pricing[0].plan:'Basic'}</span></p>
                    </div>
                    <div  class="col-md-4 shadow-lg rounded">
                    <p class="text-center mt-2" style="color:orange;font-size:12px;">${pricing[1].price != 0?pricing[1].price.slice(0,4):'Free Of Cost/'}<br>${pricing[1].price?pricing[1].price.slice(4,10):''}<br><span>${pricing[1].plan?pricing[1].plan:'Pro'}</span></p>
                    </div>
                    <div  class="col-md-4 shadow-lg rounded">
                    <p class="text-center mt-2" style="color:red;font-size:12px;">${pricing[2].price !=0?pricing[2].price.slice(0,7):'Free of Cost/'}<br>${pricing[2].price?pricing[2].price.slice(7,10):''}<br><span>${pricing[2].plan?pricing[2].plan:'Enterprise'}</span></p>
                    </div>
                </div>
                <div class="d-flex flex-md-row">
                    <div class="col-md-7">
                        <h5 class="card-title mt-3" style="font-size:14px;">Features</h5>
                        <p class="card-text" style="font-size:12px;">* ${Object.values(features)[0].feature_name?Object.values(features)[0].feature_name:"No Data Found"}.</p>
                        <p class="card-text" style="font-size:12px;">* ${Object.values(features)[1].feature_name?Object.values(features)[1].feature_name:"No Data Found"}.</p>
                        <p class="card-text" style="font-size:12px;">* ${Object.values(features)[2].feature_name?Object.values(features)[2].feature_name:"No Data Found"}.</p>
                    </div>
                    <div class="col-md-5">
                        <h5 class="card-title mt-3" style="font-size:14px;">Integrations</h5>
                        <p class="card-text" style="font-size:12px;">* ${integrations[0]?integrations[0]:"No Data Found"}.</p>
                        <p class="card-text" style="font-size:12px;">* ${integrations[1]?integrations[1]:"No Data Found"}.</p>
                        <p class="card-text" style="font-size:12px;">* ${integrations[2]?integrations[2]:"No Data Found"}.</p>
                    </div>

                   
                </div>
            
            </div>
     
            <div class="card-body shadow-lg rounded col-md-6">
                
                        <div class="" style="top:0px;left:0px;position:relative">
                            <img src=${image_link[0]} class="img-fluid rounded-start" alt="...">
                            <div class="" style="top:0px;right:0px;position:absolute">
                            <p id="percentage-btn" type="" class="btn btn-danger" style=" font-size:8px;">${percent !=0 ? percent: "No Data"}% Accuracy</p>
                            </div>
                        </div>
                        
                
                        <div class="">
                        <p class="card-text mt-2">${input_output_examples[0].input}</p>
                        <p class="card-text "style="font-size:12px;">${input_output_examples[0].output?input_output_examples[0].output:"No! Not Yet! Take a break!!!"}</p>
                        </div>
               
            </div>
        
  </div>
    `
};




//show data by sorted
const sortedByDate =() =>{
    console.log(getDateData);
    console.log('abc');
    getDate=getDateData.tools
   
    var sortedArray= getDate.sort((a,b) => Date.parse(new Date(a.published_in)) - Date.parse(new Date(b.published_in)));
    console.log(sortedArray);
    dataLimit = sortedArray.length
   
    console.log(dataLimit);

   
    displayCardDetails(sortedArray,dataLimit=6);
    
    
} 
const sortedByDate1 =(data) =>{
    console.log(data);
    console.log('efg');
    getDate=data.tools
   
    var sortedArray= getDate.sort((a,b) => Date.parse(new Date(a.published_in)) - Date.parse(new Date(b.published_in)));
    console.log(sortedArray);
    dataLimit = sortedArray.length
   
    console.log(dataLimit);

   
    displayCardDetails(sortedArray,dataLimit);
} 