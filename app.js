var express = require("express");
var session = require("express-session");
var path = require("path");
const expressValidator = require("express-validator");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var passport = require("passport");
var MySqlStore = require("express-mysql-session")(session);

var index = require("./routes/index");
var register = require("./routes/register");
var login = require("./routes/login");
var forgot = require("./routes/forgotPassword");
var logout = require("./routes/logout");
var rules = require("./routes/rules");
var aboutus = require("./routes/aboutus");
var howtoplay = require("./routes/howtoplay");
var leaderboard = require("./routes/leaderboard");
var answerLog = require("./routes/answer-log");
var resume = require("./routes/resume");
var level1 = require("./routes/levels/level1");
var level2 = require("./routes/levels/level2");
var level3 = require("./routes/levels/level3");
var level4 = require("./routes/levels/level4");
var level5 = require("./routes/levels/level5");
var level6 = require("./routes/levels/level6");
var level7 = require("./routes/levels/level7");
var level8 = require("./routes/levels/level8");
var level9 = require("./routes/levels/level9");
var level10 = require("./routes/levels/level10");
var level11 = require("./routes/levels/level11");
var level12 = require("./routes/levels/level12");
var level13 = require("./routes/levels/level13");
var level14 = require("./routes/levels/level14");
var level15 = require("./routes/levels/level15");
var level16 = require("./routes/levels/level16");
var level17 = require("./routes/levels/level17");
var level18 = require("./routes/levels/level18");
var level19 = require("./routes/levels/level19");
var level20 = require("./routes/levels/level20");
var level21 = require("./routes/levels/level21");
var level22 = require("./routes/levels/level22");
var level23 = require("./routes/levels/level23");
var level24 = require("./routes/levels/level24");
var level25 = require("./routes/levels/level25");
var level26 = require("./routes/levels/level26");

var level27 = require('./routes/levels/level27');
var level28 = require('./routes/levels/level28');
var level29 = require('./routes/levels/level29');
var level30 = require('./routes/levels/level30');
var level31 = require('./routes/levels/level31');

var level32 = require('./routes/levels/level32');
var level33 = require("./routes/levels/level33");
var level34 = require("./routes/levels/level34");
var level35 = require("./routes/levels/level35");
var level36 = require("./routes/levels/level36");
var level37 = require('./routes/levels/level37');
var finish=require('./routes/levels/finish');

var sorts = require("./routes/levels/sorts");//sorts fake page

require("./config/passport")(passport);
require("dotenv").config();

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressValidator());

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

var sessionStore = new MySqlStore(options);

app.use(
  session({
    secret: "thisisatopsecret",
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
  })
); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", index);
app.use("/register", register);
app.use("/login", login);
app.use("/forgot", forgot);
app.use("/logout", logout);
app.use("/rules", rules);
app.use("/leaderboard", leaderboard);
app.use("/answer-log", answerLog);
app.use("/aboutus", aboutus);
app.use("/howtoplay", howtoplay);
app.use("/resume", resume);
app.use("/firstone", level1); //updated
app.use("/techtatva20", level2); //updated
app.use("/pub", level3); //updated
app.use("/language", level4); //updated
app.use("/motto", level5); //updated
app.use("/ryandahl", level6); //updated
app.use("/12.31.99", level7); //updated
app.use("/rockstar", level8); //updated
app.use("/V.I", level9); //updated
app.use("/tictactoe", level10); //updated
app.use("/valorant", level11); //updated
app.use("/ledger", level12); //updated
app.use("/rot", level13); //updated
app.use("/carpeuel", level14); //updated
app.use("/http", level15); //updated
app.use("/letitload", level16); //updated
app.use("/hiddeninplainsight", level17); //updated
app.use("/sort", level18); //updated
app.use("/s0rt", level19); //updated //need to check this
app.use("/yum", level20); //updated
app.use("/droptek", level21); //updated
app.use("/bigblue", level22); //updated
app.use("/security", level23); //updated
app.use("/silentf", level24); //upated
app.use("/style", level25);//updated
app.use("/gibberish", level26);//updated

app.use('/ghanta',level27);
app.use('/iiiiiiiiiii',level28);
app.use('/windmill',level29);
app.use('/km',level30);
app.use('/eyrie',level31);

app.use('/nlogn',level32);
app.use('/code',level33);
app.use('/coredumped',level34);
app.use('/pipe',level35);
app.use('/years',level36);
app.use('/blank',level37);
app.use("/finish", finish); 


app.use("/sorts",sorts); //idk if it works to make person stuck here



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("error", { errorStatus: err.status, errorMessage: err.message });
});

module.exports = app;
