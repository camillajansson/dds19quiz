/*!
 * jquery-quiz v0.0.1 - A simple jQuery quiz plugin.
 * Copyright (c) 2015 JC Hamill - http://jchamill.github.com/jquery-quiz/
 * License: MIT
 */

var div = document.getElementById('divID');



function endPage(n, g){
  console.log(n, g);
  if (0.5>n/g) {
   window.location = 'losingPage.html'; 
  console.log("losing Page"+ n + g);
  }
  else {
    window.location = 'winningPage.html'; 
    console.log('winning Page'+ n + g);
  }
}

/*function endPageDelete ('divID'){
  div.removeClass()
}
*/
 var count = 0;
  function changeBackground(){
    count += 1;
    $('body').removeClass('newbg1');
    $('body').removeClass('newbg2');
    $('body').removeClass('newbg3');
    $('body').removeClass('newbg4');
    $('body').removeClass('newbg5');
    $('body').addClass('newbg'+count);
    if (count >= 5) {
      count=0;
    }
    console.log(count);
  }
! function(a, b, c, d) {
    "use strict";
    a.quiz = function(b, d) {
        var e = this;
        e.$el = a(b), e.$el.data("quiz", e), e.options = a.extend(a.quiz.defaultOptions, d);
        var f = e.options.questions,
            g = f.length,
            h = e.options.startScreen,
            i = e.options.startButton,
            j = e.options.homeButton,
            k = e.options.resultsScreen,
            l = e.options.gameOverScreen,
            m = 1,
            n = 0,
            o = !1;
        e.methods = {
            init: function() {
                e.methods.setup(), a(c).on("click", i, function(a) {
                    a.preventDefault(), e.methods.start()
                }), a(c).on("click", j, function(a) {
                    a.preventDefault(), e.methods.home()
                }), a(c).on("click", ".answers a", function(a) {
                    a.preventDefault(), e.methods.answerQuestion(this)
                }), a(c).on("click", "#quiz-next-btn", function(a) {
                    a.preventDefault(), e.methods.nextQuestion() 


                }),
                a(c).on("click", "#quiz-next-btn", function() {
                    
       /*        changeBackground()       $('body').addClass('newbg'); */
                
                    
                  }),




                a(c).on("click", "#quiz-finish-btn", function(a) {
                    a.preventDefault(), e.methods.finish()
                }), a(c).on("click", "#quiz-restart-btn, #quiz-retry-btn", function(a) {
                    a.preventDefault(), e.methods.restart()
                })
            },
            setup: function() {
                var b = "";
                e.options.counter && (b += '<div id="quiz-counter"></div>'), b += '<div id="questions">', a.each(f, function(c, d) {
                    b += '<div class="question-container">', b += '<p class="question">' + d.q + "</p>", b += '<ul class="answers">', a.each(d.options, function(a, c) {
                        b += '<li><a href="#" data-index="' + a + '">' + c + "</a></li>"
                    }), b += "</ul>", b += "</div>"
                }), b += "</div>", 0 === a(k).length && (b += '<div id="' + k.substr(1) + '">', b += '<p id="quiz-results"></p>', b += "</div>"),
                 b += '<div id="quiz-controls">', b += '<p id="quiz-response"></p>', b += '<div id="quiz-buttons">', b += '<a href="#" id="quiz-next-btn">Next</a>',
                  b += '<a href="#" id="quiz-finish-btn">Finish</a>', b += '<a href="#" id="quiz-restart-btn">Restart</a>', b += "</div>", b += "</div>",
                   e.$el.append(b).addClass("quiz-container quiz-start-state"), a("#quiz-counter").hide(), a(".question-container").hide(), a(l).hide(),
                    a(k).hide(), a("#quiz-controls").hide()
            },
            start: function() {
                e.$el.removeClass("quiz-start-state").addClass("quiz-questions-state"), a(h).hide(), a("#quiz-controls").hide(), a("#quiz-finish-btn").hide(),
                 a("#quiz-restart-btn").hide(), a("#questions").show(), a("#quiz-counter").show(), a(".question-container:first-child").show().addClass("active-question"),
                  e.methods.updateCounter(), $('body').addClass('newbg1'), changeBackground() 
            },
            answerQuestion: function(b) {
                if (!o) {
                    o = !0;
                    var c = a(b),
                        d = "",
                        g = c.data("index"),
                        h = m - 1,
                        i = f[h].correctIndex;
                    if (g === i) c.addClass("correct"), d = f[h].correctResponse, n++;
                    else if (c.addClass("incorrect"), d = f[h].incorrectResponse, !e.options.allowIncorrect) return void e.methods.gameOver(d);
                    a("#quiz-response").html(d), a("#quiz-controls").fadeIn(), "function" == typeof e.options.answerCallback && e.options.answerCallback(m, g === i)
                }
            },
            nextQuestion: function() {
                o = !1, a(".active-question").hide().removeClass("active-question").next(".question-container").show().addClass("active-question"),
                 a("#quiz-controls").hide(), ++m === g && (a("#quiz-next-btn").hide(), a("#quiz-finish-btn").show()), e.methods.updateCounter(),
                  "function" == typeof e.options.nextCallback && e.options.nextCallback(), changeBackground()
            },
            gameOver: function(b) {
                if (0 === a(l).length) {
                    var c = "";
                    c += '<div id="' + l.substr(1) + '">', c += '<p id="quiz-gameover-response"></p>', c += '<p><a href="#" id="quiz-retry-btn">Retry</a></p>',
                     c += "</div>", e.$el.append(c)
                }
                a("#quiz-gameover-response").html(b), a("#quiz-counter").hide(), a("#questions").hide(), a(l).show()
            },
            finish: function() {
                e.$el.removeClass("quiz-questions-state").addClass("quiz-results-state"), a(".active-question").hide().removeClass("active-question"),
                 a("#quiz-counter").hide(), a("#quiz-response").hide(), a("#quiz-finish-btn").hide(), a("#quiz-next-btn").hide(),
                  a("#quiz-restart-btn").show(), a(k).show(), a("#quiz-results").html("You got " + n + " out of " + g + " correct!"),
                  "function" == typeof e.options.finishCallback && e.options.finishCallback(), endPage(n, g).show()
            },
            restart: function() {
                e.methods.reset(), e.$el.addClass("quiz-questions-state"), a("#questions").show(), a("#quiz-counter").show(),
                 a(".question-container:first-child").show().addClass("active-question"), e.methods.updateCounter()
            },
            reset: function() {
                o = !1, m = 1, n = 0, a(".answers a").removeClass("correct incorrect"), e.$el.removeClass().addClass("quiz-container"), a("#quiz-restart-btn").hide(),
                 a(l).hide(), a(k).hide(), a("#quiz-controls").hide(), a("#quiz-response").show(), a("#quiz-next-btn").show(), a("#quiz-counter").hide(),
                  a(".active-question").hide().removeClass("active-question")
            },
            home: function() {
                e.methods.reset(), e.$el.addClass("quiz-start-state"), a(h).show(), "function" == typeof e.options.homeCallback && e.options.homeCallback()
            },
            updateCounter: function() {
                var b = e.options.counterFormat.replace("%current", m).replace("%total", g);
                a("#quiz-counter").html(b)
            }
        }, e.methods.init()
    }, a.quiz.defaultOptions = {
        allowIncorrect: !0,
        counter: !0,
        counterFormat: "%current/%total",
        startScreen: "#quiz-start-screen",
        startButton: "#quiz-start-btn",
        homeButton: "#quiz-home-btn",
        resultsScreen: "#quiz-results-screen",
        gameOverScreen: "#quiz-gameover-screen"
    }, a.fn.quiz = function(b) {
        return this.each(function() {
            new a.quiz(this, b)
        })
    }
}(jQuery, window, document);






$('#quiz').quiz({
  //resultsScreen: '#results-screen',
  //counter: false,
  //homeButton: '#custom-home',
  counterFormat: 'Question %current of %total',
  questions: [
    {
       'q': 'Can make trumpet sounds by using just their mouth',
      'options': [
        '<img src= \"alice.png\"/>',
        '<img src= \"ayoub.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    {
      'q': 'I was once woken up by a homeless person. He said "you dont belong here"',
      'options': [
        '<img src= \"alex.png\"/>',
        '<img src= \"debbie.png\"/>',
      ],
      'correctIndex': 1,
      'correctResponse': 'Correct! Sounds more complicated than it really is.',
      'incorrectResponse': 'Come on, it\'s not that easy!'
    },   
        {
      'q': 'I consider Toy Story 3 to be one of the best movies ever made',
      'options': [
        '<img src= \"ebba.png\"/>',
        '<img src= \"lars.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    {
      'q': 'Ive been in a TV quiz show twice',
      'options': [
        '<img src= \"thomas.png\"/>',
        '<img src= \"eduardo.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I usually sing "Aint no mountain high enough" in the shower',
      'options': [
        '<img src= \"thomas.png\"/>',
        '<img src= \"louisa.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I hate the city Trondheim in Norway',
      'options': [
        '<img src= \"mika.png\"/>',
        '<img src= \"lars.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I can so the splits',
      'options': [
        '<img src= \"stella.png\"/>',
        '<img src= \"rebecca.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I am secretly a Paris Hilton fan',
      'options': [
        '<img src= \"laura.png\"/>',
        '<img src= \"moaw.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'When I think deeply I usually cross my toes',
      'options': [
        '<img src= \"moaw.png\"/>',
        '<img src= \"jonathan.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I signed up to Facebook just to play Farmwille',
      'options': [
        '<img src= \"olivia.png\"/>',
        '<img src= \"birk.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'Well we hope the game is going well.',
      'incorrectResponse': 'She wouldnt. Come on.'
    },    {
      'q': 'I was born vegetarian, the very first time I ate meat was at the age 14.',
      'options': [
        '<img src= \"johanna.png\"/>',
        '<img src= \"jady.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I sucked on my thumb until I was 10 years old',
      'options': [
        '<img src= \"martina.png\"/>',
        '<img src= \"daniel.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I never eat tomatos gello (inside)',
      'options': [
        '<img src= \"vulla.png\"/>',
        '<img src= \"stella.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },    {
      'q': 'I sometimes shoplifted as a young teen and became too confident with it. I started stealing random stuff just because I was sure I wouldnt get caught. Until I did. At Coop. Stealing organic bread.',
      'options': [
        '<img src= \"olivia.png\"/>',
        '<img src= \"soraya.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    {
      'q': 'When I was in grade eight I attended two schools at the same time and managed to get away with it for around 2 months before got caught.',
      'options': [
        '<img src= \"ayoub.png\"/>',
        '<img src= \"eduardo.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'The real question here is.... WHY?!',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
     {
      'q': 'Being born and raised in Sweden, we discoverd when I was 11 that I was not a Swedish citizen.',
      'options': [
        '<img src= \"martina.png\"/>',
        '<img src= \"alina.png\"/>'
      ],
       'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    {
      'q': 'I fell through the ice at age 7.',
      'options': [
        '<img src= \"alex.png\"/>',
        '<img src= \"milla.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'When I was a kid I used to buy girl magazines (like Frida & Julia) only to get the posters of Swedish singers that I liked at the time.',
      'options': [
        '<img src= \"david.png\"/>',
        '<img src= \"daniel.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'One night at a party in Stockholm, I got so caught in the moment so I decided to attend a party in Oslo. Me and some friends took a privet jet over to Oslo in middle of the night, realized I had forgot all my stuff in Stockholm, keys wallet etc.',
      'options': [
        '<img src= \"matilda.png\"/>',
        '<img src= \"mikaela.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'Next time take us with!',
      'incorrectResponse': 'Maybe next time.'
    }, 
    {
      'q': 'I was "made" in Paris',
      'options': [
        '<img src= \"david.png\"/>',
        '<img src= \"gul.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I listen to (and watch) Friends religiously when Im home. It is my background music',
      'options': [
        '<img src= \"elsa.png\"/>',
        '<img src= \"linda.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I have played the saxophone.',
      'options': [
        '<img src= \"elise.png\"/>',
        '<img src= \"ludvig.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'Ive just found out that my last boyfriend is gay',
      'options': [
        '<img src= \"linnea.png\"/>',
        '<img src= \"fernando.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I have had the intro melody of the tv-show Pingu stuck in my head basically since I was a kid. I sometimes catch myself humming it in my head. It is horrible.',
      'options': [
        '<img src= \"fernando.png\"/>',
        '<img src= \"elsa.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I used to be a majorette girl.',
      'options': [
        '<img src= \"gul.png\"/>',
        '<img src= \"elise.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I can twist my arm around over 360 degrees.',
      'options': [
        '<img src= \"oscar.png\"/>',
        '<img src= \"mikaela.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'Im scared of space and blue whales',
      'options': [
        '<img src= \"christian.png\"/>',
        '<img src= \"johanna.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
     {
      'q': 'I once had an indoor duck as a pet',
      'options': [
        '<img src= \"christian.png\"/>',
        '<img src= \"linda.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'She did not. But wishes she had!'
    }, 

 {
      'q': 'I pick my eyebrows when I am focusing/thinking',
      'options': [
        '<img src= \"louisa.png\"/>',
        '<img src= \"camilla.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
 {
      'q': 'I spent 3 weeks in a monetary.',
      'options': [
        '<img src= \"alice.png\"/>',
        '<img src= \"vulla.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 

 {
      'q': 'When I was born I had the navel string around my throat. If they hadnt cut it when they did, I would have died.',
      'options': [
        '<img src= \"tobin.png\"/>',
        '<img src= \"moav.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I am an expert in winning random competitions on facebook/magazines/blogs..',
      'options': [
        '<img src= \"ebba.png\"/>',
        '<img src= \"mika.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I was in the late stage audition for the Swedish Julkalender in 2003, but did not get the role',
      'options': [
        '<img src= \"ludvig.png\"/>',
        '<img src= \"laura.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I love pressure on my body. People sitting/laying on top of my arms and legs is amazing.',
      'options': [
        '<img src= \"debbie.png\"/>',
        '<img src= \"milla.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I am addicted to laundry detergent.',
      'options': [
        '<img src= \"alina.png\"/>',
        '<img src= \"camilla.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I am a lawyer.',
      'options': [
        '<img src= \"eiad.png\"/>',
        '<img src= \"matilda.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
    {
      'q': 'I once memorized 540 lines of Shakespeare for a school play',
      'options': [
        '<img src= \"jady.png\"/>',
        '<img src= \"tobin.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    }, 
      {
      'q': 'My spirit animal is a Koala.',
      'options': [
        '<img src= \"danni.png\"/>',
        '<img src= \"rebecca.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },

      {
      'q': 'I used to work as a cleaner.',
      'options': [
        '<img src= \"birk.png\"/>',
        '<img src= \"oscar.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    
      {
      'q': '.',
      'options': [
        'Jonathan',
        'Danni'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },

     {
      'q': 'I can not survive without a Gin & Tonic when I go out.',
      'options': [
        '<img src= \"eiad.png\"/>',
        '<img src= \"linnea.png\"/>'
      ],
      'correctIndex': 1 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
     {
      'q': 'I was "made" in Paris.',
      'options': [
        '<img src= \"david.png\"/>',
        '<img src= \"gul.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'Wooow, not something one wants to know right..',
      'incorrectResponse': 'WRONG!'
    },
      {
      'q': 'Drank home-made beer with a witch doctor in Lesotho (South Africa).',
      'options': [
        '<img src= \"soraya.png\"/>',
        '<img src= \"moav.png\"/>'
      ],
      'correctIndex': 0 ,
      'correctResponse': 'YAAAJIIH, THOSE WERE HARD TO GET.',
      'incorrectResponse': 'SOLD OUT SON'
    },
    



  ]
});


/*$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();
  
  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});*/
