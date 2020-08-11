var express = require("express");
var router = express.Router();
var cors = require("cors");
var Problem = require("../models/Problem");
var vm = require("vm");

//RESTful
router.options("/problems/:problem_id",cors());

router.post("/problems/:problem_id",cors(), async function(req,res,next){
  //console.log(req.params.problem_id); //params를 자동 생성해준데
  const body = req.body;
  //사용자가 풀이한 내용
  const code = body.code;

  try{
    const problem = await Problem.findById(req.params.problem_id);
    let isCorrect = true;

    for (let i = 0; i< problem.tests.length; i++){
      try{
        const script = new vm.Script(code + problem.tests[i].code);
        const result = script.runInNewContext();
        if(`${result}` !== problem.tests[i].solution){
          isCorrect = false;
        }
      }catch(err){
        res.json({
          result:"에러",
          detail: err.message
        });
        return;
      }
    }
    
    if(!isCorrect){
      res.json({result : "오답"});
    }else{
      res.json({result : "정답"});
    }

  }catch(err){
    console.log(err);
    next(err);
  }
});

/* GET home page. */
router.get("/problems", cors(), async function(req, res, next) {
  try{
    const docs = await Problem.find();
    res.json(docs);
  } catch(err){
    next(err);
  }
});

module.exports = router;
