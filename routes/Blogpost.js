const router = require("express").Router();
const axios =require('axios');
let newarry = [];

router.get("/", (req, res) => {
    
    axios.get('https://hatchways.io/api/assessment/blog/posts')
    .then((res)=>{

        res.data.posts.map((post)=>{
            newarry.push(post)
        })
    
    })
    .catch((err)=>{
        console.log(err)
    })
 
  // Remove duplicate

    let uniqueArry = [];
    newarry.map(a => uniqueArry.filter(b => a.id == b.id ).length > 0 ? null : uniqueArry.push(a));

  // filter result with tag

    let searchResult = uniqueArry.filter(
      item =>{
        if(req.query.tag ==''){
          return res.json({"error":'Tags parameter is required'})
        }
        else{
          return item.tags.indexOf(req.query.tag) !== -1 
        }   
      }
  )

  //sort by parameter 

   let sortResult = searchResult.sort(
    (a,b)=>{
    if(req.query.sortBy ==''|| (req.query.sortBy!== "reads" && req.query.sortBy !== "id" &&  req.query.sortBy !== "likes" && req.query.sortBy !== "popularity")){
        return res.json({"error":'SortBy parameter is invalid'})
    }
    else if(req.query.sortBy ==='id'){
      return a.id - b.id
    }
    else if(req.query.sortBy =='likes'){
      return a.likes - b.likes
    }
    else if(req.query.sortBy =='popularity'){
      return a.popularity - b.popularity
    }
    else if(req.query.sortBy =='reads'){
      return a.reads - b.reads
    }   
  }
  )

  //display in ascending or descending order
  
 let finalResult = () =>{
    if(req.query.direction =='' || (req.query.direction !== "asc" && req.query.direction !== "desc")){
      return res.json({"error":'direction parameter is invalid'})
    }
    else if (req.query.direction =='asc'){
      return sortResult
    }
    else if (req.query.direction =='desc'){
      return sortResult.reverse()
    }
 }
 
  res.json({"posts": finalResult()})

});

module.exports = router;