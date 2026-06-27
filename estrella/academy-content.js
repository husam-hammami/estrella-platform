window.ESTRELLA_ACADEMY = {
  "gamification": {
    "$schema": "estrella.academy.gamification/v1",
    "brand": {
      "name": "Estrella Academy",
      "palette": {
        "cream": "#F2EBDC",
        "gold": "#B8985C",
        "ink": "#14120E"
      },
      "typeface": "Cormorant",
      "tone": "Elegant and earned, never like a children's game. Progress is a sign of real work, not a points race."
    },
    "xp": {
      "unit": "points",
      "unitNote": "Points are kept quiet. The main reward is seeing the course artifact become more complete.",
      "rules": {
        "lessonCompleted": 50,
        "quizCorrectAnswer": 10,
        "quizMasteryBonus": 40,
        "courseCompletionBonus": 200,
        "dailyStreakBonus": 15,
        "trackCompletionBonus": 500
      },
      "notes": {
        "lessonCompleted": "You earn 50 Light the first time you finish a lesson.",
        "quizCorrectAnswer": "You earn 10 Light for each quiz question you answer correctly.",
        "quizMasteryBonus": "You earn 40 extra Light when you get every answer in a quiz right on your first try. See scoring.mastery.",
        "courseCompletionBonus": "You earn 200 Light one time, when you finish the last lesson of a course.",
        "dailyStreakBonus": "You earn 15 Light once per day, on top of your lesson and quiz Light, as long as your streak is alive.",
        "trackCompletionBonus": "You earn 500 Light one time, when you finish every course in a track."
      }
    },
    "levels": {
      "model": "Six levels. The names go from one small star up to a full group of stars. Each level needs a total amount of Light.",
      "ladder": [
        {
          "tier": 1,
          "name": "First Light",
          "minXP": 0,
          "blurb": "Your first lesson is done. The sky has one star now, and it is yours."
        },
        {
          "tier": 2,
          "name": "Rising Star",
          "minXP": 500,
          "blurb": "You are building a habit. You keep coming back, and your light stays bright."
        },
        {
          "tier": 3,
          "name": "Guiding Star",
          "minXP": 1500,
          "blurb": "You know enough to lead the way. Other people start to notice you."
        },
        {
          "tier": 4,
          "name": "Star Pattern",
          "minXP": 3500,
          "blurb": "Your skills join together into one clear shape. People can see what you are good at."
        },
        {
          "tier": 5,
          "name": "Bright Star",
          "minXP": 6500,
          "blurb": "Steady and strong. You are the person others look to in the room."
        },
        {
          "tier": 6,
          "name": "Estrella",
          "minXP": 10000,
          "blurb": "The name of the academy. Kept for those who finished the work and carry it well. 'Estrella' means 'star'."
        }
      ]
    },
    "badges": {
      "model": "Fifteen marks of honor. Each one is a small gold disc. Some are earned by finishing a course. Others are earned by how you show up and study.",
      "catalog": [
        {
          "id": "first-step",
          "name": "First Step",
          "description": "You finished your first lesson. Every group of stars starts with one.",
          "criteria": {
            "type": "behaviour",
            "event": "lesson.completed",
            "count": 1,
            "scope": "lifetime"
          }
        },
        {
          "id": "flawless",
          "name": "Full Marks",
          "description": "You answered a whole quiz correctly on your first try. This is real skill, not luck.",
          "criteria": {
            "type": "behaviour",
            "event": "quiz.mastery",
            "count": 1,
            "scope": "lifetime"
          }
        },
        {
          "id": "in-flow",
          "name": "Busy Day",
          "description": "You finished three lessons in one day. You have good momentum.",
          "criteria": {
            "type": "behaviour",
            "event": "lesson.completed",
            "count": 3,
            "scope": "sameDay"
          }
        },
        {
          "id": "seven-nights",
          "name": "Seven Days",
          "description": "You studied every day for seven days in a row. This takes real discipline.",
          "criteria": {
            "type": "behaviour",
            "event": "streak.reached",
            "days": 7
          }
        },
        {
          "id": "constant",
          "name": "Always There",
          "description": "You studied every day for thirty days in a row. Showing up has become part of who you are.",
          "criteria": {
            "type": "behaviour",
            "event": "streak.reached",
            "days": 30
          }
        },
        {
          "id": "perfect-course",
          "name": "Clean Sweep",
          "description": "You got full marks on every quiz in one course, all on the first try.",
          "criteria": {
            "type": "behaviour",
            "event": "course.allQuizzesMastered",
            "count": 1,
            "scope": "perCourse"
          }
        },
        {
          "id": "track-finisher",
          "name": "Whole Track",
          "description": "You finished a full track from start to end. You did not stop halfway. You finished.",
          "criteria": {
            "type": "behaviour",
            "event": "track.completed",
            "count": 1,
            "scope": "anyTrack"
          }
        },
        {
          "id": "ai-hr-graduate",
          "name": "AI for HR",
          "description": "You finished the AI for HR course. You can now use AI as a tool to help your work, while you stay in charge of the decisions.",
          "criteria": {
            "type": "course",
            "courseId": "ai-hr",
            "event": "course.completed"
          }
        },
        {
          "id": "branding-graduate",
          "name": "Your Brand",
          "description": "You finished the Personal Branding course. You can say clearly what you stand for, and others can see it too.",
          "criteria": {
            "type": "course",
            "courseId": "branding",
            "event": "course.completed"
          }
        },
        {
          "id": "interview-graduate",
          "name": "Interview Ready",
          "description": "You finished the Interview course. You stay calm and clear when people ask you hard questions.",
          "criteria": {
            "type": "course",
            "courseId": "interview",
            "event": "course.completed"
          }
        },
        {
          "id": "foundations-graduate",
          "name": "Strong Base",
          "description": "You finished the HR Foundations course. You now know the main rules that all HR work is built on.",
          "criteria": {
            "type": "course",
            "courseId": "hr-foundations",
            "event": "course.completed"
          }
        },
        {
          "id": "speaking-graduate",
          "name": "Clear Voice",
          "description": "You finished the Public Speaking course. You can hold a room with a calm and clear voice.",
          "criteria": {
            "type": "course",
            "courseId": "speaking",
            "event": "course.completed"
          }
        },
        {
          "id": "confidence-graduate",
          "name": "Quiet Confidence",
          "description": "You finished the Confidence course. You feel sure of yourself in a calm, steady way.",
          "criteria": {
            "type": "course",
            "courseId": "confidence",
            "event": "course.completed"
          }
        },
        {
          "id": "leadership-graduate",
          "name": "Ready to Lead",
          "description": "You finished the Leadership course. People can follow how you make and stand by your decisions.",
          "criteria": {
            "type": "course",
            "courseId": "leadership",
            "event": "course.completed"
          }
        },
        {
          "id": "offer-graduate",
          "name": "Offer in Hand",
          "description": "You finished the Offer and Pay course. You can ask for fair pay for your work, and get it.",
          "criteria": {
            "type": "course",
            "courseId": "offer",
            "event": "course.completed"
          }
        }
      ]
    },
    "scoring": {
      "model": "We score each quiz in a kind way. We reward learning, not being perfect on the first try. But we still mark it when you do reach full marks.",
      "perCorrectAnswer": 10,
      "passThreshold": 0.7,
      "passThresholdNote": "You pass a quiz with 70 percent correct or more. Passing opens the next lesson.",
      "retries": {
        "allowed": true,
        "note": "You can take a quiz again to learn from your mistakes. You earn Light for each correct answer only once, so taking the quiz again does not give you more Light."
      },
      "mastery": {
        "rule": "Mastery means you answered every single question in a quiz correctly on your first try, with no retries.",
        "reward": {
          "xpBonus": 40,
          "contributesTo": [
            "flawless",
            "perfect-course"
          ]
        },
        "courseMastery": "When you reach Mastery on every quiz in a course, the course is marked 'Mastered' and you earn the Clean Sweep badge."
      }
    },
    "streak": {
      "model": "A streak counts the days in a row that you study. A day counts when you finish at least one lesson or pass at least one quiz that day.",
      "qualifyingActivity": [
        "lesson.completed",
        "quiz.passed"
      ],
      "dailyBonusXP": 15,
      "timezone": "learnerLocal",
      "grace": {
        "freezeTokens": 1,
        "note": "Each learner gets one 'Free Day' every 30 days. This is one missed day that will not break your streak. It comes back on its own. We do not make a game out of missing days."
      },
      "milestones": [
        {
          "days": 7,
          "reward": {
            "badge": "seven-nights"
          }
        },
        {
          "days": 30,
          "reward": {
            "badge": "constant"
          }
        }
      ]
    },
    "tracks": {
      "model": "Three set paths. A course can be in more than one track. To finish a track, you must finish all the courses listed in it.",
      "list": [
        {
          "id": "foundation",
          "name": "Foundation",
          "blurb": "The base you build a career on. Learn the main rules, how to carry yourself, and how to feel sure of yourself before you specialise.",
          "courses": [
            "hr-foundations",
            "confidence",
            "branding"
          ],
          "reward": {
            "xpBonus": 500,
            "badge": "track-finisher",
            "title": "Grounded",
            "titleNote": "Shown as a title on your profile."
          }
        },
        {
          "id": "signature",
          "name": "Signature",
          "blurb": "The work that makes you stand out and gets you noticed. Build your voice, your brand, your leadership, and your AI skills.",
          "courses": [
            "branding",
            "speaking",
            "leadership",
            "ai-hr"
          ],
          "reward": {
            "xpBonus": 500,
            "badge": "track-finisher",
            "title": "Named",
            "titleNote": "Shown as a title on your profile."
          }
        },
        {
          "id": "interview",
          "name": "Interview",
          "blurb": "From the first question to the signed offer. Stay calm, tell your story well, and ask for fair pay.",
          "courses": [
            "interview",
            "speaking",
            "offer"
          ],
          "reward": {
            "xpBonus": 500,
            "badge": "track-finisher",
            "title": "Interview Ready",
            "titleNote": "Shown as a title on your profile."
          }
        }
      ]
    },
    "certificate": {
      "model": "Given one time for each course you finish. It uses the brand colors, the Cormorant font, and a gold line on a cream background. It is signed.",
      "fields": {
        "recipientName": "string",
        "courseId": "string",
        "courseTitle": "string",
        "track": "string | null",
        "issuedOn": "ISO-8601 date",
        "masteryAttained": "boolean",
        "finalScore": "number (0-100)",
        "certificateId": "string (for example ESTR-AIHR-2026-0001)",
        "verificationUrl": "string",
        "issuingAcademy": "Estrella Academy",
        "signatory": "Nesreen",
        "signatoryTitle": "Lead Trainer, Estrella Academy"
      },
      "copy": {
        "congratulatory": "You did the real work, and it shows. This is more than a finished course. It is a new skill that is now yours to keep.",
        "signature": "With pride in your progress,\nNesreen, Lead Trainer, Estrella Academy"
      },
      "masteryVariant": {
        "condition": "masteryAttained == true",
        "sealText": "Finished with Full Marks",
        "note": "Adds a small gold seal next to the signature."
      }
    },
    "pedagogy": {
      "framework": "Course-specific practice mechanics.",
      "note": "Each course has its own learning mechanic: a decision map, reputation studio, interview lab, operating map, rehearsal room, mirror journal, energy board, or offer desk. Lessons add decisions, selections, rehearsals, checks, and only occasional writing to the course artifact. The learner should feel progress through a useful artifact taking shape, not through a repeated school worksheet."
    }
  },
  "courses": {
    "ai-hr": {
      "courseId": "ai-hr",
      "title": "AI for HR Leaders",
      "modules": [
        {
          "title": "Where AI Belongs in HR",
          "lessons": [
            {
              "lessonId": "ai-hr-1",
              "title": "Where AI belongs in HR: the four-roles map",
              "mins": 18,
              "hook": "Most AI projects in HR fail for one simple reason: nobody decided where AI belongs before buying a tool. This lesson gives you the map.",
              "objectives": [
                "By the end you can place any AI idea onto the four classic HR roles.",
                "By the end you can name the leverage and the risk of each idea before you spend money.",
                "By the end you can explain why tools change but the work of HR does not."
              ],
              "sections": [
                {
                  "heading": "The mistake almost everyone makes",
                  "body": [
                    "When a CHRO is asked \"what is our AI plan?\", the first instinct is to start with tools. A resume screener here, a chatbot there. That is backwards.",
                    "AI is leverage. Leverage means a small push that creates a large result. But leverage applied to the wrong task just helps you do the wrong thing faster. The real question is not \"which tool?\" It is \"which part of our work should get sharper, and which part must stay clearly human?\""
                  ]
                },
                {
                  "heading": "The four HR roles, in an AI era",
                  "body": [
                    "Thirty years ago Dave Ulrich split HR's job into four roles. The roles still hold today. The Strategic Partner links people to business goals. The Change Agent helps the company shift and adapt. The Administrative Expert runs the daily machine: payroll, policy, scheduling. The Employee Champion protects how people feel and whether they trust the company.",
                    "Each role meets AI differently. The Administrative Expert is AI's home ground. The work is high in volume, the answers are clear, and most mistakes are easy to fix. Automate here with confidence. The Employee Champion is the opposite. Here AI can quietly turn care into watching people. Touch it with great care.",
                    "Worked example: a bank in Riyadh wants to use AI in HR. The smart first move is a policy chatbot that answers \"how many annual leave days do I have left?\" That is the Administrative Expert role. The risky first move is an AI tool that scores which employees are \"likely to quit\" and shares the list with managers. That touches the Employee Champion role, where a wrong score damages trust for years."
                  ]
                }
              ],
              "takeaways": [
                "AI is leverage. Decide where it belongs before you choose a tool.",
                "Map every idea to one of the four HR roles.",
                "Automate the Administrative Expert role boldly.",
                "Touch the Employee Champion role with extreme care.",
                "Every benefit comes with a paired risk. Name both before you buy."
              ],
              "exercise": {
                "title": "Map one initiative",
                "prompt": "Think of one AI idea someone has proposed in your organisation, or one you have considered. Which of the four roles does it serve? Write one sentence on the benefit it offers, and one sentence on the risk it brings. If you cannot name the risk, you are not ready to buy.",
                "placeholder": "Initiative: ...\nRole it serves: ...\nBenefit (one sentence): ...\nRisk (one sentence): ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A retail group wants its very first HR AI project to build trust quickly. Which idea fits best?",
                  "options": [
                    "An AI that predicts which staff will resign and emails the list to managers",
                    "A chatbot that answers common payroll and leave questions",
                    "An AI that scores video interviews for \"culture fit\"",
                    "An AI that reads private team chat to measure morale"
                  ],
                  "answer": 1,
                  "explain": "A payroll and leave chatbot sits in the Administrative Expert role: high volume, low risk, easy to recover from a mistake. It earns confidence on safe ground. The other three touch high-stakes or trust-sensitive areas."
                },
                {
                  "q": "Why use a thirty-year-old model of HR roles instead of a brand-new one?",
                  "options": [
                    "Older models are always more accurate",
                    "The tools change often, but the core work of HR does not",
                    "New models are not allowed in the GCC",
                    "It is the only model that mentions AI"
                  ],
                  "answer": 1,
                  "explain": "Tools change every year or two. The four jobs of HR (partner, change, admin, champion) stay the same. Map AI to the stable work, not to the tool that keeps changing."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "I am here inside this lesson with you. I know the four-roles map we just covered. Ask me anything, or tap a question below.",
                "suggested": [
                  "Why use Ulrich's model and not something newer?",
                  "Which HR role is the safest place to start with AI?",
                  "Where do most HR teams start with AI?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-2",
              "title": "The four HR roles in an AI era (Ulrich, revisited)",
              "mins": 16,
              "hook": "You have the map. Now learn how AI changes the actual day-to-day of each HR role, and where the line of human judgment must stay.",
              "objectives": [
                "By the end you can describe how AI reshapes each of the four HR roles.",
                "By the end you can spot the one task in each role that must stay human.",
                "By the end you can brief your team on what changes and what does not."
              ],
              "sections": [
                {
                  "heading": "From admin work to judgment work",
                  "body": [
                    "AI does not delete HR jobs. It moves the centre of the job. When a chatbot handles routine questions, the HR officer spends less time on lookups and more time on the hard cases that need a human. The skill that grows in value is judgment, not data entry.",
                    "Think of it as a trade. AI takes the repeat work. You take the work that needs context, empathy, and a decision someone must own. A good leader plans this trade on purpose, so the freed time goes to higher-value work and not just to more meetings."
                  ]
                },
                {
                  "heading": "The human line in each role",
                  "body": [
                    "Strategic Partner: AI can show patterns in attrition (the rate at which staff leave) or in skills. But the choice of what the business should do with that pattern stays human. A model can say \"more engineers are leaving in Dubai.\" Only a leader can decide whether to raise pay, fix a manager, or accept the loss.",
                    "Change Agent: AI can send tailored messages and track how many people take up a change. But the trust that makes change work is built person to person. Administrative Expert: automate freely, yet keep a human path for sensitive cases, such as leave after a death in the family. Employee Champion: AI can flag a drop in how people feel, but a human must decide how to respond without making people feel watched.",
                    "Worked example: a logistics company in Jeddah lets AI draft all rejection emails to candidates. Speed goes up. But for senior or internal candidates, they keep a human call. The rule they wrote: \"AI drafts, a person decides for anyone we may meet again.\" That single rule protects the relationship that matters most."
                  ]
                }
              ],
              "takeaways": [
                "AI moves the centre of HR work from lookups to judgment.",
                "Plan the freed time on purpose, or it disappears.",
                "Each role keeps one task that must stay human.",
                "Write the human line as a clear rule, not a vague hope."
              ],
              "exercise": {
                "title": "Find your human line",
                "prompt": "Pick one of the four roles where your team uses or plans to use AI. Write one task in that role that AI can take fully, and one task that must stay human. Then write the rule in one sentence, like \"AI drafts, a person decides for X.\"",
                "placeholder": "Role: ...\nAI can take: ...\nMust stay human: ...\nMy one-sentence rule: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "An AI model reports that attrition among nurses in your hospital is rising fast. What is the correct human role here?",
                  "options": [
                    "Let the model choose the fix automatically to save time",
                    "Use the finding as evidence, then decide the response with human judgment",
                    "Ignore the finding because models are often wrong",
                    "Share the raw list of \"at risk\" nurses with all managers"
                  ],
                  "answer": 1,
                  "explain": "AI surfaces the pattern; the Strategic Partner decides what to do about it. The choice between pay, management, or accepting the loss needs context only a leader holds."
                },
                {
                  "q": "Which rule best protects a relationship when AI drafts candidate rejections?",
                  "options": [
                    "Send all AI rejections instantly with no review",
                    "Never use AI for any candidate communication",
                    "AI drafts, but a person decides for anyone you may meet again",
                    "Only reject candidates by phone"
                  ],
                  "answer": 2,
                  "explain": "A clear, narrow rule keeps speed for routine cases while protecting senior and internal candidates, the people whose relationship with your brand has lasting value."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's make the four roles practical. I can help you find the human line in your own team. Where shall we start?",
                "suggested": [
                  "How do I stop freed time from just becoming more meetings?",
                  "Give me a human-line rule for the Employee Champion role.",
                  "What changes most for a Strategic Partner?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-3",
              "title": "What to automate, augment, and never touch",
              "mins": 14,
              "hook": "Not every task should be automated. A simple three-way sort tells you what to hand to AI, what to do with AI, and what to keep fully human.",
              "objectives": [
                "By the end you can sort any HR task into automate, augment, or never.",
                "By the end you can defend a \"never\" decision to a cost-focused boss.",
                "By the end you can apply the sort to a real list of tasks."
              ],
              "sections": [
                {
                  "heading": "The Automate / Augment / Never sort",
                  "body": [
                    "Use three buckets. Automate means AI does the task end to end with light human checks. Augment means AI helps a human who still makes the call. Never means AI stays out, because the cost of a mistake or the loss of trust is too high.",
                    "Two questions decide the bucket. First, how reversible is a mistake? Second, how much does this task depend on human trust? High reversibility and low trust-need points to Automate. High stakes and high trust-need points to Never. Most real HR work sits in the middle, in Augment."
                  ]
                },
                {
                  "heading": "Where the lines usually fall",
                  "body": [
                    "Automate: password resets, leave-balance lookups, interview scheduling, first-draft job descriptions, FAQ answers. A mistake here is cheap and quick to fix.",
                    "Augment: shortlisting candidates, drafting performance feedback, summarising exit interviews, spotting skills gaps. AI speeds you up, but a human reviews and owns the result. Never: final hire and fire decisions, promotion calls, disciplinary outcomes, medical or mental-health judgments. These shape a person's life and livelihood.",
                    "Worked example: an HR director at a Dubai construction firm builds a one-page sort with her team. They place \"AI scores safety-training quiz answers\" in Automate. They place \"AI drafts the manager's feedback notes\" in Augment. They place \"AI decides who is laid off in a downturn\" firmly in Never. When finance later pushes to automate layoffs to save time, she points to the sheet the whole team agreed on. The decision holds because it was made calmly, in advance."
                  ]
                }
              ],
              "takeaways": [
                "Use three buckets: Automate, Augment, Never.",
                "Two tests decide: reversibility of a mistake and need for human trust.",
                "Most HR work belongs in Augment, with a human owning the result.",
                "Decide your \"never\" list before pressure arrives, not during it."
              ],
              "exercise": {
                "title": "Sort five tasks",
                "prompt": "List five HR tasks your team does. Sort each into Automate, Augment, or Never. For each \"Never\", write one sentence on why a mistake would be too costly. Keep this sheet; it is your defence under pressure.",
                "placeholder": "1. Task — bucket — reason\n2. ...\n3. ...\n4. ...\n5. ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Finance asks you to fully automate layoff decisions to cut HR cost. What is the strongest response?",
                  "options": [
                    "Agree, since AI is faster and cheaper",
                    "Refuse vaguely and hope the topic goes away",
                    "Point to your pre-agreed sort that places life-altering decisions in Never, and explain the trust and legal cost",
                    "Automate it quietly without telling anyone"
                  ],
                  "answer": 2,
                  "explain": "A decision made calmly in advance, with the team, gives you firm ground under pressure. Life-altering calls fail both tests: a mistake is severe and trust is central."
                },
                {
                  "q": "Which task best fits the Augment bucket?",
                  "options": [
                    "Resetting a forgotten password",
                    "Drafting performance feedback that a manager then reviews and owns",
                    "Choosing who gets promoted",
                    "Deciding a disciplinary outcome"
                  ],
                  "answer": 1,
                  "explain": "Augment means AI speeds up a human who still makes the call. Drafting feedback fits: useful help, but the manager reviews and owns the final words."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's sort your tasks together. Tell me one HR task and I'll help you test it against reversibility and trust.",
                "suggested": [
                  "Is AI shortlisting Automate or Augment?",
                  "How do I defend a Never decision to my CFO?",
                  "What belongs on almost every Never list?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-4",
              "title": "Building your AI-in-HR thesis",
              "mins": 14,
              "hook": "Leadership wants a clear answer to \"what is our AI plan?\" A one-page thesis gives you a defensible answer you can stand behind.",
              "objectives": [
                "By the end you can write a one-page AI-in-HR thesis.",
                "By the end you can connect every AI move to a business outcome.",
                "By the end you can state your guardrails in plain words."
              ],
              "sections": [
                {
                  "heading": "What a thesis is, and why one page",
                  "body": [
                    "A thesis is a short, clear statement of belief that guides your choices. It is not a long strategy deck. One page forces you to be honest about what you actually believe and why.",
                    "A good thesis answers four things. Where AI will help us most. What outcome it serves. What we will not do. How we will know it worked. If a proposed tool does not fit the thesis, you can say no without a long meeting."
                  ]
                },
                {
                  "heading": "The four-part thesis frame",
                  "body": [
                    "Part one, Focus: name the one or two areas where AI gives the biggest, safest gain first. Part two, Outcome: tie each to a business result leadership cares about, such as time-to-hire, cost-per-hire, or manager time saved. Part three, Guardrails: state what stays human and what data you will not use. Part four, Proof: pick one or two simple measures to track.",
                    "Worked example: a telecom company in Abu Dhabi writes this thesis. \"Focus: we will use AI first in recruitment admin and internal HR support, not in final decisions. Outcome: cut time-to-shortlist from 12 days to 5, and free 8 hours of HR officer time per week. Guardrails: no AI in final hiring, firing, or promotion; no analysis of private messages; every AI hiring tool is bias-audited before use. Proof: track time-to-shortlist and a quarterly candidate-experience score.\" One page. Every future tool request now has a test to pass."
                  ]
                }
              ],
              "takeaways": [
                "A thesis is a one-page belief that guides every AI choice.",
                "Cover four parts: Focus, Outcome, Guardrails, Proof.",
                "Tie every AI move to a business result leadership values.",
                "Name guardrails in plain words so legal and staff trust them.",
                "A clear thesis lets you say no fast and with confidence."
              ],
              "exercise": {
                "title": "Draft your one-page thesis",
                "prompt": "Write a draft AI-in-HR thesis using the four parts: Focus, Outcome, Guardrails, Proof. Keep it to one page. Use real numbers where you can, even rough ones.",
                "placeholder": "Focus: ...\nOutcome (with a number): ...\nGuardrails: ...\nProof (1-2 measures): ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which thesis statement is strongest for winning leadership trust?",
                  "options": [
                    "\"We will use the most advanced AI available across all of HR.\"",
                    "\"We will use AI in recruitment admin to cut time-to-shortlist from 12 to 5 days, with no AI in final hiring decisions.\"",
                    "\"We will explore AI opportunities as they arise.\"",
                    "\"We will let each manager use whatever AI tool they like.\""
                  ],
                  "answer": 1,
                  "explain": "It names focus, a measurable outcome, and a clear guardrail. Leadership can see the value and the limit. The others are vague or risky."
                },
                {
                  "q": "Why include a \"Proof\" part in the thesis?",
                  "options": [
                    "To make the document look longer",
                    "To give a simple measure that shows whether the AI move worked",
                    "Because regulators require exactly two metrics",
                    "To replace the need for guardrails"
                  ],
                  "answer": 1,
                  "explain": "Proof turns a belief into something testable. One or two simple measures let you show progress and stop a project that is not delivering."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's write your thesis. Give me your focus area and I'll help you shape the outcome, guardrails, and proof.",
                "suggested": [
                  "What outcome metric should I pick for recruitment?",
                  "How specific should my guardrails be?",
                  "Can you critique my draft thesis?"
                ]
              }
            }
          ]
        },
        {
          "title": "Bias-Aware Hiring",
          "lessons": [
            {
              "lessonId": "ai-hr-5",
              "title": "How bias enters an algorithm",
              "mins": 17,
              "hook": "AI hiring tools can look neutral and still be unfair. Learn the three doors bias walks through, so you can shut them.",
              "objectives": [
                "By the end you can name the three main sources of bias in a hiring model.",
                "By the end you can explain why removing names is not enough.",
                "By the end you can ask a vendor the right hard questions."
              ],
              "sections": [
                {
                  "heading": "Three doors bias walks through",
                  "body": [
                    "Bias means an unfair pattern that favours one group over another for reasons not linked to the job. In AI hiring it enters through three doors.",
                    "Door one is the training data. If past hires skew toward one group, the model learns that pattern as \"success.\" Door two is the labels. If \"good employee\" was decided by biased managers, the model copies that bias. Door three is the features. Even with names removed, the model can use proxies: a postcode, a gap in employment, a university, a photo. These stand in for gender, age, or nationality without naming them."
                  ]
                },
                {
                  "heading": "Why \"we removed names\" is not enough",
                  "body": [
                    "Many vendors say their tool is fair because it does not see names or photos. This is comforting and wrong. A proxy is any feature that quietly tracks a protected group. Distance from office can track neighbourhood, which can track ethnicity. A career gap can track maternity. The model does not need the protected label to reproduce the bias.",
                    "Worked example: a company in the UAE used an AI screener trained on ten years of past hires. The old workforce was mostly young men. The model learned to favour candidates with no career gaps and continuous full-time history. Women returning after childbirth scored lower, even though names were hidden. The bias came in through the labels and the features, not the names. Removing names did nothing. Only an audit of outcomes by group revealed the gap."
                  ]
                }
              ],
              "takeaways": [
                "Bias enters through three doors: data, labels, and features.",
                "Removing names does not remove bias.",
                "A proxy is a feature that quietly tracks a protected group.",
                "Only checking outcomes by group reveals hidden bias.",
                "Ask vendors what the model learned, not just what it sees."
              ],
              "exercise": {
                "title": "Hunt for proxies",
                "prompt": "Pick an AI hiring tool you use or might buy. List three features it uses to score candidates. For each, ask: could this quietly track gender, age, nationality, or family status? Mark any feature that could be a proxy.",
                "placeholder": "Feature 1: ... possible proxy for: ...\nFeature 2: ... possible proxy for: ...\nFeature 3: ... possible proxy for: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A vendor says their tool cannot be biased because it never sees names, gender, or photos. What is the best response?",
                  "options": [
                    "Accept it; hidden names mean no bias",
                    "Ask how the model performs by group, since proxies like career gaps can carry bias anyway",
                    "Refuse all AI hiring tools forever",
                    "Ask them to also hide the candidate's skills"
                  ],
                  "answer": 1,
                  "explain": "Bias rides in through labels and proxy features even when names are hidden. The only honest check is measuring outcomes across groups."
                },
                {
                  "q": "Which is the clearest example of a proxy feature?",
                  "options": [
                    "Years of relevant experience",
                    "A specific job-related certification",
                    "Distance of home address from the office",
                    "Score on a job-related skills test"
                  ],
                  "answer": 2,
                  "explain": "Distance from the office can track neighbourhood, which can track ethnicity or income, none of which relate to job ability. That makes it a proxy."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's find the doors bias uses to get into a model. Tell me about a tool you're evaluating and we'll look for proxies.",
                "suggested": [
                  "Why isn't removing names enough?",
                  "What proxy features are common in CV screeners?",
                  "How would I even check outcomes by group?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-6",
              "title": "Auditing a screening tool before you buy",
              "mins": 20,
              "hook": "The best time to catch a biased tool is before it touches a single candidate. Here is a buyer's audit you can run in the sales meeting.",
              "objectives": [
                "By the end you can run a pre-purchase bias audit on a hiring tool.",
                "By the end you can demand the right evidence from a vendor.",
                "By the end you can decide go or no-go with a clear record."
              ],
              "sections": [
                {
                  "heading": "The buyer's audit: five questions",
                  "body": [
                    "You do not need to be a data scientist to audit a vendor. You need five questions and the confidence to insist on real answers.",
                    "One: What data was the model trained on, and from where? Two: How was \"good performance\" labelled, and by whom? Three: Has the tool been tested for adverse impact across gender, age, and nationality, and can you see the report? Four: What features drive the score, and can you see the top ones? Five: What happens when a candidate appeals or asks why they were rejected? A vendor who cannot answer these is selling you risk."
                  ]
                },
                {
                  "heading": "Turning answers into a decision",
                  "body": [
                    "Score each answer as green, amber, or red. Green means clear evidence. Amber means a partial or vague answer. Red means refusal or no data. Any red on bias testing or appeals should stop the purchase until fixed.",
                    "Worked example: a hospital group in Dammam ran this audit on two CV-screening vendors. Vendor A handed over a third-party bias-test report broken down by gender and nationality, and explained their appeals path. Vendor B said \"our AI is proprietary, we cannot share that.\" The hospital scored Vendor B red on two questions and walked away, even though Vendor B was cheaper. Six months later, news broke that a similar tool had been pulled for unfair results. The audit, which took one meeting, saved the brand from a public failure. Keep the scored sheet; it is also your evidence if a regulator or an employee representative group later asks how you chose."
                  ]
                }
              ],
              "takeaways": [
                "Audit before the tool touches any candidate.",
                "Use five questions: data, labels, adverse-impact tests, features, appeals.",
                "Score each answer green, amber, or red.",
                "Any red on bias testing or appeals stops the purchase.",
                "Keep the scored sheet as proof you checked carefully."
              ],
              "exercise": {
                "title": "Run the five-question audit",
                "prompt": "Take a screening tool you are considering. Answer the five audit questions as best you can from what the vendor has told you. Mark each green, amber, or red. Write your go or no-go decision and the reason.",
                "placeholder": "1. Training data: ... (G/A/R)\n2. Labels: ... (G/A/R)\n3. Adverse-impact testing: ... (G/A/R)\n4. Top features: ... (G/A/R)\n5. Appeals path: ... (G/A/R)\nDecision: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A vendor refuses to share any bias-test results, calling the model \"proprietary.\" The tool is cheaper than rivals. What should you do?",
                  "options": [
                    "Buy it; price matters most",
                    "Score it red on bias testing and do not buy until they provide evidence",
                    "Buy it but only use it for senior roles",
                    "Trust their word that it is fair"
                  ],
                  "answer": 1,
                  "explain": "A refusal to show adverse-impact evidence is a red. The cost of a public bias failure, and the legal and trust damage, far outweighs the lower price."
                },
                {
                  "q": "Why keep the scored audit sheet after you decide?",
                  "options": [
                    "It is required to delete it for privacy",
                    "It serves as your proof of careful checking if a regulator or an employee group asks",
                    "It replaces the need to test the tool later",
                    "It is only useful to the vendor"
                  ],
                  "answer": 1,
                  "explain": "The sheet shows you checked carefully before buying. That record protects you if anyone later questions how the tool was chosen."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Bring me a vendor and I'll help you run the five-question audit and score their answers. Where shall we start?",
                "suggested": [
                  "What's a strong answer to the labelling question?",
                  "How do I push back on \"it's proprietary\"?",
                  "What counts as an amber versus a red?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-7",
              "title": "Structured interviews the AI can support",
              "mins": 16,
              "hook": "Unstructured interviews are where bias hides best. A structured interview, lightly supported by AI, is fairer and easier to defend.",
              "objectives": [
                "By the end you can explain why structured interviews reduce bias.",
                "By the end you can use AI to support, not replace, the interviewer.",
                "By the end you can build a simple scoring rubric for a role."
              ],
              "sections": [
                {
                  "heading": "Why structure beats gut feel",
                  "body": [
                    "A structured interview asks every candidate the same job-related questions in the same order, and scores answers against a fixed rubric. A rubric is a simple scale that describes what a weak, fair, and strong answer looks like.",
                    "Decades of research show structured interviews predict job performance far better than free-flowing chats, and they cut bias. The reason is simple. When everyone faces the same questions and the same scale, you compare like with like. Gut-feel interviews let \"this person reminds me of me\" quietly decide the outcome."
                  ]
                },
                {
                  "heading": "Where AI helps, and where it must not",
                  "body": [
                    "AI can help build better questions tied to the role. It can suggest a rubric. It can transcribe and summarise answers so the panel reviews the same record. It can flag when one interviewer scores much harder than the rest, which prompts a useful conversation.",
                    "AI must not score the candidate's face, tone, or accent. So-called \"emotion AI\" and video-personality scoring are unreliable and unfair, and several have been withdrawn after challenges. The human panel scores the content of the answer against the rubric. Worked example: a fintech in Dubai used AI to draft five role-based questions and a three-level rubric for a support role. During interviews, AI transcribed answers; the two human interviewers scored independently, then compared. When the AI summary showed one interviewer always rated Arabic-first speakers lower, they spotted and fixed a real bias. AI supported fairness; it never made the call."
                  ]
                }
              ],
              "takeaways": [
                "Structured interviews use the same questions and a fixed rubric.",
                "Structure predicts performance better and cuts bias.",
                "Let AI draft questions, build rubrics, and transcribe answers.",
                "Never let AI score faces, tone, or accent.",
                "Humans score content against the rubric and own the result."
              ],
              "exercise": {
                "title": "Build a mini rubric",
                "prompt": "Pick one role. Write three job-related interview questions. For one of them, write a simple three-level rubric: what a weak, fair, and strong answer looks like. Note one task you would let AI help with and one you would not.",
                "placeholder": "Role: ...\nQ1: ...\nQ2: ...\nQ3: ...\nRubric for Q1 — Weak: ... Fair: ... Strong: ...\nAI may help with: ...\nAI must not: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which use of AI in interviews is fair and defensible?",
                  "options": [
                    "Scoring a candidate's facial expressions for confidence",
                    "Ranking candidates by accent",
                    "Transcribing answers and flagging when one interviewer scores much harder than others",
                    "Rejecting candidates whose tone the AI dislikes"
                  ],
                  "answer": 2,
                  "explain": "Transcribing and flagging scoring gaps supports human fairness without judging the person. Scoring faces, accents, or tone is unreliable and unfair."
                },
                {
                  "q": "Why do structured interviews reduce bias?",
                  "options": [
                    "They are shorter, so bias has less time",
                    "Everyone faces the same questions and the same scale, so you compare like with like",
                    "They remove the need for human interviewers",
                    "They only work for junior roles"
                  ],
                  "answer": 1,
                  "explain": "Same questions plus a fixed rubric means fair comparison. It blocks the \"reminds me of me\" effect that drives gut-feel bias."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's build a fair interview together. Tell me the role and I'll help with questions, a rubric, and where AI fits.",
                "suggested": [
                  "Why is video-personality scoring a bad idea?",
                  "Can you draft a rubric for a sales role?",
                  "How do I get interviewers to score independently?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-8",
              "title": "Adverse impact: the math you must know",
              "mins": 18,
              "hook": "One simple ratio tells you whether your hiring is quietly screening out a group. Learn it, and you can never be blindsided again.",
              "objectives": [
                "By the end you can calculate the four-fifths rule for adverse impact.",
                "By the end you can read a selection-rate table and spot a problem.",
                "By the end you can ask data teams for the right numbers."
              ],
              "sections": [
                {
                  "heading": "Selection rate and the four-fifths rule",
                  "body": [
                    "Adverse impact means a process passes one group at a much lower rate than another, even without intending to. You measure it with the selection rate: the share of applicants from a group who pass a stage.",
                    "The four-fifths rule, also called the 80% rule, is the classic test. Take the group with the highest selection rate. If another group's rate is below 80% of that highest rate, you may have adverse impact worth investigating. It is a warning light, not a final verdict, but it is the number regulators and auditors look at first."
                  ]
                },
                {
                  "heading": "A worked calculation",
                  "body": [
                    "Imagine an AI CV screen at a company in Sharjah. Of 200 male applicants, 100 pass: a selection rate of 50%. Of 150 female applicants, 45 pass: a rate of 30%. The highest rate is 50%. Eighty percent of 50% is 40%. The female rate of 30% is below 40%, so the four-fifths rule is failed. That is a clear flag to investigate the tool.",
                    "What you do next matters. A failed rule does not prove illegal bias, but it shifts the burden to you to show the screen is job-related and that no fairer option exists. The wrong move is to ignore it. The right move is to pause, audit the features, and check whether a proxy is doing the damage. Always look at real numbers per group; a single overall pass rate can hide a serious gap underneath."
                  ]
                }
              ],
              "takeaways": [
                "Selection rate is the share of a group who pass a stage.",
                "The four-fifths rule flags a group passing below 80% of the top rate.",
                "A failed rule is a warning to investigate, not an automatic verdict.",
                "An overall pass rate can hide a gap; always split by group.",
                "After a flag: pause, audit features, hunt for proxies."
              ],
              "exercise": {
                "title": "Run the four-fifths check",
                "prompt": "Using real or sample numbers, calculate the selection rate for two groups at one hiring stage. Find the highest rate, take 80% of it, and check whether the other group falls below. Write whether the rule passes or fails and what you would do next.",
                "placeholder": "Group A: passed / applied = ...%\nGroup B: passed / applied = ...%\nHighest rate: ...% → 80% of it: ...%\nResult: pass / fail\nNext step: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Group A passes at 60%, Group B passes at 42%. Does this fail the four-fifths rule?",
                  "options": [
                    "No, because 42% is above 40%",
                    "Yes, because 42% is below 80% of 60% (which is 48%)",
                    "No, because both rates are above 40%",
                    "There is not enough information"
                  ],
                  "answer": 1,
                  "explain": "Highest rate is 60%. Eighty percent of 60% is 48%. Group B at 42% is below 48%, so the rule is failed and the stage needs investigation."
                },
                {
                  "q": "Your overall pass rate looks healthy at 55%. Why still split it by group?",
                  "options": [
                    "Splitting is only for large companies",
                    "An overall rate can hide a large gap between groups underneath",
                    "Regulators only care about the overall rate",
                    "It is not necessary if names were removed"
                  ],
                  "answer": 1,
                  "explain": "A healthy total can mask one group passing far less than another. Adverse impact only shows up when you compare group by group."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's make the four-fifths rule second nature. Give me two pass rates and I'll walk the calculation with you.",
                "suggested": [
                  "Walk me through the math with my numbers.",
                  "What do I do after a failed four-fifths check?",
                  "Is the four-fifths rule the only test that matters?"
                ]
              }
            }
          ]
        },
        {
          "title": "Performance, L&D & People Analytics",
          "lessons": [
            {
              "lessonId": "ai-hr-9",
              "title": "From gut feel to evidence: the analytics ladder",
              "mins": 16,
              "hook": "People analytics has four levels. Knowing which rung you are on stops you from promising leadership answers your data cannot give.",
              "objectives": [
                "By the end you can name the four rungs of the analytics ladder.",
                "By the end you can place your team's current work on a rung.",
                "By the end you can avoid over-promising predictions you cannot support."
              ],
              "sections": [
                {
                  "heading": "The four rungs",
                  "body": [
                    "People analytics climbs four rungs. Descriptive answers \"what happened?\" such as last year's turnover. Diagnostic answers \"why did it happen?\" such as which teams drove the turnover and why. Predictive answers \"what is likely next?\" such as which teams are at risk. Prescriptive answers \"what should we do?\" such as which action would help most.",
                    "Most HR teams live on the first rung and think they are ready for the third. Each rung needs cleaner data and more care than the one below. You cannot trust a prediction if you have not yet understood the cause. Climbing too fast produces confident numbers built on weak ground."
                  ]
                },
                {
                  "heading": "Climbing safely",
                  "body": [
                    "The honest move is to know your rung and say so. If leadership asks \"who will quit next quarter?\" but your data is messy and you have never done a solid diagnostic study, the right answer is \"we can tell you who left and why first, then build toward prediction.\" That protects your credibility.",
                    "Worked example: a retail chain in Kuwait wanted an AI model to predict resignations. Before building it, the HR analyst ran a diagnostic study and found most exits came from two stores with the same harsh manager. The cause was clear and fixable without any prediction model. They solved a real problem on rung two and saved months of model-building. Later, with cleaner data, they climbed to prediction. Start where the data can support you, and climb deliberately."
                  ]
                }
              ],
              "takeaways": [
                "The ladder has four rungs: descriptive, diagnostic, predictive, prescriptive.",
                "Each rung needs cleaner data than the one below.",
                "Know your rung and say it honestly to leadership.",
                "Often a diagnostic finding solves the problem without prediction.",
                "Climb deliberately; do not skip rungs."
              ],
              "exercise": {
                "title": "Find your rung",
                "prompt": "Pick one people question your leadership keeps asking. Which rung does answering it well require? Which rung is your data actually on today? Write one honest sentence you could say to leadership about the gap.",
                "placeholder": "Question: ...\nRung needed: ...\nRung we're on: ...\nHonest sentence to leadership: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Leadership asks \"who will resign next quarter?\" but your data is messy and you have done no causal study. What is the credible response?",
                  "options": [
                    "Promise a prediction model by next month anyway",
                    "Say you can first show who left and why, then build toward prediction",
                    "Refuse to discuss attrition at all",
                    "Guess a list of names to seem helpful"
                  ],
                  "answer": 1,
                  "explain": "Prediction sits on a higher rung that needs clean data and prior diagnostic work. Naming your rung honestly protects your credibility and still offers real value."
                },
                {
                  "q": "Why can a diagnostic finding sometimes beat a prediction model?",
                  "options": [
                    "Diagnostics are always more advanced",
                    "It can reveal a clear, fixable cause without needing to predict anything",
                    "Predictions are illegal in the GCC",
                    "Diagnostics require no data"
                  ],
                  "answer": 1,
                  "explain": "Understanding why people left can point straight to a fixable cause, like one harsh manager, solving the problem faster than any forecast."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's find which rung of the ladder your real question needs. Tell me what leadership keeps asking.",
                "suggested": [
                  "How do I know if my data is clean enough for prediction?",
                  "Give me a diagnostic question to start with.",
                  "How do I push back on an over-ambitious request?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-10",
              "title": "AI-assisted feedback that stays fair",
              "mins": 15,
              "hook": "AI can help managers write clearer, kinder feedback. It can also flatten everyone into the same bland review. Here is how to keep it fair and real.",
              "objectives": [
                "By the end you can use AI to improve feedback without losing the human voice.",
                "By the end you can spot when AI feedback hides a hard truth.",
                "By the end you can set rules that keep feedback specific and fair."
              ],
              "sections": [
                {
                  "heading": "The promise and the trap",
                  "body": [
                    "Many managers write weak feedback: too vague, too harsh, or too soft. AI can help by turning rough notes into clear, specific, balanced language. Used well, it raises the floor for every manager.",
                    "The trap is sameness and softening. AI can smooth real problems into polite nothing, so a struggling employee never hears the truth they need. It can also copy biased patterns, praising confident styles and marking quieter ones as \"needs to speak up more\" regardless of results. Fair feedback is specific, tied to behaviour and impact, and honest."
                  ]
                },
                {
                  "heading": "Rules that keep it fair",
                  "body": [
                    "Set three rules. One: the manager supplies the real evidence; AI only improves the wording. Two: every point must name a specific behaviour and its impact, not a personality label. Three: the manager reads, edits, and owns every word before it is sent. AI is a writing aid, not the author.",
                    "Worked example: a manager at a Dubai bank fed AI the note \"Sara is not a team player.\" Good practice rewrote it as a question back to the manager: what did Sara actually do, and what was the impact? The manager realised the real issue was that Sara missed two handover meetings, which delayed a client report. The final feedback named the behaviour and the impact, with a clear next step. AI made it specific and fair instead of a vague label that could carry bias. Always check: would this feedback help the person improve, or just make them feel judged?"
                  ]
                }
              ],
              "takeaways": [
                "AI can raise the quality floor of manager feedback.",
                "The trap is bland sameness and softened hard truths.",
                "Fair feedback names a behaviour and its impact, not a label.",
                "Rule: manager supplies evidence, AI only improves wording.",
                "The manager edits and owns every word before sending."
              ],
              "exercise": {
                "title": "Fix vague feedback",
                "prompt": "Take a vague feedback line like \"not a team player\" or \"lacks confidence.\" Rewrite it to name one specific behaviour, its impact, and a next step. Note one rule you would set so AI helps without hiding the truth.",
                "placeholder": "Vague line: ...\nBehaviour: ...\nImpact: ...\nNext step: ...\nMy fairness rule: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A manager types \"Ahmed lacks confidence\" and asks AI to polish it. What is the fairer rewrite approach?",
                  "options": [
                    "Make the wording softer and send it",
                    "Ask what Ahmed actually did and what the impact was, then describe behaviour and impact",
                    "Replace it with generic praise",
                    "Add that he should \"speak up more\" without evidence"
                  ],
                  "answer": 1,
                  "explain": "Fair feedback ties to a specific behaviour and its impact, not a personality label. Pushing for evidence prevents bias and helps the person improve."
                },
                {
                  "q": "What is the main risk of letting AI fully write performance feedback?",
                  "options": [
                    "It is too detailed and specific",
                    "It can flatten everyone into bland, similar reviews and soften hard truths",
                    "It always uses too many numbers",
                    "It refuses to write anything negative by law"
                  ],
                  "answer": 1,
                  "explain": "Left unchecked, AI smooths real problems into polite sameness and can copy biased patterns, so the employee never gets the honest signal they need."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Bring me a piece of vague feedback and we'll make it specific, fair, and honest together.",
                "suggested": [
                  "Rewrite \"not a team player\" fairly.",
                  "How do I stop AI from softening hard truths?",
                  "What rule keeps feedback unbiased?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-11",
              "title": "Personalised learning paths at scale",
              "mins": 17,
              "hook": "Generic training wastes everyone's time. AI can tailor learning to each person, if you build it on a clear skills map.",
              "objectives": [
                "By the end you can explain how AI personalises learning at scale.",
                "By the end you can see why a skills taxonomy comes first.",
                "By the end you can avoid the trap of a one-size course for all."
              ],
              "sections": [
                {
                  "heading": "Skills first, then personalise",
                  "body": [
                    "Personalised learning means each person gets the next lesson that fits their current skill and their goal, instead of one course for the whole company. AI makes this possible at scale by matching people to content.",
                    "But AI cannot personalise against nothing. You need a skills taxonomy first: a simple, shared list of the skills your roles need, and what each level looks like. A taxonomy is just an agreed list with definitions. Without it, AI recommends content that looks busy but does not close a real gap. Build the map, then let AI route people along it."
                  ]
                },
                {
                  "heading": "From map to path",
                  "body": [
                    "With a skills map in place, the flow is clear. Assess where each person is. Compare to where their role needs them. Let AI suggest a short path that closes the biggest gap first. Keep human review for high-stakes or career-changing paths.",
                    "Worked example: a tech firm in Riyadh built a small skills map for its support team, with five skills at three levels each. They assessed each agent, then AI recommended a tailored set of short lessons. A new agent weak in product knowledge got product modules first; an experienced agent weak in written English got writing practice. Completion and quality both rose, because nobody sat through lessons they did not need. The key was the map: the AI was only as good as the skills list underneath it. Start small, with one team and a handful of skills, and grow from there."
                  ]
                }
              ],
              "takeaways": [
                "Personalised learning matches each person to their next best lesson.",
                "AI cannot personalise without a skills taxonomy first.",
                "A taxonomy is a shared list of skills and what each level looks like.",
                "Assess, compare to role need, then route to close the biggest gap.",
                "Start small with one team and a few skills, then grow."
              ],
              "exercise": {
                "title": "Draft a mini skills map",
                "prompt": "Pick one role. List three or four skills it needs. For one skill, describe what beginner, capable, and expert look like. Note how AI could use this map to suggest a learning path.",
                "placeholder": "Role: ...\nSkills: ...\nSkill X — Beginner: ... Capable: ... Expert: ...\nHow AI would route learning: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A vendor offers AI that \"personalises learning for everyone.\" What must you have first for it to work?",
                  "options": [
                    "A bigger training budget",
                    "A skills taxonomy that defines the skills and levels each role needs",
                    "A longer list of courses",
                    "Every employee's home address"
                  ],
                  "answer": 1,
                  "explain": "AI needs a clear skills map to route people against. Without defined skills and levels, recommendations look busy but do not close real gaps."
                },
                {
                  "q": "Why start a learning-personalisation project with one team and a few skills?",
                  "options": [
                    "Small projects are required by law",
                    "It lets you build and test the skills map before scaling, since AI is only as good as that map",
                    "Large teams cannot use AI",
                    "It avoids the need for any assessment"
                  ],
                  "answer": 1,
                  "explain": "Starting small lets you prove the skills map works. Since the AI's quality depends on that map, getting it right on one team first prevents waste at scale."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's build the map first. Tell me a role and we'll sketch the skills AI would route learning against.",
                "suggested": [
                  "What makes a good skills taxonomy?",
                  "How detailed should skill levels be?",
                  "Where do most personalisation projects go wrong?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-12",
              "title": "The metrics leadership actually asks for",
              "mins": 16,
              "hook": "HR drowns in metrics nobody reads. Learn the few that leadership truly cares about, and how to present them so they act.",
              "objectives": [
                "By the end you can choose the few metrics tied to business decisions.",
                "By the end you can link an HR metric to money or risk.",
                "By the end you can present a metric so leadership acts on it."
              ],
              "sections": [
                {
                  "heading": "Metrics that drive a decision",
                  "body": [
                    "Leadership does not want a wall of numbers. They want the few metrics that change a decision. A useful test: if this number moved, would anyone do something different? If not, it is a vanity metric. Drop it.",
                    "The metrics that usually earn attention link people to money or risk. Examples: cost-per-hire and time-to-hire affect budget and growth speed. Regretted attrition, meaning good people leaving, affects capability and replacement cost. Internal-fill rate affects both cost and culture. Pick three to five, and tie each to a business outcome leadership already cares about."
                  ]
                },
                {
                  "heading": "Present for action",
                  "body": [
                    "Three habits make metrics land. One: show a trend, not a single dot; leaders judge direction. Two: translate into money or risk; \"regretted attrition rose 4 points\" means little, but \"that cost us roughly 12 senior engineers and AED 3 million to replace\" lands. Three: pair every metric with a recommended action and the cost of doing nothing.",
                    "Worked example: an HR director in Abu Dhabi stopped sending a 20-metric monthly report nobody opened. She switched to one slide: three metrics, each with a trend line, a money figure, and a single recommendation. Regretted attrition was rising in engineering; she showed the cost and proposed a targeted retention move. For the first time, the CEO acted in the same meeting. The lesson: fewer numbers, clearly tied to money or risk, with a recommendation attached, beat a full dashboard every time."
                  ]
                }
              ],
              "takeaways": [
                "Keep only metrics that would change a decision.",
                "Pick three to five tied to money or risk.",
                "Show trends, not single numbers.",
                "Translate every metric into money or risk.",
                "Pair each metric with a recommended action and the cost of doing nothing."
              ],
              "exercise": {
                "title": "Build a one-slide metric",
                "prompt": "Choose one HR metric leadership should care about. Write its recent trend, translate it into money or risk, and add one recommended action. Then write the cost of doing nothing.",
                "placeholder": "Metric: ...\nTrend: ...\nIn money/risk terms: ...\nRecommended action: ...\nCost of doing nothing: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which presentation is most likely to make a CEO act?",
                  "options": [
                    "A 20-metric dashboard with no recommendations",
                    "\"Regretted attrition up 4 points\" with no context",
                    "A trend line, the cost in money, and one clear recommendation",
                    "A single number with no comparison or action"
                  ],
                  "answer": 2,
                  "explain": "Leaders act on direction plus money plus a recommendation. The dashboard overwhelms, the bare number lacks meaning, and a single dot shows no trend."
                },
                {
                  "q": "What is the test for keeping a metric in your report?",
                  "options": [
                    "Whether the data is easy to collect",
                    "Whether anyone would do something different if the number moved",
                    "Whether it has a large value",
                    "Whether the vendor recommends it"
                  ],
                  "answer": 1,
                  "explain": "A metric earns its place only if it could change a decision. If nothing would change when it moves, it is a vanity metric and should be dropped."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's cut your report down to what leadership acts on. Tell me a metric you currently report.",
                "suggested": [
                  "How do I turn attrition into a money figure?",
                  "Which metrics are usually vanity metrics?",
                  "How do I present a trend in one slide?"
                ]
              }
            }
          ]
        },
        {
          "title": "Ethics, Governance & Rollout",
          "lessons": [
            {
              "lessonId": "ai-hr-13",
              "title": "Privacy, consent, and the works council",
              "mins": 18,
              "hook": "AI in HR runs on employee data, and that data has rules and feelings attached. Get privacy and consent right, or the whole project stalls.",
              "objectives": [
                "By the end you can apply core privacy principles to an HR AI project.",
                "By the end you can tell real consent from a forced tick-box.",
                "By the end you can engage employee representatives early, not late."
              ],
              "sections": [
                {
                  "heading": "Three privacy principles to hold",
                  "body": [
                    "Privacy is not just a legal box; it is the basis of employee trust. Three principles guide most data rules worldwide, including the UAE's data protection law and Saudi Arabia's PDPL. Purpose limitation: collect data only for a clear, stated reason, and do not quietly reuse it. Data minimisation: collect the least you need, not the most you can. Transparency: tell people what you collect and why, in plain words.",
                    "Consent is the trickiest. Real consent is freely given and can be refused without punishment. In a workplace, where the employer holds power, a tick-box that staff feel forced to accept is weak consent. For sensitive uses, lean on clear purpose and fairness, not on pressured consent."
                  ]
                },
                {
                  "heading": "Bring representatives in early",
                  "body": [
                    "In many companies, especially European-owned firms operating in the Gulf, a works council or employee representative group must be consulted before monitoring or AI tools touch staff. Even where no formal council exists, involving employee voices early prevents revolt later.",
                    "Worked example: a German-owned manufacturer in Abu Dhabi planned an AI tool to analyse internal communication for \"engagement.\" Their works council asked one question: would this read private messages? It would. The council refused, and rightly. The company redesigned the project to use only anonymous survey data, grouped together so no single person could be identified, with no individual tracking. Because they involved the council before building, they lost weeks, not the whole project or the workforce's trust. The rule: consult the people whose data it is, before you build, not after."
                  ]
                }
              ],
              "takeaways": [
                "Privacy is the basis of employee trust, not just a legal box.",
                "Hold three principles: purpose limit, minimisation, transparency.",
                "Real consent can be refused without punishment.",
                "Workplace tick-box consent is weak; rely on purpose and fairness.",
                "Consult employee representatives before you build, not after."
              ],
              "exercise": {
                "title": "Privacy-check a project",
                "prompt": "Take one AI-in-HR project. Write what data it collects, the single clear purpose, and the least data needed. Then note who should be consulted before you build, and one sentence you would tell staff in plain words.",
                "placeholder": "Project: ...\nData collected: ...\nClear purpose: ...\nLeast data needed: ...\nWho to consult first: ...\nPlain-words message to staff: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why is a tick-box consent form often weak in a workplace?",
                  "options": [
                    "Employees cannot read forms",
                    "The employer holds power, so consent may not be freely given or refusable without fear",
                    "Tick-boxes are banned in the GCC",
                    "Consent is never needed at work"
                  ],
                  "answer": 1,
                  "explain": "Real consent must be free and refusable without punishment. Because the employer holds power, pressured consent is weak. For sensitive uses, rely on clear purpose and fairness instead."
                },
                {
                  "q": "A works council asks whether your engagement tool reads private messages. The honest answer is yes. What is the best move?",
                  "options": [
                    "Proceed anyway; you have legal sign-off elsewhere",
                    "Hide the message-reading feature from the council",
                    "Redesign to use anonymous, grouped data with no individual tracking",
                    "Cancel all people analytics forever"
                  ],
                  "answer": 2,
                  "explain": "Reading private messages breaks trust and likely the rules. Switching to anonymous, grouped data keeps the useful insight without watching individuals, and keeps the council and staff on side."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's privacy-check your project. Tell me what data it uses and we'll test it against purpose, minimisation, and transparency.",
                "suggested": [
                  "Is workplace consent ever strong enough on its own?",
                  "What does data minimisation look like in practice?",
                  "How early should I involve employee reps?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-14",
              "title": "Writing an AI usage policy",
              "mins": 17,
              "hook": "A clear AI usage policy is what lets your team move fast without fear. Here is the structure that legal, staff, and councils will all sign.",
              "objectives": [
                "By the end you can structure an AI usage policy that people will follow.",
                "By the end you can write rules in plain language, not legal fog.",
                "By the end you can include the parts auditors look for."
              ],
              "sections": [
                {
                  "heading": "What a usable policy contains",
                  "body": [
                    "A policy people ignore is worse than none, because it gives false comfort. A usable AI policy is short, clear, and practical. It tells staff what they may do, what they must not do, and who to ask when unsure.",
                    "Cover seven parts. Purpose: why this policy exists. Scope: which tools and which staff. Allowed uses: clear green-light examples. Forbidden uses: clear red lines, like putting confidential employee data into public AI tools. Human oversight: where a person must review and own decisions. Data rules: what data may be used and how it is protected. Accountability: who owns the policy and how to raise concerns."
                  ]
                },
                {
                  "heading": "Plain language and real examples",
                  "body": [
                    "Rules followed are rules understood. Write at the level of your newest employee. Replace \"utilise generative AI solutions in accordance with governance protocols\" with \"you may use approved AI tools for the tasks listed below.\" Add concrete do and do-not examples for the tasks people actually face.",
                    "Worked example: an HR team in Dubai wrote a one-page policy with a simple table. Left column: \"You may.\" Drafting job descriptions, summarising meeting notes, building first-draft training plans. Right column: \"You must not.\" Pasting employee salaries or medical data into public chatbots, letting AI make final hiring or firing calls, using AI to monitor individuals secretly. Each row had a one-line example. Adoption rose because staff finally knew the line. Test your policy by asking a junior employee to read it and explain the rules back; if they cannot, rewrite it."
                  ]
                }
              ],
              "takeaways": [
                "An ignored policy is worse than none; keep it short and clear.",
                "Cover seven parts, from purpose to accountability.",
                "Write at the level of your newest employee.",
                "Use concrete \"you may\" and \"you must not\" examples.",
                "Test it by having a junior employee explain it back."
              ],
              "exercise": {
                "title": "Draft a may / must-not table",
                "prompt": "Write a simple two-column table for your team. List three things staff MAY do with AI and three they MUST NOT. Add a one-line real example to each row. Note who owns the policy and how staff raise concerns.",
                "placeholder": "MAY: 1. ... 2. ... 3. ...\nMUST NOT: 1. ... 2. ... 3. ...\nPolicy owner: ...\nHow to raise a concern: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which line belongs in the \"must not\" column of an HR AI policy?",
                  "options": [
                    "Use approved AI to draft a job description",
                    "Paste employee salary and medical data into a public chatbot",
                    "Summarise your own meeting notes with AI",
                    "Build a first-draft training plan with AI"
                  ],
                  "answer": 1,
                  "explain": "Putting confidential employee data into a public AI tool risks a serious data breach. The others are reasonable, low-risk drafting tasks that belong in \"may.\""
                },
                {
                  "q": "What is the best test that your policy is clear enough?",
                  "options": [
                    "It uses formal legal language throughout",
                    "It is at least ten pages long",
                    "A junior employee can read it and explain the rules back",
                    "Only the legal team can understand it"
                  ],
                  "answer": 2,
                  "explain": "A policy works only if the people bound by it understand it. If a new employee can repeat the rules in their own words, the policy is clear enough to follow."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's draft a policy people will actually follow. Tell me your team and the tools they use, and we'll build the may / must-not table.",
                "suggested": [
                  "What are common red lines for HR AI use?",
                  "How do I make the policy not sound like legal fog?",
                  "Who should own and update the policy?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-15",
              "title": "Your 90-day responsible-adoption plan",
              "mins": 19,
              "hook": "Strategy without a plan stays a slide. This 90-day plan turns your AI-in-HR thinking into safe, visible action.",
              "objectives": [
                "By the end you can build a phased 90-day AI adoption plan.",
                "By the end you can pick a safe first project that builds trust.",
                "By the end you can set guardrails and checkpoints from day one."
              ],
              "sections": [
                {
                  "heading": "Three phases in 90 days",
                  "body": [
                    "A good rollout earns trust before it takes risk. Split 90 days into three phases of about a month each. Phase one, Foundations: agree the thesis, write the usage policy, set guardrails, and consult representatives. Phase two, Pilot: run one safe, useful project in the Automate zone, with clear measures. Phase three, Review and scale: check results, fix issues, and decide what to expand.",
                    "The order matters. Many teams jump straight to a flashy pilot and skip foundations, then hit a privacy or trust wall mid-project. Doing policy and consultation first feels slow but prevents the expensive stall later."
                  ]
                },
                {
                  "heading": "Choosing the first project well",
                  "body": [
                    "Your first project should be safe, useful, and visible. Safe means low stakes and reversible, usually in the Administrative Expert role. Useful means it solves a real pain staff feel. Visible means people notice the win, which builds support for the next step.",
                    "Worked example: an HR team in Sharjah set this plan. Days 1 to 30: finalise the thesis and a one-page policy, brief staff, agree guardrails. Days 31 to 60: pilot an internal HR helpdesk chatbot for leave and payroll questions, with a human handover for anything sensitive, tracking response time and staff satisfaction. Days 61 to 90: review the data, fix the weak answers, and propose phase two, AI-assisted job description drafting. The chatbot cut routine queries by 40% and freed the team for harder work. Because the first win was safe and visible, leadership approved the next phase easily. Each phase should end with a short written checkpoint: what worked, what to fix, and a clear go or no-go for the next step."
                  ]
                }
              ],
              "takeaways": [
                "Split 90 days into Foundations, Pilot, Review-and-scale.",
                "Do policy and consultation before any pilot.",
                "Make the first project safe, useful, and visible.",
                "Pick a low-stakes Automate-zone project to build trust.",
                "End each phase with a written go or no-go checkpoint."
              ],
              "exercise": {
                "title": "Sketch your 90 days",
                "prompt": "Write a simple 90-day plan in three phases. For each phase, list one or two key actions. Name your safe first pilot and the one measure you will track. Add a checkpoint question for the end of each phase.",
                "placeholder": "Days 1-30 (Foundations): ...\nDays 31-60 (Pilot): ... | First pilot: ... | Measure: ...\nDays 61-90 (Review & scale): ...\nCheckpoint questions: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why do foundations (policy, guardrails, consultation) come before the pilot?",
                  "options": [
                    "To delay the project as long as possible",
                    "Because jumping to a pilot without them often hits a privacy or trust wall mid-project",
                    "Because regulators ban pilots in the first month",
                    "Foundations are optional and can come last"
                  ],
                  "answer": 1,
                  "explain": "Skipping foundations feels faster but usually causes an expensive stall when privacy or trust issues surface mid-pilot. Doing them first prevents that."
                },
                {
                  "q": "Which makes the strongest first AI project for a 90-day plan?",
                  "options": [
                    "An AI that decides promotions automatically",
                    "An internal helpdesk chatbot for leave and payroll questions, with human handover for sensitive cases",
                    "An AI that secretly scores employee morale from chat",
                    "An AI that issues final hiring decisions"
                  ],
                  "answer": 1,
                  "explain": "The chatbot is safe, useful, and visible: low stakes, solves real pain, and a win people notice. That builds the trust needed to expand."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's turn your thinking into a 90-day plan. Tell me your team's biggest routine pain and we'll pick a safe first pilot.",
                "suggested": [
                  "What should go in the first 30 days?",
                  "How do I pick a safe but visible pilot?",
                  "What should each checkpoint ask?"
                ]
              }
            },
            {
              "lessonId": "ai-hr-16",
              "title": "Keeping the human in the loop",
              "mins": 15,
              "hook": "The final guardrail is the most important one. Learn how to keep real human judgment in charge, so AI stays a tool and not the decider.",
              "objectives": [
                "By the end you can design meaningful human oversight, not a rubber stamp.",
                "By the end you can spot when oversight has quietly become fake.",
                "By the end you can set the rule that keeps people accountable."
              ],
              "sections": [
                {
                  "heading": "Real oversight versus rubber-stamping",
                  "body": [
                    "\"Human in the loop\" means a person reviews and can change or refuse an AI decision. But oversight can quietly become a rubber stamp, where the human just clicks approve because the AI \"is usually right.\" That is the opposite of safety: the human carries the blame but has stopped thinking.",
                    "Real oversight has three features. The reviewer has the time and information to judge, not a five-second click. The reviewer can actually disagree, with a clear path to override. And someone is accountable by name for the final decision, not \"the system.\" If any of these is missing, the loop is theatre."
                  ]
                },
                {
                  "heading": "Designing it so people stay in charge",
                  "body": [
                    "Build oversight on purpose. Show the reviewer why the AI suggested something, not just the answer. Set the highest-stakes cases to need stronger review. Track how often humans override, because a near-zero override rate is a warning sign that people have stopped really checking. Train reviewers to challenge the AI, not defer to it.",
                    "Worked example: a company in Riyadh used AI to recommend training budget cuts per team. At first, managers approved every recommendation in seconds, a clear rubber stamp. HR redesigned the loop: each recommendation now showed the reasoning and the data behind it, and managers had to write one line confirming they agreed and why. Override rates rose to a healthy level, and two flawed recommendations were caught and reversed. The human was back in charge. The lasting rule to hold across this whole course: AI advises, humans decide, and a named person owns the outcome."
                  ]
                }
              ],
              "takeaways": [
                "Human in the loop means a person can change or refuse the AI's call.",
                "A rubber stamp is fake oversight; the human stops thinking.",
                "Real oversight needs time, information, real power to override, and named accountability.",
                "A near-zero override rate is a warning sign, not a success.",
                "The rule: AI advises, humans decide, a named person owns it."
              ],
              "exercise": {
                "title": "Stress-test your oversight",
                "prompt": "Pick one AI-assisted decision in your work. Check it against the three features: does the reviewer have time and information, can they really override, and is one named person accountable? Note any feature that is missing and how you would fix it.",
                "placeholder": "Decision: ...\nTime & information? ...\nReal power to override? ...\nNamed accountable person? ...\nWhat's missing and my fix: ...",
                "interaction": {
                  "mechanic": "Decision Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Place the scenario on the map first. The decision matters more than a paragraph.",
                  "actionLabel": "Check the AI decision",
                  "artifactLabel": "Add to AI map",
                  "choices": [
                    "Automate",
                    "Augment",
                    "Keep human",
                    "Not ready"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Managers approve every AI budget recommendation in seconds. What does this most likely show?",
                  "options": [
                    "The AI is perfect and needs no review",
                    "Oversight has become a rubber stamp, where humans no longer truly check",
                    "The managers are highly skilled",
                    "The override path is working well"
                  ],
                  "answer": 1,
                  "explain": "Instant, universal approval signals rubber-stamping. A near-zero override rate warns that people have stopped genuinely reviewing, even though they carry the blame."
                },
                {
                  "q": "Which single rule best captures responsible AI use across the whole course?",
                  "options": [
                    "AI decides, humans rarely interfere",
                    "AI advises, humans decide, and a named person owns the outcome",
                    "Whoever runs the tool is never responsible",
                    "Speed matters more than accountability"
                  ],
                  "answer": 1,
                  "explain": "This rule keeps AI as a tool, preserves human judgment, and ensures clear accountability, the thread running through every lesson in this course."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's make sure your oversight is real, not theatre. Tell me one AI-assisted decision and we'll stress-test the loop.",
                "suggested": [
                  "How do I tell real oversight from a rubber stamp?",
                  "Why is a near-zero override rate a bad sign?",
                  "How do I train reviewers to challenge the AI?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Decision Map",
        "short": "Sort the decision before choosing the tool.",
        "artifact": "AI adoption map",
        "interaction": "sort, audit, choose, stress-test",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "branding": {
      "courseId": "branding",
      "title": "Personal Branding",
      "modules": [
        {
          "title": "Your Foundation",
          "lessons": [
            {
              "lessonId": "branding-1",
              "title": "What personal branding actually is (and isn't)",
              "mins": 12,
              "hook": "Many smart people think a personal brand is a logo, a slogan, or constant posting. It is none of those. This lesson tells you what it really is, so you stop wasting energy on the wrong things.",
              "objectives": [
                "By the end you can explain a personal brand in one plain sentence.",
                "By the end you can tell the difference between a brand and self-promotion.",
                "By the end you can name the one thing your brand must protect: trust."
              ],
              "sections": [
                {
                  "heading": "A simple definition",
                  "body": [
                    "Your personal brand is simple to say: it is what people think and feel when they hear your name and you are not in the room. That is all. It is your reputation, made on purpose instead of by accident.",
                    "Notice the key part: \"when you are not in the room.\" You cannot control this with a clever photo or a long bio. You control it with the work you do, how you treat people, and what you choose to be known for. A brand is not a mask you wear. It is the honest pattern people see over time."
                  ]
                },
                {
                  "heading": "What it is NOT",
                  "body": [
                    "A personal brand is not bragging. It is not posting every day. It is not a polished logo or a clever tagline. Those are marketing tricks, and most professionals in Dubai or Riyadh can feel when they are fake.",
                    "Here is a useful test, the \"Room Test.\" Imagine two colleagues talking about you after a meeting. What do they say? \"She is the one who always finds the risk before it costs us money.\" That is a brand. \"He posts a lot on LinkedIn\" is not a brand. One is about value. The other is about noise."
                  ]
                },
                {
                  "heading": "Why this matters now",
                  "body": [
                    "In the Gulf, careers move through trust and word of mouth. A manager at an Abu Dhabi bank hears your name from a friend before they ever read your CV. That early reputation decides if a door opens.",
                    "So the goal of this course is not to make you loud. It is to make you clear. When people know exactly what you are good at, they bring the right work to you. A strong, honest brand does this quietly, even while you sleep."
                  ]
                }
              ],
              "takeaways": [
                "Your brand is what people say about you when you are not there.",
                "A brand is built by real work and behaviour, not by posting.",
                "Use the Room Test: would a colleague describe your value, or just your noise?",
                "The aim is to be clear, not loud.",
                "Trust is the thing your brand must always protect."
              ],
              "exercise": {
                "title": "Run the Room Test",
                "prompt": "Imagine two colleagues talking about you after you leave a meeting. Write down, in their words, the one sentence you hope they say. Then write the sentence you fear they might actually say today. The gap between the two is your work for this course.",
                "placeholder": "What I hope they say: \"...\"\nWhat I fear they say: \"...\"\nThe gap I want to close: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A colleague says, \"My personal brand is my new LinkedIn banner and headshot.\" What is the best response?",
                  "options": [
                    "Agree, because a strong visual is the core of a brand.",
                    "Explain that a brand is the reputation people hold of you, and visuals are only a small surface layer.",
                    "Tell them to post more often to build the brand faster.",
                    "Say that brands only matter for senior leaders."
                  ],
                  "answer": 1,
                  "explain": "A brand lives in what people think and feel about your value. Visuals are a thin surface. They support a brand but never create one."
                },
                {
                  "q": "Which of these is the clearest sign of a real personal brand?",
                  "options": [
                    "You post on social media every single day.",
                    "You have a clever tagline under your name.",
                    "Colleagues describe your specific value when you are not in the room.",
                    "You have many followers."
                  ],
                  "answer": 2,
                  "explain": "A brand is the reputation that travels without you. When others can name your value without you present, the brand is real and working."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello, I am here in the lesson with you. We just defined a personal brand as what people say when you are not in the room. Ask me anything, or tap a question below.",
                "suggested": [
                  "Isn't building a brand just bragging?",
                  "Why does this matter if I am good at my job already?",
                  "Can an introvert build a strong brand?"
                ]
              }
            },
            {
              "lessonId": "branding-2",
              "title": "Finding your value proposition",
              "mins": 18,
              "hook": "If you cannot say what you are good at in one clear sentence, others will guess for you. This lesson gives you a simple formula to write that sentence and make it land.",
              "objectives": [
                "By the end you can write a one-sentence value proposition using a clear formula.",
                "By the end you can name who you help and the result you create.",
                "By the end you can test your sentence so it sounds real, not generic."
              ],
              "sections": [
                {
                  "heading": "What a value proposition is",
                  "body": [
                    "A value proposition is one short sentence. It says who you help, what problem you solve, and the result you create. It is the answer to the question \"what do you do?\" that makes someone lean in instead of nod politely.",
                    "Most people answer with a job title: \"I am an HR manager.\" A title tells people your box, not your value. A value proposition tells them why you matter to them."
                  ]
                },
                {
                  "heading": "The Who-What-Result formula",
                  "body": [
                    "Use this simple structure: \"I help [WHO] do [WHAT] so they get [RESULT].\" Fill in each part with plain words.",
                    "Here is a Gulf example. A learning specialist in Jeddah could say: \"I help Saudi banks turn new graduates into confident branch staff in 90 days, so they serve customers without long, costly extra support.\" Compare that to \"I do training.\" The first sentence has a who (Saudi banks), a what (turn graduates into confident staff), and a result (faster service, lower cost). The second has nothing to hold on to.",
                    "Make the result something a leader cares about: money saved, time saved, risk reduced, or growth created. Soft words like \"synergy\" or \"empower\" do not land. Concrete results do."
                  ]
                },
                {
                  "heading": "Test it before you use it",
                  "body": [
                    "Run your sentence through three quick checks. First, the Specific check: could a competitor say the exact same thing? If yes, it is too general. Second, the Proof check: can you back it up with one real example? If not, soften the claim. Third, the Plain check: would a busy person understand it in one read?",
                    "Say your sentence out loud to a trusted colleague. Watch their face. If they say \"oh, interesting, tell me more,\" it works. If they say \"okay\" and change the subject, go back and make the result sharper."
                  ]
                }
              ],
              "takeaways": [
                "A value proposition is one sentence: who you help, what you solve, the result.",
                "Use the formula: I help [WHO] do [WHAT] so they get [RESULT].",
                "Make the result concrete: money, time, risk, or growth.",
                "A job title is not a value proposition.",
                "Test it for being specific, provable, and plain."
              ],
              "exercise": {
                "title": "Write your one sentence",
                "prompt": "Using the formula \"I help [WHO] do [WHAT] so they get [RESULT],\" write your value proposition. Then run it through the three checks: is it specific, can you prove it, is it plain? Rewrite it once to make the result sharper.",
                "placeholder": "Draft 1: I help ___ do ___ so they get ___.\nSpecific? Provable? Plain?\nDraft 2 (sharper result): ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to brand plan",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Which value proposition is strongest?",
                  "options": [
                    "I am a passionate, results-driven HR professional.",
                    "I help mid-size UAE retailers cut new-hire turnover in the first 90 days, so they stop losing training money.",
                    "I leverage synergies to empower people and processes.",
                    "I am an experienced manager with many skills."
                  ],
                  "answer": 1,
                  "explain": "It names a clear who (UAE retailers), a real problem (early turnover), and a result a leader cares about (saved training money). The others are vague or full of filler."
                },
                {
                  "q": "Your draft says, \"I help companies improve their culture.\" What is the main weakness?",
                  "options": [
                    "It is too long.",
                    "It is too specific.",
                    "It is too general; any consultant could say it and there is no clear result.",
                    "It uses the word help."
                  ],
                  "answer": 2,
                  "explain": "The Specific check fails. A competitor could say the same words. Name the exact who and a concrete result to make it yours."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's sharpen your one sentence. We used the formula: I help [WHO] do [WHAT] so they get [RESULT]. Share your draft and I will help you make the result land.",
                "suggested": [
                  "How do I pick the result if I do many things?",
                  "My work is hard to measure. What result do I use?",
                  "Can you give me three more Gulf examples?"
                ]
              }
            },
            {
              "lessonId": "branding-3",
              "title": "The reputation audit",
              "mins": 16,
              "hook": "Before you build a brand, you need to know what people already think of you. This lesson shows you a simple, honest way to find out, without guessing.",
              "objectives": [
                "By the end you can run a short reputation audit using real evidence.",
                "By the end you can spot the gap between how you see yourself and how others see you.",
                "By the end you can pick one clear thing to fix first."
              ],
              "sections": [
                {
                  "heading": "Why audit before you build",
                  "body": [
                    "You cannot change a reputation you have not measured. Many people build a brand on a guess, then wonder why it does not match how the market sees them. An audit replaces the guess with evidence.",
                    "Think of it like a health check before training. You measure first, then you train the right muscles. Skipping the check means you might train the wrong thing for months."
                  ]
                },
                {
                  "heading": "The three-source audit",
                  "body": [
                    "Gather evidence from three places. Source one is your own view: write the three words you want to be known for. Source two is feedback: ask three or four trusted colleagues a simple question, \"When you describe my work to someone else, what do you say?\" Ask people who will be honest, not just kind. Source three is your digital trail: read your own LinkedIn, your email tone, and how you show up in meetings, as if you were a stranger.",
                    "Here is a real pattern. A project lead in Dubai wanted to be known as \"strategic.\" But all three feedback replies said \"reliable\" and \"fast.\" Her digital trail showed many task updates and few big-picture posts. The audit revealed the gap clearly. She was seen as a strong doer, not a strategic thinker. That is not failure. It is the exact information she needed."
                  ]
                },
                {
                  "heading": "Find the gap, pick one fix",
                  "body": [
                    "Put your three answers side by side: how you see yourself, how others see you, and what your trail shows. The gap between them is your starting point.",
                    "Do not try to fix everything. Pick the single most important gap and one action to close it. The project lead above chose to share one short \"why we made this decision\" note after each project. Small, repeatable, and it slowly moved her reputation toward \"strategic.\" One clear action beats ten vague intentions."
                  ]
                }
              ],
              "takeaways": [
                "You cannot change a reputation you have not measured.",
                "Use three sources: your own view, honest feedback, your digital trail.",
                "Ask colleagues what they say about your work when they describe it to others.",
                "The gap between your view and theirs is your real starting point.",
                "Pick one gap and one repeatable action to close it."
              ],
              "exercise": {
                "title": "Your three-source audit",
                "prompt": "Write the three words you want to be known for. Then message three trusted colleagues and ask: \"When you describe my work to someone, what do you say?\" Finally, read your own LinkedIn as a stranger. Note the biggest gap, then choose one small action to close it.",
                "placeholder": "Words I want: ...\nWhat colleagues say: ...\nWhat my trail shows: ...\nBiggest gap: ...\nOne action: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Who should you ask for feedback in a reputation audit?",
                  "options": [
                    "Only your closest friends, because they support you.",
                    "Trusted colleagues who will be honest, even if the answer is uncomfortable.",
                    "Your manager only, because their view is the one that counts.",
                    "Nobody; self-reflection is enough."
                  ],
                  "answer": 1,
                  "explain": "Honest colleagues give you real evidence. Friends who only praise you, or a single boss, give you a narrow or soft picture that hides the true gap."
                },
                {
                  "q": "Your audit shows a big gap between how you see yourself and how others see you. What is the best next step?",
                  "options": [
                    "Ignore the feedback; you know yourself best.",
                    "Try to fix every gap at once.",
                    "Pick the single most important gap and one small, repeatable action to close it.",
                    "Conclude that branding is not for you."
                  ],
                  "answer": 2,
                  "explain": "A gap is useful information, not a final judgement. Focusing on one gap with one repeatable action creates real, steady change. Fixing everything at once usually changes nothing."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Time for an honest look. We use three sources: your own view, real feedback, and your digital trail. Tell me what you found and I will help you read the gap.",
                "suggested": [
                  "How do I ask for feedback without it being awkward?",
                  "What if the feedback contradicts itself?",
                  "How do I know which gap to fix first?"
                ]
              }
            }
          ]
        },
        {
          "title": "Your Narrative",
          "lessons": [
            {
              "lessonId": "branding-4",
              "title": "The story that connects your dots",
              "mins": 18,
              "hook": "Your career may look like a set of unrelated jobs. A good story connects them into one clear path. This lesson shows you how to build that story.",
              "objectives": [
                "By the end you can build a career story with a simple three-part structure.",
                "By the end you can connect past roles to your next move with a clear thread.",
                "By the end you can explain a career change without sounding lost."
              ],
              "sections": [
                {
                  "heading": "Why a story beats a list",
                  "body": [
                    "A CV is a list of jobs. A story is a path with meaning. People remember stories, not lists. When you give a clear story, the listener does the rest: they see where you fit and what you could do next.",
                    "Without a story, people make up their own. They might decide you are a job-hopper or that your career has no direction. A clear story takes that decision back into your hands."
                  ]
                },
                {
                  "heading": "The Past-Pivot-Promise structure",
                  "body": [
                    "Use three simple parts. Past: where you started and what you learned. Pivot: the moment or choice that changed your direction. Promise: where you are heading and the value you now bring.",
                    "Here is a Gulf example. \"I started in retail operations in Sharjah, where I learned how front-line teams really work [Past]. I kept seeing good people leave because training was poor, so I moved into learning and development [Pivot]. Now I design training that keeps front-line staff and cuts turnover for Gulf retailers [Promise].\" Three sentences. Every job now points in one direction.",
                    "The Pivot is the key. It is the reason you changed, and it turns a random jump into a logical step. A strong pivot is usually about a problem you cared about, not just a better salary."
                  ]
                },
                {
                  "heading": "Handling a messy path",
                  "body": [
                    "Most careers are messy. That is normal. You do not lie about it. You choose which thread to follow. Look across all your roles and find the one skill or interest that keeps appearing. That repeating thread becomes the centre of your story.",
                    "Say you worked in sales, then HR, then operations. The thread might be \"I keep ending up where people and process meet.\" That single thread makes three different jobs feel like one journey. You are not hiding the change. You are giving it meaning."
                  ]
                }
              ],
              "takeaways": [
                "A story connects your jobs; a list just stacks them.",
                "Use Past, Pivot, Promise to give your career one clear direction.",
                "The Pivot explains why you changed and makes the path logical.",
                "Find the one thread that repeats across your roles.",
                "If you do not give people a story, they invent one for you."
              ],
              "exercise": {
                "title": "Build your three-part story",
                "prompt": "Write your career story in three sentences using Past, Pivot, Promise. Make the Pivot about a problem you cared about, not just money. Then read it aloud and check: does every past role now point toward your Promise?",
                "placeholder": "Past: I started in ___, where I learned ___.\nPivot: I changed because ___.\nPromise: Now I help ___ get ___.",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the most important job of the 'Pivot' in your story?",
                  "options": [
                    "To list every role you have ever held.",
                    "To explain why you changed direction, turning a random jump into a logical step.",
                    "To hide the fact that you changed careers.",
                    "To impress people with a big salary increase."
                  ],
                  "answer": 1,
                  "explain": "The Pivot gives meaning to the change. A reason the listener understands, usually a problem you cared about, makes your different roles feel like one path."
                },
                {
                  "q": "You have worked in three unrelated fields. What is the best way to tell your story?",
                  "options": [
                    "Pretend two of the jobs never happened.",
                    "List all three with equal detail and let the listener decide.",
                    "Find the one skill or interest that repeats across all three and make it the centre of your story.",
                    "Say your career has no real direction yet."
                  ],
                  "answer": 2,
                  "explain": "A repeating thread gives a messy path meaning. You stay honest about the changes while showing one clear thread that ties them together."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's connect your dots. We use Past, Pivot, Promise to turn a list of jobs into one clear path. Tell me your rough history and I will help you find the thread.",
                "suggested": [
                  "My career feels random. How do I find the thread?",
                  "How do I explain a gap or a layoff?",
                  "Can you turn my three jobs into one story?"
                ]
              }
            },
            {
              "lessonId": "branding-5",
              "title": "Positioning: own one thing, not ten",
              "mins": 17,
              "hook": "When you try to be known for everything, you get known for nothing. This lesson helps you choose the one thing you will own, and say a confident no to the rest.",
              "objectives": [
                "By the end you can explain why a narrow position is stronger than a wide one.",
                "By the end you can choose one clear thing to be known for.",
                "By the end you can decide what to say no to."
              ],
              "sections": [
                {
                  "heading": "Why narrow wins",
                  "body": [
                    "Positioning means choosing the one space in people's minds that is yours. The fear is that being narrow will limit you. The truth is the opposite. A narrow position is easy to remember and easy to refer.",
                    "Think about it from the other side. If a friend needs help with hiring in Saudi healthcare, they will call the person known for exactly that, not the generalist who \"does a bit of everything.\" Being known for one thing is what makes people send work your way."
                  ]
                },
                {
                  "heading": "The sweet spot: three circles",
                  "body": [
                    "Find your position where three circles overlap. Circle one: what you are genuinely good at. Circle two: what the market actually needs and will pay for. Circle three: what energises you, so you can keep doing it for years.",
                    "Here is an example. A consultant in Doha was good at many HR tasks. But her best skill was helping family businesses set up fair pay systems. The market needed it (many Gulf family firms struggle here), and she enjoyed it. So she stopped saying \"HR consultant\" and started saying \"I fix pay fairness in Gulf family businesses.\" Her referrals doubled, because now people knew exactly when to think of her."
                  ]
                },
                {
                  "heading": "The power of no",
                  "body": [
                    "A position is only real if you protect it. That means saying no to work that does not fit, even good work. Every time you take a project that does not match your one thing, you blur the picture people hold of you.",
                    "Use a simple rule, the One-Line Filter: \"Does this match the one thing I want to be known for?\" If yes, lean in. If no, refer it kindly to someone else. Saying no is not losing. It is keeping your position sharp so the right work keeps coming."
                  ]
                }
              ],
              "takeaways": [
                "If you are known for everything, you are known for nothing.",
                "A narrow position is easy to remember and easy to refer.",
                "Find your spot where skill, market need, and energy overlap.",
                "Use the One-Line Filter to decide what fits your position.",
                "Saying no to work that does not fit keeps your position sharp."
              ],
              "exercise": {
                "title": "Find your one thing",
                "prompt": "Draw three circles: what you are good at, what the market needs, and what energises you. Write what sits in the middle of all three. That is your candidate position. Then write one type of work you will now say no to, to protect it.",
                "placeholder": "Good at: ...\nMarket needs: ...\nEnergises me: ...\nMy one thing (the overlap): ...\nWhat I will say no to: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why does a narrow position often bring MORE opportunities than a wide one?",
                  "options": [
                    "Because narrow people work harder.",
                    "Because it is easy to remember and refer, so people know exactly when to think of you.",
                    "Because clients only hire specialists who charge less.",
                    "Because wide positions are against the rules."
                  ],
                  "answer": 1,
                  "explain": "Referrals depend on memory. When your one thing is clear, people recall you at the exact moment a matching need appears. A wide position is forgettable."
                },
                {
                  "q": "You are known for talent development. A client offers well-paid work redesigning their payroll system, far from your focus. What does strong positioning suggest?",
                  "options": [
                    "Take it; money is money and you should never refuse work.",
                    "Take it and add payroll to your list of skills permanently.",
                    "Politely refer it to a payroll specialist to keep your position sharp.",
                    "Accept it but hide it from your network."
                  ],
                  "answer": 2,
                  "explain": "Work that does not fit your one thing, even paid work, blurs the picture people hold of you. Referring it kindly protects your position and builds goodwill with the specialist you helped."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's narrow your focus. We find your position where skill, market need, and energy overlap, then protect it with a confident no. What are you tempted to be known for?",
                "suggested": [
                  "I am scared narrowing will cost me work. Is that true?",
                  "How do I say no without damaging the relationship?",
                  "What if I have two strong things, not one?"
                ]
              }
            },
            {
              "lessonId": "branding-6",
              "title": "Your bio, three ways",
              "mins": 17,
              "hook": "You need different bios for different places: a long one, a short one, and a one-liner. This lesson gives you all three from one core message.",
              "objectives": [
                "By the end you can write a one-line, a short, and a long bio.",
                "By the end you can keep one consistent message across all three lengths.",
                "By the end you can match each bio to the right place to use it."
              ],
              "sections": [
                {
                  "heading": "One message, three lengths",
                  "body": [
                    "A bio is just your value proposition and your story, written for others to read. You need it in three sizes because different places ask for different lengths. The trick is to keep the same core message in all of them, so you sound like one consistent person.",
                    "Start from your value proposition (Lesson 2) and your story (Lesson 4). Those are your raw material. The three bios are simply that material, cut to fit."
                  ]
                },
                {
                  "heading": "The three sizes",
                  "body": [
                    "The One-Liner (about 10 to 15 words): this is your introduction line and your LinkedIn headline. Example: \"I help Gulf family businesses build fair pay systems people trust.\"",
                    "The Short bio (about 40 to 60 words): this is for a speaker introduction, an event programme, or the top of a profile. It adds one proof point and a touch of personality. Example: \"I help Gulf family businesses build fair pay systems people trust. Over the last ten years I have redesigned pay for more than thirty firms across the UAE and KSA. I care most about fairness that survives the next generation. Based in Doha.\"",
                    "The Long bio (about 100 to 150 words): this is for a website 'About' page or a detailed profile. It includes your story (Past, Pivot, Promise), two or three proof points, and how to reach you. It is written in a warm, human voice, not a list of duties."
                  ]
                },
                {
                  "heading": "First person or third person",
                  "body": [
                    "Choose based on the place. Use first person (\"I help...\") for LinkedIn, your own website, and friendly settings. It feels warm and direct. Use third person (\"Sara helps...\") for formal event programmes and conference introductions, where it is the standard.",
                    "Whatever you choose, stay consistent within one document. Mixing \"I\" and \"she\" in the same bio looks careless. And always lead with value, not job title. \"I help...\" pulls the reader in. \"I am a Senior Manager at...\" makes them wait for the point."
                  ]
                }
              ],
              "takeaways": [
                "Write your bio in three sizes: one-liner, short, and long.",
                "Keep one consistent core message across all three.",
                "Build them from your value proposition and your story.",
                "Use first person for friendly places, third person for formal ones.",
                "Always lead with value, not job title."
              ],
              "exercise": {
                "title": "Write all three bios",
                "prompt": "Using your value proposition and story, write your one-liner (10 to 15 words), your short bio (40 to 60 words), and your long bio (100 to 150 words). Check that the same core message appears in all three, and that each one leads with value, not title.",
                "placeholder": "One-liner: ...\nShort bio: ...\nLong bio: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to brand plan",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "What should all three versions of your bio have in common?",
                  "options": [
                    "The exact same number of words.",
                    "One consistent core message, so you sound like one person everywhere.",
                    "A formal third-person voice.",
                    "A full list of every job you have held."
                  ],
                  "answer": 1,
                  "explain": "The lengths differ, but the message must not. Consistency across all three is what makes your brand feel solid and recognisable wherever someone meets it."
                },
                {
                  "q": "You are writing a bio for a conference programme. Which choice fits best?",
                  "options": [
                    "First person, starting with your job title.",
                    "Third person, leading with the value you bring.",
                    "A long, casual story with no proof points.",
                    "A mix of first and third person in the same paragraph."
                  ],
                  "answer": 1,
                  "explain": "Formal programmes normally use third person, and leading with value beats leading with a title. Mixing voices in one bio looks careless."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's write your bio in three sizes from one message. Share your value proposition and story, and I will help you cut them to a one-liner, a short, and a long bio.",
                "suggested": [
                  "When should I use first person versus third person?",
                  "What proof point should I include if I am early in my career?",
                  "Can you tighten my one-liner?"
                ]
              }
            }
          ]
        },
        {
          "title": "LinkedIn That Works for You",
          "lessons": [
            {
              "lessonId": "branding-7",
              "title": "Rebuild your profile, section by section",
              "mins": 20,
              "hook": "Your LinkedIn profile works for you 24 hours a day, even when you are asleep. This lesson rebuilds it section by section so it attracts the right people.",
              "objectives": [
                "By the end you can rewrite your headline and About section to lead with value.",
                "By the end you can use the right keywords so the right people find you.",
                "By the end you can fix the three sections that matter most."
              ],
              "sections": [
                {
                  "heading": "Your profile is a shop window, not a CV",
                  "body": [
                    "Many people copy their CV into LinkedIn. That is a mistake. A CV looks backward and lists duties. A profile should look forward and show value. It is a shop window: in a few seconds, a visitor decides whether to stop or walk past.",
                    "The good news is that a strong profile keeps working while you sleep. A recruiter in Dubai searches at midnight, your profile answers for you, and you wake up to a message. That only happens if the window is clear."
                  ]
                },
                {
                  "heading": "The three sections that matter most",
                  "body": [
                    "Focus your energy here. First, the Headline. Do not just write your job title. Use your one-liner from Lesson 6: \"I help Gulf retailers cut new-hire turnover.\" This is the line people see most.",
                    "Second, the About section. Open with one strong sentence about the value you bring. Then add your Past-Pivot-Promise story in short paragraphs, two or three proof points with numbers, and a clear line on how to reach you. Write \"I,\" not \"he\" or \"she.\" Keep sentences short.",
                    "Third, your Experience. Under each role, do not list duties. List results. Change \"Responsible for training programmes\" to \"Built a training programme that cut new-hire turnover by 30 percent in one year.\" Results are what make a reader trust you."
                  ]
                },
                {
                  "heading": "Keywords help the right people find you",
                  "body": [
                    "LinkedIn is a search engine. If a recruiter searches for \"talent development KSA,\" your profile only appears if those words are on it. So use the real words your target audience searches for, in your headline, About, and experience.",
                    "Do not stuff keywords in an ugly way. Just make sure the two or three terms you want to be found for appear naturally a few times. A pay specialist should have \"compensation,\" \"reward,\" and \"pay\" across the profile, not hidden in one line nobody reads."
                  ]
                }
              ],
              "takeaways": [
                "A profile is a forward-looking shop window, not a backward-looking CV.",
                "Lead your headline with value, using your one-liner.",
                "Open your About with value, then tell your story with proof.",
                "Write results under each role, not duties.",
                "Use the real keywords your audience searches for."
              ],
              "exercise": {
                "title": "Rewrite your top three sections",
                "prompt": "Rewrite your LinkedIn Headline using your one-liner. Rewrite the first sentence of your About to lead with value. Then pick your current role and turn one duty into a result with a number. Note the two or three keywords you want to be found for.",
                "placeholder": "New headline: ...\nAbout opening line: ...\nDuty turned into result: ...\nMy keywords: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the biggest mistake in a LinkedIn 'Experience' section?",
                  "options": [
                    "Writing in the first person.",
                    "Listing duties instead of results.",
                    "Including the dates you worked there.",
                    "Adding the company name."
                  ],
                  "answer": 1,
                  "explain": "Duties tell people what you were assigned. Results tell people what you achieved. Results, ideally with a number, are what build a reader's trust."
                },
                {
                  "q": "A recruiter cannot find you when searching for your specialty. What is the most likely reason?",
                  "options": [
                    "Your profile photo is too small.",
                    "You have not connected with enough people.",
                    "The keywords your audience searches for do not appear naturally on your profile.",
                    "You used the first person in your About section."
                  ],
                  "answer": 2,
                  "explain": "LinkedIn is a search engine. If the exact terms a recruiter types are missing from your profile, you will not appear in their results, no matter how good your work is."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's rebuild your profile so it works while you sleep. We focus on three sections: headline, About, and experience. Paste any section and I will help you make it lead with value.",
                "suggested": [
                  "Can you rewrite my headline to lead with value?",
                  "How many keywords is too many?",
                  "What proof points work if my results are hard to measure?"
                ]
              }
            },
            {
              "lessonId": "branding-8",
              "title": "Content without cringe",
              "mins": 21,
              "hook": "Most people avoid posting because so much LinkedIn content feels fake. This lesson shows you how to share useful posts that sound like you, not a performer.",
              "objectives": [
                "By the end you can choose post topics that fit your position.",
                "By the end you can use a simple structure to write a clear post.",
                "By the end you can avoid the 'cringe' patterns that lose trust."
              ],
              "sections": [
                {
                  "heading": "Why post at all",
                  "body": [
                    "Posting is how a small network learns what you know. You do not need to go viral. You need the right 200 people to slowly see your value. Over a year, regular useful posts make you the name people remember when a need appears.",
                    "The fear is sounding like a show-off or a fake guru. That fear is healthy. It will keep you honest. The goal is to be useful, not impressive."
                  ]
                },
                {
                  "heading": "Pick topics from your position",
                  "body": [
                    "Do not post about random things. Post inside your one thing (Lesson 5). Use three simple buckets. Bucket one, Lessons: something you learned from real work. Bucket two, Observations: a pattern you notice in your field. Bucket three, How-to: a small, practical tip the reader can use today.",
                    "A pay specialist in Riyadh might post: \"Three signs your bonus system is quietly pushing your best people out.\" That is useful, on-topic, and not bragging. It shows expertise by helping, not by boasting."
                  ]
                },
                {
                  "heading": "A simple post structure, and what to avoid",
                  "body": [
                    "Use the Hook-Value-Invite structure. Hook: one short line that makes people stop scrolling. Value: the real content, three short points or a short story. Invite: one honest question to start a conversation. Keep sentences short and use white space, because most people read on a phone.",
                    "Now avoid the cringe patterns. Avoid fake humility (\"I am so humbled to announce...\"). Avoid empty motivation with no real point. Avoid claiming to have all the answers. Avoid long, dramatic stories that exist only to praise yourself. The test is simple: would I say this out loud to a respected colleague over coffee? If not, rewrite it."
                  ]
                }
              ],
              "takeaways": [
                "You do not need to go viral; you need the right people to see your value.",
                "Post inside your one thing, using Lessons, Observations, or How-to.",
                "Use Hook, Value, Invite to structure a clear post.",
                "Be useful, not impressive.",
                "The coffee test: would you say this to a respected colleague out loud?"
              ],
              "exercise": {
                "title": "Draft one honest post",
                "prompt": "Pick one topic from your position using Lessons, Observations, or How-to. Write a post using Hook, Value, Invite. Keep sentences short. Then run the coffee test: would you say this out loud to a respected colleague? Edit out anything that fails.",
                "placeholder": "Topic bucket: ...\nHook: ...\nValue (3 points or a short story): ...\nInvite (one question): ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to brand plan",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "What is the main goal of posting for most professionals?",
                  "options": [
                    "To go viral and get the highest number of likes.",
                    "To be useful to the right people so they remember your value.",
                    "To prove you are smarter than others in your field.",
                    "To post every single day no matter what."
                  ],
                  "answer": 1,
                  "explain": "Reach for the right audience beats raw virality. Steady, useful posts make you the name people recall when a matching need appears."
                },
                {
                  "q": "Which post idea best avoids the 'cringe' trap?",
                  "options": [
                    "A long, dramatic story whose only point is how great you are.",
                    "\"I am so humbled and blessed to announce my own brilliance.\"",
                    "\"Three signs your bonus system is quietly losing your best people,\" with practical tips.",
                    "A motivational quote with no connection to your work."
                  ],
                  "answer": 2,
                  "explain": "It is on-topic, genuinely useful, and helps the reader rather than praising the writer. It passes the coffee test; the others do not."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's write a post that sounds like you, not a guru. We use Hook, Value, Invite, and the coffee test. Tell me your topic and I will help you shape it.",
                "suggested": [
                  "How often should I post without burning out?",
                  "Can you check if my draft passes the coffee test?",
                  "What do I do if a post gets no engagement?"
                ]
              }
            },
            {
              "lessonId": "branding-9",
              "title": "Engagement that builds relationships",
              "mins": 17,
              "hook": "Posting is only half the game. The real relationships come from how you engage with others. This lesson shows you how to do it well, not just collect connections.",
              "objectives": [
                "By the end you can leave comments that start real conversations.",
                "By the end you can grow a network of relationships, not just numbers.",
                "By the end you can use a simple weekly routine that takes 15 minutes."
              ],
              "sections": [
                {
                  "heading": "Connections are not relationships",
                  "body": [
                    "Many people chase connection counts. A big number looks nice but does little. A relationship is different. It is a person who would reply to your message, take your call, or recommend you. Ten real relationships beat a thousand silent connections.",
                    "Engagement is how you turn a connection into a relationship. It is the daily, small act of showing up usefully in other people's space, not just your own."
                  ]
                },
                {
                  "heading": "Comments that add value",
                  "body": [
                    "A good comment is a mini-post. It adds a thought, shares a related example, or asks a real question. A weak comment is \"Great post!\" which adds nothing and is forgotten.",
                    "Use the Add-One-Thing rule: every comment should add one new idea, story, or question. For example, under a post about onboarding, instead of \"Nice,\" write: \"This matches what I see in Gulf retail. The first week sets the tone. We added a buddy on day one and turnover dropped. Did you try anything in week one specifically?\" That comment is seen by the writer and all their readers. It shows your value and starts a conversation."
                  ]
                },
                {
                  "heading": "A simple weekly routine",
                  "body": [
                    "Relationships need consistency, not intensity. Use a small, repeatable routine, the 15-Minute Round. Three times a week, spend 15 minutes doing three things: read posts from 10 people in your field, leave two thoughtful comments using Add-One-Thing, and send one warm, personal message to someone (not a sales pitch, just a genuine note).",
                    "Over three months, this quiet routine builds a real network. People start to know your name in a good way. When you later need an introduction or a referral, the relationship is already warm. Trust is built in small, regular steps, not in one big push."
                  ]
                }
              ],
              "takeaways": [
                "A connection count is not a relationship.",
                "Ten real relationships beat a thousand silent connections.",
                "Use the Add-One-Thing rule so every comment adds value.",
                "Send warm, personal messages, not sales pitches.",
                "Use the 15-Minute Round three times a week for steady growth."
              ],
              "exercise": {
                "title": "Your first 15-Minute Round",
                "prompt": "Pick 10 people in your field to follow. Find two recent posts and write a comment on each using Add-One-Thing (a new idea, example, or question). Then send one warm, personal message to a contact with no ask attached. Note how it felt and one person who replied.",
                "placeholder": "Two comments I left: ...\nWarm message I sent: ...\nWho replied: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What makes a comment build a relationship rather than waste a moment?",
                  "options": [
                    "It is short and says 'Great post!' quickly.",
                    "It adds one new idea, example, or real question to the conversation.",
                    "It includes a link to your own services.",
                    "It tags as many people as possible."
                  ],
                  "answer": 1,
                  "explain": "The Add-One-Thing rule turns a comment into a mini-post that the writer and their readers notice. Empty praise and self-promotion add nothing and are forgotten."
                },
                {
                  "q": "Which approach builds a strong network over three months?",
                  "options": [
                    "One huge burst of activity, then silence for weeks.",
                    "Sending the same sales message to hundreds of strangers.",
                    "A small, consistent routine of reading, commenting, and one warm message.",
                    "Only posting your own content and never engaging with others."
                  ],
                  "answer": 2,
                  "explain": "Relationships grow through consistency, not intensity. The 15-Minute Round, repeated three times a week, quietly builds trust that is ready when you need it."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's turn connections into real relationships. We use the Add-One-Thing rule and a simple 15-Minute Round. Want me to help you find people to follow or sharpen a comment?",
                "suggested": [
                  "How do I comment on a senior leader's post without seeming pushy?",
                  "What do I write in a warm message with no ask?",
                  "How do I stay consistent when I am busy?"
                ]
              }
            }
          ]
        },
        {
          "title": "Visibility & Presence",
          "lessons": [
            {
              "lessonId": "branding-10",
              "title": "Visibility without self-promotion",
              "mins": 15,
              "hook": "You can become well known without ever bragging. This lesson shows you how to be visible by being useful, which feels natural and earns trust.",
              "objectives": [
                "By the end you can become visible without feeling like you are showing off.",
                "By the end you can use a 'give first' approach to build a reputation.",
                "By the end you can pick visibility actions that fit your personality."
              ],
              "sections": [
                {
                  "heading": "Visibility is a result of usefulness",
                  "body": [
                    "Many people in the Gulf find self-promotion uncomfortable, and that is a fair instinct. The good news is that you do not need to promote yourself. You need to be useful in public. Visibility is what happens when many people see you help.",
                    "Flip the question. Do not ask \"how do I get noticed?\" Ask \"how can I be useful to people in my field?\" Answer that often enough, in public, and being noticed takes care of itself."
                  ]
                },
                {
                  "heading": "The 'give first' approach",
                  "body": [
                    "Build your reputation by giving before you ask. Share what you know freely. Answer questions. Introduce two people who should meet. Recommend a colleague's good work. Each act is small, but together they make you the helpful, generous person everyone respects.",
                    "Here is a real example. An HR leader in Dubai started answering questions in a regional HR group, with no sales pitch. She just helped. Within a year she was the person people tagged when a hard question appeared. She never once promoted herself. Her usefulness did the promoting for her. That is visibility that feels clean, because it is."
                  ]
                },
                {
                  "heading": "Choose actions that fit you",
                  "body": [
                    "Visibility does not mean you must perform on stage. Match the action to your nature. If you are quiet, write helpful posts or detailed comments, mentor one person well, or answer questions in a group. If you are outgoing, speak on a panel or run a small workshop.",
                    "Use the Comfort-Plus-One rule: pick the visibility action that is just one small step outside your comfort zone, not ten. Steady, comfortable visibility you can keep doing beats a single brave act you never repeat. Consistency is what builds a reputation."
                  ]
                }
              ],
              "takeaways": [
                "You do not need to self-promote; you need to be useful in public.",
                "Ask 'how can I be useful?' instead of 'how do I get noticed?'",
                "Use 'give first': share, answer, introduce, recommend.",
                "Match visibility actions to your personality.",
                "Use Comfort-Plus-One: one small step out, repeated often."
              ],
              "exercise": {
                "title": "Plan three 'give first' actions",
                "prompt": "Write three give-first actions you could do this month: one thing to share, one question to answer publicly, and one helpful introduction to make. Then pick the visibility style that fits you and choose one Comfort-Plus-One action to repeat weekly.",
                "placeholder": "Share: ...\nAnswer: ...\nIntroduce: ...\nMy Comfort-Plus-One action: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the cleanest way to become visible without bragging?",
                  "options": [
                    "Announce every achievement loudly and often.",
                    "Be useful in public, so people notice you while you help them.",
                    "Wait quietly and hope someone discovers your work.",
                    "Only speak about yourself in every post."
                  ],
                  "answer": 1,
                  "explain": "Visibility is a result of usefulness. When you help in public, being noticed takes care of itself, and it never feels like self-promotion because it is not."
                },
                {
                  "q": "You are an introvert who dreads public speaking. What is the best visibility plan?",
                  "options": [
                    "Force yourself onto a big stage because that is the only way to be seen.",
                    "Decide visibility is impossible for you and give up.",
                    "Choose written, lower-key actions like helpful posts and mentoring, repeated consistently.",
                    "Pay for ads about yourself instead."
                  ],
                  "answer": 2,
                  "explain": "Match the action to your nature and use Comfort-Plus-One. Consistent, comfortable visibility builds a reputation far better than one brave act you never repeat."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's make you visible without the bragging. The secret is being useful in public and giving first. Tell me your comfort level and I will help you pick actions that fit.",
                "suggested": [
                  "I hate self-promotion. Will this really work for me?",
                  "What can I give if I am early in my career?",
                  "How do I stay consistent with give-first actions?"
                ]
              }
            },
            {
              "lessonId": "branding-11",
              "title": "Speaking, writing, and being cited",
              "mins": 14,
              "hook": "When others quote you, invite you to speak, or share your writing, your reputation grows on its own. This lesson shows you how to become a person worth citing.",
              "objectives": [
                "By the end you can choose one platform (speaking or writing) to grow.",
                "By the end you can create work that others want to share and cite.",
                "By the end you can take a small first step toward a speaking or writing habit."
              ],
              "sections": [
                {
                  "heading": "Why being cited matters",
                  "body": [
                    "There is a level above being visible: being cited. This is when other people use your ideas, quote you, or invite you to speak. At this point your reputation grows without you pushing it. Others carry your name for you.",
                    "You reach this level by creating clear, useful ideas that are easy to repeat. A simple framework, a memorable phrase, or a strong short article gives people something to point to. They cite you because you made their job easier."
                  ]
                },
                {
                  "heading": "Pick one lane: speak or write",
                  "body": [
                    "Do not try to do everything at once. Choose the lane that fits you. If you think well on your feet and enjoy people, choose speaking: panels, small workshops, podcasts, internal talks. If you think best on paper, choose writing: articles, a short newsletter, or detailed posts.",
                    "Start small and local. A learning specialist in Riyadh did not aim for a big conference first. She offered to run a 30-minute session at a local HR meetup. It went well, someone recorded it, and that clip brought two more invitations. One small, good talk opened the next door. Going deep in one lane beats doing a little in many places."
                  ]
                },
                {
                  "heading": "Make work that travels",
                  "body": [
                    "To be cited, your ideas must be easy to carry. Use the Name-It rule: give your useful idea a simple, clear name. \"The 15-Minute Round\" is easier to share than \"a routine I do sometimes.\" A named idea sticks in people's minds and gets repeated.",
                    "Also make one strong point per piece, not ten weak ones. People remember and repeat single, clear ideas. When you give the field a clear, named idea that helps them, they will use it and credit you, and your reputation will travel further than you ever could in person."
                  ]
                }
              ],
              "takeaways": [
                "Being cited is when others carry your name for you.",
                "Choose one lane, speaking or writing, that fits how you think.",
                "Start small and local, then let good work open the next door.",
                "Use the Name-It rule to make ideas easy to share.",
                "Make one strong point per piece, not ten weak ones."
              ],
              "exercise": {
                "title": "Choose your lane and name one idea",
                "prompt": "Decide your lane: speaking or writing, and explain in one line why it fits you. Then take one useful idea from your work and give it a clear, simple name using the Name-It rule. Finally, write one small first step you can take in the next two weeks.",
                "placeholder": "My lane: ... because ...\nMy named idea: ...\nMy small first step: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why does giving your idea a clear name (the Name-It rule) help you get cited?",
                  "options": [
                    "Because long, complex names sound more expert.",
                    "Because a named idea is easy to remember and repeat, so people share and credit it.",
                    "Because names are required on LinkedIn.",
                    "Because it hides the idea from competitors."
                  ],
                  "answer": 1,
                  "explain": "A simple, named idea sticks in memory and travels by word of mouth. People can point to it and credit you, which spreads your reputation without you pushing."
                },
                {
                  "q": "You want to start speaking but have no big invitations. What is the smartest first move?",
                  "options": [
                    "Wait until a major conference invites you.",
                    "Offer a short session at a local meetup or an internal talk, then build from there.",
                    "Try to speak and write everywhere at once.",
                    "Decide you are not ready and do nothing."
                  ],
                  "answer": 1,
                  "explain": "Start small and local. One good, short talk creates proof and often leads to the next invitation. Going deep in one lane beats doing a little in many places."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let's make you worth citing. We choose one lane, speaking or writing, and name one clear idea. Which feels more like you, the stage or the page?",
                "suggested": [
                  "How do I name an idea well?",
                  "Where do I find my first small speaking chance in the Gulf?",
                  "Speaking or writing: which should I pick?"
                ]
              }
            },
            {
              "lessonId": "branding-12",
              "title": "Turning reputation into opportunity",
              "mins": 15,
              "hook": "A strong reputation is only useful if it brings real opportunities. This final lesson shows you how to turn the brand you built into work, offers, and growth that come to you.",
              "objectives": [
                "By the end you can turn your reputation into opportunities that come to you.",
                "By the end you can make a simple ask when the moment is right.",
                "By the end you can keep your brand alive with a light, ongoing routine."
              ],
              "sections": [
                {
                  "heading": "The point of a brand is the open door",
                  "body": [
                    "You have done the real work: a clear value proposition, a story, a strong profile, useful content, real relationships, and growing visibility. Now comes the payoff. A good brand makes opportunities come to you. People bring you work because they already know what you are good at.",
                    "This is the difference between chasing and attracting. When your reputation is clear, you spend less time applying and more time choosing. The door opens before you knock."
                  ]
                },
                {
                  "heading": "Make it easy to say yes",
                  "body": [
                    "When opportunities come to you, they need a clear path. Make it easy for people to act. Your profile should say plainly what you do and how to reach you. When someone shows interest, respond quickly and warmly.",
                    "There are also moments to make a gentle, direct ask. Use the Plant-the-Seed approach: after you help someone or finish good work, simply say what you are open to. \"If your team ever needs help with pay fairness, I would be glad to talk.\" This is not bragging. It is telling people how to use you. Most people will not guess; you have to plant the seed so they remember when the need appears."
                  ]
                },
                {
                  "heading": "Keep the brand alive",
                  "body": [
                    "A reputation fades if you stop showing up. But you do not need to do everything forever. Use a light maintenance routine, the Monthly Three: each month, post or share one useful thing, have one real conversation with someone in your network, and update one part of your profile or story if it has changed.",
                    "That small routine keeps your brand warm and current with very little effort. Think of it as watering a plant. A little, often, keeps it alive and growing. Over years, this quiet consistency is what turns a good reputation into a steady stream of the right opportunities. You have built the foundation in this course. The Monthly Three keeps it working for you."
                  ]
                }
              ],
              "takeaways": [
                "A strong brand makes opportunities come to you, so you choose instead of chase.",
                "Make it easy to say yes: clear profile, fast warm replies.",
                "Use Plant-the-Seed to make a gentle, direct ask after helping someone.",
                "People will not guess your goals; you have to tell them.",
                "Use the Monthly Three to keep your brand warm with little effort."
              ],
              "exercise": {
                "title": "Plant a seed and set your routine",
                "prompt": "Write one gentle, direct ask you could make this month using Plant-the-Seed, after helping someone or finishing good work. Then write your own Monthly Three: one thing to share, one conversation to have, and one profile part to keep updated.",
                "placeholder": "My Plant-the-Seed ask: ...\nMonthly Three:\n1. Share: ...\n2. Conversation: ...\n3. Update: ...",
                "interaction": {
                  "mechanic": "Reputation Studio",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the strongest reputation move first. Words can come later if they are the artifact.",
                  "actionLabel": "Check the brand move",
                  "artifactLabel": "Add to brand plan",
                  "choices": [
                    "Clear",
                    "Too broad",
                    "Needs proof",
                    "More specific"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "After finishing a piece of good work for a contact, what is the smartest move to turn reputation into opportunity?",
                  "options": [
                    "Say nothing and hope they remember you later.",
                    "Send them a hard sales pitch for all your services.",
                    "Plant a seed: warmly mention one specific way you could help if the need ever arises.",
                    "Ask them to promote you to their whole company immediately."
                  ],
                  "answer": 2,
                  "explain": "Plant-the-Seed is direct but gentle. It tells people how to use you without pressure. Most people will not guess your goals, so a clear, friendly signal is what opens the door."
                },
                {
                  "q": "Why does the 'Monthly Three' routine matter once your brand is built?",
                  "options": [
                    "Because a brand needs constant, exhausting effort or it is worthless.",
                    "Because a reputation fades if you stop showing up, and a small steady routine keeps it warm.",
                    "Because you must post every day to stay relevant.",
                    "Because opportunities only come from paid advertising."
                  ],
                  "answer": 1,
                  "explain": "Reputations fade without presence, but maintenance does not require huge effort. Like watering a plant, a little done often keeps the brand alive and the opportunities flowing."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "This is the payoff lesson: turning your reputation into real opportunities. We use Plant-the-Seed for gentle asks and the Monthly Three to stay warm. What opportunity are you hoping to attract?",
                "suggested": [
                  "How do I make an ask without sounding desperate?",
                  "What should my Monthly Three look like?",
                  "How do I respond when an opportunity finally comes to me?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Reputation Studio",
        "short": "Shape how the market reads you.",
        "artifact": "brand statement and visibility plan",
        "interaction": "audit, choose, sharpen, draft only when words are the artifact",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "interview": {
      "courseId": "interview",
      "title": "Interview Mastery",
      "modules": [
        {
          "title": "Before the Room",
          "lessons": [
            {
              "lessonId": "interview-1",
              "title": "Decoding what they're really asking",
              "mins": 16,
              "hook": "Most people answer the words of a question. The strong candidate answers what the question is really testing.",
              "objectives": [
                "By the end you can spot the hidden worry behind a common interview question.",
                "By the end you can answer the real concern, not just the surface words.",
                "By the end you can use a simple two-step method to decode any question on the spot."
              ],
              "sections": [
                {
                  "heading": "Every question hides a worry",
                  "body": [
                    "An interviewer has very little time with you. So almost every question is a quick test. They are not just curious. They are checking for a risk or looking for proof that you can do the job.",
                    "Take a simple question like \"Tell me about yourself.\" The words sound open. But the real test is: can you explain who you are in a clear, short, and relevant way? They want to see focus, not your whole life story.",
                    "Or take \"Why are you leaving your current job?\" The real worry is: will you be a problem here too? They are checking if you blame others, or if you speak about old bosses with anger. The safe answer is calm and forward-looking."
                  ]
                },
                {
                  "heading": "The Question-Behind-The-Question method",
                  "body": [
                    "Here is a simple method I teach. I call it the Question-Behind-The-Question, or QBQ. It has two steps.",
                    "Step one: before you answer, pause for one second and ask yourself, \"What risk are they checking?\" Step two: answer that risk first, then add a short example as proof.",
                    "Example from the Gulf market. A hiring manager in Dubai asks, \"This role needs a lot of travel across the GCC. Is that fine for you?\" The surface words ask about travel. The real worry is: will you quit in three months when the travel gets hard? A weak answer is just \"Yes, no problem.\" A strong answer names the worry: \"Yes. I have done regular trips to Riyadh and Doha in my last role, so I know what it takes and I plan for it. It suits me.\" Now you have answered the real concern with proof."
                  ]
                },
                {
                  "heading": "Common questions and their hidden test",
                  "body": [
                    "\"What is your biggest weakness?\" The real test is self-awareness and honesty. They want to see that you know yourself and are working to improve. They do not want a fake weakness like \"I work too hard.\"",
                    "\"Where do you see yourself in five years?\" The real worry is: will you stay, and do your goals fit this role? Show that your plan and their job point in the same direction.",
                    "\"Do you have any questions for us?\" This is not just a polite ending. It tests how seriously you think about the role. Always have two or three good questions ready."
                  ]
                }
              ],
              "takeaways": [
                "Every interview question is a quiet test of a risk or a skill.",
                "Pause one second and ask: what worry are they checking?",
                "Answer the real concern first, then add short proof.",
                "Never answer only the surface words.",
                "Prepare the hidden test for the most common questions before you walk in."
              ],
              "exercise": {
                "title": "Decode three questions",
                "prompt": "Pick three questions you expect in your next interview. For each one, write the surface words, then the hidden worry behind it, then one sentence that answers that worry with proof.",
                "placeholder": "Question 1: \"Why this company?\" Hidden worry: ... My answer with proof: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "An interviewer asks, \"Why are you leaving your current job?\" What is the real worry behind this question?",
                  "options": [
                    "They want to know your exact salary history.",
                    "They are checking if you will become a problem at their company too.",
                    "They are testing your knowledge of labour law.",
                    "They want a full timeline of every job you have had."
                  ],
                  "answer": 1,
                  "explain": "The hidden test is risk. They watch how you speak about past jobs. Calm and forward-looking answers lower their worry."
                },
                {
                  "q": "Using the QBQ method, what is the first thing you should do before answering?",
                  "options": [
                    "Start talking quickly so there is no silence.",
                    "Give the longest answer you can to show effort.",
                    "Pause one second and ask what risk they are checking.",
                    "Ask the interviewer to repeat the question."
                  ],
                  "answer": 2,
                  "explain": "Step one of QBQ is to find the hidden worry first. Then you answer that worry and add proof."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "I am right here in this lesson with you. We just covered the Question-Behind-The-Question method. Tell me a question you are nervous about, and we will decode the real worry together.",
                "suggested": [
                  "What is the hidden worry behind \"Tell me about yourself\"?",
                  "How do I answer a weakness question honestly?",
                  "Help me decode \"Why do you want this job?\""
                ]
              }
            },
            {
              "lessonId": "interview-2",
              "title": "Researching like an insider",
              "mins": 16,
              "hook": "Anyone can read the company website. The candidate who gets the offer knows the real problems the team is worried about right now.",
              "objectives": [
                "By the end you can research a company in layers, from public facts to real pain points.",
                "By the end you can connect your skills to the company's current goals.",
                "By the end you can turn your research into smart questions and strong answers."
              ],
              "sections": [
                {
                  "heading": "Three layers of research",
                  "body": [
                    "Most people stop at layer one. To stand out, go all three layers deep.",
                    "Layer one is the public face. This is the website, the products, the mission, and recent news. You need this so you do not sound lost. But everyone has it, so it does not make you special.",
                    "Layer two is the business context. What market are they in? Who are their competitors? Are they growing fast, cutting costs, or entering a new country? In the Gulf, check if the company is part of a Vision 2030 plan in Saudi Arabia, or growing under UAE goals to build new industries beyond oil. This tells you what they care about right now.",
                    "Layer three is the human layer. Who will interview you? Look at their LinkedIn. What does the team struggle with? Job ads, recent posts, and news about layoffs or new funding all give clues. This is where you find the real pain points."
                  ]
                },
                {
                  "heading": "The Pain-and-Proof map",
                  "body": [
                    "Here is a tool I use with my clients. I call it the Pain-and-Proof map.",
                    "On the left side, write the company's likely pain points from your research. On the right side, write proof from your own experience that you can ease that pain. Draw a line between each pair.",
                    "Example. You are interviewing for an HR role at a fast-growing fintech in Abu Dhabi. Your research shows they hired 200 people in one year. The likely pain is messy onboarding and weak culture during fast growth. Your proof is that you built an onboarding plan at your last company that cut new-hire dropout by half. Now you have a clear story that fits their exact problem."
                  ]
                },
                {
                  "heading": "Turn research into questions",
                  "body": [
                    "Good research gives you good questions to ask the panel. This shows you understand their world from the inside, not just from the homepage.",
                    "Weak question: \"What does your company do?\" This shows you did no homework. Strong question: \"I saw you opened a Riyadh office this year. How is the team there settling into the wider culture?\" This shows you read the news and you think about people.",
                    "Aim for two or three questions that only someone who did real research could ask. Save them for the end of the interview."
                  ]
                }
              ],
              "takeaways": [
                "Research in three layers: public face, business context, and the human layer.",
                "Layer one is the floor, not the goal. Go deeper.",
                "Use the Pain-and-Proof map to link their problems to your skills.",
                "In the Gulf, link your research to Vision 2030 and national growth goals when they fit.",
                "Turn your findings into two or three insider questions for the panel."
              ],
              "exercise": {
                "title": "Build a Pain-and-Proof map",
                "prompt": "For a real company you may interview with, list three likely pain points from your research. Next to each, write one piece of proof from your own work that shows you can help. End with one insider question.",
                "placeholder": "Pain 1: fast hiring is hurting culture. My proof: ... Insider question: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which research finding is most likely to help you stand out in an interview?",
                  "options": [
                    "The company's office address and opening hours.",
                    "A current pain point you can connect to your own experience.",
                    "The exact year the company was founded.",
                    "The colours used in the company logo."
                  ],
                  "answer": 1,
                  "explain": "Linking a real pain point to your proof shows you understand their world. Basic facts alone do not set you apart."
                },
                {
                  "q": "What makes a question to the panel sound like you did deep research, not just a quick look?",
                  "options": [
                    "It asks something you could find on the homepage in one click.",
                    "It is about your salary and holidays only.",
                    "It shows you read recent news and thought about their real situation.",
                    "It is as long and detailed as possible."
                  ],
                  "answer": 2,
                  "explain": "Deep questions show real research and thought. Homepage questions show you did no homework."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome back. This lesson is about digging deeper than the website. Tell me the company you are targeting, and I will help you find the layers and build a Pain-and-Proof map.",
                "suggested": [
                  "Where do I look for a company's real pain points?",
                  "How do I tie my skills to Vision 2030 goals?",
                  "Give me three insider questions to ask the panel."
                ]
              }
            },
            {
              "lessonId": "interview-3",
              "title": "The story bank: your raw material",
              "mins": 16,
              "hook": "You cannot make up good stories under pressure. The calm candidate prepared a small bank of them in advance.",
              "objectives": [
                "By the end you can understand why a story bank beats memorised answers.",
                "By the end you can choose strong stories from your own career.",
                "By the end you can sort your stories by the skill each one proves."
              ],
              "sections": [
                {
                  "heading": "Why a story bank, not a script",
                  "body": [
                    "Many people try to memorise answers to exact questions. This fails for two reasons. First, you never get the exact question you practised. Second, memorised answers sound flat and stiff.",
                    "A story bank works better. A story bank is a small set of real events from your work life, ready to use. You do not memorise words. You remember the event. Then you shape it to fit whatever question comes.",
                    "One good story can answer many questions. A story about saving a late project can show leadership, problem-solving, or staying calm under pressure. You just stress a different part for each question."
                  ]
                },
                {
                  "heading": "Choosing your raw material",
                  "body": [
                    "A strong story has three parts: a real challenge, your specific actions, and a clear result. Vague stories with no result do not work.",
                    "Look across your career for moments that matter. Think about a time you fixed a problem, led a change, handled conflict, missed a target and recovered, or learned a hard lesson. These are your raw material.",
                    "Example. A project manager in Sharjah remembers a time a key supplier failed two weeks before a launch. She found a new supplier, agreed a new timeline, and still delivered on time. That single event can prove problem-solving, leadership, and staying calm under pressure. It is perfect for a story bank."
                  ]
                },
                {
                  "heading": "Sort by the skill it proves",
                  "body": [
                    "Once you have eight to ten stories, sort them by skill. This is the part most people skip, and it is the most useful step.",
                    "Make a simple table. In one column, list common skills: leadership, conflict, failure, teamwork, results, change. In the next column, write which story proves each one. Some stories will sit under more than one skill. That is good. It means the story is flexible.",
                    "Now, when an interviewer asks about teamwork, you do not panic. You glance at your mental table and pull the right story. You walk in with raw material ready for any question."
                  ]
                }
              ],
              "takeaways": [
                "A story bank beats memorised scripts because real questions vary.",
                "One strong story can answer several different questions.",
                "A good story needs a real challenge, your actions, and a clear result.",
                "Aim for eight to ten real stories from your career.",
                "Sort each story by the skill it proves so you can pull it fast."
              ],
              "exercise": {
                "title": "Start your story bank",
                "prompt": "Write down four real events from your career. For each one, note the challenge, your main action, and the result in one line each. Then label which skill each story proves.",
                "placeholder": "Story 1: Supplier failed before launch. Action: found new supplier, fixed timeline. Result: delivered on time. Proves: problem-solving, pressure.",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why is a story bank better than memorising answers word for word?",
                  "options": [
                    "It takes much less time to prepare than anything else.",
                    "Real questions vary, and one flexible story can fit many of them.",
                    "It lets you avoid giving any real examples.",
                    "Interviewers always ask the exact same questions."
                  ],
                  "answer": 1,
                  "explain": "You rarely get the exact question you practised. A flexible story bank lets you shape one real event to fit many questions."
                },
                {
                  "q": "What makes an event strong enough for your story bank?",
                  "options": [
                    "It is very old and happened long ago.",
                    "It has a real challenge, your specific actions, and a clear result.",
                    "It involves only other people, not you.",
                    "It has no measurable outcome."
                  ],
                  "answer": 1,
                  "explain": "A usable story needs all three: a real challenge, what you specifically did, and a clear result. Vague stories fall flat."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "This is one of my favourite lessons. A story bank is your raw material for the whole interview. Tell me one event from your career, and I will help you sharpen it into a story you can use.",
                "suggested": [
                  "How many stories do I really need?",
                  "Can one story answer more than one question?",
                  "Help me turn a messy project into a clear story."
                ]
              }
            }
          ]
        },
        {
          "title": "The Behavioral Round",
          "lessons": [
            {
              "lessonId": "interview-4",
              "title": "Proof stories without sounding scripted",
              "mins": 18,
              "hook": "A proof story gives your answer a clear shape. Used badly, any formula sounds stiff. Here is how to keep it human.",
              "objectives": [
                "By the end you can structure any behavioral answer as a clear proof story.",
                "By the end you can avoid the stiff, robotic version that interviewers dislike.",
                "By the end you can balance structure with a natural, warm voice."
              ],
              "sections": [
                {
                  "heading": "What a proof story needs",
                  "body": [
                    "A proof story is a simple shape for telling a work moment: brief context, your responsibility, the action you took, and the result.",
                    "Context: set the scene in one or two sentences. Responsibility: say what you needed to do or fix. Action: explain what you did, step by step. This is the longest part. Result: share the clear outcome, with a number if you have one.",
                    "The structure matters because most people ramble. They jump around with no end point. A proof story keeps your answer clear and complete, so the interviewer can follow you and remember you."
                  ]
                },
                {
                  "heading": "Why structure can sound scripted, and how to fix it",
                  "body": [
                    "Structure goes wrong when people announce each part out loud. Saying \"the context was... my responsibility was... my action was...\" sounds like reading a form. It feels cold.",
                    "The fix is to keep the structure as a quiet spine, not a visible label. The order is inside your head. The words that come out sound like a normal person telling a real story.",
                    "Spend most of your time on Action and Result. Many people give a long Situation and rush the Result. Flip that. The interviewer cares most about what you did and what happened."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Here is a proof story that sounds human. The question is, \"Tell me about a time you handled a difficult client.\"",
                    "\"Last year I managed a key client in Dubai who was upset about a delayed delivery. My job was to keep the account and rebuild their trust. I called them the same day, listened fully, and did not make excuses. I gave them a clear new plan with weekly updates, and I checked in personally each Friday. Within a month they renewed their contract and later referred us to a partner company.\"",
                    "Notice that the speaker never announces the structure. The shape is there, but it sounds like a real person. Most of the answer is action and result. That is a proof story done well."
                  ]
                }
              ],
              "takeaways": [
                "A proof story has context, responsibility, action, and result.",
                "Keep the structure as a quiet spine, not a spoken label.",
                "Spend most of your time on Action and Result, not the setup.",
                "Never announce each part out loud. Tell it like a real story.",
                "End with a clear result, and use a number when you can."
              ],
              "exercise": {
                "title": "Shape one human proof story",
                "prompt": "Take one story from your story bank. Write it out using proof-story structure, but do not label the parts. Read it aloud and check it sounds like a real person, not a form.",
                "placeholder": "Question I am answering: ... My proof story (no labels): ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to playbook",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Which part of a proof story should usually take the most time?",
                  "options": [
                    "The context, with full background detail.",
                    "The responsibility, explained at great length.",
                    "The action and the result.",
                    "A long apology for any mistakes."
                  ],
                  "answer": 2,
                  "explain": "Interviewers care most about what you did and what happened. Keep the setup short and spend your time on Action and Result."
                },
                {
                  "q": "What is the most common way a structured answer ends up sounding scripted?",
                  "options": [
                    "The speaker uses too many real numbers.",
                    "The speaker announces each label out loud, like reading a form.",
                    "The story is too short and simple.",
                    "The speaker smiles too much."
                  ],
                  "answer": 1,
                  "explain": "Saying \"the situation was, the task was\" out loud feels cold. Keep the structure hidden and tell a natural story."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "A proof story works only when it sounds human. Give me a story you want to tell, and I will help you shape it while keeping your natural voice.",
                "suggested": [
                  "How long should my setup be?",
                  "My answer sounds stiff. How do I fix it?",
                  "What if my story has no number for the result?"
                ]
              }
            },
            {
              "lessonId": "interview-5",
              "title": "Eight stories that cover everything",
              "mins": 22,
              "hook": "You do not need fifty stories. Eight well-chosen ones can answer almost any behavioral question you will ever face.",
              "objectives": [
                "By the end you can name the eight story types that cover most interviews.",
                "By the end you can match each of your own stories to a type.",
                "By the end you can spot gaps in your bank and fill them before the interview."
              ],
              "sections": [
                {
                  "heading": "Why eight is the magic number",
                  "body": [
                    "Behavioral questions sound endless, but they fall into a small number of groups. Most questions are really asking about one of eight things. If you have one strong story for each group, you are ready for almost anything.",
                    "This is the Core Eight framework I teach. It gives you wide coverage without forcing you to memorise dozens of stories. Eight is enough to feel ready and few enough to remember under pressure."
                  ]
                },
                {
                  "heading": "The Core Eight",
                  "body": [
                    "Here are the eight story types. For each, prepare one strong, real example.",
                    "One, Leadership: a time you led people or a project. Two, Conflict: a time you handled a disagreement well. Three, Failure: a time you failed and what you learned. Four, Success: a clear win you are proud of. Five, Change: a time you adapted to a big change. Six, Pressure: a time you stayed calm under stress. Seven, Teamwork: a time you helped a team succeed. Eight, Influence: a time you convinced others without authority.",
                    "Notice that some questions blend two types. \"Tell me about a hard team project\" touches Teamwork and Pressure. That is fine. A good story often covers more than one type, which means you may not even need eight separate events."
                  ]
                },
                {
                  "heading": "Find your gaps",
                  "body": [
                    "Now check your story bank against the Core Eight. Which types do you have covered? Which are missing?",
                    "Example. An HR officer in Riyadh checks her bank. She has strong stories for Leadership, Success, Teamwork, and Pressure. But she has nothing for Failure or Influence. Those are her gaps. Failure questions are very common, so she sits down and finds a real failure story before her interview.",
                    "Do this gap check now. Most people find two or three missing types. Fill them in advance. The worst time to search for a failure story is live, in the room, with the panel waiting."
                  ]
                }
              ],
              "takeaways": [
                "Most behavioral questions fall into eight core types.",
                "The Core Eight are: leadership, conflict, failure, success, change, pressure, teamwork, influence.",
                "One strong story per type gives you wide coverage.",
                "Some stories cover more than one type, so you may need fewer than eight.",
                "Check your bank for gaps and fill them before the interview, especially failure."
              ],
              "exercise": {
                "title": "Map your Core Eight",
                "prompt": "List the eight story types. Next to each, write which of your real stories covers it. Mark any type you cannot cover yet. Then plan one story to fill your biggest gap.",
                "placeholder": "Leadership: led the launch team. Failure: GAP. Plan to fill failure: the time I missed a target and recovered.",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the main benefit of the Core Eight framework?",
                  "options": [
                    "It forces you to memorise fifty different stories.",
                    "It gives wide coverage with a small, memorable set of story types.",
                    "It removes the need to give any real examples.",
                    "It only works for senior leadership roles."
                  ],
                  "answer": 1,
                  "explain": "Eight story types cover most questions while staying small enough to remember under pressure."
                },
                {
                  "q": "You realise you have no failure story prepared. What is the best move?",
                  "options": [
                    "Hope the failure question does not come up.",
                    "Plan to make one up live in the room.",
                    "Find a real failure story now and prepare it before the interview.",
                    "Refuse to answer any failure question."
                  ],
                  "answer": 2,
                  "explain": "Failure questions are very common. Find a real story in advance so you are never caught searching live."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "The Core Eight is a simple way to feel ready for almost any behavioral question. Tell me which types you already have covered, and we will hunt down your gaps together.",
                "suggested": [
                  "Can one story cover two of the eight types?",
                  "I have no failure story. Help me find one.",
                  "Which of the eight types come up most often?"
                ]
              }
            },
            {
              "lessonId": "interview-6",
              "title": "Handling the question you dread",
              "mins": 20,
              "hook": "Every candidate has one question they fear. With the right method, that question becomes your chance to look honest and mature.",
              "objectives": [
                "By the end you can handle hard questions about weakness, failure, and gaps.",
                "By the end you can use a calm method that turns a risk into trust.",
                "By the end you can answer a question you do not want to answer with honesty and control."
              ],
              "sections": [
                {
                  "heading": "The questions people fear",
                  "body": [
                    "Some questions make the heart race. \"What is your biggest weakness?\" \"Tell me about a time you failed.\" \"Why is there a gap in your CV?\" \"Why were you let go?\"",
                    "These feel like traps. But they are not designed to destroy you. They test your honesty and your self-awareness. The interviewer wants to see that you can face a hard truth without panic or excuses.",
                    "The mistake most people make is to hide. They give a fake weakness or blame others for a failure. Interviewers see this every day. It lowers their trust, not raises it."
                  ]
                },
                {
                  "heading": "The Own-Learn-Grow method",
                  "body": [
                    "Here is a method I use for every dreaded question. I call it Own, Learn, Grow.",
                    "Own: take honest responsibility for the real thing. Do not hide or blame. Learn: explain what you understood from it. Grow: show the concrete change you made after. End on the growth, so the answer rises, not falls.",
                    "Example. \"Tell me about a time you failed.\" A strong answer: \"In my first manager role, I tried to do too much myself and my team felt left out. A project slipped because of it. (Own) I learned that holding on too tight slows everyone down. (Learn) Since then I delegate clearly and check in weekly instead of doing the work myself. My last team delivered two projects early. (Grow)\" The failure is real, but the answer ends in strength."
                  ]
                },
                {
                  "heading": "Gaps and hard truths",
                  "body": [
                    "For a CV gap, be calm and brief. Say what happened in one honest line, then move forward. \"I took eight months to care for a family member. I used some of that time to finish a course in HR analytics, and I am fully ready to return.\" No long apology. No shame.",
                    "If you were let go, never attack your old company. Stay calm and short. \"The role was cut in a restructure. I learned a lot there, and I am looking for a place where I can grow long term.\"",
                    "The rule across all of these: stay calm, stay honest, and always point forward. A hard question, handled with control, builds more trust than an easy one."
                  ]
                }
              ],
              "takeaways": [
                "Dreaded questions test honesty and self-awareness, not perfection.",
                "Never give a fake weakness or blame others for a failure.",
                "Use Own, Learn, Grow so the answer ends in strength.",
                "For CV gaps, give one honest line and then move forward.",
                "If you were let go, stay calm and never attack your old employer."
              ],
              "exercise": {
                "title": "Rehearse your dreaded question",
                "prompt": "Write your most feared interview question. Answer it using Own, Learn, Grow. Make sure the answer ends on the growth, not the problem.",
                "placeholder": "My dreaded question: ... Own: ... Learn: ... Grow: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What are interviewers really testing with a \"biggest weakness\" question?",
                  "options": [
                    "Whether you are perfect with no flaws.",
                    "Your honesty and self-awareness.",
                    "How fast you can change the subject.",
                    "Your ability to blame other people smoothly."
                  ],
                  "answer": 1,
                  "explain": "These questions test if you can face a real flaw with honesty and show growth. A fake weakness lowers trust."
                },
                {
                  "q": "Using Own, Learn, Grow, where should your answer end?",
                  "options": [
                    "On the problem, to show how bad it was.",
                    "On blaming the situation around you.",
                    "On the concrete change and growth you made after.",
                    "On a long apology."
                  ],
                  "answer": 2,
                  "explain": "Ending on Grow makes the answer rise. The interviewer remembers your maturity, not the failure."
                },
                {
                  "q": "You were let go in a restructure. What is the best way to explain it?",
                  "options": [
                    "Attack your old manager to show you were treated unfairly.",
                    "Stay calm, say the role was cut, and point forward.",
                    "Refuse to talk about it at all.",
                    "Give a long, emotional account of how unfair it was."
                  ],
                  "answer": 1,
                  "explain": "Stay calm and brief, never attack the old employer, and point forward. Control here builds trust."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let us face the question you dread most. Tell me which one it is, and we will build a calm, honest answer using Own, Learn, Grow.",
                "suggested": [
                  "How do I explain a gap in my CV?",
                  "What is a good real weakness to share?",
                  "How do I talk about being let go without sounding bitter?"
                ]
              }
            }
          ]
        },
        {
          "title": "Presence Under Pressure",
          "lessons": [
            {
              "lessonId": "interview-7",
              "title": "Voice, pacing, and the power of the pause",
              "mins": 14,
              "hook": "Your words matter, but how you say them often matters more. A calm voice and a well-placed pause signal confidence before you finish a sentence.",
              "objectives": [
                "By the end you can control your pace so you sound calm and clear.",
                "By the end you can use pauses on purpose instead of filling silence with noise.",
                "By the end you can use your voice to project steady confidence."
              ],
              "sections": [
                {
                  "heading": "Slow down to sound sure",
                  "body": [
                    "When we are nervous, we speak fast. Fast talking sounds anxious and is hard to follow. The fix is simple but hard: slow down on purpose.",
                    "A calm pace gives your words weight. It tells the listener you are thinking, not rushing. Aim to speak a little slower than feels natural. To you it may feel too slow, but to the listener it sounds steady and sure.",
                    "Breathe before you answer. One slow breath before you speak resets your pace and your nerves. It also gives you a second to find the real answer."
                  ]
                },
                {
                  "heading": "The power of the pause",
                  "body": [
                    "Silence feels scary in an interview, so people fill it with \"um,\" \"like,\" and \"you know.\" These filler words make you sound unsure.",
                    "The fix is the pause. When you need a moment to think, just pause in silence. A short pause is not weakness. It is a sign of a careful mind. The interviewer reads it as confidence.",
                    "Use the pause for impact too. Before your key point, pause for one beat. After your strongest line, pause again. Pause, make your point, then pause. The silence frames your best words and makes them land. (You will meet this same pause skill again, named in full, in the Public Speaking course.)"
                  ]
                },
                {
                  "heading": "A quick practice plan",
                  "body": [
                    "Voice is a physical skill. You cannot fix it by thinking. You must practise out loud.",
                    "Record yourself answering one common question on your phone. Listen back. Count your filler words. Notice where you rushed. This honest feedback is worth more than any tip.",
                    "Example. A candidate in Doha recorded herself and found she said \"basically\" eleven times in two minutes. She practised pausing instead. In her next mock, the count dropped to one. Her answers sounded twice as calm. Small change, big result."
                  ]
                }
              ],
              "takeaways": [
                "Slow your pace on purpose. It signals calm and confidence.",
                "Take one slow breath before you answer.",
                "Replace filler words with a short, silent pause.",
                "Pause before and after your key line to make it land.",
                "Record yourself and count your fillers to improve fast."
              ],
              "exercise": {
                "title": "Record and review",
                "prompt": "Record yourself answering one interview question for ninety seconds. Listen back. Count your filler words and mark where you rushed. Write down one fix to practise.",
                "placeholder": "Filler words I used: ... Where I rushed: ... My one fix to practise: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "You need a moment to think during an answer. What is the best thing to do?",
                  "options": [
                    "Fill the silence with \"um\" and \"you know\" so there is no gap.",
                    "Speak faster to get through the answer.",
                    "Pause in silence for a moment, then speak.",
                    "Apologise for needing time."
                  ],
                  "answer": 2,
                  "explain": "A short silent pause signals a careful mind. Filler words signal the opposite. The pause reads as confidence."
                },
                {
                  "q": "Why should you slow your speaking pace in an interview?",
                  "options": [
                    "To use up more of the time available.",
                    "Because a calm pace gives your words weight and signals confidence.",
                    "Because slow talking hides weak answers.",
                    "Because interviewers prefer very long answers."
                  ],
                  "answer": 1,
                  "explain": "Nerves make us rush. A calm pace sounds steady and sure, and gives the listener time to follow you."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "How you say something often matters as much as what you say. Tell me what worries you about your voice or pace, and we will build a simple practice plan.",
                "suggested": [
                  "How do I stop saying \"um\" so much?",
                  "I talk too fast when nervous. What helps?",
                  "How long should a good pause be?"
                ]
              }
            },
            {
              "lessonId": "interview-8",
              "title": "What your body says before you do",
              "mins": 14,
              "hook": "Before you say a word, your body has already spoken. Learn to make it say calm and confident, not nervous and small.",
              "objectives": [
                "By the end you can use posture and eye contact to project presence.",
                "By the end you can avoid common nervous body habits.",
                "By the end you can adapt your body language to in-person and video interviews."
              ],
              "sections": [
                {
                  "heading": "Your body speaks first",
                  "body": [
                    "The moment you walk in, the interviewer reads your body. Slumped shoulders and a weak handshake say nervous. An upright posture and steady eyes say confident. This happens before you speak.",
                    "You do not need to fake a power pose. You just need to remove the signals of fear and add the signals of calm. Sit up straight. Keep your shoulders open, not hunched. Plant both feet on the floor. This is the Open-and-Grounded posture.",
                    "Open and grounded does two things. It looks confident to others, and it actually helps you feel calmer inside. Body and mind are linked. Sit like you belong there, and you start to feel it."
                  ]
                },
                {
                  "heading": "Eye contact and hands",
                  "body": [
                    "Eye contact builds trust, but staring is too much. The simple rule is to hold eye contact while you listen, and let your eyes move naturally while you think. With a panel, share your gaze. Look at the person who asked, then include the others.",
                    "Your hands often show your nerves. Tapping, moving them too much, and touching your face all signal stress. Rest your hands calmly on the table or your lap. Use natural hand movements when you explain something. They help, as long as they are calm and not fast and shaky.",
                    "Watch for nervous habits you may not notice: bouncing a leg, clicking a pen, playing with hair. Ask a friend in a mock interview to point out yours."
                  ]
                },
                {
                  "heading": "Body language on video",
                  "body": [
                    "Many Gulf interviews now happen on video. The rules shift a little. Look at the camera, not the screen, when you want to make eye contact. It feels strange but it looks like you are looking at them.",
                    "Sit up, frame yourself from the chest up, and keep the camera at eye level. A camera looking up at you or down at you both feel off. Good light on your face matters more than a fancy background.",
                    "Example. A candidate in Dubai kept looking at his own image on screen during a video interview. It looked like his eyes were always drifting away. He moved his window right under the camera and looked there instead. The next call, the panel said he seemed much more present. Small fix, real difference."
                  ]
                }
              ],
              "takeaways": [
                "Your body sends a message before you speak.",
                "Use the Open-and-Grounded posture: upright, open shoulders, feet planted.",
                "Hold eye contact while listening; share your gaze with a panel.",
                "Keep hands calm and watch for nervous habits like leg bouncing.",
                "On video, look at the camera and keep it at eye level."
              ],
              "exercise": {
                "title": "Check your body habits",
                "prompt": "Do a two-minute mock answer in front of a mirror or camera. Note your posture, your eye contact, and any nervous habit you see. Write one thing to change.",
                "placeholder": "My posture: ... My eye contact: ... Nervous habit I spotted: ... One change: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the best way to handle eye contact with an interview panel?",
                  "options": [
                    "Stare hard at one person the whole time.",
                    "Avoid eye contact so you do not seem aggressive.",
                    "Look at who asked, then include the others naturally.",
                    "Keep your eyes on your notes throughout."
                  ],
                  "answer": 2,
                  "explain": "Share your gaze. Answer the person who asked, then include the rest. This builds trust without staring."
                },
                {
                  "q": "On a video interview, where should you look to seem like you are making eye contact?",
                  "options": [
                    "At your own image on the screen.",
                    "At the camera lens.",
                    "Down at your keyboard.",
                    "Out of the window to relax."
                  ],
                  "answer": 1,
                  "explain": "Looking at the camera lens looks like eye contact to the panel. Looking at your own image makes your eyes seem to drift."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Your body talks before you do. Tell me about your next interview, in person or on video, and we will set up the right body language for it.",
                "suggested": [
                  "What do I do with my hands during answers?",
                  "How do I look confident on a video call?",
                  "I bounce my leg when nervous. How do I stop?"
                ]
              }
            },
            {
              "lessonId": "interview-9",
              "title": "Recovering from a stumble",
              "mins": 14,
              "hook": "Everyone stumbles in an interview. The difference between candidates is not whether they slip, but how they recover.",
              "objectives": [
                "By the end you can recover calmly from a blank mind or a bad answer.",
                "By the end you can use simple lines that buy you time without losing face.",
                "By the end you can stay confident after a mistake instead of panicking."
              ],
              "sections": [
                {
                  "heading": "Stumbles are normal",
                  "body": [
                    "Your mind goes blank. You lose your point halfway through. You give an answer and instantly wish you had said something else. This happens to everyone, even strong candidates.",
                    "The interviewer is not looking for a perfect robot. They are watching how you handle pressure. A calm recovery can actually score higher than a perfect answer, because it shows you stay calm under stress.",
                    "The danger is not the stumble itself. The danger is panic, where one small slip makes you nervous, and that causes more slips. The skill is to stop this early."
                  ]
                },
                {
                  "heading": "Lines that buy you time",
                  "body": [
                    "When your mind goes blank, you need a calm line to buy time. These are your recovery lines. Prepare them in advance.",
                    "If you lose your point: \"Let me take that back to the main idea.\" Then restate your key message. If you need to think: \"That is a good question. Let me think for a moment.\" Then pause. Both lines sound thoughtful, not lost.",
                    "If you realise in the middle of an answer that you went the wrong way: \"Actually, let me give you a better example.\" Then switch to a stronger story. This shows confidence, not weakness. You are in control, not lost."
                  ]
                },
                {
                  "heading": "Fixing an answer you regret",
                  "body": [
                    "Sometimes you finish an answer and know it was weak. You can fix it. Later in the interview, or even right after, you can say, \"Earlier you asked about teamwork. I would like to add a clearer example.\" Then give a better one.",
                    "This is the Reset-and-Return move. It shows you think about your work and care about giving your best, which leaves a strong final impression.",
                    "Example. A candidate in Abu Dhabi gave a rushed answer about leadership early on. Near the end, when asked if she had anything to add, she said, \"Yes. I want to return to your leadership question with a stronger example.\" She gave a sharp story. The panel later said that moment stood out. The recovery beat the original stumble."
                  ]
                }
              ],
              "takeaways": [
                "Everyone stumbles. The recovery is what gets judged.",
                "Stop the panic early with a calm line.",
                "Prepare recovery lines to buy time and restate your point.",
                "Switching to a better example mid-answer shows confidence.",
                "Use Reset-and-Return to fix a weak answer later in the interview."
              ],
              "exercise": {
                "title": "Prepare your recovery lines",
                "prompt": "Write three calm recovery lines in your own words: one for a blank mind, one to buy thinking time, and one to switch to a better example. Practise saying them out loud.",
                "placeholder": "Blank mind line: ... Thinking-time line: ... Switch-example line: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to playbook",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Your mind goes blank during an answer. What is the best response?",
                  "options": [
                    "Panic and apologise many times.",
                    "Use a calm line to buy time, then restate your main point.",
                    "Sit in long silence and hope it passes.",
                    "Make up a fake answer quickly."
                  ],
                  "answer": 1,
                  "explain": "A prepared recovery line buys you a moment and sounds thoughtful. The skill is stopping the panic early."
                },
                {
                  "q": "You gave a weak answer earlier. What is the Reset-and-Return move?",
                  "options": [
                    "Pretend the weak answer never happened.",
                    "Apologise for it and move on quickly.",
                    "Later, offer a stronger example for that question.",
                    "Ask the panel to forget your earlier answer."
                  ],
                  "answer": 2,
                  "explain": "Returning later with a better example shows you think about your work and care about doing your best. It leaves a strong impression."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Stumbling is human. The recovery is the skill. Tell me what kind of stumble you fear most, and we will prepare calm lines to handle it.",
                "suggested": [
                  "What do I say when my mind goes blank?",
                  "How do I switch to a better answer mid-sentence?",
                  "Can I really fix a bad answer later in the interview?"
                ]
              }
            }
          ]
        },
        {
          "title": "The Offer",
          "lessons": [
            {
              "lessonId": "interview-10",
              "title": "Reading the real offer",
              "mins": 16,
              "hook": "An offer is more than a base salary. Read only the big number and you may miss what really matters.",
              "objectives": [
                "By the end you can read an offer as a full package, not just base pay.",
                "By the end you can compare two offers fairly across many parts.",
                "By the end you can spot the parts of a Gulf offer that people often overlook."
              ],
              "sections": [
                {
                  "heading": "An offer has many parts",
                  "body": [
                    "When an offer arrives, the eye jumps to the base salary. But the base is only one part of the total package. To judge an offer well, you must see the whole thing.",
                    "The full package includes base pay, bonus, allowances, benefits, and growth. In the Gulf, allowances matter a lot. Housing allowance, transport allowance, flight tickets home, school fees for children, and health cover can add up to a large share of the total.",
                    "Two offers with the same base can be very different once you add the allowances. A lower base with strong housing and school support may beat a higher base with none."
                  ]
                },
                {
                  "heading": "The Total-Value checklist",
                  "body": [
                    "Here is a simple checklist I give clients. I call it the Total-Value checklist. Go through every line before you judge an offer.",
                    "Base salary. Annual bonus and how it is decided. Housing allowance. Transport allowance. Flight tickets and how many per year. Health insurance and who it covers. School fees support. End-of-service gratuity. Notice period and visa terms. Growth: title, learning, and the path ahead.",
                    "Example. An offer in Dubai shows a base that looks lower than a candidate's current job. But it adds a housing allowance, full family health cover, and school fees for two children. Once she totals the real value, the new offer is clearly stronger. Without the checklist, she might have said no to a better deal."
                  ]
                },
                {
                  "heading": "Look beyond money",
                  "body": [
                    "Money is not the only value in an offer. Some parts are harder to price but just as real.",
                    "Think about the growth path. Will this role build skills that raise your value? Think about the manager and culture from what you saw in the interview. A great manager is worth a lot. Think about job security and the company's health.",
                    "Weigh these against the numbers. A slightly lower offer with a strong growth path and a good manager can be the smarter choice for your career over five years. Read the whole offer, money and meaning together."
                  ]
                }
              ],
              "takeaways": [
                "An offer is a full package, not just the base salary.",
                "In the Gulf, allowances like housing, flights, and school fees can be large.",
                "Use the Total-Value checklist to see every part of an offer.",
                "Two offers with the same base can differ a lot once you add allowances.",
                "Weigh growth, manager, and security alongside the money."
              ],
              "exercise": {
                "title": "Total up an offer",
                "prompt": "Take a real or imagined offer. List every part using the Total-Value checklist. Add up the full value. Then note two non-money factors that matter to you.",
                "placeholder": "Base: ... Housing: ... Flights: ... School fees: ... Total value: ... Non-money factors: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why can an offer with a lower base salary still be the better deal in the Gulf?",
                  "options": [
                    "Lower base always means lower tax only.",
                    "Allowances like housing, flights, and school fees can add large value.",
                    "A lower base means the company likes you more.",
                    "Base salary is the only part that ever matters."
                  ],
                  "answer": 1,
                  "explain": "In the Gulf, allowances can be a big share of the package. The full total can beat a higher base with no allowances."
                },
                {
                  "q": "Which factor below is a non-money part of an offer worth weighing?",
                  "options": [
                    "The exact font used in the offer letter.",
                    "The quality of the manager and the growth path.",
                    "The colour of the office walls.",
                    "The brand of coffee in the kitchen."
                  ],
                  "answer": 1,
                  "explain": "A strong manager and a real growth path add lasting career value, even when they are hard to put a price on."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "An offer is bigger than the base number. Tell me the parts of your offer, and we will total up its real value together using the Total-Value checklist.",
                "suggested": [
                  "Which Gulf allowances do people forget to count?",
                  "How do I compare two offers fairly?",
                  "Is a lower base ever the smarter choice?"
                ]
              }
            },
            {
              "lessonId": "interview-11",
              "title": "Negotiation that keeps goodwill",
              "mins": 18,
              "hook": "You can ask for more and still start the job loved, not resented. The secret is how you ask, not just what you ask for.",
              "objectives": [
                "By the end you can negotiate an offer without harming the relationship.",
                "By the end you can use a calm, evidence-based method to ask for more.",
                "By the end you can know when to push, when to trade, and when to stop."
              ],
              "sections": [
                {
                  "heading": "Negotiation is not a fight",
                  "body": [
                    "Many people fear negotiation. They think asking for more will make the employer angry or pull the offer. So they accept the first number, even when more was possible.",
                    "Done well, negotiation is not a fight. It is a calm, respectful talk to reach a fair deal. A good employer expects you to negotiate. It shows you value yourself. The way you do it decides whether goodwill stays or breaks.",
                    "The goal is simple: get a fairer deal and start the job on warm terms. Both can happen at once if you stay calm, kind, and clear."
                  ]
                },
                {
                  "heading": "The Anchor-Reason-Range method",
                  "body": [
                    "Here is the method I teach for asking with goodwill. I call it Anchor, Reason, Range.",
                    "Anchor: open with warmth and gratitude. \"Thank you for the offer. I am excited to join.\" This sets a positive tone. Reason: give evidence for your ask. Use market data, your experience, or a competing offer. \"Based on my eight years and the market rate for this role in Dubai, I was hoping for a higher base.\" Range: ask for a specific range, not a vague \"more.\" \"Could we look at a base between X and Y?\"",
                    "Notice the order. Warmth first, then reasons, then a clear number. You never demand. You ask, with respect and proof. This keeps the other side open instead of defensive."
                  ]
                },
                {
                  "heading": "Trade, and know when to stop",
                  "body": [
                    "If the base cannot move, trade. Other parts of the package may have room. Ask about a sign-on bonus, an extra flight ticket, more leave days, a faster review, or a training budget. A good negotiator finds value in many places, not just the base.",
                    "Know when to stop. If the employer says a firm no twice on the same point, do not keep pushing. Pushing past a clear no damages goodwill. Accept it warmly and move to another item or close the deal.",
                    "Example. A candidate in Riyadh asked for a higher base using Anchor, Reason, Range. The company could not raise the base, but offered an extra annual flight ticket and a sign-on bonus instead. She accepted warmly. She got more value and started the job on great terms. That is a win that keeps goodwill."
                  ]
                }
              ],
              "takeaways": [
                "Negotiation is a respectful talk, not a fight.",
                "Most employers expect and respect a calm ask.",
                "Use Anchor, Reason, Range: warmth, then evidence, then a clear number.",
                "If the base will not move, trade on other parts of the package.",
                "Stop pushing after a firm no, and close on warm terms."
              ],
              "exercise": {
                "title": "Draft your negotiation ask",
                "prompt": "Write your negotiation message using Anchor, Reason, Range. Start with warmth, add your evidence, and name a clear range. Then list two items you could trade for if the base will not move.",
                "placeholder": "Anchor: Thank you... Reason: Based on... Range: a base between... Items to trade for: extra flight, sign-on bonus...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to playbook",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "In the Anchor, Reason, Range method, what comes first?",
                  "options": [
                    "A firm demand for a higher number.",
                    "Warmth and gratitude to set a positive tone.",
                    "A threat to take another offer.",
                    "A long list of complaints about the offer."
                  ],
                  "answer": 1,
                  "explain": "You anchor with warmth first. A positive tone keeps the employer open before you give reasons and a number."
                },
                {
                  "q": "The employer says a firm no to a base increase twice. What is the best move?",
                  "options": [
                    "Keep pushing on the base until they give in.",
                    "Walk away from the offer in anger.",
                    "Stop pushing the base and try trading on other parts of the package.",
                    "Accept the original offer silently and feel resentful."
                  ],
                  "answer": 2,
                  "explain": "Pushing past a firm no harms goodwill. Trade on other items like bonus, flights, or leave to still gain value."
                },
                {
                  "q": "Why should you give a clear range instead of just asking for \"more\"?",
                  "options": [
                    "Because a range sounds more aggressive.",
                    "Because a specific range is clear, fair, and easy to act on.",
                    "Because vague asks always get a higher result.",
                    "Because numbers confuse the employer in your favour."
                  ],
                  "answer": 1,
                  "explain": "A specific range gives the employer something concrete to work with. \"More\" is vague and easy to dismiss."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "You can ask for more and keep the relationship warm. Tell me what you want to negotiate, and we will shape it with Anchor, Reason, Range.",
                "suggested": [
                  "What can I trade for if the base will not move?",
                  "How do I find the market rate for my role?",
                  "What words keep my ask warm, not pushy?"
                ]
              }
            },
            {
              "lessonId": "interview-12",
              "title": "Live AI mock interview",
              "mins": 16,
              "hook": "You have built the skills. Now put them together in a real practice run, and learn how to get the most from every mock interview.",
              "objectives": [
                "By the end you can run an effective mock interview that builds real readiness.",
                "By the end you can combine decoding, stories, presence, and recovery in one go.",
                "By the end you can review your own performance and fix the right things."
              ],
              "sections": [
                {
                  "heading": "Why mock practice works",
                  "body": [
                    "You cannot learn to swim by reading. You learn by getting in the water. Interviews are the same. Reading about skills is not enough. You must practise out loud, under light pressure, before the real day.",
                    "A mock interview is a safe practice run. You answer real questions, feel the pressure, and find your weak spots while it is safe to fail. The mistakes you make in a mock are the ones you will not make for real.",
                    "This is your chance to bring together everything from this course: decoding the real question, pulling from your story bank, using proof-story structure, holding your presence, and recovering from a stumble. It all comes together here."
                  ]
                },
                {
                  "heading": "Run a strong mock",
                  "body": [
                    "A good mock follows a simple shape. I call it Prepare, Perform, Review.",
                    "Prepare: choose the role and pick a mix of questions, including one dreaded question. Set up as if it were real. Sit up, dress the part, use video if your real interview is on video. Perform: answer in full, out loud, without stopping to fix mistakes. Push through stumbles like you would for real. Review: this is the most valuable part. Look back honestly at what worked and what did not.",
                    "You can run a mock with our AI mock interviewer, a friend, or even alone with a recording. The AI tutor in this academy can ask you questions, listen to your answers, and give honest feedback on structure, clarity, and presence."
                  ]
                },
                {
                  "heading": "Review the right things",
                  "body": [
                    "Most people review badly. They only notice they felt nervous. That is not useful. Review the specific skills instead.",
                    "Ask yourself: Did I decode the real question? Did my stories have a clear result? Did I keep the structure human, not scripted? Did I pause instead of using filler words? Did I recover calmly from any stumble? Score each one and pick just one or two to fix before your next mock.",
                    "Example. A candidate in Dubai ran three mocks. After the first, she fixed her rambling by using proof-story structure. After the second, she cut her filler words with pauses. After the third, she felt calm and ready. She did not try to fix everything at once. She fixed one thing per round. That is how real progress happens. Now you are ready. Walk into the room knowing what they are really asking, and exactly how to answer."
                  ]
                }
              ],
              "takeaways": [
                "You learn interviews by practising out loud, not just reading.",
                "A mock interview lets you fail safely and find weak spots early.",
                "Follow Prepare, Perform, Review for every mock.",
                "Review specific skills, not just whether you felt nervous.",
                "Fix one or two things per round, not everything at once."
              ],
              "exercise": {
                "title": "Plan and run a mock",
                "prompt": "Plan a mock interview. Choose the role, pick five questions including one you dread, and set up as if it were real. Run it out loud, then review using the skill checklist. Write the one thing you will fix next.",
                "placeholder": "Role: ... My five questions: ... After review, the one thing I will fix: ...",
                "interaction": {
                  "mechanic": "Interview Lab",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Pick the interview move you would use in the room, then rehearse it mentally.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to playbook",
                  "choices": [
                    "Clarify the question",
                    "Lead with headline",
                    "Shape a proof story",
                    "Recover and reset"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which part of a mock interview is the most valuable for improvement?",
                  "options": [
                    "The preparation, because the rest does not matter.",
                    "The honest review of specific skills afterward.",
                    "Feeling nervous, because nerves mean you tried hard.",
                    "Stopping mid-answer to fix every small mistake."
                  ],
                  "answer": 1,
                  "explain": "The review is where learning happens. Reviewing specific skills, not just nerves, tells you exactly what to fix."
                },
                {
                  "q": "How should you improve across several mock interviews?",
                  "options": [
                    "Try to fix everything at once in one session.",
                    "Only run one mock and assume you are ready.",
                    "Fix one or two specific things per round.",
                    "Avoid reviewing so you do not feel bad."
                  ],
                  "answer": 2,
                  "explain": "Real progress comes from fixing one or two things per round. Trying to fix everything at once overwhelms you and sticks less."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "This is your practice run. I can be your mock interviewer right now. Tell me the role you are targeting, and I will ask you real questions and give honest feedback on your answers.",
                "suggested": [
                  "Start a mock interview for an HR role with me.",
                  "Ask me one dreaded question and review my answer.",
                  "What should I check in my self-review?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Interview Lab",
        "short": "Build answers under realistic pressure.",
        "artifact": "interview playbook",
        "interaction": "decode, select, rehearse, mock",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "hr-foundations": {
      "courseId": "hr-foundations",
      "title": "Modern HR Foundations",
      "modules": [
        {
          "title": "The HR Operating Model",
          "lessons": [
            {
              "lessonId": "hr-foundations-1",
              "title": "The four roles of modern HR",
              "mins": 18,
              "hook": "Most HR teams feel busy but not respected. The reason is they only play one of the four roles HR is meant to play. This lesson shows you all four.",
              "objectives": [
                "By the end you can name the four roles of modern HR in your own words.",
                "By the end you can spot which role you spend most of your time in today.",
                "By the end you can decide which role your team needs to grow next."
              ],
              "sections": [
                {
                  "heading": "Why HR needs a model, not just tasks",
                  "body": [
                    "Many HR teams describe their job as a long list of tasks. Hiring, payroll, contracts, leave, complaints. The list is real, but it hides the bigger picture. When you only see tasks, you stay busy with small jobs and react all day.",
                    "A model groups the tasks into a few clear roles. It tells you what HR is for, not only what HR does. The model we use is the Ulrich Model, created by Dave Ulrich in 1997. It is still the most used way to describe HR work, because the tools change but the jobs stay the same."
                  ]
                },
                {
                  "heading": "The four roles",
                  "body": [
                    "Role one is the Strategic Partner. Here you help leaders plan the workforce they will need. You answer questions like: do we have the skills for next year, and what will a new branch cost in people?",
                    "Role two is the Change Agent. Here you help the company move through change. A new system, a merger, a new way of working. You prepare people so the change actually sticks.",
                    "Role three is the Administrative Expert. Here you run the daily machine well. Payroll on time, contracts correct, leave tracked, questions answered. This is the trust base. If this breaks, nobody listens to your strategy.",
                    "Role four is the Employee Champion. Here you speak for the people. You listen to how staff feel, you protect fairness, and you carry their voice into leadership rooms."
                  ]
                },
                {
                  "heading": "A Gulf example",
                  "body": [
                    "Picture an HR team of three people at a growing retail company in Riyadh. Today they spend almost all their time on the Administrative Expert role. Payroll, visas, and leave fill the whole week.",
                    "Their CEO asks for a Saudization plan to meet Nitaqat targets. That is Strategic Partner work, and nobody has time for it. The fix is not to work harder. The fix is to automate more of the admin, then move one person into partner work. The model showed them the gap. The task list never would."
                  ]
                }
              ],
              "takeaways": [
                "HR has four roles: Strategic Partner, Change Agent, Administrative Expert, Employee Champion.",
                "The Ulrich Model describes the work, so it stays true even as tools change.",
                "Strong admin is the trust base for everything else.",
                "If you only play one role, you stay stuck doing small daily jobs.",
                "Growth often means moving time, not adding hours."
              ],
              "exercise": {
                "title": "Find your role balance",
                "prompt": "Think about your last full work week. Guess what percent of your time went to each of the four roles. Which role got the most time, and which got almost none? Write one sentence on the role you most need to grow next, and why.",
                "placeholder": "Last week I spent about ... percent on admin and almost none on ... The role I need to grow next is ... because ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "An HR team is praised for fast, error-free payroll but is never invited to planning meetings. Which role are they strong in, and which are they missing?",
                  "options": [
                    "Strong in Strategic Partner, missing Administrative Expert",
                    "Strong in Administrative Expert, missing Strategic Partner",
                    "Strong in Change Agent, missing Employee Champion",
                    "Strong in Employee Champion, missing Change Agent"
                  ],
                  "answer": 1,
                  "explain": "Reliable payroll is the Administrative Expert role. Being absent from planning means they are not yet acting as a Strategic Partner."
                },
                {
                  "q": "Why does the Ulrich Model stay useful even when HR software keeps changing?",
                  "options": [
                    "It lists the exact tools every HR team should buy",
                    "It describes the underlying work, not the technology",
                    "It is the newest model available",
                    "It only applies to large companies"
                  ],
                  "answer": 1,
                  "explain": "The model describes the jobs HR must do. Tools change every few years, but the four roles remain."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome to the course. We just met the four roles of HR using the Ulrich Model. Tell me where you spend most of your time, and I will help you see your gaps.",
                "suggested": [
                  "How do I move from admin work to partner work?",
                  "Can one small team really play all four roles?",
                  "Which role should a brand new HR person start with?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-2",
              "title": "HR as a business partner",
              "mins": 19,
              "hook": "A place in big decisions is not given to HR for free. You earn it by speaking the language of the business. This lesson shows you how.",
              "objectives": [
                "By the end you can explain what a true HR business partner does.",
                "By the end you can link a people problem to a business number.",
                "By the end you can prepare for a leadership meeting like a partner, not just someone who takes notes."
              ],
              "sections": [
                {
                  "heading": "What business partner really means",
                  "body": [
                    "Business partner is one of the most used and least understood terms in HR. Many people think it means being friendly with managers. It does not. It means you help the business reach its goals through people, and you can prove it.",
                    "A real partner starts with the business problem, not the HR activity. A manager says sales are dropping. A weak HR response is to offer a training course. A partner first asks why sales are dropping. Maybe the best sellers are leaving. Maybe new hires take too long to learn. The people answer should fit the business problem."
                  ]
                },
                {
                  "heading": "Speak in business numbers",
                  "body": [
                    "Leaders make decisions with numbers. If HR only speaks in feelings and good intentions, it gets ignored. The skill is to turn a people issue into a number the business cares about.",
                    "Use a simple bridge. People issue, then business cost, then your proposed action. For example: our call centre loses 30 agents a year. Each exit costs about 50,000 dirhams to replace and retrain. That is 1.5 million dirhams a year. A small plan to keep staff could cut this cost in half. Now leaders are listening, because you are talking in their terms."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Layla is an HR partner at a logistics firm in Dubai. Drivers keep quitting in their first three months. The operations head is frustrated and blames pay.",
                    "Layla does not argue. She looks at exit interviews and finds the real cause: drivers get almost no support in week one, so they feel lost and leave. She brings one slide to the leadership meeting. It shows the cost of early exits, the true cause, and a simple buddy system for the first month. The plan is cheap and clear. It is approved that day. That is partnering: business problem, evidence, and a practical fix."
                  ]
                }
              ],
              "takeaways": [
                "Start with the business problem, not the HR activity.",
                "Turn people issues into numbers leaders care about.",
                "Use the bridge: people issue, business cost, proposed action.",
                "Evidence beats opinion in a leadership room.",
                "A good partner brings a fix, not just a complaint."
              ],
              "exercise": {
                "title": "Build your business bridge",
                "prompt": "Pick one people problem in your team right now, such as high turnover or slow hiring. Write it as a bridge: the people issue, the rough business cost, and one action you would propose. Use real numbers if you can, even rough ones.",
                "placeholder": "People issue: ... Business cost: about ... Proposed action: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A sales manager says results are weak and asks HR for a motivation workshop. What is the strongest partner response?",
                  "options": [
                    "Book the workshop quickly to look helpful",
                    "First investigate why results are weak before choosing a solution",
                    "Tell the manager motivation is not an HR job",
                    "Send a survey and wait a month for results"
                  ],
                  "answer": 1,
                  "explain": "A partner starts with the real business problem. The workshop may not fit the cause. Investigate first, then act."
                },
                {
                  "q": "Why should HR translate people problems into money or business numbers?",
                  "options": [
                    "Because leaders are only interested in cost cutting",
                    "Because numbers help leaders compare and decide, so HR is taken seriously",
                    "Because feelings have no place in HR",
                    "Because it makes HR reports longer"
                  ],
                  "answer": 1,
                  "explain": "Numbers let leaders weigh the issue against other priorities. It earns HR a real voice in decisions."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let us turn you into a real business partner. Bring me a people problem from your work, and we will build it into a business case together.",
                "suggested": [
                  "How do I find the cost of turnover?",
                  "What if I do not have good data yet?",
                  "How do I get invited to leadership meetings?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-3",
              "title": "Aligning people strategy to business strategy",
              "mins": 18,
              "hook": "If your HR plan does not point at the company goal, it is just a list of activities. This lesson connects the two.",
              "objectives": [
                "By the end you can read a business goal and find the people needs inside it.",
                "By the end you can use a simple tool to link strategy to HR action.",
                "By the end you can cut HR work that helps no business goal."
              ],
              "sections": [
                {
                  "heading": "Strategy starts with the business goal",
                  "body": [
                    "People strategy is the plan for the people side of the business. It only makes sense when it serves a business goal. So you always start at the top: what is the company trying to achieve this year?",
                    "Common goals are things like grow revenue 20 percent, open a new market, cut costs, or improve service quality. Each goal hides a people need. Growth needs more skilled hires. A new market needs local talent and language skills. Better service needs training and lower turnover. Your job is to make those needs clear."
                  ]
                },
                {
                  "heading": "The line of sight tool",
                  "body": [
                    "A simple and powerful tool is the Line of Sight. You draw a straight line from a business goal, to the people capability it needs, to the HR action that builds it. If you cannot draw the line, the HR action may not be worth doing.",
                    "For example: business goal is to open three new stores in Jeddah. People capability needed is enough trained store managers. HR action is a manager development program plus a hiring plan. Now every step connects. Leaders can see why the HR work matters."
                  ]
                },
                {
                  "heading": "A Gulf example",
                  "body": [
                    "A bank in Abu Dhabi sets a goal to grow its digital services. The HR team first lists its usual plans: a wellness week, a new dress code, a values poster campaign.",
                    "None of these point at digital growth. So they redraw the Line of Sight. The goal needs digital and data skills. The real HR actions become hiring data analysts and reskilling current staff. The wellness week is nice, but it does not move the goal, so it drops down the list. The bank now spends its limited HR budget where it counts."
                  ]
                }
              ],
              "takeaways": [
                "People strategy must serve a business goal.",
                "Every business goal hides a people need.",
                "Use the Line of Sight: goal, capability, HR action.",
                "If you cannot draw the line, question the activity.",
                "Aligned HR spends limited budget where it matters most."
              ],
              "exercise": {
                "title": "Draw your line of sight",
                "prompt": "Write down one main goal of your company this year. Then complete the line: the people capability that goal needs, and one HR action that would build it. If the line is hard to draw, note why.",
                "placeholder": "Business goal: ... Capability needed: ... HR action: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "An HR team plans a values poster campaign, but the company goal is to enter a new export market. What does the Line of Sight tool suggest?",
                  "options": [
                    "Run the campaign anyway because culture always helps",
                    "Check if the campaign builds a capability the goal needs, and reprioritise if not",
                    "Cancel all HR activity that is not hiring",
                    "Ask leaders to change the company goal"
                  ],
                  "answer": 1,
                  "explain": "The tool tests whether each action builds a capability the goal needs. If the link is weak, move it down the list."
                },
                {
                  "q": "Why is it useful to find the people need hidden inside a business goal?",
                  "options": [
                    "So HR can ask for a bigger budget every year",
                    "So HR action clearly supports what the business is trying to achieve",
                    "So HR can avoid working with managers",
                    "So HR reports look more detailed"
                  ],
                  "answer": 1,
                  "explain": "Finding the people need links HR action to the goal, which makes the work relevant and easy to defend."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Strategy alignment sounds heavy, but it is just drawing a clear line. Share your company goal and we will trace it down to one HR action.",
                "suggested": [
                  "What if my company has no clear written strategy?",
                  "How do I drop a popular HR project that does not align?",
                  "Can you show another Line of Sight example?"
                ]
              }
            }
          ]
        },
        {
          "title": "The Employee Lifecycle",
          "lessons": [
            {
              "lessonId": "hr-foundations-4",
              "title": "Hiring and onboarding that sticks",
              "mins": 22,
              "hook": "A great hire who quits in three months is a loss, not a win. This lesson helps you hire right and start them well.",
              "objectives": [
                "By the end you can write a job profile based on real needs, not a copied template.",
                "By the end you can use a structured interview to reduce bias.",
                "By the end you can plan a first 90 days that keeps new hires."
              ],
              "sections": [
                {
                  "heading": "Hire for the real need",
                  "body": [
                    "Good hiring starts before the interview. It starts with a clear picture of what the job truly needs. Many teams copy an old job description, list every skill they can think of, and hope. This wastes time and scares off good people.",
                    "Instead, define the few must-have outcomes for the role. Ask the hiring manager: in one year, what must this person have achieved for us to say the hire worked? Build the profile around those outcomes. This keeps you focused on what matters and away from a long wish list."
                  ]
                },
                {
                  "heading": "Structured interviews beat gut feeling",
                  "body": [
                    "Most interviews are a friendly chat, and friendly chats favour people who are like us. That is bias, and it leads to weak and unfair hiring. The fix is the structured interview. You ask every candidate the same planned questions and score answers against a simple guide.",
                    "A strong method is the evidence question. You ask about a real past situation, what the person was responsible for, what they did, and what changed. Past behaviour predicts future behaviour better than promises. Scoring each answer the same way makes your choice fairer and easier to defend."
                  ]
                },
                {
                  "heading": "Onboarding that prevents early exits",
                  "body": [
                    "Many new hires decide within weeks whether they will stay. A messy first month pushes good people out. Onboarding is not the laptop and the badge. It is helping someone feel useful, welcome, and clear.",
                    "Plan the first 90 days in three parts. Week one is welcome and setup: people, tools, and a clear first task. Month one is learning and small wins. Month three is a real check-in on fit and progress. Picture a new analyst joining a firm in Doha. On day one she has a buddy, a clear goal, and a lunch with the team. By month three she feels part of the place. That is onboarding that sticks."
                  ]
                }
              ],
              "takeaways": [
                "Define must-have outcomes before you write the job profile.",
                "Use structured interviews and the same questions for everyone.",
                "Evidence questions ask about real past behaviour.",
                "Onboarding is about belonging and clarity, not just equipment.",
                "Plan the first 90 days, because new hires decide early."
              ],
              "exercise": {
                "title": "Design a sticky start",
                "prompt": "Pick a role you hire for. Write the one outcome that role must achieve in a year. Then write one evidence question you would ask all candidates, and one thing you would do in week one to help the new hire feel welcome.",
                "placeholder": "Role and key outcome: ... Evidence question: ... Week one welcome action: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Two managers interview the same candidates but ask each person different casual questions. What is the main risk?",
                  "options": [
                    "Interviews will take too long",
                    "Bias creeps in and choices are hard to compare or defend",
                    "Candidates will feel too relaxed",
                    "There is no real risk if the managers are experienced"
                  ],
                  "answer": 1,
                  "explain": "Different questions for each person let bias in and make fair comparison impossible. Structured interviews fix this."
                },
                {
                  "q": "A new hire has a laptop and a desk on day one but no clear task and nobody to ask. What does good onboarding add?",
                  "options": [
                    "A longer probation period",
                    "A clear first goal, a buddy, and a planned first 90 days",
                    "More paperwork to sign",
                    "A pay rise to keep them happy"
                  ],
                  "answer": 1,
                  "explain": "Belonging and clarity keep new hires. A clear goal, a buddy, and a 90-day plan prevent early exits."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let us make your hiring stick. Tell me a role you are filling and we will sharpen the profile, the questions, and the first month.",
                "suggested": [
                  "How do I write an evidence question for a sales role?",
                  "What should week one of onboarding include?",
                  "How do I reduce bias when I interview alone?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-5",
              "title": "Developing and retaining talent",
              "mins": 22,
              "hook": "Your best people leave when they stop growing. This lesson helps you develop talent so they stay and improve.",
              "objectives": [
                "By the end you can use a simple model to plan how people learn.",
                "By the end you can spot why your best people might leave.",
                "By the end you can build a basic growth plan for one person."
              ],
              "sections": [
                {
                  "heading": "How people really grow",
                  "body": [
                    "Development does not mean only sending people to courses. Most growth happens at work, not in a classroom. A useful guide is the 70-20-10 model. About 70 percent of growth comes from real work and stretch tasks. About 20 percent comes from other people, like coaching and feedback. About 10 percent comes from formal courses.",
                    "This changes how you plan. Instead of only booking training, you give people harder projects, pair them with a mentor, and add a short course where needed. The mix is cheaper and works better than courses alone."
                  ]
                },
                {
                  "heading": "Why good people leave",
                  "body": [
                    "People rarely leave for one reason. But the most common cause is a feeling that they have no future where they are. Pay matters, but lack of growth, a poor manager, and no clear next step drive many exits.",
                    "A simple tool is the stay conversation. You do not wait for the exit interview, which is too late. You ask your good people now: what makes you stay, what might tempt you to leave, and what do you want to learn next? You act on the answers. This is far cheaper than replacing them."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Omar is a strong engineer at a tech company in Riyadh. He is quiet and doing well, so his manager leaves him alone. That is the mistake. Omar feels stuck and starts looking elsewhere.",
                    "His manager runs a stay conversation just in time. Omar says he wants to lead a project and learn cloud skills. The manager gives him a real project to lead, which is the 70 percent, pairs him with a senior mentor for the 20 percent, and adds one short cloud course for the 10 percent. Omar stays, grows, and becomes a future team lead. Small effort, big result."
                  ]
                }
              ],
              "takeaways": [
                "Use 70-20-10: most growth comes from real work, not courses.",
                "People often leave because they see no future, not only for pay.",
                "Run stay conversations before it is too late.",
                "Ask what people want to learn next, then act on it.",
                "Keeping a strong person is cheaper than replacing them."
              ],
              "exercise": {
                "title": "Plan one person's growth",
                "prompt": "Choose one strong person on your team. Using 70-20-10, write one stretch task (the 70), one person who could coach them (the 20), and one short course or resource (the 10). Add one question you would ask in a stay conversation.",
                "placeholder": "Person: ... Stretch task: ... Coach: ... Course: ... Stay question: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A manager wants to develop a team member and books a two-day course. What does the 70-20-10 model suggest is missing?",
                  "options": [
                    "Nothing, the course is enough on its own",
                    "Real stretch work and coaching, which drive most growth",
                    "A longer course of at least one week",
                    "A pay rise to match the new skills"
                  ],
                  "answer": 1,
                  "explain": "Courses are only about 10 percent of growth. Most learning comes from real work and from coaching by others."
                },
                {
                  "q": "Why is a stay conversation better than relying on the exit interview?",
                  "options": [
                    "It is shorter and easier to schedule",
                    "It happens while you can still act and keep the person",
                    "It avoids talking about pay",
                    "It is only for poor performers"
                  ],
                  "answer": 1,
                  "explain": "The exit interview happens after the person has already decided to leave. A stay conversation lets you act in time."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Keeping your best people is mostly about growth. Tell me about someone strong on your team and we will build them a simple plan.",
                "suggested": [
                  "What questions work best in a stay conversation?",
                  "How do I develop someone with a tight budget?",
                  "How do I spot early that someone might leave?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-6",
              "title": "Offboarding with dignity",
              "mins": 22,
              "hook": "How you say goodbye is watched by everyone who stays. This lesson helps you handle exits with care and fairness.",
              "objectives": [
                "By the end you can run a respectful exit process for anyone who leaves.",
                "By the end you can use the exit interview to gather useful, honest feedback.",
                "By the end you can protect the company and the person leaving during a difficult exit."
              ],
              "sections": [
                {
                  "heading": "Why endings matter",
                  "body": [
                    "Offboarding is the process of someone leaving the company. People often rush it or do it coldly. That is a costly mistake. The people who stay watch how you treat those who go. A harsh exit tells everyone that loyalty means little here.",
                    "There are different kinds of exit. A person who resigns, a person whose contract ends, and a person who is let go. Each needs care, but each is handled a little differently. The shared rule is simple: treat the person with dignity, even when the news is hard."
                  ]
                },
                {
                  "heading": "The exit interview, used well",
                  "body": [
                    "When someone resigns, the exit interview is a rare chance for honest feedback. The person is leaving, so they often tell the truth. But many exit interviews are wasted. They are rushed, or the person fears that honesty will hurt their reference.",
                    "Do three things. Hold it shortly before the last day, not on it. Ask open questions: what made you start looking, and what would have made you stay? Then look for patterns across many exits, not just one story. If five people in one team all mention the same manager, that is data you must act on."
                  ]
                },
                {
                  "heading": "Handling a difficult exit",
                  "body": [
                    "Sometimes you must let someone go for poor performance or because the role is no longer needed. This is the hardest exit. You must handle it with kindness and also follow the law carefully. Plan the conversation. Be clear, be kind, and be brief. Do not give false hope or start a long debate.",
                    "Picture a company in Sharjah that must remove a role to cut costs. The manager meets the person privately, explains the reason honestly, and confirms the notice period, final pay, and end-of-service benefits the UAE law requires. HR has the paperwork ready and offers support, such as a reference and time to find a new role. The person leaves with their dignity, and the team sees that the company acts fairly even in hard moments."
                  ]
                }
              ],
              "takeaways": [
                "How you handle exits is seen by everyone who stays.",
                "Resignation, contract end, and dismissal each need care.",
                "Use exit interviews to find patterns, not just single stories.",
                "In a difficult exit, be clear, kind, and brief.",
                "Follow local law on notice, final pay, and end-of-service benefits."
              ],
              "exercise": {
                "title": "Plan a respectful exit",
                "prompt": "Think of an exit you may face soon, or one you handled before. Write two open exit-interview questions you would ask. Then list two things you would do to make sure the person leaves with dignity.",
                "placeholder": "Exit-interview questions: ... and ... Dignity actions: ... and ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Three people leave the same team in two months. In each exit interview they mention the same manager. What should HR do?",
                  "options": [
                    "Treat each exit as a personal choice and move on",
                    "Look at the pattern and act on the manager issue",
                    "Stop doing exit interviews to save time",
                    "Tell the people leaving that they are wrong about the manager"
                  ],
                  "answer": 1,
                  "explain": "A repeated theme across exits is real data. The value of exit interviews comes from spotting and acting on patterns."
                },
                {
                  "q": "What is the best way to run a difficult dismissal conversation?",
                  "options": [
                    "Make it long so the person feels heard for an hour",
                    "Be clear, kind, and brief, and follow the legal requirements",
                    "Avoid giving the real reason to prevent upset",
                    "Send the news by email to avoid a hard meeting"
                  ],
                  "answer": 1,
                  "explain": "Clear, kind, and brief protects the person's dignity. Following notice and end-of-service rules protects everyone legally."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Endings are where your culture shows. Tell me about an exit you are planning, and we will make it fair and clear.",
                "suggested": [
                  "How do I prepare to tell someone their role is ending?",
                  "What are the main UAE end-of-service rules?",
                  "How do I get honest answers in an exit interview?"
                ]
              }
            }
          ]
        },
        {
          "title": "Performance & Rewards",
          "lessons": [
            {
              "lessonId": "hr-foundations-7",
              "title": "Performance systems that motivate",
              "mins": 20,
              "hook": "The yearly review most people dread does not improve performance. This lesson shows a better way that actually motivates.",
              "objectives": [
                "By the end you can explain why the old yearly review often fails.",
                "By the end you can set clear goals using a simple goal method.",
                "By the end you can run regular check-ins that lift performance."
              ],
              "sections": [
                {
                  "heading": "Why the yearly review fails",
                  "body": [
                    "Many companies still rate people once a year in a long, formal review. People dread it, managers delay it, and it rarely changes behaviour. By the time feedback arrives, the work is months old and forgotten.",
                    "A performance system is the way you set goals, give feedback, and review work. The modern view is simple: feedback should be frequent, not once a year. Small, regular conversations beat one big judgement. They keep people on track while there is still time to improve."
                  ]
                },
                {
                  "heading": "Set goals people understand",
                  "body": [
                    "Performance starts with clear goals. A vague goal like improve customer service helps nobody. A good goal method is SMART: Specific, Measurable, Achievable, Relevant, and Time-bound.",
                    "Compare two goals. Weak: improve service. SMART: raise our customer satisfaction score from 80 to 88 by the end of the year. The second goal is clear. The person knows exactly what success looks like and when. Clear goals are motivating because progress is visible."
                  ]
                },
                {
                  "heading": "Run check-ins, not just reviews",
                  "body": [
                    "The engine of good performance is the regular check-in. A short monthly or quarterly chat between manager and team member. You review progress on goals, remove blockers, and give honest feedback while it still matters.",
                    "Picture a sales team in Kuwait. Instead of one yearly review, each rep has a 30-minute check-in every month. They look at the numbers, talk about one win and one problem, and agree the next step. A rep who is slipping gets help in month two, not bad news in month twelve. Performance rises because problems are caught early."
                  ]
                }
              ],
              "takeaways": [
                "Once-a-year reviews give feedback too late to help.",
                "A performance system covers goals, feedback, and review.",
                "Use SMART goals so success is clear and visible.",
                "Regular check-ins beat one big yearly judgement.",
                "Catch problems early, while there is still time to fix them."
              ],
              "exercise": {
                "title": "Rewrite a goal and plan a check-in",
                "prompt": "Take one fuzzy goal from your team and rewrite it as a SMART goal. Then describe how often you would hold a check-in for it, and the two questions you would ask each time.",
                "placeholder": "Fuzzy goal: ... SMART goal: ... Check-in rhythm: ... My two questions: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A manager gives a struggling employee detailed feedback once, at the yearly review in December. What is the core problem?",
                  "options": [
                    "The feedback was too kind",
                    "The feedback came too late to help the person improve in time",
                    "The manager should never give feedback in December",
                    "Yearly reviews are always illegal"
                  ],
                  "answer": 1,
                  "explain": "Yearly-only feedback arrives after months of off-track work. Regular check-ins let people correct course in time."
                },
                {
                  "q": "Which goal is properly SMART?",
                  "options": [
                    "Be better at handling customers",
                    "Work harder on sales this year",
                    "Increase repeat orders from 100 to 130 per month by June",
                    "Improve teamwork as much as possible"
                  ],
                  "answer": 2,
                  "explain": "It is specific, measurable, and time-bound. The others are vague, so success cannot be seen or tracked."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Let us build a performance system people do not dread. Share a goal or a review problem from your team and we will fix it.",
                "suggested": [
                  "How often should check-ins happen?",
                  "How do I give hard feedback without crushing someone?",
                  "Can you make this goal SMART for me?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-8",
              "title": "Total rewards beyond salary",
              "mins": 20,
              "hook": "If you only compete on salary, you will always lose to a richer company. This lesson shows the full reward picture.",
              "objectives": [
                "By the end you can name the parts of a total rewards package.",
                "By the end you can explain why pay alone does not keep people.",
                "By the end you can design a reward mix that fits your budget."
              ],
              "sections": [
                {
                  "heading": "Reward is more than the salary number",
                  "body": [
                    "When people think about pay, they think about the monthly salary. But salary is only one part of what an employee receives. The full picture is called total rewards. It is everything of value a person gets for working at your company.",
                    "Total rewards has two sides. Financial rewards are things like salary, bonus, allowances, and end-of-service benefits. Non-financial rewards are things like flexible hours, learning, good managers, recognition, and career growth. Both sides matter, and the second side is often cheaper and stronger than people expect."
                  ]
                },
                {
                  "heading": "Why salary alone does not hold people",
                  "body": [
                    "Salary attracts people to join, but it rarely keeps them. Research on motivation, such as the work of Frederick Herzberg, shows a useful idea. Pay is mostly what we call a hygiene factor. This means pay is like clean water: if it is unfair, people are unhappy, but making it higher and higher does not create lasting motivation.",
                    "Real motivation comes from the work itself: growth, respect, achievement, and purpose. This is good news for smaller companies. You may not be able to pay the highest salary, but you can win on growth, flexibility, and a manager who cares. Those are rewards a rich competitor often forgets."
                  ]
                },
                {
                  "heading": "Design a smart reward mix",
                  "body": [
                    "A reward mix is how you split your budget across the parts of total rewards. The skill is to give people what they value most, not just more cash.",
                    "Picture a startup in Dubai that cannot match the big banks on salary. Instead it offers a fair base pay, plus four things the banks are slow to give: remote Fridays, a real learning budget, clear promotion steps, and public recognition for good work. Many strong people choose the startup. They traded a slightly higher salary for growth and freedom. That is total rewards working in your favour."
                  ]
                }
              ],
              "takeaways": [
                "Total rewards is everything of value an employee receives.",
                "It has financial and non-financial sides.",
                "Pay is a hygiene factor: it stops unhappiness but does not motivate people for long.",
                "Growth, respect, and purpose drive real motivation.",
                "A smart reward mix gives people what they value most, not just cash."
              ],
              "exercise": {
                "title": "Map your total rewards",
                "prompt": "List the financial rewards your company offers, then the non-financial ones. Which non-financial reward could you strengthen cheaply to keep people? Write one idea you could try this quarter.",
                "placeholder": "Financial: ... Non-financial: ... One cheap reward to strengthen: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A company keeps raising salaries but people still leave. Based on Herzberg's idea, what is the likely cause?",
                  "options": [
                    "Salaries are still not high enough",
                    "Pay removes unhappiness but does not create motivation; growth and respect are missing",
                    "The company should stop paying bonuses",
                    "People always leave no matter what you do"
                  ],
                  "answer": 1,
                  "explain": "Pay is a hygiene factor. Once pay is fair, more money does not motivate. People need growth, respect, and purpose."
                },
                {
                  "q": "A small firm cannot match big-company salaries. What is the smartest reward strategy?",
                  "options": [
                    "Borrow money to match every salary offer",
                    "Compete on non-financial rewards like growth, flexibility, and recognition",
                    "Stop hiring until salaries can match",
                    "Tell candidates that pay does not matter"
                  ],
                  "answer": 1,
                  "explain": "Small firms can win on rewards big firms are slow to give: growth, flexibility, and recognition, all within budget."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Reward is much bigger than salary. Tell me your budget worries and we will build a reward mix that keeps people without spending too much.",
                "suggested": [
                  "What non-financial rewards work best in the Gulf?",
                  "How do I explain total rewards to staff?",
                  "How much should bonus be versus base pay?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-9",
              "title": "Difficult conversations, handled",
              "mins": 18,
              "hook": "Avoiding a hard conversation never makes the problem smaller. This lesson gives you a calm, fair way to handle it.",
              "objectives": [
                "By the end you can prepare for a difficult conversation in a clear structure.",
                "By the end you can give feedback that is honest without being harsh.",
                "By the end you can stay calm when the other person reacts strongly."
              ],
              "sections": [
                {
                  "heading": "Why we avoid them, and why that fails",
                  "body": [
                    "A difficult conversation is any talk we fear because it may upset someone. A pay refusal, a performance problem, a complaint between two staff. Most people delay them, hoping the issue will fade. It rarely does. It usually grows.",
                    "Avoiding the talk feels kind, but it is not. The problem continues, the team notices, and trust drops. Handling it well is a core HR skill. The goal is not to win. The goal is to be honest and fair, and to keep the relationship where you can."
                  ]
                },
                {
                  "heading": "Use a clear structure",
                  "body": [
                    "A helpful method is SBI: Situation, Behaviour, Impact. You describe the exact situation, the specific behaviour you saw, and the impact it had. You stick to facts, not labels.",
                    "Compare two openings. Harsh and vague: you are lazy and unprofessional. SBI: in yesterday's client meeting (situation), you arrived twenty minutes late and did not share the report (behaviour), so the client questioned whether we were ready (impact). The second is honest but fair. It talks about actions, not character, so the person can actually fix it."
                  ]
                },
                {
                  "heading": "Stay calm when emotions rise",
                  "body": [
                    "Even with good words, people may get upset, angry, or quiet. Your job is to stay steady. Pause, let them speak, and listen without arguing. You do not have to solve everything in one minute.",
                    "Picture an HR officer in Jeddah telling a team leader his reports are often late. He gets defensive and raises his voice. She does not raise hers back. She says calmly: I can see this is frustrating. Let us look at what is getting in the way. The tension goes down, and they move from blame to a plan. Calm is a skill, and it is yours to choose."
                  ]
                }
              ],
              "takeaways": [
                "Avoiding hard talks lets problems grow and trust fall.",
                "Use SBI: Situation, Behaviour, Impact.",
                "Talk about actions and facts, not character.",
                "Stay calm and listen when emotions rise.",
                "The goal is honesty and fairness, not winning."
              ],
              "exercise": {
                "title": "Script a hard conversation",
                "prompt": "Think of a difficult conversation you need to have. Write your opening using SBI: the situation, the specific behaviour, and the impact. Then write one calm line you would use if the person reacts strongly.",
                "placeholder": "Situation: ... Behaviour: ... Impact: ... Calm line if they react: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to operating sheet",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Which feedback follows the SBI method best?",
                  "options": [
                    "You are careless and never focus",
                    "In Monday's report (situation) three figures were wrong (behaviour), so the client lost trust in our numbers (impact)",
                    "Everyone thinks your work has gone downhill lately",
                    "You need to seriously improve your whole attitude"
                  ],
                  "answer": 1,
                  "explain": "SBI names the situation, the specific behaviour, and the impact, using facts. The others attack character or stay vague."
                },
                {
                  "q": "During a hard conversation the employee becomes angry and raises their voice. What is the best response?",
                  "options": [
                    "Raise your voice too so you are not ignored",
                    "Stay calm, listen, and acknowledge the feeling before moving to a plan",
                    "End the meeting at once and walk out",
                    "Tell them they are being unprofessional"
                  ],
                  "answer": 1,
                  "explain": "Matching anger makes it worse. Staying calm and acknowledging the feeling lowers the heat and reopens problem solving."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hard conversations get easier with a plan. Tell me the one you are dreading and we will script it together using SBI.",
                "suggested": [
                  "How do I start a conversation about poor performance?",
                  "What if the person cries or shuts down?",
                  "How do I keep my own emotions in check?"
                ]
              }
            }
          ]
        },
        {
          "title": "Culture & Compliance",
          "lessons": [
            {
              "lessonId": "hr-foundations-10",
              "title": "Building culture on purpose",
              "mins": 18,
              "hook": "Every company has a culture, even if nobody chose it. This lesson helps you shape it on purpose instead of by accident.",
              "objectives": [
                "By the end you can explain what culture really is in plain words.",
                "By the end you can spot the gap between stated values and real behaviour.",
                "By the end you can use simple levers to shape culture on purpose."
              ],
              "sections": [
                {
                  "heading": "What culture actually is",
                  "body": [
                    "People make culture sound mysterious. It is simpler than that. Culture is how things really work around here. It is the normal behaviour, the unwritten rules, and what gets rewarded or ignored every day.",
                    "A short and honest definition is this: culture is the worst behaviour the leaders are willing to accept. If managers say honesty matters but stay silent when a top seller lies, the real value is results at any cost. People watch what you allow, not what you print on a poster."
                  ]
                },
                {
                  "heading": "The gap between words and actions",
                  "body": [
                    "Most companies have nice values posted on a wall: respect, teamwork, integrity. The problem is the gap between those words and daily life. Culture lives in actions, not posters. A values poster with no matching behaviour makes people cynical.",
                    "To find the gap, compare a stated value with a real moment. Say a value is we put people first. Then ask: what happened the last time someone needed urgent leave for a sick parent? The answer tells you the true culture. Close the gap by changing the behaviour, not the poster."
                  ]
                },
                {
                  "heading": "Levers you can pull",
                  "body": [
                    "You cannot order people to have a culture, but you can shape it through a few strong levers. Who you promote sends the loudest message. What you reward, what you measure, and what leaders do daily all teach people what really matters.",
                    "Picture a company in Abu Dhabi that says it values teamwork but keeps promoting the loudest individual stars. Staff learn that teamwork is just talk. The leaders change one lever: they start promoting people who lift the whole team and they praise team wins in meetings. Within a year, behaviour shifts. Culture changed because the rewards changed, not because of a new slogan."
                  ]
                }
              ],
              "takeaways": [
                "Culture is how things really work, not what the poster says.",
                "It is the worst behaviour leaders are willing to accept.",
                "Look for the gap between stated values and daily actions.",
                "Who you promote is the loudest culture signal.",
                "Shape culture by changing rewards and behaviour, not slogans."
              ],
              "exercise": {
                "title": "Find your culture gap",
                "prompt": "Pick one value your company states. Write one recent real moment that shows whether the value is true in practice. If there is a gap, name one lever (promotion, reward, or leader behaviour) you would change to close it.",
                "placeholder": "Stated value: ... Real moment: ... Gap and the lever I would change: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A company's posters say it values collaboration, but it only ever promotes solo stars. What does this teach staff?",
                  "options": [
                    "That collaboration is the true path to promotion",
                    "That the real value is individual results, whatever the posters say",
                    "That posters are the strongest culture tool",
                    "That promotions have nothing to do with culture"
                  ],
                  "answer": 1,
                  "explain": "People learn from what is rewarded. Promoting solo stars teaches that individual results matter more than collaboration."
                },
                {
                  "q": "Which action most reliably shapes culture?",
                  "options": [
                    "Printing larger and brighter values posters",
                    "Changing who gets promoted and rewarded",
                    "Sending a company-wide email about values",
                    "Adding the values to the website footer"
                  ],
                  "answer": 1,
                  "explain": "Promotions and rewards are powerful signals. They show people what truly matters far more than words do."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Culture is built by what you allow and reward. Tell me about your company's values and we will check if daily life matches them.",
                "suggested": [
                  "How do I change a culture that is already negative?",
                  "What are the strongest culture levers?",
                  "How do I measure culture without a huge survey?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-11",
              "title": "The compliance floor you can't skip",
              "mins": 17,
              "hook": "Good intentions do not protect you in a labour dispute. Clear records and fair process do. This lesson covers the basics you must get right.",
              "objectives": [
                "By the end you can explain why compliance is the floor, not the ceiling.",
                "By the end you can name the core areas HR must keep legal.",
                "By the end you can build a simple habit that lowers legal risk."
              ],
              "sections": [
                {
                  "heading": "Compliance is the floor, not the goal",
                  "body": [
                    "Compliance means following the law and your own rules. It covers contracts, working hours, pay, leave, safety, and fair treatment. Some people find it boring, so they skip it until something goes wrong.",
                    "Think of compliance as the floor of a building. It is not the goal of HR, but if the floor breaks, everything above it falls. A single unfair dismissal or unpaid benefit can cost money, time, and trust. You do not need to be a lawyer, but you must know the basics and when to ask for legal help."
                  ]
                },
                {
                  "heading": "The core areas to get right",
                  "body": [
                    "A few areas cause most legal trouble, so guard them well. First, contracts and terms must be clear, written, and signed. Second, pay and working hours must follow the law, including overtime and rest days. Third, end-of-service benefits and final pay must be correct when people leave.",
                    "Fourth, treat people fairly and equally, with no discrimination. Fifth, keep health and safety basics in place. In the Gulf, also stay current with local labour laws and rules like the UAE Labour Law or Saudi GOSI and wage protection systems. Rules change, so check sources, do not rely on old memory."
                  ]
                },
                {
                  "heading": "The habit that protects you",
                  "body": [
                    "The simplest way to lower legal risk is good records. If it is not written down, in the eyes of the law it may not have happened. Document warnings, agreements, decisions, and the reasons behind them.",
                    "Picture an HR officer in Riyadh handling a dismissal for poor performance. She has a file: clear goals that were set, written warnings, support that was offered, and dated notes of each meeting. When the employee disputes it, the company is protected because the process was fair and recorded. The HR officer with no records is the one who loses, even when she was right. Document as you go, not after a problem appears."
                  ]
                }
              ],
              "takeaways": [
                "Compliance is the floor that holds up everything else.",
                "Get contracts, pay, hours, benefits, and fair treatment right.",
                "Know local Gulf rules and check current sources.",
                "If it is not written down, it may not count legally.",
                "Document warnings, decisions, and reasons as you go."
              ],
              "exercise": {
                "title": "Check your compliance basics",
                "prompt": "List the five core areas from this lesson. For each, mark whether your team is solid, unsure, or weak. Pick the weakest one and write one action to fix it this month.",
                "placeholder": "Contracts: ... Pay/hours: ... Benefits: ... Fair treatment: ... Safety: ... Weakest area and my fix: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A manager fairly warned an employee several times but kept no written record. The employee disputes the later dismissal. What is the main risk?",
                  "options": [
                    "There is no risk because the manager acted fairly",
                    "Without records, the company struggles to prove a fair process",
                    "The employee will simply accept the decision",
                    "The manager can recall everything from memory in court"
                  ],
                  "answer": 1,
                  "explain": "Fair intent is not enough. Without written records, it is hard to prove the process, and the company is exposed."
                },
                {
                  "q": "Why should HR check current sources for labour law instead of relying on memory?",
                  "options": [
                    "Because laws never change, so checking is just a formality",
                    "Because rules and thresholds change, and old knowledge can be wrong",
                    "Because checking sources is required to look professional",
                    "Because memory is always perfectly reliable"
                  ],
                  "answer": 1,
                  "explain": "Labour rules in the Gulf and elsewhere change over time. Relying on old memory risks applying outdated, incorrect rules."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Compliance is your safety floor. Tell me which area worries you most and we will turn it into a simple, safe habit.",
                "suggested": [
                  "What records should I keep for a dismissal?",
                  "Which Gulf labour rules trip people up most?",
                  "When should I bring in a lawyer?"
                ]
              }
            },
            {
              "lessonId": "hr-foundations-12",
              "title": "Measuring what matters",
              "mins": 17,
              "hook": "If you cannot measure your HR work, you cannot prove its value or improve it. This lesson shows which numbers matter and how to use them.",
              "objectives": [
                "By the end you can choose a few HR metrics that link to business goals.",
                "By the end you can tell a vanity metric from a useful one.",
                "By the end you can present HR numbers in a way leaders act on."
              ],
              "sections": [
                {
                  "heading": "Measure to improve, not to look busy",
                  "body": [
                    "HR collects a lot of numbers. How many people were hired, how many courses were run, how many surveys were sent. Many of these are vanity metrics. They look active but do not tell you if anything got better.",
                    "A useful metric links to a business result. The test is simple: if this number changes, does a leader care, and would we act differently? Number of courses run is vanity. Whether those courses cut errors or lifted sales is value. Always choose the metric that drives a decision."
                  ]
                },
                {
                  "heading": "A small set of metrics that matter",
                  "body": [
                    "You do not need fifty numbers. You need a few that connect to goals. Common strong ones are: turnover rate, especially of your best people; time to fill key roles; and employee engagement or satisfaction.",
                    "Add cost-based ones leaders feel, like cost per hire and the cost of turnover. A simple framework is leading versus lagging indicators. A lagging indicator shows what already happened, like turnover last year. A leading indicator warns early, like a drop in engagement scores that often comes before people quit. Watch both, but act on the leading ones."
                  ]
                },
                {
                  "heading": "Present numbers leaders act on",
                  "body": [
                    "A number alone changes nothing. You must turn it into a story with a clear next step. Show the metric, the trend, the likely cause, and your recommended action.",
                    "Picture an HR lead at a hospital in Dubai. Instead of a long report, she shows one chart: nurse turnover rose from 12 to 19 percent in a year, mostly in the night shift, costing about 2 million dirhams. Her recommendation is a night-shift allowance and a new buddy system. Leaders approve it because the number, the cause, and the fix are all on one page. That is measurement that leads to action."
                  ]
                }
              ],
              "takeaways": [
                "Vanity metrics look busy; value metrics drive decisions.",
                "Test each metric: would a leader act differently if it changed?",
                "Track a few that matter: turnover, time to fill, engagement, cost.",
                "Use leading indicators to act before problems grow.",
                "Present metric, trend, cause, and recommended action together."
              ],
              "exercise": {
                "title": "Pick your three metrics",
                "prompt": "Choose three HR metrics that link to your company's goals. For each, note whether it is leading or lagging, and what action you would take if it moved the wrong way. Drop any metric you cannot act on.",
                "placeholder": "Metric 1 (leading/lagging) and action: ... Metric 2 ...: ... Metric 3 ...: ...",
                "interaction": {
                  "mechanic": "Operating Map",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the operating move that would make the HR decision clearer.",
                  "actionLabel": "Check the operating move",
                  "artifactLabel": "Add to operating sheet",
                  "choices": [
                    "People process",
                    "Business link",
                    "Risk check",
                    "Manager action"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which of these is a vanity metric?",
                  "options": [
                    "Turnover rate of top performers",
                    "Number of training sessions delivered, with no link to any result",
                    "Time to fill critical roles",
                    "Cost of replacing employees who leave"
                  ],
                  "answer": 1,
                  "explain": "Counting sessions shows activity but not impact. The others link to a business result and can guide decisions."
                },
                {
                  "q": "Why is a leading indicator like falling engagement useful?",
                  "options": [
                    "It confirms what already happened last year",
                    "It warns you early, so you can act before people quit",
                    "It is the only number leaders ever care about",
                    "It replaces the need for any lagging indicators"
                  ],
                  "answer": 1,
                  "explain": "Leading indicators give early warning. Acting on a drop in engagement can prevent the turnover that follows."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Numbers give HR its credibility. Tell me your company's main goal and we will pick a few metrics that prove your impact.",
                "suggested": [
                  "How do I calculate the cost of turnover?",
                  "Which metrics matter most for a small team?",
                  "How do I present HR data to a skeptical CFO?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Operating Map",
        "short": "Map the HR decision before applying the rule.",
        "artifact": "HR operating sheet",
        "interaction": "map, choose, check, apply",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "speaking": {
      "courseId": "speaking",
      "title": "Public Speaking & Executive Presence",
      "modules": [
        {
          "title": "The Inner Game",
          "lessons": [
            {
              "lessonId": "speaking-1",
              "title": "Where stage fright actually comes from",
              "mins": 14,
              "hook": "Your fear of speaking is not a flaw in you. It is an old survival system doing its job at the wrong time. Once you see how it works, you can stop fighting it.",
              "objectives": [
                "By the end you can name the real cause of your stage fright.",
                "By the end you can spot the three thoughts that make fear grow.",
                "By the end you can use one quick reframe before you speak."
              ],
              "sections": [
                {
                  "heading": "It is your body, not your character",
                  "body": [
                    "Many people think fear of speaking means they are weak or not ready. This is not true. When you stand in front of a group, your brain reads many eyes on you as a threat. Long ago, being watched by a group could mean danger. Your body still reacts the same way today.",
                    "So your heart beats faster. Your hands get cold. Your mouth goes dry. This is the fight-or-flight response. It is your body getting ready to act. The problem is simple. Your body is ready to run from a lion, but all you need to do is talk. The energy has nowhere to go, so it feels like panic."
                  ]
                },
                {
                  "heading": "The three thoughts that make it worse",
                  "body": [
                    "Fear gets bigger when we add certain thoughts. The first is catastrophe: 'I will forget everything and look stupid.' The second is mind-reading: 'They think I am boring.' The third is perfection: 'I must not make one mistake.' These three thoughts take a small fear and make it much bigger.",
                    "Here is a simple way to remember them. I call it the CMP check: Catastrophe, Mind-reading, Perfection. Before a talk, ask yourself: which of these three am I doing right now? Just naming the thought makes it weaker. You move from feeling the fear to looking at it."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Layla is a finance manager in Riyadh. She must present quarterly numbers to her board. The night before, she cannot sleep. Her thought: 'If I freeze, they will think I am not fit for this role.' That is catastrophe plus mind-reading together.",
                    "Layla runs the CMP check. She writes the thought down. Then she writes a calmer, true version: 'If I pause, I can look at my notes. The board wants the numbers, not a perfect show.' Her heart still beats fast on the day. But now that fast heart feels like readiness, not danger. She gets through it, and the next time is easier."
                  ]
                }
              ],
              "takeaways": [
                "Stage fright is a body response, not a sign of weakness.",
                "Fight-or-flight gives you energy with nowhere to go.",
                "Three thoughts make fear grow: catastrophe, mind-reading, perfection.",
                "Run the CMP check and name the thought to shrink it.",
                "The goal is not zero fear. The goal is fear you can use."
              ],
              "exercise": {
                "title": "Name your fear thought",
                "prompt": "Think about the last time you felt nervous before speaking. Write down the exact thought in your head. Then label it: was it catastrophe, mind-reading, or perfection? Now write one calmer, true version of that thought.",
                "placeholder": "My fear thought was... This is mostly [catastrophe / mind-reading / perfection]... A calmer, true version is...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "You feel your heart racing right before a presentation. What is the most useful way to read this?",
                  "options": [
                    "It means I am not ready and should cancel.",
                    "It is my body giving me energy I can use to perform.",
                    "It proves I am bad at public speaking.",
                    "It means the audience can tell I am scared."
                  ],
                  "answer": 1,
                  "explain": "A racing heart is the fight-or-flight response giving you energy. The skill is to read that energy as readiness, not danger. It does not mean you are unready or that others can see it."
                },
                {
                  "q": "A colleague says, 'They will all judge me if I stumble.' Which fear thought is this?",
                  "options": [
                    "Perfection only",
                    "Catastrophe only",
                    "Mind-reading, plus a bit of catastrophe",
                    "None of these"
                  ],
                  "answer": 2,
                  "explain": "Guessing that others will judge you is mind-reading. Adding 'if I stumble' as a disaster is catastrophe. Naming both helps you challenge them."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hi, I am here with you for this lesson on where stage fright comes from. We just covered the body's fight-or-flight response and the CMP check: catastrophe, mind-reading, perfection. Tell me what makes you most nervous, or pick a question below.",
                "suggested": [
                  "Why does my mind go blank when I start?",
                  "How do I run the CMP check in the moment?",
                  "Is some fear actually good for me?"
                ]
              }
            },
            {
              "lessonId": "speaking-2",
              "title": "The pre-talk ritual",
              "mins": 15,
              "hook": "Calm before a talk is not luck. It is a routine you build and repeat. A good ritual settles your body and mind in the same way every time.",
              "objectives": [
                "By the end you can build a simple pre-talk ritual you can repeat.",
                "By the end you can use a breathing pattern that slows your heart.",
                "By the end you can prepare your first 30 seconds so you never freeze at the start."
              ],
              "sections": [
                {
                  "heading": "Why a ritual works",
                  "body": [
                    "A ritual is a fixed set of steps you do the same way each time. Athletes use them. So do actors and pilots. The steps are simple, but doing them in order tells your brain: 'I have done this before. I know what comes next.' This sense of control lowers fear.",
                    "Without a ritual, you wait around and let nerves build. Your mind drifts to worst cases. A ritual gives those last minutes a job. You are not waiting to be scared. You are working through your steps."
                  ]
                },
                {
                  "heading": "The 4-7-8 breath",
                  "body": [
                    "The fastest way to calm your body is your breath. When you slow your breathing out, your heart rate drops. A simple pattern is the 4-7-8 breath. Breathe in through your nose for 4 counts. Hold for 7 counts. Breathe out slowly through your mouth for 8 counts.",
                    "Do this three or four times. The long out-breath is the key part. It switches on the calming side of your nervous system. Do it in the bathroom, in your car, or quietly in your seat before you stand up. No one needs to see it."
                  ]
                },
                {
                  "heading": "A worked ritual you can copy",
                  "body": [
                    "Here is a five-step ritual I teach. I call it the SETUP ritual. Step one, Settle: do three rounds of 4-7-8 breathing. Step two, Earth: stand with feet flat and feel the floor for ten seconds. Step three, Talk small: chat with one friendly person so your voice is already warm. Step four, Use your line: say your first sentence silently in your head. Step five, Purpose: remind yourself of one thing you want the audience to gain.",
                    "Take Omar, a project lead in Dubai who hated the moment before town-hall meetings. He built the SETUP ritual into the ten minutes before he spoke. Same five steps, every time. After a month, he said the walk to the front no longer felt like a cliff edge. It felt like a routine. The fear did not vanish, but it stopped running the show."
                  ]
                }
              ],
              "takeaways": [
                "A ritual gives your nervous last minutes a clear job.",
                "The 4-7-8 breath slows your heart through a long out-breath.",
                "Feeling your feet on the floor brings you back to the present.",
                "Warm your voice by talking to one person first.",
                "Plan your first sentence so the start is never a blank."
              ],
              "exercise": {
                "title": "Design your SETUP ritual",
                "prompt": "Write your own five-step pre-talk ritual using SETUP: Settle, Earth, Talk small, Use your line, Purpose. Make each step specific to you. For 'Use your line', write the exact first sentence you will say in your next talk.",
                "placeholder": "Settle: ... Earth: ... Talk small: ... Use your line (my first sentence): ... Purpose: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "In the 4-7-8 breath, which part does the most to calm you down?",
                  "options": [
                    "The 4-count in-breath",
                    "The 7-count hold",
                    "The 8-count slow out-breath",
                    "Holding your breath as long as possible"
                  ],
                  "answer": 2,
                  "explain": "The long, slow out-breath switches on the calming side of your nervous system and lowers your heart rate. The in-breath and hold set it up, but the out-breath does the work."
                },
                {
                  "q": "Why is planning your first sentence part of a strong ritual?",
                  "options": [
                    "It impresses the audience with big words.",
                    "It removes the riskiest moment, the blank start, so you begin with certainty.",
                    "It lets you skip the rest of your preparation.",
                    "It guarantees you will not feel any nerves."
                  ],
                  "answer": 1,
                  "explain": "The start is where freezing is most likely. A prepared first line gives you a sure footing, so momentum carries you into the rest. It does not remove nerves entirely, and it is no substitute for full preparation."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome back. This lesson is about building a pre-talk ritual you can repeat every time. We covered the 4-7-8 breath and the five-step SETUP ritual. Want help shaping yours, or a question below?",
                "suggested": [
                  "How early before a talk should I start my ritual?",
                  "What if I cannot find a quiet place to breathe?",
                  "Can I use this ritual for video calls too?"
                ]
              }
            },
            {
              "lessonId": "speaking-3",
              "title": "From nerves to energy",
              "mins": 15,
              "hook": "You cannot switch off nerves. But you can change what they turn into. The same energy that feels like fear can become focus and drive.",
              "objectives": [
                "By the end you can turn nervous energy into useful energy on purpose.",
                "By the end you can use the 'reappraisal' method to calm yourself fast.",
                "By the end you can move your body to burn off excess tension before you speak."
              ],
              "sections": [
                {
                  "heading": "Excitement and fear feel the same",
                  "body": [
                    "Fear and excitement are very close in the body. Both speed up your heart. Both make you alert. The difference is mostly the story you tell about the feeling. This is good news. It means you do not have to calm down to a flat state. You only have to point the same energy in a better direction.",
                    "Trying to 'just relax' often fails. Telling yourself to calm down when your heart is racing is a big jump. It rarely works. A smaller, easier jump is from fear to excitement, because the body is already in that state."
                  ]
                },
                {
                  "heading": "The 'I am excited' reappraisal",
                  "body": [
                    "Reappraisal means choosing a new label for a feeling. Research by Professor Alison Wood Brooks found that people who said out loud 'I am excited' before a stressful task did better than those who tried to calm down. The energy was the same. The label changed how they used it.",
                    "So before you speak, say to yourself, quietly but with meaning, 'I am excited.' Then add why: 'I am excited to share this. I am excited that they will learn something useful.' You are not lying to yourself. You are giving the energy a job instead of a warning."
                  ]
                },
                {
                  "heading": "Move the energy out of your body",
                  "body": [
                    "Nervous energy is physical. If you sit still and stiff, it stays trapped and builds. So move it. Before you go on, find a private spot. Shake out your hands. Roll your shoulders. Take a short, brisk walk. Even a few jumps help. This burns off the extra stress chemicals.",
                    "Picture Fatima, a young engineer in Abu Dhabi giving her first conference talk. Backstage she felt frozen. Her coach told her to walk fast up and down the corridor for two minutes and whisper 'I am excited to show this.' By the time she reached the stage, the trapped feeling had turned into forward drive. She spoke with energy instead of stiffness."
                  ]
                }
              ],
              "takeaways": [
                "Fear and excitement share the same body signals.",
                "Going from fear to excitement is easier than forcing calm.",
                "Say 'I am excited' and name a real reason why.",
                "Move your body to burn off trapped stress energy.",
                "Aim to use the energy, not erase it."
              ],
              "exercise": {
                "title": "Write your excitement script",
                "prompt": "For your next talk, write three short 'I am excited' lines. Each one should name a real reason: something you will share, something the audience will gain, or a moment you look forward to. Keep them simple and true.",
                "placeholder": "I am excited to... I am excited that the audience will... I am excited for the part where...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to talk kit",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Why is it easier to shift from fear to excitement than from fear to calm?",
                  "options": [
                    "Because excitement is a weaker feeling than calm.",
                    "Because fear and excitement already share the same high-energy body state.",
                    "Because calm is not a real emotion.",
                    "Because excitement removes all the nerves instantly."
                  ],
                  "answer": 1,
                  "explain": "Fear and excitement both run on a fast, alert, high-energy body state, so the jump between them is small. Jumping to flat calm is a much bigger change and usually fails under pressure."
                },
                {
                  "q": "A speaker says 'I am excited' but feels nothing change. What is the most likely fix?",
                  "options": [
                    "Stop using the method, it does not work.",
                    "Say it louder so the audience hears.",
                    "Add a real, specific reason why they are excited.",
                    "Repeat the word twenty times fast."
                  ],
                  "answer": 2,
                  "explain": "The label works better when it is tied to a true reason, such as what you will share or what the audience gains. A specific 'why' gives the energy a clear direction."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to see you. This lesson is about turning nerves into useful energy. We covered the 'I am excited' reappraisal and moving your body to release tension. What part would you like to work on?",
                "suggested": [
                  "Does saying 'I am excited' really work?",
                  "What if I feel too tired, not too nervous?",
                  "How do I do this when I am sitting at a table?"
                ]
              }
            }
          ]
        },
        {
          "title": "Building the Talk",
          "lessons": [
            {
              "lessonId": "speaking-4",
              "title": "The message map",
              "mins": 20,
              "hook": "Most talks fail before the speaker opens their mouth, because there was no clear plan. A message map keeps both you and your audience on the same path.",
              "objectives": [
                "By the end you can build a message map with one core message and three points.",
                "By the end you can cut a talk down to what truly matters.",
                "By the end you can keep an audience following you from start to finish."
              ],
              "sections": [
                {
                  "heading": "One core message, not ten",
                  "body": [
                    "The most common speaking mistake is trying to say too much. The speaker knows a lot, so they share all of it. The audience cannot hold all of it, so they remember none of it. A strong talk has one core message. That is the single sentence you want people to repeat to a colleague the next day.",
                    "Before you build slides or notes, write that one sentence. For example: 'Our new safety process cuts site accidents by half, and it is simple to follow.' If you cannot say it in one clear line, you are not ready to build the talk. The core message is your anchor."
                  ]
                },
                {
                  "heading": "The Rule of Three",
                  "body": [
                    "Under your core message, choose three supporting points. Why three? People remember things in threes well. Two feels thin. Five feels like a list no one can hold. Three is the sweet spot. Each point should clearly support the core message, not wander off.",
                    "Here is the structure I teach, called the Message Map. At the top, your one core message. Below it, three points. Under each point, one piece of proof: a story, a number, or an example. That is it. A whole talk on a single page. This map is your skeleton. Everything else is muscle on these bones."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Khalid runs operations for a logistics firm in Jeddah. He must convince leadership to fund a new tracking system. His first draft had fifteen slides full of features. The audience would have drowned.",
                    "We built a message map instead. Core message: 'This tracking system pays for itself in one year by cutting lost shipments.' Point one: it reduces lost parcels, with a number from a pilot test. Point two: it saves staff time, with a short story from a warehouse lead. Point three: it improves customer trust, with two real customer quotes. Three points, three proofs, one clear message. The leadership team approved it. The map made the case easy to follow and hard to argue with."
                  ]
                }
              ],
              "takeaways": [
                "Pick one core message you want people to repeat.",
                "If you cannot say it in one line, you are not ready.",
                "Support it with exactly three points.",
                "Give each point one proof: a story, a number, or an example.",
                "Fit the whole map on one page before you build anything."
              ],
              "exercise": {
                "title": "Build your message map",
                "prompt": "Choose a talk you need to give soon. Write your one core message in a single sentence. Then list three supporting points. Under each point, write one proof: a story, a number, or an example.",
                "placeholder": "Core message: ... Point 1: ... (proof: ...) Point 2: ... (proof: ...) Point 3: ... (proof: ...)",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "You have prepared eight key points for a 15-minute talk. What does the message map suggest?",
                  "options": [
                    "Keep all eight; more points means more value.",
                    "Cut down to one core message and three supporting points.",
                    "Pick two points and skip any proof.",
                    "Turn each point into its own slide and read them fast."
                  ],
                  "answer": 1,
                  "explain": "Audiences cannot hold eight points. The message map asks for one core message and three supporting points, each with proof. Cutting down is what makes a talk memorable, not adding more."
                },
                {
                  "q": "Why does each supporting point need a proof such as a story, number, or example?",
                  "options": [
                    "To make the talk longer.",
                    "Because proof makes a point believable and easy to remember.",
                    "Because the audience expects exactly one slide per point.",
                    "To show how much research you did."
                  ],
                  "answer": 1,
                  "explain": "A bare claim is easy to forget and easy to doubt. A story, number, or example makes the point land and stick. Proof turns a statement into something the audience can trust."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. This lesson is about the message map: one core message, three points, one proof each. Share the talk you are planning and I can help you find your core message, or pick a question below.",
                "suggested": [
                  "How do I choose my one core message?",
                  "What if I really have four important points?",
                  "What counts as good proof for a point?"
                ]
              }
            },
            {
              "lessonId": "speaking-5",
              "title": "Story as your delivery vehicle",
              "mins": 22,
              "hook": "Facts inform, but stories move people. A short, well-built story makes your point impossible to forget.",
              "objectives": [
                "By the end you can build a clear story using a simple four-part shape.",
                "By the end you can link a story directly to your core message.",
                "By the end you can keep a story short and on point."
              ],
              "sections": [
                {
                  "heading": "Why stories stick",
                  "body": [
                    "When you hear a list of facts, only the language part of your brain works. When you hear a story, much more of your brain lights up. You picture the scene. You feel the tension. This is why people forget your statistics but remember your story months later.",
                    "A story is not decoration. It is how you carry your message into someone's memory. The mistake is to tell a story for its own sake, with no link to the point. A good speaking story always lands on the message you want."
                  ]
                },
                {
                  "heading": "The four-part story shape",
                  "body": [
                    "You do not need to be a born storyteller. You need a shape. I teach a simple one called CTRL: Context, Trouble, Resolution, Lesson. Context: who and where, in one or two lines. Trouble: the problem or tension that makes us care. Resolution: what happened, the turning point. Lesson: the single point that links straight to your core message.",
                    "Keep it tight. A speaking story is usually 60 to 90 seconds, not five minutes. Cut every detail that does not serve the trouble or the lesson. The colour of someone's shirt does not matter unless it matters to the point."
                  ]
                },
                {
                  "heading": "A worked example",
                  "body": [
                    "Imagine you want to make this point: 'Listening to frontline staff prevents big mistakes.' Here is a CTRL story. Context: 'Last year, a junior nurse at our clinic noticed a labelling error on a medicine box.' Trouble: 'She was unsure. New staff were told not to question the system, and she nearly stayed quiet.' Resolution: 'She spoke up anyway. The pharmacy checked, and the wrong dose was caught before it reached a patient.' Lesson: 'The person closest to the work often sees the danger first. That is why we must make it safe to speak up.'",
                    "Notice how short it is. Four parts, under 90 seconds. The lesson points straight at the core message. The audience will remember the nurse long after they forget any policy slide. That is the power of story as your delivery vehicle."
                  ]
                }
              ],
              "takeaways": [
                "Stories activate more of the brain than facts alone.",
                "Use the CTRL shape: Context, Trouble, Resolution, Lesson.",
                "The trouble is what makes people care, so do not skip it.",
                "End on a lesson that links straight to your core message.",
                "Keep it to 60 to 90 seconds and cut every spare detail."
              ],
              "exercise": {
                "title": "Build a CTRL story",
                "prompt": "Take one point from your message map. Build a short story for it using CTRL. Write one or two lines for each part: Context, Trouble, Resolution, Lesson. Make sure the Lesson links to your core message.",
                "placeholder": "Context: ... Trouble: ... Resolution: ... Lesson (links to my message): ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A speaker tells a long, funny story that the audience enjoys, but it does not connect to the talk's point. What is the main problem?",
                  "options": [
                    "The story was too short.",
                    "A story with no link to the message wastes time and confuses the point.",
                    "Funny stories are never allowed in talks.",
                    "The speaker should have added more detail."
                  ],
                  "answer": 1,
                  "explain": "A speaking story must serve the message. If it does not link to the point, even an enjoyable story pulls the audience away from what you want them to remember."
                },
                {
                  "q": "In the CTRL shape, which part makes the audience care about what happens?",
                  "options": [
                    "Context",
                    "Trouble",
                    "Resolution",
                    "Lesson"
                  ],
                  "answer": 1,
                  "explain": "The Trouble is the tension or problem. Without it, there is nothing at stake and the audience has no reason to lean in. Context sets the scene, but Trouble creates the pull."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello again. This lesson is about using stories to carry your message, with the CTRL shape: Context, Trouble, Resolution, Lesson. Tell me the point you want to make and I can help you build a story for it.",
                "suggested": [
                  "What if I do not have a dramatic story?",
                  "How do I keep a story short enough?",
                  "Can I use a story about myself?"
                ]
              }
            },
            {
              "lessonId": "speaking-6",
              "title": "Openings and closings that land",
              "mins": 18,
              "hook": "The first 30 seconds decide if people listen. The last 30 seconds decide what they remember. Both are too important to leave to chance.",
              "objectives": [
                "By the end you can open a talk in a way that grabs attention fast.",
                "By the end you can avoid the weak openings that lose a room.",
                "By the end you can close with a clear call that people act on."
              ],
              "sections": [
                {
                  "heading": "Never open with an apology",
                  "body": [
                    "The most common weak opening is the apology or the warm-up filler. 'Sorry, I am a bit nervous.' 'I did not have much time to prepare.' 'Can everyone hear me?' These lines tell the audience to expect less. You lose them before you start.",
                    "Also avoid the slow start: 'Today I am going to talk about...'. It is not wrong, but it is flat. The first 30 seconds are your best chance to make people pay attention. Do not spend them on small details or apologies. Spend them on a hook."
                  ]
                },
                {
                  "heading": "Four strong openings",
                  "body": [
                    "There are four reliable hooks. First, a surprising fact or number: 'Forty percent of the food we buy in this city is thrown away.' Second, a short story dropped straight in: 'Last Tuesday, a customer waited two hours for an answer that took us ten seconds to give.' Third, a sharp question: 'What would you do with one extra hour every day?' Fourth, a bold statement: 'The way we run our meetings is costing us a fortune.'",
                    "Pick one and make it tight. The job of the opening is not to cover everything. Its job is to earn the next two minutes of attention. Once you have that, you lead into your core message."
                  ]
                },
                {
                  "heading": "Close with a clear ask",
                  "body": [
                    "A weak closing fades out: 'So, yeah, that is it. Any questions?' A strong closing does two things. It returns to the core message, and it gives one clear next step. This is the bookend method: your closing echoes your opening, so the talk feels whole.",
                    "Take Noura, who pitched a wellbeing programme to her HR leadership in Dubai. She opened with a number: 'One in four of our staff felt burned out last quarter.' She closed by returning to it: 'We can move that one in four. I am asking for approval to run the pilot in two departments next month.' Clear message, clear ask, same thread from start to finish. The room knew exactly what to do next."
                  ]
                }
              ],
              "takeaways": [
                "Never open with an apology or a sound check.",
                "Use one of four hooks: surprising fact, story, question, or bold statement.",
                "The opening's only job is to earn the next two minutes.",
                "Close by returning to your core message.",
                "End with one clear next step, not a fade-out."
              ],
              "exercise": {
                "title": "Write your open and close",
                "prompt": "For your next talk, write one strong opening using a fact, story, question, or bold statement. Then write a closing that returns to that same idea and ends with one clear ask. Make the open and close echo each other.",
                "placeholder": "Opening hook: ... Closing (returns to the hook) + clear ask: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to talk kit",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "A speaker starts with 'Sorry, I'm not great at this and I didn't have much time.' What is the effect?",
                  "options": [
                    "It makes the audience trust them more.",
                    "It lowers the audience's expectations and loses attention early.",
                    "It is the safest way to begin.",
                    "It has no effect on how the talk is received."
                  ],
                  "answer": 1,
                  "explain": "An apology at the start tells the audience to expect a poor talk. It wastes the most valuable 30 seconds. A hook earns attention instead of giving it away."
                },
                {
                  "q": "What makes the 'bookend' closing method effective?",
                  "options": [
                    "It introduces a brand new topic at the end.",
                    "It returns to the opening idea, so the talk feels complete, and adds a clear next step.",
                    "It lists every point again in full detail.",
                    "It ends quickly with 'any questions?'"
                  ],
                  "answer": 1,
                  "explain": "Bookending links the close back to the open, giving the talk a satisfying whole. Pairing it with one clear ask tells the audience exactly what to do, which a fade-out never does."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to have you here. This lesson is about openings and closings: avoid the apology, use a strong hook, and bookend your close with a clear ask. Share your topic and I can help you craft both ends.",
                "suggested": [
                  "Which opening hook fits a serious board update?",
                  "How do I close when there is no clear 'ask'?",
                  "Is it okay to open with a question?"
                ]
              }
            }
          ]
        },
        {
          "title": "Delivery",
          "lessons": [
            {
              "lessonId": "speaking-7",
              "title": "Voice: pace, pitch, and the pause",
              "mins": 18,
              "hook": "Your voice is an instrument you already own. Small changes in pace and pause can make a plain message sound confident and clear.",
              "objectives": [
                "By the end you can slow your pace so people can follow you.",
                "By the end you can use the pause as a tool, not a gap to fear.",
                "By the end you can vary your voice so you do not sound flat."
              ],
              "sections": [
                {
                  "heading": "Slow down to sound sure",
                  "body": [
                    "When we are nervous, we speak fast. Fast speech is hard to follow and sounds anxious. The fix is simple but feels strange at first: slow down. A slower pace gives the audience time to take in your words. It also makes you sound calm and in control, even when you are not.",
                    "A good guide is to speak a little slower than feels natural. What feels too slow to you usually sounds just right to the audience. Aim for clear, not fast. If people often ask you to repeat yourself, pace is likely the cause."
                  ]
                },
                {
                  "heading": "The power of the pause",
                  "body": [
                    "New speakers fear silence. They fill every gap with 'um' and 'ah'. But the pause is one of your strongest tools. A short pause after a key point lets it sink in. A pause before a key point builds attention. Silence makes the room lean in.",
                    "Try this rule, which I call Pause-Point-Pause. Pause to gather the room. Make your point. Pause again to let it land. Two or three seconds of silence feels long to you but powerful to them. It also gives you time to breathe and think. The pause replaces the filler words."
                  ]
                },
                {
                  "heading": "Vary your voice and a worked example",
                  "body": [
                    "A flat voice sends people to sleep, even with good content. Vary three things: pace (speed up for energy, slow down for weight), pitch (let your voice rise and fall), and volume (drop it low to draw people in, lift it to mark a big point). You do not need to act. Small, natural changes are enough.",
                    "Take Yousef, a team lead in Sharjah who got feedback that his updates were 'hard to follow and a bit dull'. He changed two things. He slowed his pace by about a quarter. And he added a clear pause after each main point. He did not change a single word of his content. His next update got praise for being 'much clearer and more confident'. The voice carried the same message far better."
                  ]
                }
              ],
              "takeaways": [
                "Nerves make you fast, so slow down on purpose.",
                "What feels too slow to you sounds clear to the audience.",
                "Use Pause-Point-Pause to make key points land.",
                "Silence is stronger than 'um' and 'ah'.",
                "Vary pace, pitch, and volume so you never sound flat."
              ],
              "exercise": {
                "title": "Record and listen",
                "prompt": "Record yourself saying one minute of your talk on your phone. Listen back. Note one place to slow down, one place to add a pause, and one place to change your pitch or volume. Then record it again with those changes.",
                "placeholder": "Where I will slow down: ... Where I will add a pause: ... Where I will change pitch or volume: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A speaker is told their talks are 'hard to follow'. They speak quickly and rarely pause. What is the best first change?",
                  "options": [
                    "Add more slides to explain each point.",
                    "Slow the pace and add pauses after key points.",
                    "Use bigger, more advanced words.",
                    "Speak even faster to fit everything in."
                  ],
                  "answer": 1,
                  "explain": "Fast speech with no pauses is the most common reason a talk is hard to follow. Slowing down and adding pauses gives the audience time to absorb each point, with no change to the content needed."
                },
                {
                  "q": "Why is a pause better than saying 'um' before a key point?",
                  "options": [
                    "A pause builds attention and makes you sound in control; 'um' sounds unsure.",
                    "There is no real difference between them.",
                    "'Um' is always more professional.",
                    "A pause is only useful at the very end of a talk."
                  ],
                  "answer": 0,
                  "explain": "Silence before a point draws the room in and signals control. Filler words like 'um' do the opposite, making you sound hesitant. The pause also gives you time to breathe and think."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. This lesson is about your voice: pace, pitch, and the pause, with the Pause-Point-Pause rule. Tell me what feedback you have had on your speaking voice and I can suggest where to focus.",
                "suggested": [
                  "How slow is too slow?",
                  "How do I stop saying 'um' so much?",
                  "What if my voice is naturally quiet?"
                ]
              }
            },
            {
              "lessonId": "speaking-8",
              "title": "Body language and the room",
              "mins": 18,
              "hook": "Before you say a word, your body has already spoken. How you stand, move, and look at people shapes whether they trust you.",
              "objectives": [
                "By the end you can stand and move in a way that signals calm authority.",
                "By the end you can use eye contact to connect with a real audience.",
                "By the end you can use your hands on purpose instead of hiding them."
              ],
              "sections": [
                {
                  "heading": "Your base: stand still and grounded",
                  "body": [
                    "Nervous speakers move too much. They rock side to side, shift their weight, or pace without reason. This movement leaks anxiety to the room. Your base should be still and grounded. Stand with feet about shoulder-width apart, weight even, shoulders relaxed and back.",
                    "From this stable base, you can move with purpose. Step toward the audience for an important point. Move to a new spot when you change topic. Purposeful movement looks confident. Random movement looks nervous. The rule: be still by default, move on purpose."
                  ]
                },
                {
                  "heading": "Eye contact that connects",
                  "body": [
                    "Looking over people's heads or staring at your slides breaks the connection. Real eye contact builds trust. But do not sweep your eyes around the room fast. That looks anxious. Instead, hold one person for one full thought, then move to another person for the next thought.",
                    "I call this one-thought-one-person. Land on a face, share a complete idea with them, then move on. In a big room, you cannot reach everyone, so pick a few friendly faces in different areas. Each person you look at feels spoken to. The whole room feels included."
                  ]
                },
                {
                  "heading": "Open hands and a worked example",
                  "body": [
                    "Hidden hands worry people. Hands in pockets, behind your back, or gripped tight all signal unease. Keep your hands open and visible, around waist height, ready to gesture. Natural gestures that match your words make you look honest and clear. You do not need to plan every move. Just free your hands and let them help.",
                    "Take Mariam, a department head in Doha who clutched the lectern with both hands during talks. Her coach asked her to step to the side of the lectern and let her hands rest open in front of her. At first it felt exposed. But her audience said she suddenly seemed 'warmer and more sure of herself'. She had not changed her words. She had simply stopped hiding. Her open base and free hands did the work."
                  ]
                }
              ],
              "takeaways": [
                "Be still by default; move only on purpose.",
                "A grounded stance signals calm authority.",
                "Use one-thought-one-person for real eye contact.",
                "In a big room, pick a few friendly faces in different areas.",
                "Keep hands open and visible, never hidden."
              ],
              "exercise": {
                "title": "Audit your body language",
                "prompt": "Record one minute of yourself speaking on video, or ask a colleague to watch you. Note three things: do you rock or stay still, where do your eyes go, and what do your hands do? Write one fix for each.",
                "placeholder": "My stance: ... (fix: ...) My eye contact: ... (fix: ...) My hands: ... (fix: ...)",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A speaker keeps shifting their weight from foot to foot during a talk. What does this most likely signal to the audience?",
                  "options": [
                    "Calm and confidence",
                    "Nervousness and unease",
                    "Deep expertise",
                    "Nothing at all"
                  ],
                  "answer": 1,
                  "explain": "Constant, unplanned movement leaks anxiety to the room. A still, grounded base signals calm authority. The aim is to be still by default and move only with purpose."
                },
                {
                  "q": "What is the best way to use eye contact in a large room?",
                  "options": [
                    "Stare at one person for the whole talk.",
                    "Sweep your eyes quickly across everyone.",
                    "Hold one friendly face for a full thought, then move to another.",
                    "Look just above people's heads to avoid pressure."
                  ],
                  "answer": 2,
                  "explain": "One-thought-one-person makes each person feel spoken to and looks calm. Fast sweeping looks anxious, and avoiding eyes breaks trust. In a big room, choose a few faces in different areas."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello. This lesson is about body language: a grounded stance, one-thought-one-person eye contact, and open hands. Tell me what you tend to do with your body when nervous and I can suggest a fix.",
                "suggested": [
                  "What do I do with my hands when not gesturing?",
                  "How do I make eye contact without feeling awkward?",
                  "Should I move around or stay in one place?"
                ]
              }
            },
            {
              "lessonId": "speaking-9",
              "title": "Slides that help instead of hurt",
              "mins": 18,
              "hook": "Bad slides compete with you for attention and you lose. Good slides do the opposite: they make you look clearer and more in control.",
              "objectives": [
                "By the end you can build slides that support you instead of replacing you.",
                "By the end you can cut text so the audience listens to you, not reads ahead.",
                "By the end you can use one strong image or number per slide."
              ],
              "sections": [
                {
                  "heading": "The slide is not your script",
                  "body": [
                    "The biggest slide mistake is putting your whole talk on the screen, then reading it out. When you do this, two bad things happen. The audience reads faster than you speak, so they get bored and ahead of you. And you become the person who reads slides, not the expert who leads the room.",
                    "Your slides are not your notes. They are a visual aid for the audience. If a slide can be read and understood without you in the room, you have written a document, not a slide. The talk lives in you. The slide only supports it."
                  ]
                },
                {
                  "heading": "One idea per slide",
                  "body": [
                    "Follow one simple rule: one idea per slide. Not one section. Not five bullet points. One idea. This keeps the audience focused on the single thing you are saying right now. When you move to the next idea, you move to the next slide.",
                    "Cut the text hard. A slide should have a few words, not full sentences. A useful guide is the six-word headline: can you state the slide's idea in about six words at the top? Then support it with one image, one chart, or one big number. The audience should glance at the slide, get it in two seconds, and return their eyes to you."
                  ]
                },
                {
                  "heading": "Show, do not list: a worked example",
                  "body": [
                    "One strong image beats a wall of words. A single clear number beats a busy table. If you want to show growth, one rising line is better than a grid of figures. If you want to show a problem, one honest photo beats three bullet points describing it.",
                    "Take Hassan, a sales lead in Kuwait who presented results with slides full of dense tables. Nobody followed them. We rebuilt the deck. Each slide became one headline and one big number or one simple chart. The slide that said 'Revenue up 32% this year' with a single rising line landed instantly. His leadership finally understood the story. Same data, far fewer words, much more impact. The slides started helping him instead of hurting him."
                  ]
                }
              ],
              "takeaways": [
                "Slides support you; they are not your script.",
                "If a slide works without you, it is a document, not a slide.",
                "Use one idea per slide and move slides as you move ideas.",
                "Aim for a six-word headline plus one image, chart, or number.",
                "One strong image or number beats a busy table."
              ],
              "exercise": {
                "title": "Rebuild one slide",
                "prompt": "Take one busy slide from a past talk. Rewrite it to follow one idea per slide. Give it a headline of about six words. Choose one image, one chart, or one number to support it. Describe the new, simpler slide.",
                "placeholder": "Old slide had: ... New headline (about six words): ... One supporting visual: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A speaker puts full sentences on every slide and reads them aloud. Why does this hurt the talk?",
                  "options": [
                    "The audience reads ahead and tunes out, and the speaker becomes a slide-reader.",
                    "Full sentences are always more professional.",
                    "It makes the talk too short.",
                    "It has no real effect on the audience."
                  ],
                  "answer": 0,
                  "explain": "People read faster than you speak, so they race ahead and lose interest. Reading slides also removes your role as the expert leading the room. Slides should support you, not replace you."
                },
                {
                  "q": "Which slide best follows the 'one idea per slide' rule?",
                  "options": [
                    "A slide with five bullet points covering the whole section.",
                    "A dense table with twenty numbers.",
                    "A short headline plus one rising chart showing a single trend.",
                    "A paragraph of text the speaker reads word for word."
                  ],
                  "answer": 2,
                  "explain": "One headline and one clear visual carries a single idea the audience grasps in seconds. Bullet lists, dense tables, and paragraphs all break the one-idea rule and pull attention away from you."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to see you. This lesson is about slides that help instead of hurt: one idea per slide, a short headline, and one visual. Describe a slide you are unsure about and I can help you simplify it.",
                "suggested": [
                  "How do I show lots of data without a busy table?",
                  "What if my boss wants detailed slides?",
                  "Do I still need notes if my slides are simple?"
                ]
              }
            }
          ]
        },
        {
          "title": "High-Stakes Speaking",
          "lessons": [
            {
              "lessonId": "speaking-10",
              "title": "Q&A and the hostile question",
              "mins": 16,
              "hook": "The questions after your talk can shake you more than the talk itself. With a simple method, you can stay calm even when a question feels like an attack.",
              "objectives": [
                "By the end you can answer hard questions with a clear, calm method.",
                "By the end you can handle a hostile question without getting defensive.",
                "By the end you can say 'I don't know' in a way that builds trust."
              ],
              "sections": [
                {
                  "heading": "Pause before you answer",
                  "body": [
                    "The most common Q&A mistake is answering too fast. A sharp question raises your heart rate, and you rush to defend yourself. Instead, pause. Take one breath. This short gap does two things. It calms you, and it shows the room you are thoughtful, not rattled.",
                    "It also helps to repeat or rephrase the question first. This buys you a few seconds to think. It makes sure everyone heard the question. And it lets you frame it fairly before you answer. 'So the question is, how do we fund this in year one?' Now you are ready to respond, not react."
                  ]
                },
                {
                  "heading": "The ACE method for hard questions",
                  "body": [
                    "For tough or hostile questions, use a simple method I call ACE: Acknowledge, Clarify, Engage. Acknowledge the concern so the person feels heard: 'That is a fair worry.' Clarify what they really mean if needed: 'Are you asking about cost or about timing?' Engage with a calm, honest answer to the real issue.",
                    "The key is to separate the person from the question. A hostile tone is often just stress or strong feeling. If you stay calm and answer the real concern, you often win over not just that person but the whole room, who are watching how you handle pressure. Never match their heat. Your calm is your power."
                  ]
                },
                {
                  "heading": "When you don't know, and a worked example",
                  "body": [
                    "Pretending to know an answer is dangerous. People sense it, and one bluff can sink your whole credibility. It is far stronger to say: 'I do not have that number with me. I will find out and send it to you by tomorrow.' This shows honesty and gives a clear next step.",
                    "Take Sara, presenting a new policy to managers in Riyadh. One manager asked sharply, 'Did you even consult the field teams, or was this decided in an office?' Her instinct was to defend. Instead she used ACE. Acknowledge: 'That is exactly the right question to ask.' Clarify: she checked he meant the frontline staff. Engage: 'We consulted two regions but not all. You are right that we should widen that, and here is how I will do it.' She stayed calm, the room relaxed, and the hostile manager became an ally."
                  ]
                }
              ],
              "takeaways": [
                "Pause and breathe before answering any hard question.",
                "Repeat or rephrase the question to buy thinking time.",
                "Use ACE: Acknowledge, Clarify, Engage.",
                "Never match a hostile tone; your calm is your power.",
                "Say 'I will find out and follow up' instead of bluffing."
              ],
              "exercise": {
                "title": "Prepare for the hard question",
                "prompt": "Think of the hardest or most hostile question you might get after your next talk. Write it down. Then draft an answer using ACE: one line to Acknowledge, one to Clarify if needed, and a calm, honest Engage.",
                "placeholder": "The hard question: ... Acknowledge: ... Clarify: ... Engage: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to talk kit",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "An audience member asks an aggressive, challenging question. What is the strongest first move?",
                  "options": [
                    "Answer fast and firmly to show you are not weak.",
                    "Pause, breathe, and rephrase the question before answering.",
                    "Match their tone so they know you are serious.",
                    "Skip the question and move on."
                  ],
                  "answer": 1,
                  "explain": "Pausing calms you and signals control. Rephrasing buys thinking time and frames the question fairly. Rushing or matching their heat usually makes things worse, and skipping looks evasive."
                },
                {
                  "q": "You are asked for a figure you do not have. What is the best response?",
                  "options": [
                    "Guess a number that sounds about right.",
                    "Say you cannot discuss it.",
                    "Admit you do not have it and promise a clear follow-up.",
                    "Change the subject quickly."
                  ],
                  "answer": 2,
                  "explain": "Bluffing risks your whole credibility if you are caught. Honestly saying you will find out and follow up builds trust and gives a clear next step. People respect honesty over a fake answer."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. This lesson is about Q&A and the hostile question, using the ACE method: Acknowledge, Clarify, Engage. Tell me the kind of tough question you fear most and we can prepare a calm answer.",
                "suggested": [
                  "How do I stay calm when a question feels personal?",
                  "What if someone keeps interrupting me?",
                  "How do I handle a question I truly cannot answer?"
                ]
              }
            },
            {
              "lessonId": "speaking-11",
              "title": "Panels, boards, and keynotes",
              "mins": 16,
              "hook": "Each high-stakes setting has its own rules. What works on a keynote stage can fail in a boardroom. Knowing the format is most of the work.",
              "objectives": [
                "By the end you can adjust your style to panels, boards, and keynotes.",
                "By the end you can make a strong point in a short panel slot.",
                "By the end you can speak to senior leaders with confidence and brevity."
              ],
              "sections": [
                {
                  "heading": "Panels: be short and be remembered",
                  "body": [
                    "On a panel, you share the stage. Your time is short and broken up. The mistake is to give a long, full answer like a mini-speech. People tune out. The skill is to make one sharp point and stop. Say your point, give one quick reason or example, then hand back.",
                    "A simple tool is the headline-first answer. Lead with your conclusion in one line, then support it briefly. 'My answer is yes, and here is the one reason why.' This makes you clear and quotable. On a panel, the person who says less but lands cleaner is the one people remember."
                  ]
                },
                {
                  "heading": "Boards: lead with the answer",
                  "body": [
                    "A boardroom is not a stage. Senior leaders are busy and want clarity, not a build-up. The worst thing you can do is save your main point for the end. They may interrupt before you reach it. Instead, use the BLUF method: Bottom Line Up Front. Start with your conclusion and your ask. Then give the support only if they want it.",
                    "For example: 'I recommend we approve the new system. It pays for itself in one year and reduces risk. I am happy to walk through the detail.' Now the board has the decision in front of them. They can ask for the parts they care about. You respect their time, and you look like a leader who thinks clearly."
                  ]
                },
                {
                  "heading": "Keynotes: one big idea and a worked example",
                  "body": [
                    "A keynote is the opposite of a board update. Here you have time and a stage. The audience wants to feel something, not just learn facts. A keynote needs one big idea, strong stories, and emotion. Slow down. Use the stage. Let moments breathe.",
                    "Take Ahmed, who in one week had a board meeting and a conference keynote. For the board, he used BLUF: 'We should enter the Saudi market now. Here are the three numbers.' Five minutes, decision made. For the keynote, he opened with a story about his grandfather's small shop, built to one big idea about local trust, and closed with a call to the audience. Same speaker, two very different styles, both right for the room. Reading the format was his real skill."
                  ]
                }
              ],
              "takeaways": [
                "Match your style to the format, not the other way around.",
                "On a panel, make one sharp point and hand back.",
                "Use headline-first answers to be clear and quotable.",
                "In a boardroom, use BLUF: bottom line and your ask first.",
                "A keynote needs one big idea, stories, and emotion."
              ],
              "exercise": {
                "title": "Adapt one message to three rooms",
                "prompt": "Take one recommendation you need to make. Write how you would say it in three settings: a 60-second panel answer (headline first), a boardroom (BLUF, decision first), and a keynote (one big idea with feeling).",
                "placeholder": "Panel (headline first): ... Board (BLUF): ... Keynote (big idea + emotion): ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "You are presenting a recommendation to a busy board. How should you structure it?",
                  "options": [
                    "Build up slowly and reveal your recommendation at the very end.",
                    "Lead with your bottom line and ask, then offer detail if wanted.",
                    "Tell a long emotional story first.",
                    "Give every supporting number before stating your view."
                  ],
                  "answer": 1,
                  "explain": "Boards want clarity fast. BLUF puts the decision and ask up front, so they can engage with what matters to them. Saving your point for the end risks being interrupted before you get there."
                },
                {
                  "q": "On a panel with limited time, what is the most effective approach?",
                  "options": [
                    "Give a full, detailed answer like a short speech.",
                    "Make one sharp point with a quick reason, then hand back.",
                    "Repeat what other panelists said.",
                    "Wait until the end to say anything important."
                  ],
                  "answer": 1,
                  "explain": "Panel time is short and shared. A single clear point, stated headline-first, is what people remember. Long answers lose the room, and the strongest panelists say less but land cleaner."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello again. This lesson is about adjusting your style across panels, boards, and keynotes, using tools like headline-first and BLUF. Tell me which setting you have coming up and we can shape your approach.",
                "suggested": [
                  "How long should a panel answer be?",
                  "What is BLUF and when do I use it?",
                  "How is a keynote different from a normal talk?"
                ]
              }
            },
            {
              "lessonId": "speaking-12",
              "title": "Your signature talk, delivered",
              "mins": 16,
              "hook": "Now you bring it all together. In this final lesson you design and deliver one talk that is truly yours, from first nerve to final word.",
              "objectives": [
                "By the end you can plan a full signature talk using everything you learned.",
                "By the end you can rehearse in a way that actually improves your delivery.",
                "By the end you can deliver one complete talk with presence."
              ],
              "sections": [
                {
                  "heading": "Bring the whole course together",
                  "body": [
                    "A signature talk is one talk you can give well, again and again, on a topic you own. To build it, walk back through this course. Use your pre-talk ritual for nerves. Build a message map: one core message, three points, one proof each. Add one CTRL story. Write a strong opening hook and a bookend close with a clear ask.",
                    "Then plan delivery. Mark where you will slow down and pause. Plan a grounded stance and open hands. Cut your slides to one idea each. Prepare for the hardest question with ACE. Every skill you learned has a place. The signature talk is where they all come together into one piece."
                  ]
                },
                {
                  "heading": "Rehearse the right way",
                  "body": [
                    "Reading your talk silently is not rehearsal. Real rehearsal means saying it out loud, standing up, as if the audience is there. Do it at least three times. The first time will be rough. The third time will flow. This is the rule of three rehearsals, and it is the single biggest thing most people skip.",
                    "Record at least one run and watch it back. It feels uncomfortable, but it is the fastest way to improve. Watch for pace, pauses, and your hands. Better still, deliver it to one trusted person and ask for one thing to keep and one thing to change. Rehearsal is where a good talk becomes a confident one."
                  ]
                },
                {
                  "heading": "Deliver, then reflect: a worked example",
                  "body": [
                    "On the day, trust your preparation. Run your ritual. Open with your hook. Follow your map. Tell your story. Use your pauses. Close with your ask. You will not be perfect, and that is fine. Presence does not mean perfect. It means present, calm, and clear.",
                    "Take Reem, an HR director in Dubai who had avoided the company all-hands for years. Across this course she built one signature talk on building a speak-up culture. She used the message map, one story about a junior colleague, and a clear ask. She rehearsed out loud four times and recorded one. On the day, her hands shook a little, but she ran her ritual, paused on her key points, and delivered. The feedback was the best of her career. After this lesson, write your own short reflection: what worked, and what is the one thing you will improve next time."
                  ]
                }
              ],
              "takeaways": [
                "A signature talk brings every course skill into one piece.",
                "Use the message map, one story, a hook, and a bookend close.",
                "Rehearse out loud, standing up, at least three times.",
                "Record one run and watch it back, however uncomfortable.",
                "Presence means present and clear, not perfect."
              ],
              "exercise": {
                "title": "Plan and reflect on your signature talk",
                "prompt": "Outline your signature talk on one page: core message, three points with proof, one story, opening hook, and closing ask. Note where you will pause. After you deliver or rehearse it, write what worked and one thing to improve next time.",
                "placeholder": "Core message: ... Three points + proof: ... Story: ... Hook: ... Closing ask: ... After delivery, what worked: ... One thing to improve: ...",
                "interaction": {
                  "mechanic": "Rehearsal Room",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the rehearsal move that changes the delivery, not the decoration.",
                  "actionLabel": "Rehearse this move",
                  "artifactLabel": "Add to talk kit",
                  "choices": [
                    "Open stronger",
                    "Cut the extra",
                    "Pause here",
                    "Handle the question"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which counts as real rehearsal for a signature talk?",
                  "options": [
                    "Reading the slides silently once the night before.",
                    "Saying it out loud, standing up, at least three times.",
                    "Just thinking through the main points in your head.",
                    "Writing the whole script and never speaking it."
                  ],
                  "answer": 1,
                  "explain": "Real rehearsal means speaking out loud and standing, close to real conditions, at least three times. Silent reading or thinking does not prepare your voice, pace, or body for the actual moment."
                },
                {
                  "q": "On delivery day, what is the most useful mindset?",
                  "options": [
                    "I must be perfect or the talk fails.",
                    "Trust my preparation and aim to be present, calm, and clear.",
                    "Improvise everything to seem natural.",
                    "Speak as fast as possible to get it over with."
                  ],
                  "answer": 1,
                  "explain": "Presence is about being present, calm, and clear, not flawless. Trusting your ritual and your map lets you deliver well even with some nerves. Chasing perfection adds pressure, and rushing undoes your work."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Here we are at the final lesson, where you bring it all together into your signature talk. We covered planning with the message map, rehearsing out loud three times, and delivering with presence. Tell me your topic and we can build it.",
                "suggested": [
                  "How do I choose my signature talk topic?",
                  "What should I look for when I watch my recording?",
                  "How do I calm last-minute nerves on the day?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Rehearsal Room",
        "short": "Practice the move before the real room.",
        "artifact": "signature talk kit",
        "interaction": "map, rehearse, compare, refine",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "confidence": {
      "courseId": "confidence",
      "title": "Confidence Reset",
      "modules": [
        {
          "title": "Understanding the Pattern",
          "lessons": [
            {
              "lessonId": "confidence-1",
              "title": "Why confidence collapses",
              "mins": 14,
              "hook": "You can be very good at your job and still freeze in the moment that matters. This lesson shows you why that happens, so you can stop blaming yourself for it.",
              "objectives": [
                "By the end you can name the three triggers that make your confidence drop",
                "By the end you can tell the difference between a real skill gap and a confidence gap",
                "By the end you can spot your own collapse moment before it controls you"
              ],
              "sections": [
                {
                  "heading": "Confidence is a state, not a trait",
                  "body": [
                    "Many people think confidence is something you either have or you do not. That is not true. Confidence is a state. It goes up and down depending on the situation, the people in the room, and how tired or safe you feel. The same person can feel strong in one meeting and small in the next.",
                    "This matters because a trait feels fixed. A state can be changed. When you see your low-confidence moments as states, you stop saying \"I am not a confident person\" and start asking \"what made my confidence drop right there?\" That question has answers. The first one does not.",
                    "Here is a simple way to hold this. Skill is what you can do. Confidence is whether you believe you can do it in this moment. A skilled engineer in Riyadh can give a perfect demo to her team and then go silent when a senior director walks in. Her skill did not change in those ten seconds. Her state did."
                  ]
                },
                {
                  "heading": "The three common triggers",
                  "body": [
                    "Confidence usually collapses for one of three reasons. I call this the \"Threat-Compare-Stakes\" check, because naming the trigger is the first step to managing it.",
                    "First, threat. Your brain reads a situation as risky, even a social one. A harsh tone, a powerful person, or a public setting can flip your body into a stress response. Your heart speeds up and clear thinking gets harder.",
                    "Second, compare. You measure yourself against someone else in the room and decide you fall short. The comparison is often unfair, because you compare your inside doubts to their calm outside.",
                    "Third, stakes. The more an outcome matters to you, the more pressure you feel. A pitch for a promotion feels heavier than a normal update, so your confidence shakes more.",
                    "Try it with a real example. Imagine you present a budget to leadership in Dubai. The room is full (threat), a sharp colleague is also presenting (compare), and your bonus depends on it (stakes). All three triggers fire at once. No wonder your voice shakes. The problem is not your ability. It is three triggers stacking up."
                  ]
                },
                {
                  "heading": "Skill gap or confidence gap?",
                  "body": [
                    "Before you fix anything, you must know what you are fixing. A skill gap means you truly do not yet know how to do the thing. A confidence gap means you can do it, but you do not believe you can in the moment.",
                    "The test is simple. Ask: \"Have I done this well before, in calmer conditions?\" If yes, it is a confidence gap, and this course is built for that. If no, you may need practice or training first, which is a different and honest answer.",
                    "Most high performers who feel self-doubt have a confidence gap, not a skill gap. Their track record is strong. Their belief just has not caught up with it yet."
                  ]
                }
              ],
              "takeaways": [
                "Confidence is a state you can change, not a fixed trait",
                "Skill is what you can do; confidence is whether you believe it right now",
                "Three triggers cause most collapses: threat, comparison, and high stakes",
                "Triggers often stack, so name each one separately",
                "If you have done it well before, it is a confidence gap, not a skill gap"
              ],
              "exercise": {
                "title": "Find your collapse moment",
                "prompt": "Think of one recent moment when your confidence dropped at work. Write what happened in two or three sentences. Then name which of the three triggers were present: threat, comparison, or high stakes. If more than one was present, list them all.",
                "placeholder": "The moment was... The triggers I notice are...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A skilled manager presents well to her team but goes quiet when the CEO joins. What is the most likely cause?",
                  "options": [
                    "She has a skill gap and needs more training",
                    "A threat trigger changed her state, not her skill",
                    "She is simply not a confident person",
                    "She did not prepare enough for the meeting"
                  ],
                  "answer": 1,
                  "explain": "Her skill did not change in seconds. The CEO joining acted as a threat trigger, which lowered her state. This is a confidence gap, not a skill gap."
                },
                {
                  "q": "Which question best tells you if you have a confidence gap rather than a skill gap?",
                  "options": [
                    "Do other people think I am good at this?",
                    "Is this task important to my career?",
                    "Have I done this well before in calmer conditions?",
                    "Do I feel nervous right now?"
                  ],
                  "answer": 2,
                  "explain": "If you have done it well before under calmer conditions, the ability is there. The issue is belief in the moment, which is a confidence gap."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome to your first lesson. I know the idea that confidence is a state, not a trait, and the three triggers we just covered: threat, comparison, and stakes. Tell me about a moment your confidence dropped, and we can find the trigger together.",
                "suggested": [
                  "How do I tell a skill gap from a confidence gap?",
                  "What if all three triggers happen at once?",
                  "Why do I freeze only around senior people?"
                ]
              }
            },
            {
              "lessonId": "confidence-2",
              "title": "The inner critic toolkit",
              "mins": 13,
              "hook": "There is a voice in your head that says you are not good enough. This lesson gives you a simple set of tools to answer it back.",
              "objectives": [
                "By the end you can catch your inner critic in the moment it speaks",
                "By the end you can use a three-step method to question its claims",
                "By the end you can replace harsh self-talk with fair, useful self-talk"
              ],
              "sections": [
                {
                  "heading": "What the inner critic really is",
                  "body": [
                    "The inner critic is the harsh voice that judges you. It says things like \"you will fail,\" \"they will see you are weak,\" or \"who do you think you are?\" Almost everyone has one. Very capable people often have a loud one.",
                    "Here is the key point. The inner critic is not telling the truth. It is trying to protect you from risk, but it does this in a rough and unhelpful way. Long ago, staying safe meant avoiding any chance of looking bad in front of the group. The critic still uses that old rule, even when the real risk today is small.",
                    "So the goal is not to delete the voice. You cannot. The goal is to hear it, question it, and decide for yourself. You move from obeying the critic to managing it."
                  ]
                },
                {
                  "heading": "The Catch-Check-Change method",
                  "body": [
                    "Use a simple three-step method called Catch-Check-Change. It turns a vague bad feeling into something you can work with.",
                    "Step one, Catch. Notice the exact thought in words. Not just \"I feel bad,\" but the real sentence: \"I am going to embarrass myself in this meeting.\" Writing it down makes it visible.",
                    "Step two, Check. Question the thought like a fair judge. Ask: \"Is this a fact or a fear? What is the proof for and against it? Would I say this to a colleague I respect?\" Most critic thoughts fail this test quickly.",
                    "Step three, Change. Replace the harsh thought with a fair and true one. Not fake praise, but a balanced line. Instead of \"I will embarrass myself,\" you write \"I am well prepared, and some nerves are normal. I can handle a tough question.\"",
                    "An example. A finance lead in Jeddah has to present to the board. Her critic says, \"They will think you are not ready for this level.\" She catches it, writes it down, and checks it. The proof against it is strong: she was chosen for this role, her numbers are solid, and she has presented before. She changes the thought to, \"I earned my seat here, and I know these numbers better than anyone in the room.\" Her hands still shake a little, but now she is in charge of her own mind."
                  ]
                },
                {
                  "heading": "Speak to yourself like a coach",
                  "body": [
                    "A useful test is the friend test. Ask: \"Would I speak to a good friend the way I am speaking to myself?\" Usually the answer is no. We are far harsher with ourselves than with others.",
                    "Aim for the voice of a good coach. A good coach is honest about mistakes but never cruel. A coach says, \"That part did not land, here is what to fix,\" not \"You always ruin everything.\"",
                    "This is not about lying to yourself or pretending you are perfect. It is about being fair. Fair self-talk keeps you steady and able to think. Cruel self-talk shuts your thinking down right when you need it most."
                  ]
                }
              ],
              "takeaways": [
                "The inner critic protects you in a rough, unhelpful way; it is not telling the truth",
                "You cannot delete the critic, but you can manage it",
                "Use Catch-Check-Change: name the thought, question it, replace it",
                "Replace harsh thoughts with fair and true ones, not fake praise",
                "Speak to yourself like a good coach: honest but never cruel"
              ],
              "exercise": {
                "title": "Run one thought through the method",
                "prompt": "Catch one inner-critic thought you had this week and write it word for word. Then check it: what is the proof for and against it? Finally, write a fair replacement thought you could actually believe.",
                "placeholder": "Catch: The thought was... Check: Proof against it is... Change: A fairer thought is...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "In the Catch-Check-Change method, what does the Change step ask you to do?",
                  "options": [
                    "Repeat positive affirmations that may not be true",
                    "Replace the harsh thought with a fair and true one",
                    "Push the thought away and ignore it",
                    "Prove the critic completely wrong every time"
                  ],
                  "answer": 1,
                  "explain": "Change means swapping a cruel thought for a balanced, believable one. It is not fake praise and it is not denial."
                },
                {
                  "q": "Why should you not try to delete the inner critic completely?",
                  "options": [
                    "Because the critic is always right",
                    "Because deleting it would make you arrogant",
                    "Because it cannot be deleted; the goal is to manage it",
                    "Because positive thinking is the only real fix"
                  ],
                  "answer": 2,
                  "explain": "The critic is a built-in protective voice you cannot erase. The skill is to hear it, question it, and choose your own response."
                },
                {
                  "q": "The friend test asks you to check whether...",
                  "options": [
                    "Your friends agree with your critic",
                    "You would speak to a friend the way you speak to yourself",
                    "Your friends have the same fears as you",
                    "You can perform without any nerves at all"
                  ],
                  "answer": 1,
                  "explain": "The friend test exposes how harsh self-talk really is. We rarely speak to people we respect the way we speak to ourselves."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to see you here. I know the Catch-Check-Change method from this lesson and the friend test. Share one harsh thought your inner critic likes to repeat, and I will help you run it through the three steps.",
                "suggested": [
                  "What if the critic's thought is partly true?",
                  "Give me an example of a fair replacement thought",
                  "How do I catch the thought when things move fast?"
                ]
              }
            },
            {
              "lessonId": "confidence-3",
              "title": "Mapping your win history",
              "mins": 13,
              "hook": "Your brain forgets your wins and keeps your failures. This lesson helps you build a record of proof you can return to when doubt hits.",
              "objectives": [
                "By the end you can list real evidence of your past wins",
                "By the end you can see the pattern of strengths inside those wins",
                "By the end you can use your win record to answer self-doubt with facts"
              ],
              "sections": [
                {
                  "heading": "Why your brain hides your wins",
                  "body": [
                    "The brain holds on to bad memories more strongly than good ones. This is called the negativity bias. Long ago, remembering danger kept people alive. So one piece of harsh feedback can stay with you for years, while ten compliments fade by next week.",
                    "This creates an unfair record inside your head. When you feel doubt, your brain quickly brings up every mistake and stays quiet about every success. You then make decisions based on a record that is missing half the facts.",
                    "The fix is to build the missing half on purpose. You write down your real wins so they are saved outside your memory, where doubt cannot delete them. This is your win history."
                  ]
                },
                {
                  "heading": "Building your evidence file",
                  "body": [
                    "Use a method called the Evidence File. The rule is simple: only real, specific facts count. Not \"I am a hard worker,\" but \"I led the supplier move that cut costs by twelve percent.\" Facts beat feelings.",
                    "Collect wins from four areas to get a full picture. One, results you delivered, such as a project finished or a target hit. Two, hard moments you handled, such as a crisis or a difficult client. Three, skills others rely on you for, such as the person people ask when the data is messy. Four, growth over time, such as a fear you once had that you no longer have.",
                    "Here is how it looks in practice. An HR officer in Abu Dhabi feels she is not ready to lead a team. She builds her Evidence File and writes: \"Ran the onboarding for forty new hires with zero complaints. Calmed an angry department head and kept the project alive. People come to me first when a policy is unclear. Two years ago I was scared of public speaking; now I run training sessions.\" Reading that list, the doubt has a much harder time. The facts are right there on the page."
                  ]
                },
                {
                  "heading": "Reading the pattern in your wins",
                  "body": [
                    "Once you have ten or more wins listed, look for the pattern. Ask: \"What strengths show up again and again?\" Maybe you stay calm under pressure. Maybe you are the one who brings order to chaos. Maybe people trust you with hard conversations.",
                    "These repeated strengths are your true confidence base. They are not a guess or a hope. They are proven by a list of real events. When self-doubt says \"you cannot do this,\" you can answer, \"here is the proof that I can.\"",
                    "Keep the file alive. Add to it every time something goes well, even small things. Over weeks, you build a record that doubt cannot argue with, because it is made of facts and not feelings."
                  ]
                }
              ],
              "takeaways": [
                "Negativity bias makes your brain keep failures and forget wins",
                "Build an Evidence File of real, specific wins outside your memory",
                "Collect from four areas: results, hard moments, skills, and growth",
                "Look for repeated strengths; these are your true confidence base",
                "Keep adding wins so the record grows stronger than your doubt"
              ],
              "exercise": {
                "title": "Start your Evidence File",
                "prompt": "Write five real wins from your career. Make each one specific, with a fact or number if you can. Use the four areas as a guide: results you delivered, hard moments you handled, skills others rely on you for, and growth over time. Then note one strength that shows up in more than one of them.",
                "placeholder": "Win 1... Win 2... A strength I see repeating is...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What is the negativity bias, and why does it matter for confidence?",
                  "options": [
                    "A habit of expecting bad outcomes, which you can simply choose to stop",
                    "The brain holding failures more strongly than wins, creating an unfair inner record",
                    "A sign that you lack the skills for your job",
                    "A rule that you should focus only on your mistakes"
                  ],
                  "answer": 1,
                  "explain": "The negativity bias keeps failures clear and strong and lets wins fade. That leaves you judging yourself on only half the facts, which feeds doubt."
                },
                {
                  "q": "Which entry belongs in a strong Evidence File?",
                  "options": [
                    "I am a dedicated and reliable professional",
                    "I think I am quite good at my job",
                    "I led the supplier move that cut costs by twelve percent",
                    "People probably like working with me"
                  ],
                  "answer": 2,
                  "explain": "The Evidence File uses real, specific facts. A measurable result beats a general self-description, which doubt can easily dismiss."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. I know the negativity bias and the Evidence File method from this lesson, including the four areas to collect wins from. Tell me one win you are proud of, and I will help you write it as solid evidence.",
                "suggested": [
                  "What counts as a real win versus a vague one?",
                  "I cannot think of any wins. How do I start?",
                  "How do I find the pattern in my wins?"
                ]
              }
            }
          ]
        },
        {
          "title": "The Reset",
          "lessons": [
            {
              "lessonId": "confidence-4",
              "title": "Reframing the rejection",
              "mins": 18,
              "hook": "One rejection can sit in your mind for years and quietly shrink what you try next. This lesson teaches you to read rejection as useful information, not as a final judgement on your worth.",
              "objectives": [
                "By the end you can separate a single rejection from your value as a person",
                "By the end you can use a clear method to learn from a no without being crushed by it",
                "By the end you can decide what a rejection should and should not change in your behaviour"
              ],
              "sections": [
                {
                  "heading": "Rejection is feedback about a fit, not a final judgement on you",
                  "body": [
                    "When you are rejected, the inner critic says one thing: \"this proves you are not good enough.\" That is the most common and most harmful mistake. A rejection is information about a specific fit at a specific time. It is not a final score on your worth.",
                    "Think about what a \"no\" actually contains. A job rejection might mean another person matched the exact need a little better, or the budget changed, or the timing was wrong. A rejected idea might mean the room was not ready, or the case was not made clearly. None of these mean \"you, as a person, have no value.\"",
                    "The skill is to make the rejection small and specific instead of large and personal. \"They chose someone else for this one role\" is true and manageable. \"I always fail and never will be enough\" is false and crushing. Same event, two very different stories. You get to choose the accurate one."
                  ]
                },
                {
                  "heading": "The 3R method: Receive, Read, Respond",
                  "body": [
                    "Use a method called the 3R method to handle any rejection in a calm and useful way. The three steps are Receive, Read, and Respond.",
                    "Receive. First, let the feeling pass through without acting on it. Rejection hurts, and that is normal. Do not send an angry email or make a big decision in the first hour. Name the feeling: \"I feel disappointed and a bit embarrassed.\" Naming it lowers its power.",
                    "Read. Next, look for the real lesson, like a scientist reading data. Ask: \"What can I actually learn here? What part was in my control, and what part was not?\" Separate useful feedback from noise. If they gave reasons, study them. If the no was about timing or budget, accept that it was not about you at all.",
                    "Respond. Finally, decide your next action on purpose. Maybe you improve one specific skill. Maybe you ask for feedback. Maybe you simply try again somewhere with a better fit. The response is a choice you make with a clear head, not a reaction you throw out in pain.",
                    "An example. A consultant in Dubai is turned down for a senior project lead role. Her first thought is, \"I am not leadership material.\" She uses the 3R method. She receives the disappointment and lets a day pass. She reads the feedback and learns the firm wanted more experience with government clients, which is a specific and fixable gap, not a flaw in her. She responds by asking to join a smaller government project to build that exact experience. Eight months later, she is ready, and the next door opens. The rejection became a map, not a wall."
                  ]
                },
                {
                  "heading": "What rejection should and should not change",
                  "body": [
                    "A healthy response changes your method, not your worth. After a no, it is fair to adjust your approach, your preparation, or your target. It is never fair to lower your view of yourself as a person.",
                    "Watch for over-correction. Over-correction means you change far too much after one no. Some people take one rejection and stop trying for years. That is letting a single result control a whole life. One no is a very small sample. It cannot prove a rule about your future.",
                    "Here is a steady rule to hold. Let rejection sharpen you, not shrink you. Sharpen means you get clearer and better at the thing. Shrink means you ask for less and hide. The first builds a career. The second slowly ends one."
                  ]
                }
              ],
              "takeaways": [
                "A rejection is feedback about a specific fit, not a final judgement on your worth",
                "Make the no small and specific, not large and personal",
                "Use the 3R method: Receive the feeling, Read the lesson, Respond on purpose",
                "Change your method after a no, never your view of yourself",
                "Let rejection sharpen you, not shrink you"
              ],
              "exercise": {
                "title": "Reframe one rejection",
                "prompt": "Think of one rejection that still stings. Run it through the 3R method. Receive: what did you feel? Read: what was actually in your control, and what was not? Respond: what is one useful action you could take now, with a clear head?",
                "placeholder": "Receive: I felt... Read: In my control was... Not in my control was... Respond: One action I can take is...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A strong candidate is rejected because the company wanted more experience in one specific area. What is the most accurate reading?",
                  "options": [
                    "It proves she is not leadership material",
                    "It is a specific, fixable gap, not a flaw in her worth",
                    "She should stop applying for senior roles",
                    "The decision was unfair and not worth learning from"
                  ],
                  "answer": 1,
                  "explain": "The rejection points to one concrete gap she can close. Reading it as proof of low worth is the personal-and-large error the lesson warns against."
                },
                {
                  "q": "In the 3R method, what is the purpose of the Receive step?",
                  "options": [
                    "To quickly fight back and defend yourself",
                    "To accept the no without ever learning from it",
                    "To let the feeling pass before you act, so you respond with a clear head",
                    "To prove the other person made the wrong choice"
                  ],
                  "answer": 2,
                  "explain": "Receive is about feeling the hurt without acting in the heat of it. A calm head later leads to a far better Read and Respond."
                },
                {
                  "q": "Which response shows a healthy reframe rather than over-correction?",
                  "options": [
                    "Deciding never to apply for that level of role again",
                    "Lowering your view of yourself as a person",
                    "Adjusting your method while keeping your sense of worth",
                    "Treating one no as proof of a permanent rule about your future"
                  ],
                  "answer": 2,
                  "explain": "A healthy reframe changes your method, not your worth. Over-correction lets one result shrink your whole future."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "I am glad you are here for this one. I know the 3R method from this lesson: Receive, Read, Respond, and the difference between a no that is about you and a no that is about fit. Tell me about a rejection that still bothers you, and we can reframe it together.",
                "suggested": [
                  "How do I stop taking rejection so personally?",
                  "What if the rejection really was about my own mistake?",
                  "How long should the Receive step take?"
                ]
              }
            },
            {
              "lessonId": "confidence-5",
              "title": "Building a confidence ritual",
              "mins": 12,
              "hook": "Confidence that depends on mood will fail you on hard days. This lesson helps you build a small daily ritual that keeps you steady no matter how you feel.",
              "objectives": [
                "By the end you can design a short daily ritual that builds confidence over time",
                "By the end you can use a pre-event routine to steady yourself before high-pressure moments",
                "By the end you can make the ritual small enough that you actually keep it"
              ],
              "sections": [
                {
                  "heading": "Why rituals beat willpower",
                  "body": [
                    "Confidence is not built in one big moment. It is built in small actions repeated often. A ritual is a simple action you do at a set time, the same way each time, until it becomes automatic. Rituals work because they do not depend on how you feel that day.",
                    "Willpower runs out. On a tired or stressful day, you will not feel like doing the brave thing. A ritual removes the need to decide. You just follow the routine, the same as brushing your teeth. The action happens even when motivation is low.",
                    "Think of confidence like fitness. You do not get strong from one heavy session. You get strong from regular, smaller sessions over time. A daily confidence ritual is your training plan for a steadier mind."
                  ]
                },
                {
                  "heading": "The daily ritual: three small parts",
                  "body": [
                    "Build a daily ritual with three small parts. Keep it under five minutes so it survives busy days. I call this the Notice-Name-Note ritual.",
                    "Notice. In the morning, take one slow breath and notice how you feel, without judging it. This builds the habit of catching your state early, which you learned in lesson one.",
                    "Name. Pick one thing you will face today that needs confidence, and name it. \"Today I will speak up in the strategy meeting.\" Naming it turns a vague worry into a clear, single target.",
                    "Note. At the end of the day, write one line in your Evidence File about what went well. Even small wins count. This feeds the win history you started in lesson three and ends your day on proof, not doubt.",
                    "An example. A project manager in Sharjah does this ritual on her phone each day. Morning: she notices she feels tense before a client call. She names her target: \"Today I will ask the client the hard question about the deadline.\" Evening: she notes, \"Asked the question. The client respected it.\" In one month she has thirty small wins recorded and a calmer start to each day. Nothing dramatic happened. The repetition did the work."
                  ]
                },
                {
                  "heading": "The pre-event routine for high-pressure moments",
                  "body": [
                    "For big moments, add a short pre-event routine. This is a fixed set of actions you do in the five minutes before a meeting, pitch, or hard talk. A fixed routine gives your nervous mind something solid to hold.",
                    "A simple version has three steps. First, breathe: take three slow breaths out longer than in, which calms the body. Second, posture: stand or sit tall, feet steady, shoulders open, because the body shapes the mind. Third, anchor: recall one line from your Evidence File, such as \"I have handled rooms harder than this.\"",
                    "Keep the routine exactly the same every time. The point is that it is familiar. When everything else feels uncertain, your routine is the one thing you can control. That control is where calm confidence comes from."
                  ]
                }
              ],
              "takeaways": [
                "Confidence is built by small actions repeated often, not by big moments",
                "Rituals beat willpower because they do not depend on your mood",
                "Use the daily Notice-Name-Note ritual and keep it under five minutes",
                "Add a fixed pre-event routine: breathe, fix posture, anchor on one win",
                "Keep routines the same each time so they feel familiar under pressure"
              ],
              "exercise": {
                "title": "Design your ritual",
                "prompt": "Write your own daily confidence ritual using Notice-Name-Note. Decide the exact time you will do each part and where you will record it. Then write your three-step pre-event routine for high-pressure moments, including one anchor line from your Evidence File.",
                "placeholder": "Daily ritual: Notice... Name... Note... Pre-event routine: Breathe... Posture... Anchor line...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Why does the lesson say rituals beat willpower for building confidence?",
                  "options": [
                    "Because willpower is a sign of weakness",
                    "Because rituals run automatically and do not depend on your mood",
                    "Because rituals require no effort at all",
                    "Because willpower only works for physical fitness"
                  ],
                  "answer": 1,
                  "explain": "Willpower fades on hard days. A ritual is automatic, so the action still happens when motivation is low. That is its main advantage."
                },
                {
                  "q": "What is the main reason to keep a pre-event routine exactly the same every time?",
                  "options": [
                    "It impresses the people watching you",
                    "It guarantees you will never feel nervous",
                    "Familiarity gives your nervous mind something solid to control",
                    "It makes the event finish faster"
                  ],
                  "answer": 2,
                  "explain": "A fixed routine is the one thing you control when everything else is uncertain. That familiar control is where calm confidence comes from."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Happy to build this with you. I know the Notice-Name-Note daily ritual and the three-step pre-event routine from this lesson. Tell me about a high-pressure moment you face often, and we can design a routine that fits it.",
                "suggested": [
                  "How do I keep the ritual when my days are very busy?",
                  "What anchor line should I use before a big meeting?",
                  "What if I forget the ritual for a few days?"
                ]
              }
            },
            {
              "lessonId": "confidence-6",
              "title": "Your 7-day plan",
              "mins": 12,
              "hook": "Knowing the tools is not the same as living them. This lesson turns everything you learned into a simple seven-day plan you can start tomorrow.",
              "objectives": [
                "By the end you can follow a clear day-by-day plan to apply the whole course",
                "By the end you can choose one stretch action that grows your confidence through real practice",
                "By the end you can set up a simple way to keep the habit going after day seven"
              ],
              "sections": [
                {
                  "heading": "From knowing to doing",
                  "body": [
                    "You now have the full toolkit. You understand triggers, the inner critic, your win history, reframing rejection, and daily rituals. The last step is the one that changes your life: using them. Knowledge that stays in your head does nothing. Practice is what rewires confidence.",
                    "Confidence grows in one main way: you do a slightly hard thing, you survive it, and your brain updates its belief. This is called earned confidence. You cannot think your way to it. You act your way to it, one small brave step at a time.",
                    "So this plan is built around small daily actions, not big leaps. Each day asks for one clear thing. Small steps done daily beat one big effort that you never repeat. The aim is steady progress you can actually keep."
                  ]
                },
                {
                  "heading": "The 7-day plan, day by day",
                  "body": [
                    "Here is your plan. Each day takes about fifteen minutes plus one real-world action.",
                    "Day 1, Map. Write your three most common confidence triggers from lesson one. Watch for them all day.",
                    "Day 2, Answer back. Use Catch-Check-Change on one inner-critic thought, as in lesson two. Write all three steps.",
                    "Day 3, Build proof. Add ten wins to your Evidence File from lesson three. Find one repeating strength.",
                    "Day 4, Reframe. Pick one old rejection and run the 3R method from lesson four. Decide one new action.",
                    "Day 5, Ritual. Start the daily Notice-Name-Note ritual from lesson five. Do it morning and evening.",
                    "Day 6, Stretch. Do one small brave action you have been avoiding. Ask the question, send the email, or speak up once.",
                    "Day 7, Review. Read everything you wrote this week. Notice what changed. Choose which two tools you will keep using.",
                    "An example of a day-six stretch. A marketing lead in Riyadh has avoided asking her director for a bigger budget. On day six, she uses her pre-event routine, then asks. The director says he needs to check, which is not a no. She survives the moment and her belief updates: \"I can ask for what I need.\" That single action did more than a week of reading."
                  ]
                },
                {
                  "heading": "Keeping it going after day seven",
                  "body": [
                    "Seven days starts the change. Habits need more time to set. To keep going, use a simple rule called \"two tools and a tracker.\" Choose the two tools that helped you most and keep doing only those, so it stays light and real.",
                    "Add a tracker. This can be a note on your phone where you mark each day you do your ritual and each brave action you take. Seeing the marks build up is its own quiet reward and keeps you honest.",
                    "Plan for bad days, because they will come. A bad day does not erase your progress. When you slip, you simply return to the ritual the next morning. Confidence is not a straight line up. It is a steady habit you return to, again and again, until it becomes who you are."
                  ]
                }
              ],
              "takeaways": [
                "Confidence is earned through action, not gained through thinking alone",
                "Small brave steps done daily beat one big effort you never repeat",
                "Follow the 7-day plan: map, answer back, build proof, reframe, ritual, stretch, review",
                "After day seven, keep going with two tools and a simple tracker",
                "Plan for bad days; just return to the ritual the next morning"
              ],
              "exercise": {
                "title": "Commit to your 7-day plan",
                "prompt": "Write your start date for day one. Then choose your day-six stretch action now: one small brave thing you have been avoiding. Finally, name the two tools from this course you think will help you most after the week ends.",
                "placeholder": "I start on... My day-six stretch action is... The two tools I will keep are...",
                "interaction": {
                  "mechanic": "Mirror Journal",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Notice the pattern and choose the next reset move.",
                  "actionLabel": "Choose the reset move",
                  "artifactLabel": "Add to reset plan",
                  "choices": [
                    "Name the trigger",
                    "Answer the critic",
                    "Collect proof",
                    "Use the ritual"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "What does the lesson mean by earned confidence?",
                  "options": [
                    "Confidence you gain by reading and thinking about the topic",
                    "Confidence that comes from doing a hard thing, surviving it, and updating your belief",
                    "Confidence that other people give you through praise",
                    "Confidence you are simply born with"
                  ],
                  "answer": 1,
                  "explain": "Earned confidence comes from action. You do a slightly hard thing, survive, and your brain updates its belief. Thinking alone does not do this."
                },
                {
                  "q": "On day six, a leader asks for a bigger budget and the director says he needs to check first. Why is this still a win?",
                  "options": [
                    "Because she got the budget she asked for",
                    "Because she avoided the risk entirely",
                    "Because she took the brave action and survived it, so her belief updated",
                    "Because the director clearly said yes"
                  ],
                  "answer": 2,
                  "explain": "The win is the action, not the outcome. By asking and surviving, her belief updates to 'I can ask for what I need,' which is earned confidence."
                },
                {
                  "q": "What is the best response to a bad day after the plan ends?",
                  "options": [
                    "Decide the plan did not work and stop",
                    "Treat the slip as proof that you cannot change",
                    "Return to your ritual the next morning and continue",
                    "Start the whole seven days over from zero each time"
                  ],
                  "answer": 2,
                  "explain": "Confidence is not a straight line. A bad day does not erase progress. The habit is simply returning to the ritual the next morning."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "This is where it all comes together. I know your 7-day plan from this lesson and the idea of earned confidence through small brave actions. Tell me which day feels hardest for you, and we can make it doable.",
                "suggested": [
                  "Help me choose my day-six stretch action",
                  "Which two tools should I keep after the week?",
                  "How do I stay consistent once the seven days end?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Mirror Journal",
        "short": "Notice the pattern and choose the next reset move.",
        "artifact": "confidence reset plan",
        "interaction": "notice, choose, collect, reset",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "leadership": {
      "courseId": "leadership",
      "title": "Leadership Without Burnout",
      "modules": [
        {
          "title": "The Energy Audit",
          "lessons": [
            {
              "lessonId": "leadership-1",
              "title": "The burnout early-warning system",
              "mins": 18,
              "hook": "Burnout does not arrive in one day. It sends small signals first. This lesson teaches you to read those signals early, in yourself and in your team.",
              "objectives": [
                "By the end you can name the three warning signs of early burnout.",
                "By the end you can run a simple weekly check on your own energy.",
                "By the end you can spot the same signals in one team member."
              ],
              "sections": [
                {
                  "heading": "Burnout is a slow leak, not a sudden break",
                  "body": [
                    "Many leaders think burnout is one big crash. They expect to feel fine until the day they cannot work at all. The truth is different. Burnout builds slowly, like a slow leak in a tyre. You keep driving and do not notice until the tyre is flat.",
                    "The World Health Organization defines burnout as a problem caused by long work stress that was not managed well. Notice the key word: managed. Stress is normal. Stress that you never reduce is the danger. Your job as a leader is to catch the leak while the tyre still holds air."
                  ]
                },
                {
                  "heading": "The three signals: the Maslach model in plain words",
                  "body": [
                    "Christina Maslach is a researcher who studied burnout for many years. She found that burnout shows up in three ways. You can remember them as three plain questions.",
                    "First, exhaustion. Ask: am I tired even after I rest? Real rest stops working. A weekend off does not refill you. Second, distance. Ask: am I pulling away from people and work I used to care about? You start to feel cold or numb about things that once mattered. Third, doubt. Ask: do I feel that my work no longer makes a difference? You lose the sense that your effort counts.",
                    "When two or three of these are true for more than two weeks, that is not a bad mood. That is an early-warning light on your dashboard."
                  ]
                },
                {
                  "heading": "A worked example from a Dubai team",
                  "body": [
                    "Think of Mariam, an operations manager at a logistics company in Dubai. For weeks she answered every message at night. She told herself it was a busy season. Then she noticed she felt flat on Sunday morning even after a full weekend. She started to skip the team coffee she used to enjoy. She began to wonder if any of her work mattered.",
                    "Those are all three signals: exhaustion, distance, and doubt. Mariam did not crash. She caught the leak. She blocked her evenings, handed two reports to a colleague, and asked her manager for one less project. Two weeks later the warning lights were off. Early reading gave her cheap, simple fixes. If she had waited three more months, the fix would have been sick leave."
                  ]
                }
              ],
              "takeaways": [
                "Burnout builds slowly; watch for the slow leak, not the sudden crash.",
                "The three signals are exhaustion, distance, and doubt.",
                "Rest that no longer refills you is a serious warning sign.",
                "Two or more signals lasting two weeks means act now.",
                "Early reading means small, cheap fixes instead of long recovery."
              ],
              "exercise": {
                "title": "Your three-signal check",
                "prompt": "Run the three questions on yourself for the past two weeks. For each one (exhaustion, distance, doubt), write yes or no and one line of proof from real life. Then write the single smallest change you could make this week.",
                "placeholder": "Exhaustion: yes/no — proof... Distance: yes/no — proof... Doubt: yes/no — proof... Smallest change this week...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the leadership move that protects energy and responsibility.",
                  "actionLabel": "Check the rhythm move",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": [
                    "Keep",
                    "Delegate",
                    "Decline",
                    "Recover"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A team member says a full weekend off no longer makes them feel rested. Which signal is this, and what should you do?",
                  "options": [
                    "Normal tiredness; tell them to sleep more and move on",
                    "The exhaustion signal; treat it as an early warning and look for the other two signals",
                    "A sign of low skill; give them more training",
                    "A personal problem; it is not a manager's business"
                  ],
                  "answer": 1,
                  "explain": "Rest that stops refilling you is the exhaustion signal. The right move is to treat it as an early light and check for distance and doubt too, then act while fixes are still small."
                },
                {
                  "q": "Why is catching burnout early so valuable for a leader?",
                  "options": [
                    "It removes all stress from the team forever",
                    "It lets you use small, cheap fixes instead of long recovery later",
                    "It proves the leader is working harder than everyone",
                    "It means you never have to delegate work"
                  ],
                  "answer": 1,
                  "explain": "Early signals can be fixed with light changes like blocking evenings or handing off one task. Waiting turns those small fixes into sick leave and lost time."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. In this lesson we learn to read the early signals of burnout. I know the three-signal check (exhaustion, distance, doubt). Tell me what you are noticing in yourself or your team, and we can look at it together.",
                "suggested": [
                  "How is normal stress different from burnout?",
                  "What if only one of the three signals is true for me?",
                  "How do I check a team member without making them defensive?"
                ]
              }
            },
            {
              "lessonId": "leadership-2",
              "title": "Where your energy actually goes",
              "mins": 16,
              "hook": "You track your hours, but do you track your energy? Some tasks fill you up and some drain you. This lesson shows you where your energy really goes.",
              "objectives": [
                "By the end you can map your week by energy, not just by time.",
                "By the end you can name your top energy drains and energy sources.",
                "By the end you can plan one change to protect your best energy."
              ],
              "sections": [
                {
                  "heading": "Time is not the same as energy",
                  "body": [
                    "Most leaders manage time. They look at the calendar and count hours. But two meetings of one hour each are not equal. One leaves you sharp and ready. The other leaves you flat for the rest of the day. The clock cannot see this difference. Your energy can.",
                    "Energy is the real fuel of good leadership. A clear, calm hour is worth more than three tired hours. So the question is not only where does my time go. The better question is where does my energy go."
                  ]
                },
                {
                  "heading": "The Energy Audit: four boxes",
                  "body": [
                    "Here is a simple tool called the Energy Audit. For one week, write down your main tasks. Then place each task in one of four boxes based on two questions: does it give energy or take energy, and is it important or not important.",
                    "Box one: gives energy and important. This is your best work. Protect it. Box two: gives energy but not important. Nice, but do not let it grow too big. Box three: takes energy but important. This is real work you must do; plan it for your strongest hours. Box four: takes energy and not important. This is the box to cut, hand off, or shrink. Most leaders are surprised by how full box four is."
                  ]
                },
                {
                  "heading": "A worked example from a Riyadh leader",
                  "body": [
                    "Khalid leads a sales team in Riyadh. He felt tired every day but could not say why. He ran the Energy Audit for one week. He found that long status update meetings sat in box four: they drained him and added little. Coaching his junior sellers sat in box one: it gave him energy and grew the team.",
                    "He made two changes. He cut the status meeting from sixty minutes to fifteen and moved it to a shared note. He added two coaching sessions in his strong morning hours. He did not work fewer hours, but he ended the week with more energy. He moved his time from box four to box one."
                  ]
                }
              ],
              "takeaways": [
                "Time and energy are not the same; manage both.",
                "A calm, sharp hour beats several tired hours.",
                "Sort tasks into four boxes: energy in or out, important or not.",
                "Protect box one (gives energy, important) and shrink box four.",
                "Plan draining-but-important work for your strongest hours."
              ],
              "exercise": {
                "title": "Your one-week energy map",
                "prompt": "List five tasks you did this week. Put each in one of the four boxes (gives or takes energy; important or not). Then name one task in box four you will cut or hand off, and one task in box one you will protect.",
                "placeholder": "Task 1 — box... Task 2 — box... (five tasks). Box four task to cut/hand off... Box one task to protect...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the leadership move that protects energy and responsibility.",
                  "actionLabel": "Check the rhythm move",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": [
                    "Keep",
                    "Delegate",
                    "Decline",
                    "Recover"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A task is important to the business but it drains you every time. Which box is it, and what is the smart move?",
                  "options": [
                    "Box four; cut it completely",
                    "Box one; do more of it",
                    "Box three; keep it but schedule it for your strongest hours",
                    "Box two; it does not really matter"
                  ],
                  "answer": 2,
                  "explain": "Important work that drains you is box three. You cannot cut it, but you can protect your performance by doing it when your energy is highest."
                },
                {
                  "q": "Why is tracking energy more useful than tracking only time?",
                  "options": [
                    "Because energy tells you which hours actually produce your best work",
                    "Because time is impossible to measure",
                    "Because energy means you can work more total hours",
                    "Because calendars are always wrong"
                  ],
                  "answer": 0,
                  "explain": "Two hours can cost the same time but very different energy. Tracking energy shows you which work fuels you and which work quietly drains your best hours."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to see you. This lesson is about energy, not just time. I can help you sort your week into the four boxes of the Energy Audit. What is one task you did this week, and did it give you energy or take it?",
                "suggested": [
                  "What if almost everything feels like it takes energy?",
                  "How do I handle a draining task I cannot hand off?",
                  "How do I find my strongest hours of the day?"
                ]
              }
            },
            {
              "lessonId": "leadership-3",
              "title": "Boundaries that hold",
              "mins": 16,
              "hook": "Saying yes to everything is how good leaders burn out. This lesson gives you boundaries that are clear, kind, and strong enough to hold under pressure.",
              "objectives": [
                "By the end you can set a clear boundary without sounding rude.",
                "By the end you can say no while still offering help.",
                "By the end you can protect at least one boundary that keeps breaking."
              ],
              "sections": [
                {
                  "heading": "A boundary is a rule, not a wall",
                  "body": [
                    "Some leaders think a boundary means shutting people out. That is not true. A boundary is simply a clear rule about how you work and when you are available. It protects your energy so you can do your best for the team. A wall keeps people away. A boundary tells people how to work with you well.",
                    "Boundaries fail for two reasons. The first is they are never said out loud, so no one knows them. The second is they bend the moment someone pushes. A boundary that bends every time is not a boundary. It is a wish."
                  ]
                },
                {
                  "heading": "The clear no: a simple three-part script",
                  "body": [
                    "Saying no is a skill, and in Gulf workplaces, where respect and good relationships matter a lot, it must be done with warmth. Use a three-part script: acknowledge, decline, offer.",
                    "First, acknowledge the request so the person feels heard. Second, decline clearly, with a short honest reason. Third, offer something you can do, even if it is small. For example: 'I understand this report is important to you. I cannot take it on this week because I am closing the quarter. I can review your draft on Thursday if that helps.' This is kind and clear at the same time. You said no to the task but yes to the relationship."
                  ]
                },
                {
                  "heading": "A worked example from an Abu Dhabi office",
                  "body": [
                    "Layla is an HR lead in Abu Dhabi. Her boundary was no work messages after 8 pm. But the boundary kept breaking, because she replied anyway whenever her director wrote at night. Her silence to herself was a yes to everyone else.",
                    "She made the boundary hold with two steps. First, she said it out loud to her team and her director: 'After 8 pm I am offline; for true emergencies, call me.' Second, she stopped replying at night to non-emergencies, and instead answered first thing in the morning. Within two weeks the late messages dropped. People learned the rule because she kept the rule. The boundary held because she held it."
                  ]
                }
              ],
              "takeaways": [
                "A boundary is a clear rule, not a wall that shuts people out.",
                "Boundaries fail when unspoken or when they bend under pressure.",
                "Use acknowledge, decline, offer to say no with warmth.",
                "Saying no to a task can still mean yes to the relationship.",
                "A boundary only holds when you hold it every time."
              ],
              "exercise": {
                "title": "Write your three-part no",
                "prompt": "Think of one request you keep saying yes to but should decline. Write a short no using the three parts: acknowledge, decline (with a short reason), and offer one smaller thing you can do.",
                "placeholder": "Acknowledge... Decline (reason)... Offer...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "Your manager messages you at 9 pm about a non-urgent task. Your boundary is no work after 8 pm. What action best keeps the boundary holding?",
                  "options": [
                    "Reply right away so you seem committed",
                    "Ignore it forever and never explain",
                    "Reply first thing in the morning, after telling people your offline rule in advance",
                    "Turn off your phone and tell no one"
                  ],
                  "answer": 2,
                  "explain": "A boundary holds when it is said out loud and kept. Answering in the morning, with the rule stated in advance, teaches people the boundary without harming the relationship."
                },
                {
                  "q": "Why does the acknowledge, decline, offer script work well in Gulf workplaces?",
                  "options": [
                    "Because it lets you avoid giving any reason",
                    "Because it keeps the relationship warm while still saying a clear no",
                    "Because it always makes the other person change their mind",
                    "Because it hides the fact that you said no"
                  ],
                  "answer": 1,
                  "explain": "The script protects the relationship by showing you heard the person and offering some help, while still declining clearly. That balance of respect and clarity fits the culture and makes the no stick."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello. This lesson is about boundaries that actually hold. I know the acknowledge, decline, offer script. Tell me about a request you struggle to say no to, and we can write a warm, clear no together.",
                "suggested": [
                  "How do I say no to my own boss?",
                  "What counts as a real emergency?",
                  "How do I rebuild a boundary I have already broken many times?"
                ]
              }
            }
          ]
        },
        {
          "title": "Leading Sustainably",
          "lessons": [
            {
              "lessonId": "leadership-4",
              "title": "Hand off work without dropping it",
              "mins": 20,
              "hook": "Delegation should give you time back, not new worry. This lesson shows you how to hand off real work while still owning the outcome.",
              "objectives": [
                "By the end you can match the right amount of control to the right person.",
                "By the end you can delegate a task with clear checkpoints, not constant checking.",
                "By the end you can avoid both dropping the task and checking it too much."
              ],
              "sections": [
                {
                  "heading": "Two ways delegation goes wrong",
                  "body": [
                    "Delegation fails in two opposite ways. The first is dropping the task. You hand it over, say good luck, and disappear. When it goes wrong, you are shocked. The second is checking too much, also called micromanaging. You hand off the task but check every step, so the person never really owns it and you never get your time back.",
                    "Good delegation sits between these two. You give real ownership, and you keep clear sight of the outcome through agreed checkpoints. The skill is choosing how much support to give, based on the person and the task."
                  ]
                },
                {
                  "heading": "Match support to readiness: situational leadership",
                  "body": [
                    "A useful model here is Situational Leadership, created by Hersey and Blanchard. The simple idea: how much you direct someone should depend on how ready they are for this specific task. Readiness means their skill plus their confidence for this task, not in general.",
                    "For someone new to the task, give clear direction and frequent check-ins. For someone growing, coach them and ask questions instead of giving answers. For someone skilled but unsure, support and encourage. For someone fully ready, delegate and step back. The same person can be at different levels for different tasks. A strong seller may need close support the first time they build a budget."
                  ]
                },
                {
                  "heading": "A worked example from a Jeddah project",
                  "body": [
                    "Omar runs a project team in Jeddah. He asked Noura to lead a client report for the first time. In the past he would either do it himself or hand it over and hope. This time he matched support to readiness.",
                    "Noura was skilled in analysis but new to client reports, so Omar set three checkpoints: an outline on day one, a draft on day three, and a final review on day five. Between checkpoints, he left her alone to work. He owned the outcome through the checkpoints, but she owned the task. The report was strong, Noura grew, and Omar did not lose his week to checking. That is how you hand off work without dropping it."
                  ]
                }
              ],
              "takeaways": [
                "Delegation fails as dropping the task (too little) or checking too much (micromanaging).",
                "Match your support level to the person's readiness for this exact task.",
                "Readiness is skill plus confidence for the specific task, not in general.",
                "Use agreed checkpoints to own the outcome without checking every step.",
                "Good delegation gives time back to you and growth to your people."
              ],
              "exercise": {
                "title": "Plan one real handoff",
                "prompt": "Pick one task you should delegate. Name the person and rate their readiness for this exact task (new, growing, skilled but unsure, or fully ready). Then write two or three checkpoints you will agree on, so you keep sight of the outcome without checking every step.",
                "placeholder": "Task... Person and readiness level... Checkpoint 1... Checkpoint 2... Checkpoint 3...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the leadership move that protects energy and responsibility.",
                  "actionLabel": "Check the rhythm move",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": [
                    "Keep",
                    "Delegate",
                    "Decline",
                    "Recover"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "You give a skilled but nervous team member a task, then check their work every two hours. What is the problem?",
                  "options": [
                    "Nothing; close checking is always safest",
                    "You are micromanaging; they need support and space, not constant checking",
                    "You should have done the task yourself",
                    "You should have given no checkpoints at all"
                  ],
                  "answer": 1,
                  "explain": "A skilled but unsure person needs encouragement and room to own the work. Checking every two hours removes ownership and keeps you trapped in the task. Agreed checkpoints would serve both of you better."
                },
                {
                  "q": "Why does readiness need to be judged for each task, not for the person overall?",
                  "options": [
                    "Because people never really change",
                    "Because the same person can be expert at one task and new at another",
                    "Because confidence does not matter for delegation",
                    "Because senior people never need support"
                  ],
                  "answer": 1,
                  "explain": "Readiness is task-specific. A strong analyst may be new to leading a client report. Matching support to the exact task is what prevents both dropping the task and checking it too much."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome back. This lesson is about delegating real work without losing the outcome. I know the Situational Leadership idea of matching support to readiness. Tell me about a task you want to hand off, and we can plan the right support level and checkpoints.",
                "suggested": [
                  "How many checkpoints are too many?",
                  "What if the person fails at the first checkpoint?",
                  "How do I delegate when I do not fully trust the person yet?"
                ]
              }
            },
            {
              "lessonId": "leadership-5",
              "title": "Protecting focus in a reactive culture",
              "mins": 18,
              "hook": "Many teams reward fast replies, not deep work. This lesson shows you how to protect real focus time even when the culture pulls you toward constant reaction.",
              "objectives": [
                "By the end you can name the hidden cost of constant interruptions.",
                "By the end you can design and protect a block of deep-focus time.",
                "By the end you can lead your team toward calmer response habits."
              ],
              "sections": [
                {
                  "heading": "The hidden cost of switching",
                  "body": [
                    "In a reactive culture, the fastest reply wins praise. But every time you switch from real work to a message, you pay a cost. Research on attention shows that after an interruption it can take many minutes to fully return to deep work. This is called switching cost.",
                    "So a day with twenty small interruptions is not a day with twenty small costs. It is a day where your best thinking never really starts. You feel busy and tired, but the important work did not move. The fix is not to work harder. The fix is to protect blocks of uninterrupted time."
                  ]
                },
                {
                  "heading": "Deep work blocks and the response charter",
                  "body": [
                    "The idea of deep work comes from author Cal Newport. Deep work is hard, focused work with no interruptions. To protect it, block ninety minutes in your calendar, turn off message alerts, and tell people when you are offline and when you will be back. The promise of a clear return time is what makes people relax.",
                    "For the team, agree a simple response charter. This is a short shared rule about how fast different channels need a reply. For example: chat within four hours, email within one day, and phone calls for true emergencies only. When everyone knows the rule, no one feels they must reply in seconds, and deep work becomes possible for the whole team, not just you."
                  ]
                },
                {
                  "heading": "A worked example from a Dubai tech team",
                  "body": [
                    "Sara leads a product team in Dubai. Her team felt they had to answer chat messages within minutes, day and night. People were tired and the real product work was slipping. Sara made two changes.",
                    "First, she blocked two deep-work mornings each week for herself and asked her team to do the same, with alerts off. Second, the team agreed a response charter: chat within four hours, email next day, calls for emergencies. At first people felt nervous about the slower chat replies. After two weeks, the team shipped more, and people reported feeling calmer. The culture did not become slow. It became focused."
                  ]
                }
              ],
              "takeaways": [
                "Every switch from deep work to a message carries a real time cost.",
                "Many small interruptions stop your best thinking from ever starting.",
                "Block focused time, turn off alerts, and promise a clear return time.",
                "A shared response charter sets fair reply speeds per channel.",
                "Protecting focus makes the team calmer and more productive, not slower."
              ],
              "exercise": {
                "title": "Design your focus block",
                "prompt": "Plan one deep-work block for this week: the day, the time, and how long. Write what you will turn off, and the exact message you will send your team about when you are offline and when you will reply. Then suggest one rule for a team response charter.",
                "placeholder": "Block: day, time, length... What I turn off... Message to team... One response charter rule...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the leadership move that protects energy and responsibility.",
                  "actionLabel": "Check the rhythm move",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": [
                    "Keep",
                    "Delegate",
                    "Decline",
                    "Recover"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A team member worries that a focus block will make them look unresponsive. What is the best way to protect focus and trust at the same time?",
                  "options": [
                    "Tell them focus does not matter and to stay always available",
                    "Let them block time but promise a clear return time and agree a team response charter",
                    "Ask them to reply to everything within one minute",
                    "Remove all messaging tools from the team"
                  ],
                  "answer": 1,
                  "explain": "The fear is about not knowing when you will reply. A promised return time plus a shared charter gives people certainty, so focus blocks no longer feel like ignoring others."
                },
                {
                  "q": "Why are twenty small interruptions worse than they look?",
                  "options": [
                    "Because each one wastes only a second",
                    "Because each switch carries a recovery cost, so deep work never truly starts",
                    "Because they make the day feel too quiet",
                    "Because interruptions improve focus over time"
                  ],
                  "answer": 1,
                  "explain": "The cost is not the message itself but the time to return to deep focus afterward. Many switches mean your best thinking keeps getting reset before it can build."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello again. This lesson is about protecting focus inside a fast, reactive culture. I know the deep work idea and the response charter. Tell me how interruptions hit your day, and we can design a focus block that fits your team.",
                "suggested": [
                  "How do I protect focus when my boss expects instant replies?",
                  "What goes into a good response charter?",
                  "How long should a deep-work block be?"
                ]
              }
            },
            {
              "lessonId": "leadership-6",
              "title": "A rhythm you can sustain",
              "mins": 17,
              "hook": "Energy is not just spent; it must be refilled. This lesson helps you build a weekly rhythm of effort and recovery that you can keep for years, not weeks.",
              "objectives": [
                "By the end you can plan recovery into your week on purpose, not by luck.",
                "By the end you can set a simple weekly rhythm of work and rest.",
                "By the end you can run a short weekly review to keep the rhythm honest."
              ],
              "sections": [
                {
                  "heading": "Work like a sprinter, not a marathon runner",
                  "body": [
                    "Most leaders try to run at one steady, high speed all day, every day. This is the marathon model, and it slowly drains you. A better model comes from research by Jim Loehr and Tony Schwartz, who studied top athletes. They found that performance is not about constant effort. It is about cycles of strong effort followed by real recovery.",
                    "Think of a sprinter. They push hard, then rest, then push again. Your week should work the same way. Periods of deep effort, then short, planned recovery. Recovery is not lazy. It is the part that makes the next push possible. Energy that is never refilled runs out. That is simple physics, and it is also burnout."
                  ]
                },
                {
                  "heading": "Build the rhythm: effort and recovery across the week",
                  "body": [
                    "Plan recovery the way you plan meetings: on purpose, in the calendar. Recovery comes in three sizes. Small recovery is daily: a real lunch away from the desk, a short walk, a few minutes of quiet. Medium recovery is weekly: one evening fully offline, a day with no work messages. Large recovery is longer: real holidays where you do not check email.",
                    "Then set a simple weekly rhythm. For example: hard focus on Tuesday and Wednesday mornings, lighter admin on Thursday afternoon, and a firm offline rule on Friday evening. The exact shape is yours. What matters is that effort and recovery both have a fixed place in the week, so neither one gets skipped when things get busy."
                  ]
                },
                {
                  "heading": "A worked example: the Friday reset in Sharjah",
                  "body": [
                    "Hassan leads a finance team in Sharjah. He used to work flat out all week and crash on the weekend, then start the next week already tired. He built a simple rhythm. He put deep work in the early week, lighter tasks later, and a hard offline line from Thursday evening.",
                    "He also added a short Friday review, just fifteen minutes. He asked three questions: What drained me this week? What gave me energy? What one change will I make next week? Over two months, the small weekly changes added up. He was no longer starting Monday empty. The rhythm, not heroic effort, kept him steady. A sustainable leader is built from a repeatable week, not a perfect day."
                  ]
                }
              ],
              "takeaways": [
                "Sustained performance comes from cycles of effort and recovery, not constant push.",
                "Recovery is what makes the next strong effort possible.",
                "Plan recovery in three sizes: daily, weekly, and longer breaks.",
                "Give both effort and recovery a fixed place in the week.",
                "A short weekly review keeps your rhythm honest and improving."
              ],
              "exercise": {
                "title": "Build your weekly rhythm",
                "prompt": "Sketch one week. Mark two blocks of deep effort and three recovery moments (at least one daily, one weekly). Then write your three weekly-review questions and choose the day you will ask them.",
                "placeholder": "Deep effort blocks... Daily recovery... Weekly recovery... Weekly-review questions and day...",
                "interaction": {
                  "mechanic": "Energy Board",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the leadership move that protects energy and responsibility.",
                  "actionLabel": "Check the rhythm move",
                  "artifactLabel": "Add to rhythm plan",
                  "choices": [
                    "Keep",
                    "Delegate",
                    "Decline",
                    "Recover"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "A leader works at full speed every day and only rests when exhausted. What does the effort-recovery model say to change?",
                  "options": [
                    "Keep pushing; rest is for weak leaders",
                    "Plan recovery on purpose between periods of strong effort, not only after a crash",
                    "Work even harder so recovery is never needed",
                    "Stop all hard effort and only rest"
                  ],
                  "answer": 1,
                  "explain": "The model says performance comes from cycles. Recovery should be planned between efforts so energy is refilled before it runs out, not used only as emergency repair after a crash."
                },
                {
                  "q": "Why does a short weekly review help a leader stay sustainable?",
                  "options": [
                    "It proves to others how busy the leader is",
                    "It catches what drains and what fuels you, so you adjust the next week",
                    "It replaces the need for any recovery",
                    "It is only useful once a year"
                  ],
                  "answer": 1,
                  "explain": "A quick weekly check on drains, energy sources, and one change keeps the rhythm honest. Small, regular adjustments stop slow drift toward burnout before it builds."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome to the final lesson. This one is about a weekly rhythm you can sustain for years. I know the effort-recovery model and the Friday review. Tell me what your typical week looks like now, and we can find where recovery is missing.",
                "suggested": [
                  "How much recovery is enough in one week?",
                  "What if my work has no quiet season at all?",
                  "How do I protect recovery when a crisis hits?"
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Energy Board",
        "short": "Move work, boundaries, and recovery into a sustainable rhythm.",
        "artifact": "leadership rhythm plan",
        "interaction": "sort, choose, delegate, rhythm-build",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    },
    "offer": {
      "courseId": "offer",
      "title": "The Offer Machine",
      "modules": [
        {
          "title": "Winning the Interview",
          "lessons": [
            {
              "lessonId": "offer-1",
              "title": "The behavioral round, mastered",
              "mins": 18,
              "hook": "Most strong candidates lose the behavioral round not because their story is weak, but because they tell it in the wrong order. This lesson fixes that.",
              "objectives": [
                "By the end you can answer any \"tell me about a time\" question in a clear, structured way.",
                "By the end you can turn a real work moment into a short, strong story in under two minutes.",
                "By the end you can show your own impact without sounding like you are bragging."
              ],
              "sections": [
                {
                  "heading": "What the behavioral round is really testing",
                  "body": [
                    "A behavioral interview asks about your past. The questions usually start with \"Tell me about a time when...\" The idea is simple. The way you acted before is a good sign of how you will act in the next job.",
                    "Here is the part many people miss. The interviewer is not only listening to what happened. They are listening for three things: did you understand the problem, did you take real action yourself, and did your action change the result. When your answer jumps straight to the happy ending, they cannot see any of this. So the story feels empty, even when the work was strong."
                  ]
                },
                {
                  "heading": "The proof story spine",
                  "body": [
                    "A proof story is a simple way to put a work moment in the right order. You give a little background, say what you were responsible for, explain the steps you took, and end with the outcome.",
                    "Spend most of your time on action, because that is the part that is about you. A common mistake is to spend two minutes on background and ten seconds on what you did. Flip that. Keep context and responsibility short. Make action the heart of the story. End the result with a number when you can, because numbers feel true.",
                    "Worked example. A recruitment officer in Dubai is asked, \"Tell me about a time you handled a difficult hiring deadline.\" Weak answer: \"We were very busy and somehow we made it work.\" Strong answer: \"Our retail client needed forty sales staff before the Dubai Shopping Festival, in three weeks. I owned the full pipeline. I split the roles into three batches, ran two open assessment days at the mall, and moved interviews to WhatsApp video to save travel time. We filled thirty-eight of the forty roles before opening day, and the client renewed for the next season.\" Same person, same job. The second answer wins because you can see the thinking and the impact."
                  ]
                },
                {
                  "heading": "Build a story bank before you walk in",
                  "body": [
                    "Do not invent stories live in the room. Under pressure your memory gets worse, not better. Instead, prepare a small story bank. Pick six to eight real moments from your work. Good ones to include: a conflict you solved, a goal you hit, a mistake you fixed, a time you led without a title, and a time you worked across a team.",
                    "Write each story once in proof-story form. Then notice that one strong story can answer many questions. Your \"difficult deadline\" story can also answer questions about pressure, planning, and teamwork. With eight good stories, you are ready for most of what an interviewer can ask."
                  ]
                }
              ],
              "takeaways": [
                "The behavioral round tests how you acted before, because it predicts how you will act next.",
                "Shape a proof story: context, responsibility, action, and result, in that order.",
                "Spend most of your answer on action, because that part is about you.",
                "End with a number when you can; numbers make impact feel real.",
                "Prepare a bank of six to eight stories before the interview, not during it."
              ],
              "exercise": {
                "title": "Write your first proof story",
                "prompt": "Pick one real moment from your work where you solved a problem. Write it out in four short parts: context, responsibility, action, result. Keep context and responsibility to one line each. Give action at least three sentences. End the result with a number or a clear outcome.",
                "placeholder": "Context: ...\nResponsibility: ...\nAction: I ... then I ... and I ...\nResult: ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to offer kit",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "An interviewer asks, \"Tell me about a time you missed a target.\" Which approach is strongest?",
                  "options": [
                    "Say you have never really missed a target, to look reliable.",
                    "Describe the miss honestly, then spend most of the answer on what you did and what changed.",
                    "Blame the market and the team so the miss is not your fault.",
                    "Give a long background and end quickly with \"but it worked out fine.\""
                  ],
                  "answer": 1,
                  "explain": "Behavioral questions test self-awareness and action. Owning the miss and focusing on your Action and Result shows growth. Denying it or blaming others is a red flag."
                },
                {
                  "q": "In a proof story, which part should usually take the most time?",
                  "options": [
                    "Situation, so they fully understand the background.",
                    "Task, so they know exactly what was asked of you.",
                    "Action, because it shows what you personally did.",
                    "Result, because the ending is all that matters."
                  ],
                  "answer": 2,
                  "explain": "Action is the only part that is fully about you and your judgement. Keep Situation and Task short and let Action carry the story."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome in. I am here to help you master the behavioral round. Tell me a real work moment and I will help you shape it into a strong, short proof story.",
                "suggested": [
                  "Help me turn my last project into a proof story.",
                  "How do I show impact without sounding like I am bragging?",
                  "What if I do not have a number for my Result?"
                ]
              }
            },
            {
              "lessonId": "offer-2",
              "title": "Executive presence on demand",
              "mins": 15,
              "hook": "Two people can give the same answer, and only one sounds like a leader. The difference is presence, and presence can be learned.",
              "objectives": [
                "By the end you can name the three parts of executive presence and work on each one.",
                "By the end you can use your voice and body to sound calm and sure, even when you feel nervous.",
                "By the end you can give a clear, short answer instead of a long, worried one."
              ],
              "sections": [
                {
                  "heading": "What executive presence really means",
                  "body": [
                    "Executive presence is the sense that you are calm, clear, and in control. It is not about being loud or perfect. It is about making the other person feel they can trust you with something important.",
                    "Researcher Sylvia Ann Hewlett studied this and found presence has three parts: how you act (gravitas), how you speak (communication), and how you look (appearance). Gravitas is the biggest part by far. It means staying steady, speaking with weight, and not panicking when a question is hard. The good news is that all three parts are skills. You are not born with them. You build them with practice."
                  ]
                },
                {
                  "heading": "Voice and body that signal calm",
                  "body": [
                    "Your body speaks before your words do. Three simple habits change how you come across. First, slow down. Nervous people rush. When you slow your speech by a little, you sound more sure. Second, pause on purpose. A short, quiet pause before you answer shows you are thinking, not panicking. Silence is a sign of control, not weakness. Third, sit or stand tall and keep your hands calm and visible. Hidden or busy hands make you look nervous.",
                    "Worked example. A finance manager in Riyadh is asked a sharp question in a panel interview: \"Why should we pick you over someone with more years?\" The nervous version answers fast, voice rising, eyes down. The version with presence takes one breath, holds a short pause, looks at the panel, and says slowly: \"Years matter. But I want to show you what I did in mine.\" The same words could sound weak said in a rush. The pause and the steady voice make them strong."
                  ]
                },
                {
                  "heading": "Say less, mean more",
                  "body": [
                    "Long answers show your nerves. When people are unsure, they keep talking, hoping one sentence will work. It has the opposite effect. The room loses the point and starts to doubt you.",
                    "Use a simple rule: answer the question in your first sentence, then give one or two reasons, then stop. This is sometimes called \"headline first.\" Say your main point, then support it. For example: \"Yes, I can lead this team. I have done it twice before, and both teams hit their targets.\" That is complete. You do not need three more sentences. Stopping on time is itself a sign of presence."
                  ]
                }
              ],
              "takeaways": [
                "Executive presence has three parts: how you act, how you speak, and how you look.",
                "Gravitas, staying calm and steady, matters most.",
                "Slow down and use short pauses; silence shows control.",
                "Keep your body tall and your hands calm and visible.",
                "Lead with your main point, give one or two reasons, then stop."
              ],
              "exercise": {
                "title": "The headline-first answer",
                "prompt": "Take this question: \"Why should we hire you?\" Write an answer that follows the headline-first rule. First sentence is your main point. Then give one or two reasons. Then stop. Keep the whole thing under sixty words. Read it out loud slowly and notice where you want to pause.",
                "placeholder": "Main point: ...\nReason 1: ...\nReason 2: ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the offer move that makes the conversation cleaner.",
                  "actionLabel": "Check the offer move",
                  "artifactLabel": "Add to offer kit",
                  "choices": [
                    "Set floor",
                    "Set target",
                    "Ask clearly",
                    "Pause after ask"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Which behaviour signals the strongest executive presence in an interview?",
                  "options": [
                    "Answering very quickly so there is never any silence.",
                    "Taking a short pause before a hard question, then answering in a steady voice.",
                    "Giving long, detailed answers to show how much you know.",
                    "Speaking loudly so the panel knows you are confident."
                  ],
                  "answer": 1,
                  "explain": "A short pause and a steady voice signal control, which is the core of gravitas. Speed, volume, and length are often signs of nerves, not presence."
                },
                {
                  "q": "You give your main point, then keep adding more sentences to support it. What usually happens?",
                  "options": [
                    "The panel trusts you more because you gave so much detail.",
                    "The point gets lost and you start to sound unsure.",
                    "It always makes the answer stronger.",
                    "It shows you are a deep thinker."
                  ],
                  "answer": 1,
                  "explain": "Talking too much weakens your point and shows your nerves. Headline first, one or two reasons, then stop. Knowing when to stop is itself a sign of presence."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Good to see you. Presence feels mysterious, but it is just a set of habits. Tell me where you freeze up in interviews and we will work on the calm version together.",
                "suggested": [
                  "How do I stop my voice from shaking when I am nervous?",
                  "Give me a headline-first answer for a tough question.",
                  "Is it bad to pause before I answer?"
                ]
              }
            },
            {
              "lessonId": "offer-3",
              "title": "Reading the room",
              "mins": 15,
              "hook": "The best candidates do not just answer questions. They notice what the interviewer cares about and shape every answer around it.",
              "objectives": [
                "By the end you can spot the signals an interviewer gives without saying them out loud.",
                "By the end you can adjust your answer in real time when you are losing the room.",
                "By the end you can ask questions that show you understand the real need behind the role."
              ],
              "sections": [
                {
                  "heading": "Every interviewer has a hidden question",
                  "body": [
                    "On the surface, an interviewer asks about your skills. Underneath, they have one hidden question: \"Will this person solve my problem and make my life easier?\" Reading the room means hearing that hidden question and answering it.",
                    "Different interviewers have different problems. A hiring manager worries about getting work done. An HR partner worries about whether you fit the team and will stay. A senior leader worries about risk and the bigger picture. The same answer should be aimed differently for each. When you talk to the hiring manager, talk about results. When you talk to HR, talk about how you work with people. When you talk to the leader, talk about judgement and the long view."
                  ]
                },
                {
                  "heading": "Reading the signals",
                  "body": [
                    "People tell you how an interview is going, even when they say nothing. Learn to read three signals. First, body language: leaning in, nodding, and taking notes are good signs. Leaning back, checking the time, or short replies mean you are losing them. Second, follow-up questions: when they dig deeper, they are interested. When they move on quickly, your last answer did not land. Third, energy: a warm voice and small talk mean things are going well.",
                    "Worked example. A marketing candidate in Abu Dhabi is giving a long answer about a campaign. She notices the hiring manager has stopped nodding and is glancing at her notes. Instead of pushing on, she stops and says: \"I can go deeper on the numbers, or I can tell you how I would apply this here. Which is more useful?\" The manager sits up. By reading the signal, she turned a fading answer into a moment of connection. That question also shows confidence and respect for the manager's time."
                  ]
                },
                {
                  "heading": "Ask questions that show you get it",
                  "body": [
                    "Most interviews end with \"Do you have any questions for us?\" This is not a small moment. It is a test. Weak questions are about you: pay, holidays, working hours. Save those for later, after the offer. Strong questions are about their problem.",
                    "Try questions like: \"What does success in this role look like in the first six months?\" or \"What is the biggest challenge the team is facing right now?\" These do two things. They show you are already thinking like someone in the job. And the answers give you useful facts for your next round and for the salary talk later. A simple framework to remember: ask about the role, the team, and the challenge. Three good questions, one from each area, is plenty."
                  ]
                }
              ],
              "takeaways": [
                "Every interviewer has a hidden question: will you solve their problem?",
                "Aim your answers differently for the hiring manager, HR, and senior leaders.",
                "Read body language, follow-up questions, and energy to see how you are doing.",
                "If you are losing the room, stop and offer the interviewer a choice.",
                "End with questions about the role, the team, and the challenge, not about pay."
              ],
              "exercise": {
                "title": "Prepare three closing questions",
                "prompt": "Imagine you are interviewing for a role you want. Write three questions you would ask at the end. Make one about the role, one about the team, and one about the biggest challenge they face. Avoid anything about pay or holidays. For each one, write a short note on what a good answer would tell you.",
                "placeholder": "Role question: ...\nTeam question: ...\nChallenge question: ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the offer move that makes the conversation cleaner.",
                  "actionLabel": "Check the offer move",
                  "artifactLabel": "Add to offer kit",
                  "choices": [
                    "Set floor",
                    "Set target",
                    "Ask clearly",
                    "Pause after ask"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "Mid-answer, you notice the hiring manager has leaned back and is checking the time. What is the best move?",
                  "options": [
                    "Keep going and finish your full point, since stopping looks weak.",
                    "Speak faster to get through the rest before they lose interest.",
                    "Pause and offer a choice, like \"Should I go deeper, or move to how I would apply this here?\"",
                    "Ask them directly if they are bored."
                  ],
                  "answer": 2,
                  "explain": "Offering a choice respects their time and hands them control. It turns a fading answer into a moment of connection, and shows real presence."
                },
                {
                  "q": "At the end of an interview, which question is strongest?",
                  "options": [
                    "How many holiday days does the role give?",
                    "What does success in this role look like in the first six months?",
                    "Is there room to work from home?",
                    "What is the salary range for this position?"
                  ],
                  "answer": 1,
                  "explain": "Asking about success shows you are already thinking like someone in the job, and the answer helps you in later rounds and in negotiation. Pay and holidays are best saved for after the offer."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Hello again. Reading the room is a skill you can sharpen fast. Tell me about an interview where you felt you were losing them, and we will work out what the signals were.",
                "suggested": [
                  "How do I aim my answer for a senior leader versus a hiring manager?",
                  "What are good signs the interview is going well?",
                  "Help me write three strong closing questions."
                ]
              }
            }
          ]
        },
        {
          "title": "Closing the Offer",
          "lessons": [
            {
              "lessonId": "offer-4",
              "title": "Salary negotiation that works",
              "mins": 18,
              "hook": "The minutes after \"we would like to make you an offer\" can be worth more than a year of hard work. Most people give them away by saying yes too fast.",
              "objectives": [
                "By the end you can decide your numbers before any salary talk begins.",
                "By the end you can answer the \"what are your expectations?\" question without losing power.",
                "By the end you can ask for more in a calm, professional way that keeps the relationship warm."
              ],
              "sections": [
                {
                  "heading": "Know your numbers before you talk",
                  "body": [
                    "Never start a salary talk without your numbers ready. You need three. Your floor is the lowest you will accept and still say yes. Your target is what you really want, based on the market. Your reach is a number a little above target, the one you open with so there is room to move.",
                    "To set these, do research. Look at salary guides from firms like Hays, Cooper Fitch, and Robert Half, which publish yearly Gulf salary reports. Ask people in similar roles. Remember the full package, not just base pay: housing allowance, transport, school fees, flights home, bonus, and end-of-service benefits. In the UAE and KSA, allowances can be a large part of the total. A lower base with a strong housing allowance can beat a higher base with none."
                  ]
                },
                {
                  "heading": "Never name the first number if you can help it",
                  "body": [
                    "There is an idea in negotiation called the anchor. The first number named pulls the whole talk toward it. So if you can, let the employer name a number first. When they ask, \"What are your salary expectations?\", you can gently pass it back: \"I would like to understand the full range for the role first. What did you have in mind for this position?\"",
                    "If they push and you must give a number, give your reach number, and give a range, not a single figure. Always base it on research, not a wish. For example: \"Based on the market for this role in Dubai, I am looking in the range of 28,000 to 32,000 dirhams per month, depending on the full package.\" The range keeps the door open, and naming the package reminds them it is not only about base pay."
                  ]
                },
                {
                  "heading": "The counter-offer, done with grace",
                  "body": [
                    "When the offer comes and it is below your target, do not say yes and do not say no. Pause and counter. A clean way to do this has three steps. First, show real warmth: \"Thank you, I am very excited about this role.\" Second, make a clear, specific ask with a reason: \"Based on my experience and the market, could we look at a base of 30,000 rather than 27,000?\" Third, stay quiet and let them respond. The silence after your ask is powerful. Do not fill it.",
                    "Worked example. An HR specialist in Sharjah is offered 18,000 dirhams. Her target is 21,000. She replies: \"Thank you, I am genuinely keen to join. Based on my five years in this area and the Gulf market for this role, I was hoping for 21,000. Is there room to move toward that?\" The employer comes back with 20,000 and an extra flight allowance. By asking calmly and giving a reason, she gained 2,000 a month plus a benefit, and the relationship stayed warm. Saying yes too fast would have lost all of that."
                  ]
                }
              ],
              "takeaways": [
                "Set three numbers before any talk: floor, target, and reach.",
                "Judge the full package, not just base pay; allowances matter a lot in the Gulf.",
                "Try to let the employer name the first number; the first number anchors the talk.",
                "If you must name one, give a researched range, not a single figure.",
                "Counter with warmth, a clear ask with a reason, and then silence."
              ],
              "exercise": {
                "title": "Build your number sheet",
                "prompt": "For a role you want, write your three numbers: floor, target, and reach. Under each, note the research that supports it. Then write one sentence you could say if the employer asks for your expectations, passing the question back politely. Finally, write your three-step counter for an offer that comes in below target.",
                "placeholder": "Floor: ...\nTarget: ...\nReach: ...\nPass-back line: ...\nCounter (warmth / ask + reason / silence): ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the offer move that makes the conversation cleaner.",
                  "actionLabel": "Check the offer move",
                  "artifactLabel": "Add to offer kit",
                  "choices": [
                    "Set floor",
                    "Set target",
                    "Ask clearly",
                    "Pause after ask"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "The interviewer asks early on, \"What salary are you expecting?\" What is usually the strongest response?",
                  "options": [
                    "Give your exact floor number so you seem reasonable and easy.",
                    "Politely pass it back and ask what range they have in mind for the role.",
                    "Say you are flexible and happy with whatever they offer.",
                    "Name a number far above market so there is lots of room to drop."
                  ],
                  "answer": 1,
                  "explain": "The first number anchors the whole talk. Passing the question back lets the employer anchor first. Naming your floor caps you low, and a wild number can damage trust."
                },
                {
                  "q": "An offer arrives 3,000 below your target. What is the best next step?",
                  "options": [
                    "Accept quickly so you do not seem difficult or risk the offer.",
                    "Reject it firmly and say the number is insulting.",
                    "Thank them warmly, make a specific counter with a reason, then stay quiet.",
                    "Ask for a week to think and avoid giving any number."
                  ],
                  "answer": 2,
                  "explain": "Warmth keeps the relationship strong, a reasoned ask gives them a way to say yes, and silence after the ask puts gentle pressure on them to respond."
                },
                {
                  "q": "Two Dubai offers: A is 25,000 base with no allowances; B is 22,000 base plus housing and a flight home. Which is the smartest way to compare them?",
                  "options": [
                    "Pick A, because the base salary is clearly higher.",
                    "Pick B, because more lines on the offer is always better.",
                    "Add up the full yearly value of each package, then compare the totals.",
                    "Pick whichever one offered first."
                  ],
                  "answer": 2,
                  "explain": "In the Gulf, allowances can be a large part of pay. Always compare the full package value, not just base. B may well be worth more once housing and flights are counted."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Glad you are here. This is the lesson that pays for the course. Tell me about an offer you are weighing, or one you expect soon, and we will set your floor, target, and reach.",
                "suggested": [
                  "Help me set my three numbers for a role in Dubai.",
                  "What do I say when they ask my expectations first?",
                  "How do I compare two offers with different allowances?"
                ]
              }
            },
            {
              "lessonId": "offer-5",
              "title": "Multiple offers, handled",
              "mins": 14,
              "hook": "Having two offers at once is a strong position, and also an easy one to ruin. Handled well, it improves both offers. Handled badly, it can damage a working relationship for years.",
              "objectives": [
                "By the end you can use a second offer to improve the first one without lying.",
                "By the end you can buy time politely when one offer comes before the other.",
                "By the end you can turn down an offer in a way that keeps a good relationship for the future."
              ],
              "sections": [
                {
                  "heading": "Why a second offer gives you real power",
                  "body": [
                    "When two companies want you, both learn that someone else has judged you to be worth hiring. This is real proof of your value, and it gives you room to ask for more. But this power only works when it is true and used with respect. Never invent an offer you do not have. The Gulf hiring world is small, and recruiters talk to each other. A lie that gets found out can cost you both jobs.",
                    "Used honestly, a second offer is simple to mention. You do not threaten. You inform. \"I want to be open with you. I have another offer in hand, and you are my first choice. Is there room to improve the package so I can say yes with full confidence?\" This is calm, honest, and hard to be angry at."
                  ]
                },
                {
                  "heading": "Managing the clock",
                  "body": [
                    "The hardest case is timing. One company gives you a deadline, but your preferred company has not finished its process. You do not want to lose offer A, and you do not want to say yes before you hear from B.",
                    "Two moves help. First, ask the slower company to speed up: \"I have an offer with a deadline this Thursday, but your role is my first choice. Is there any way to bring my final decision forward?\" Companies move faster than you think when they fear losing you. Second, ask the faster company for a little more time: \"Thank you, I am very keen. This is an important decision for my family, so could I confirm by Monday?\" A short, polite extension is normal and usually granted. Worked example: a project manager in Doha had an offer from a contractor due Thursday and a preferred offer from a developer still in process. She told the developer about the deadline and they moved her final interview to Tuesday. She told the contractor she needed until Monday. Both said yes. She ended with two offers and chose freely."
                  ]
                },
                {
                  "heading": "Saying no without damaging the relationship",
                  "body": [
                    "When you choose, you must turn one offer down. Do it well, because the person you reject today may hire you in three years, or move to a company you want. Be quick, be warm, and be clear.",
                    "A simple message works: \"Thank you so much for the offer and for your time during the process. After careful thought, I have decided to accept another role that fits me better right now. I have real respect for your team and hope we meet again in future.\" Send it quickly, so they can move to their next candidate. Do not go quiet and stop replying. Silence is what people remember, and it is the one thing that truly damages the relationship for good."
                  ]
                }
              ],
              "takeaways": [
                "A real second offer is honest proof of your value and gives you room to ask for more.",
                "Never invent an offer; the Gulf market is small and lies get found out.",
                "Inform, do not threaten: share the other offer calmly and name your first choice.",
                "Manage timing by asking the slower firm to speed up and the faster firm for a little more time.",
                "Turn down offers quickly and warmly; going silent is what damages the relationship."
              ],
              "exercise": {
                "title": "Draft your three messages",
                "prompt": "Imagine you have Offer A with a Thursday deadline and a preferred Offer B still in process. Write three short messages: one asking Company B to speed up, one asking Company A for a few more days, and one polite message turning down whichever offer you do not take. Keep each message warm, honest, and under five sentences.",
                "placeholder": "To B (speed up): ...\nTo A (more time): ...\nDecline message: ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "artifact-words",
                  "requiresWriting": true,
                  "intro": "Only write the words you would actually keep in the final artifact.",
                  "actionLabel": "Save the useful words",
                  "artifactLabel": "Add to offer kit",
                  "choices": []
                }
              },
              "quiz": [
                {
                  "q": "You have a genuine offer from Company A and prefer Company B. How should you use this with B?",
                  "options": [
                    "Tell B that A offered far more than it really did, to push harder.",
                    "Say nothing, in case mentioning it makes B angry.",
                    "Tell B honestly that you have another offer and they are your first choice, and ask if there is room to improve.",
                    "Threaten B that you will take A unless they beat it within an hour."
                  ],
                  "answer": 2,
                  "explain": "Honest, calm bargaining works and protects your good name. Lying about the amount is risky in a small market, threats damage the relationship, and silence wastes a real chance to ask for more."
                },
                {
                  "q": "Company A's deadline is Thursday but preferred Company B has not finished. What is the best pair of moves?",
                  "options": [
                    "Accept A now and quietly keep interviewing with B.",
                    "Ask B to speed up its decision, and ask A politely for a few more days.",
                    "Reject A immediately and hope B comes through.",
                    "Ignore A's deadline and assume they will wait."
                  ],
                  "answer": 1,
                  "explain": "Asking B to move faster and A for a short extension keeps both options alive. Companies often move when they fear losing you, and short, polite extensions are normal."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Welcome. Two offers is a good problem, and a delicate one. Tell me your situation, the timing and which one you prefer, and we will plan your messages together.",
                "suggested": [
                  "How do I ask the slower company to speed up?",
                  "Help me word an honest message about my other offer.",
                  "How do I turn down an offer without damaging the relationship?"
                ]
              }
            },
            {
              "lessonId": "offer-6",
              "title": "Live AI mock interview",
              "mins": 14,
              "hook": "You have learned the moves. Now you practise them out loud, against an AI interviewer that pushes back, so the real room feels easy.",
              "objectives": [
                "By the end you can run a full mock interview and use the feedback to improve fast.",
                "By the end you can spot your own filler words, rushed answers, and weak endings.",
                "By the end you can build a short practice routine you can repeat before any real interview."
              ],
              "sections": [
                {
                  "heading": "Why practising out loud changes everything",
                  "body": [
                    "Reading about interviews is not the same as doing them. The skill lives in your mouth, not your head. When you say an answer out loud, you find the gaps you cannot see on paper: the rushed start, the answer that has no ending, the filler words like \"basically\" and \"you know.\"",
                    "There is a learning idea behind this called retrieval practice. You learn faster when you pull an answer out of your memory under a little pressure, rather than just reading it again. A mock interview is retrieval practice for your career. The AI mock interviewer in this course asks you real behavioral and pressure questions, lets you answer, and then gives you honest feedback on your structure, your length, and your clarity."
                  ]
                },
                {
                  "heading": "How to run a strong mock session",
                  "body": [
                    "Treat the mock like the real thing. Sit up, dress as you would, and answer out loud, not in your head. Use everything from this course. Put your stories in proof-story form. Lead with your headline, then stop. Read the signals in the feedback and adjust.",
                    "Use a simple loop called Answer, Review, Redo. First, answer the question fully. Second, review the feedback and pick the one biggest weakness, not ten small ones. Third, redo the same answer with that one fix. Then move on. Worked example: a candidate in Kuwait answers \"Tell me about a conflict you handled.\" The AI notes the answer was ninety seconds of background and ten seconds of action. She redoes it, cutting the background to one line and growing the action. The second answer is half as long and twice as strong. One question, one fix, real progress."
                  ]
                },
                {
                  "heading": "Your pre-interview routine",
                  "body": [
                    "Build a short routine you repeat before every real interview. Three days before, run a full mock and fix your three weakest answers. The day before, run your best six stories once, out loud, in clean proof-story form. One hour before, do not cram. Instead, do two things: read your closing questions, and say your headline answer to \"Why you?\" once, slowly, to set your voice and pace.",
                    "Keep practising in short bursts over several days rather than one long session the night before. Spacing your practice out helps it stick. The goal is not to memorise scripts word for word. Scripts sound stiff and break under a surprise question. The goal is to make the structure automatic, so that under pressure your answers fall into shape on their own. That is when the real room starts to feel easy."
                  ]
                }
              ],
              "takeaways": [
                "Practise out loud; the skill lives in your mouth, not your head.",
                "A mock interview is retrieval practice, which makes answers stick under pressure.",
                "Use the Answer, Review, Redo loop and fix one biggest weakness at a time.",
                "Build a routine: a full mock three days out, your stories the day before, light prep one hour before.",
                "Practise the structure, not a word-for-word script, so surprise questions do not break you."
              ],
              "exercise": {
                "title": "Run your first mock loop",
                "prompt": "Pick one likely question for your next interview. Answer it out loud and write down what you actually said. Then review it: did it have a clear structure, did it have a clear ending, were there filler words? Choose the single biggest weakness. Redo the answer with that one fix and write the improved version.",
                "placeholder": "Question: ...\nFirst answer (what I said): ...\nBiggest weakness: ...\nRedone answer: ...",
                "interaction": {
                  "mechanic": "Offer Desk",
                  "mode": "choice-board",
                  "requiresWriting": false,
                  "intro": "Choose the offer move that makes the conversation cleaner.",
                  "actionLabel": "Check the offer move",
                  "artifactLabel": "Add to offer kit",
                  "choices": [
                    "Set floor",
                    "Set target",
                    "Ask clearly",
                    "Pause after ask"
                  ]
                }
              },
              "quiz": [
                {
                  "q": "After a mock answer, the AI gives you six things to improve. What is the best way to use this feedback?",
                  "options": [
                    "Try to fix all six at once in your next answer.",
                    "Pick the single biggest weakness, redo the answer with that one fix, then move on.",
                    "Ignore the feedback and just answer more questions for volume.",
                    "Write a full word-for-word script that avoids every mistake."
                  ],
                  "answer": 1,
                  "explain": "Fixing one big weakness at a time leads to real, lasting improvement. Trying to fix everything at once overloads you, and word-for-word scripts break under surprise questions."
                },
                {
                  "q": "One hour before a real interview, what is the best use of your time?",
                  "options": [
                    "Cram every story and fact you can in case it comes up.",
                    "Run a long full mock to catch any last weakness.",
                    "Read your closing questions and say your \"Why you?\" headline once, slowly.",
                    "Read silently through your notes one more time."
                  ],
                  "answer": 2,
                  "explain": "Cramming raises stress and rarely helps. A light touch, reading your questions and speaking one headline answer out loud, sets your pace and calm without overloading you."
                }
              ],
              "xp": 50,
              "tutorSeed": {
                "opening": "Here we go, this is the practice room. I can play your interviewer and ask real questions, then give you honest feedback. Pick a question to start, or tell me the role you are preparing for.",
                "suggested": [
                  "Ask me a behavioral question and judge my story structure.",
                  "Give me a hard pressure question and push back on my answer.",
                  "Help me build my pre-interview routine for next week."
                ]
              }
            }
          ]
        }
      ],
      "mechanic": {
        "name": "Offer Desk",
        "short": "Prepare the numbers and words before the pressure arrives.",
        "artifact": "offer close kit",
        "interaction": "compare, choose, script, mock",
        "writingPolicy": "Avoid asking learners to type unless the typed words are the actual artifact, such as a bio, script, negotiation message, story, or final plan. Prefer choosing, sorting, rehearsing, checking, ranking, and saving structured decisions."
      }
    }
  },
  "experience": {
    "version": "course-mechanics/v2",
    "principle": "Every course teaches through the shape of its own work. The interaction should match the career task, not force every lesson into the same read-write-quiz rhythm.",
    "writingPolicy": "Avoid asking learners to type unless the typed words are the artifact itself. Most lessons use course-specific choices, sorting, rehearsal, or review moves; writing is reserved for final brand copy, scripts, messages, and story lines.",
    "sharedLanguage": {
      "course": "Course",
      "lesson": "Lesson",
      "artifact": "Artifact",
      "exercise": "Practice move",
      "quiz": "Quick check",
      "progress": "Progress",
      "badge": "Badge",
      "streak": "Streak"
    },
    "courseMechanics": {
      "ai-hr": {
        "name": "Decision Map",
        "short": "Sort the decision before choosing the tool.",
        "artifact": "AI adoption map",
        "interaction": "sort, audit, choose, stress-test",
        "defaultMode": "sort",
        "actionLabel": "Place this decision",
        "artifactLabel": "Add to AI map",
        "choices": [
          "Automate",
          "Augment",
          "Keep human",
          "Not ready"
        ]
      },
      "branding": {
        "name": "Reputation Studio",
        "short": "Shape how the market reads you.",
        "artifact": "brand statement and visibility plan",
        "interaction": "audit, choose, sharpen, draft only when words are the artifact",
        "defaultMode": "review",
        "actionLabel": "Choose the sharper move",
        "artifactLabel": "Add to brand plan",
        "choices": [
          "Clear",
          "Too broad",
          "Needs proof",
          "More specific"
        ]
      },
      "interview": {
        "name": "Interview Lab",
        "short": "Build answers under realistic pressure.",
        "artifact": "interview playbook",
        "interaction": "decode, select, rehearse, mock",
        "defaultMode": "rehearse",
        "actionLabel": "Choose the answer strategy",
        "artifactLabel": "Add to playbook",
        "choices": [
          "Clarify the question",
          "Lead with headline",
          "Shape a proof story",
          "Recover and reset"
        ]
      },
      "hr-foundations": {
        "name": "Operating Map",
        "short": "Map the HR decision before applying the rule.",
        "artifact": "HR operating sheet",
        "interaction": "map, choose, check, apply",
        "defaultMode": "map",
        "actionLabel": "Place this on the map",
        "artifactLabel": "Add to operating sheet",
        "choices": [
          "People process",
          "Business link",
          "Risk check",
          "Manager action"
        ]
      },
      "speaking": {
        "name": "Rehearsal Room",
        "short": "Practice the move before the real room.",
        "artifact": "signature talk kit",
        "interaction": "map, rehearse, compare, refine",
        "defaultMode": "rehearse",
        "actionLabel": "Choose the rehearsal move",
        "artifactLabel": "Add to talk kit",
        "choices": [
          "Open stronger",
          "Cut the extra",
          "Pause here",
          "Handle the question"
        ]
      },
      "confidence": {
        "name": "Mirror Journal",
        "short": "Notice the pattern and choose the next reset move.",
        "artifact": "confidence reset plan",
        "interaction": "notice, choose, collect, reset",
        "defaultMode": "choice",
        "actionLabel": "Choose the reset move",
        "artifactLabel": "Add to reset plan",
        "choices": [
          "Name the trigger",
          "Answer the critic",
          "Collect proof",
          "Use the ritual"
        ]
      },
      "leadership": {
        "name": "Energy Board",
        "short": "Move work, boundaries, and recovery into a sustainable rhythm.",
        "artifact": "leadership rhythm plan",
        "interaction": "sort, choose, delegate, rhythm-build",
        "defaultMode": "sort",
        "actionLabel": "Choose the leadership move",
        "artifactLabel": "Add to rhythm plan",
        "choices": [
          "Keep",
          "Delegate",
          "Decline",
          "Recover"
        ]
      },
      "offer": {
        "name": "Offer Desk",
        "short": "Prepare the numbers and words before the pressure arrives.",
        "artifact": "offer close kit",
        "interaction": "compare, choose, script, mock",
        "defaultMode": "choose",
        "actionLabel": "Choose the offer move",
        "artifactLabel": "Add to offer kit",
        "choices": [
          "Set floor",
          "Set target",
          "Ask clearly",
          "Pause after ask"
        ]
      }
    }
  }
};
