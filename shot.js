const {chromium}=require("playwright");
const EXE="/sessions/quirky-zealous-babbage/.cache/ms-playwright/chromium-1228/chrome-linux/chrome";
(async()=>{
 const b=await chromium.launch({executablePath:EXE});
 const p=await b.newPage({viewport:{width:1320,height:960}});
 const errs=[];p.on("pageerror",e=>errs.push(String(e)));
 await p.goto("file://"+process.cwd()+"/index.html",{waitUntil:"networkidle"});
 await p.click('.nav-item[data-key=loans] .nav-trigger');await p.waitForTimeout(400);
 await p.screenshot({path:"shot_loans.png"});
 await p.click('.nav-item[data-key=resources] .nav-trigger');await p.waitForTimeout(400);
 await p.screenshot({path:"shot_resources.png"});
 console.log("pageerrors:",errs.length,errs.join(" | "));
 await b.close();console.log("ok");
})().catch(e=>{console.error(String(e).split("\n")[0]);process.exit(1);});
